<?php
use PHPMailer\PHPMailer\PHPMailer;

require 'php/PHPMailer.php';
require 'php/Exception.php';
require 'php/SMTP.php';

$name = $_POST['name'];
$city = $_POST['city'];
$question = $_POST['question'];
$email = $_POST['email'];

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
//Set the hostname of the mail server
$mail->Host = 'mail.reksoft.ru';
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 25;
//Whether to use SMTP authentication
$mail->SMTPAuth = false;
$mail->CharSet = "UTF-8";
//Set who the message is to be sent from
$mail->setFrom('recognition@reksoft.ru', 'Recognition');
//Set who the message is to be sent to
$mail->addAddress('hr@reksoft.ru', ''); //
//Set the subject line
$mail->Subject = 'Reksoft PRO сообщение';
//Replace the plain text body with one created manually
$mail->Body = "
Имя: $name
Город: $city
Вопрос: $question
Email: $email
";

$response = [];
$response["status"] = null;

// recaptcha secret code
$secret = "6Le_dmMUAAAAAF8QO0GQ_qPsDE1Uz-Mvtw2fQdo4";

$url = 'https://www.google.com/recaptcha/api/siteverify';
	$data = array(
		'secret' => $secret,
		'response' => $_POST["g-recaptcha-response"]
	);
	$options = array(
		'http' => array (
			'method' => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$verify = file_get_contents($url, false, $context);
	$captcha_success=json_decode($verify);

if ($captcha_success->success==true) {
    if (!$mail->send()) {
        $response["status"] = "error";
    } else {
        $response["status"] = "success";
    }
} else {
    $response["status"] = "error";
    $response["message"] = "error";
}

echo json_encode($response);
?>