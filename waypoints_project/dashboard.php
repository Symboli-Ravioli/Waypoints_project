<?php
require __DIR__ . '/db.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: homepage.html');
    exit;
}

$userName = htmlspecialchars($_SESSION['user_name']);
$userPlan = htmlspecialchars($_SESSION['user_plan'] ?? 'free');
$userRole = htmlspecialchars($_SESSION['user_role'] ?? 'user');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Waypoints</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f7f5; margin: 0; padding: 40px; color: #1d2a22; }
        .card { max-width: 700px; margin: 0 auto; background: #fff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        h1 { margin-top: 0; }
        .meta { margin: 18px 0; line-height: 1.8; }
        .badge { display: inline-block; background: #dff7ea; color: #1e7d56; padding: 8px 12px; border-radius: 999px; font-weight: 700; }
        a { color: #1e7d56; text-decoration: none; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Welcome back, <?php echo $userName; ?>!</h1>
        <div class="badge"><?php echo strtoupper($userRole); ?></div>
        <div class="meta">
            <p><strong>Plan:</strong> <?php echo $userPlan; ?></p>
            <p><strong>Email:</strong> <?php echo htmlspecialchars($_SESSION['user_email'] ?? ''); ?></p>
        </div>

        <?php if ($userRole === 'admin'): ?>
            <p><a href="admin.php">Open admin panel</a></p>
        <?php endif; ?>

        <p><a href="auth/logout.php">Logout</a></p>
    </div>
</body>
</html>
