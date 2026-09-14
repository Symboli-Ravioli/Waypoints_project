<?php
session_start();

$dbHost = 'localhost';
$dbName = 'waypoints_db';
$dbUser = 'root';
$dbPass = '';

try {
    $pdo = new PDO(
        "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4",
        $dbUser,
        $dbPass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    $ensureDefaultAdmin = function () use ($pdo): void {
        $email = 'admin@waypoints.com';
        $name = 'System Admin';
        $password = 'Admin@123';

        $stmt = $pdo->prepare('SELECT id, role, password_hash FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => strtolower(trim($email))]);
        $user = $stmt->fetch();

        if (!$user) {
            $pdo->prepare(
                'INSERT INTO users (name, email, password_hash, role, plan) VALUES (:name, :email, :password_hash, :role, :plan)'
            )->execute([
                'name' => $name,
                'email' => strtolower(trim($email)),
                'password_hash' => password_hash($password, PASSWORD_DEFAULT),
                'role' => 'admin',
                'plan' => 'pro',
            ]);
            return;
        }

        if (($user['role'] ?? 'user') !== 'admin' || !password_verify($password, $user['password_hash'])) {
            $pdo->prepare(
                'UPDATE users SET name = :name, role = :role, plan = :plan, password_hash = :password_hash WHERE email = :email'
            )->execute([
                'name' => $name,
                'role' => 'admin',
                'plan' => 'pro',
                'password_hash' => password_hash($password, PASSWORD_DEFAULT),
                'email' => strtolower(trim($email)),
            ]);
        }
    };

    $ensureDefaultAdmin();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed.',
        'debug' => $e->getMessage(),
    ]);
    exit;
}
