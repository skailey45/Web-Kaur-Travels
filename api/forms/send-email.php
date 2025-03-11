<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://kaurtravel.es');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 3600');

require_once '../../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// Define log directory
$logDir = __DIR__ . '/logs';

// Create logs directory if it doesn't exist
if (!file_exists($logDir)) {
    mkdir($logDir, 0755, true);
}

// Set error log path inside logs directory
ini_set('log_errors', 1);
ini_set('error_log', $logDir . '/email_error.log');

// Function to log messages
function logMessage($level, $message) {
    global $logDir;
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$level] $message" . PHP_EOL;
    file_put_contents($logDir . '/email.log', $logEntry, FILE_APPEND);
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON data from request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Log the incoming request
logMessage('INFO', "Email request received: " . json_encode($data));

// Validate required fields
if (!isset($data['to']) || !isset($data['subject']) || !isset($data['html'])) {
    logMessage('ERROR', "Missing required fields in email request");
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields'
    ]);
    exit();
}

try {
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host = $_ENV['VITE_SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['VITE_SMTP_USER'];
    $mail->Password = $_ENV['VITE_SMTP_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = intval($_ENV['VITE_SMTP_PORT']);
    $mail->SMTPDebug = 0;

    // Recipients
    $mail->setFrom($_ENV['VITE_SMTP_USER'], $_ENV['VITE_SMTP_FROM_NAME']);
    $mail->addAddress($data['to']);
    $mail->addBCC($_ENV['VITE_SMTP_USER']); // BCC to admin

    // Content
    $mail->isHTML(true);
    $mail->Subject = htmlspecialchars($data['subject']);
    $mail->Body = $data['html'];
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    // Send email
    $mail->send();
    logMessage('INFO', "SMTP email sent to " . $data['to']);

    echo json_encode([
        'success' => true,
        'messageId' => md5(uniqid(time())),
        'method' => 'smtp'
    ]);

} catch (Exception $e) {
    logMessage('ERROR', "PHPMailer Error: " . $e->getMessage());

    // Try native PHP mail() as fallback
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $_ENV['VITE_SMTP_FROM_NAME'] . ' <' . $_ENV['VITE_SMTP_USER'] . '>',
        'Reply-To: ' . $_ENV['VITE_SMTP_USER'],
        'X-Mailer: PHP/' . phpversion()
    ];

    $success = mail($data['to'], $data['subject'], $data['html'], implode("\r\n", $headers));

    if ($success) {
        logMessage('INFO', "Fallback email sent to " . $data['to']);
        echo json_encode([
            'success' => true,
            'messageId' => md5(uniqid(time())),
            'method' => 'mail'
        ]);
    } else {
        logMessage('ERROR', "Failed to send email via fallback method");
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send email',
            'details' => $e->getMessage()
        ]);
    }
}
