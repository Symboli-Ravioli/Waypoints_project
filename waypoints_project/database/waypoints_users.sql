CREATE DATABASE IF NOT EXISTS waypoints_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE waypoints_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    plan ENUM('free', 'pro') NOT NULL DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Example admin account creation:
-- INSERT INTO users (name, email, password_hash, role, plan)
-- VALUES ('Admin User', 'admin@waypoints.com', '$2y$10$YOUR_HASH_HERE', 'admin', 'pro');
-- Use password_hash('Admin@123', PASSWORD_DEFAULT) in PHP before inserting the admin row.

-- Example user account creation:
-- INSERT INTO users (name, email, password_hash, role, plan)
-- VALUES ('Jane Doe', 'jane@example.com', '$2y$10$YOUR_HASH_HERE', 'user', 'pro');
