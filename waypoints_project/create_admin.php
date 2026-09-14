<?php
require __DIR__ . '/db.php';

$email = 'admin@waypoints.com';
$password = 'Admin@123';

$stmt = $pdo->prepare('SELECT id, role, password_hash FROM users WHERE email = :email LIMIT 1');
$stmt->execute(['email' => strtolower(trim($email))]);
$user = $stmt->fetch();

if ($user && ($user['role'] ?? 'user') === 'admin' && password_verify($password, $user['password_hash'] ?? '')) {
    echo "Admin account is ready. Email: {$email} | Password: {$password}";
    exit;
}

if ($user) {
    $pdo->prepare(
        'UPDATE users SET name = :name, role = :role, plan = :plan, password_hash = :password_hash WHERE email = :email'
    )->execute([
        'name' => 'System Admin',
        'role' => 'admin',
        'plan' => 'pro',
        'password_hash' => password_hash($password, PASSWORD_DEFAULT),
        'email' => strtolower(trim($email)),
    ]);
    echo "Admin account updated successfully. Email: {$email} | Password: {$password}";
    exit;
}

$pdo->prepare(
    'INSERT INTO users (name, email, password_hash, role, plan) VALUES (:name, :email, :password_hash, :role, :plan)'
)->execute([
    'name' => 'System Admin',
    'email' => strtolower(trim($email)),
    'password_hash' => password_hash($password, PASSWORD_DEFAULT),
    'role' => 'admin',
    'plan' => 'pro',
]);

echo "Admin account created successfully. Email: {$email} | Password: {$password}";
