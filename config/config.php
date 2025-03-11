<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');
define('DB_NAME', 'kaur_travels');

// API Configuration
define('API_ENDPOINT', 'https://kaurtravels.es/forms');

// SMTP Configuration
define('SMTP_HOST', 'smtp.ionos.es');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'no-reply@kaurtravels.es');
define('SMTP_PASSWORD', 'sdGWAtTf47uE6&dQ@');
define('SMTP_FROM_EMAIL', 'web@kaurtravels.es');
define('SMTP_FROM_NAME', 'Kaur Travels');

// Amadeus API Configuration
define('AMADEUS_CLIENT_ID', 'QlW8LVC4S9cuR6e93qUciPaAnGKDW0Vr');
define('AMADEUS_CLIENT_SECRET', 'sM8Q4wqPj1SmH9Za');

// Site Configuration
define('SITE_URL', 'https://kaurtravels.es');
define('SITE_NAME', 'Kaur Travels');

// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/error.log');

// Session Configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_samesite', 'Strict');

// Security Headers
header("X-Frame-Options: SAMEORIGIN");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Content-Security-Policy: default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:;");

// Timezone
date_default_timezone_set('Europe/Madrid');

// Database Connection
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    error_log("Database Connection Error: " . $e->getMessage());
    die("Connection failed. Please try again later.");
}