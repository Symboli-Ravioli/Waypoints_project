<?php
require __DIR__ . '/db.php';

if (!isset($_SESSION['user_id']) || ($_SESSION['user_role'] ?? '') !== 'admin') {
    header('Location: /waypoints_project/homepage.html');
    exit;
}

$users = $pdo->query(
    'SELECT id, name, email, role, plan, created_at FROM users ORDER BY created_at DESC'
)->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel | Waypoints</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f7f5; margin: 0; padding: 40px; color: #1d2a22; }
        .wrap { max-width: 1000px; margin: 0 auto; background: #fff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; border-bottom: 1px solid #e6ece8; text-align: left; }
        th { background: #f0f5f1; }
        .badge { display: inline-block; padding: 6px 10px; border-radius: 999px; background: #dff7ea; color: #1e7d56; font-weight: 700; font-size: 12px; }
        a { color: #1e7d56; text-decoration: none; }
    </style>
</head>
<body>
    <div class="wrap">
        <h1>Admin Panel</h1>
        <p>Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?>.</p>
        <p><a href="/waypoints_project/dashboard.php">Back to dashboard</a> | <a href="/waypoints_project/auth/logout.php">Logout</a></p>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Plan</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($users as $user): ?>
                    <tr>
                        <td><?php echo (int) $user['id']; ?></td>
                        <td><?php echo htmlspecialchars($user['name']); ?></td>
                        <td><?php echo htmlspecialchars($user['email']); ?></td>
                        <td><span class="badge"><?php echo htmlspecialchars($user['role']); ?></span></td>
                        <td><?php echo htmlspecialchars($user['plan']); ?></td>
                        <td><?php echo htmlspecialchars($user['created_at']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
