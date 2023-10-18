<?php
$nombre = $_POST['nombre'];
$mail = $_POST['email'];
$telefono = $_POST['telefono'];
$empresa = $_POST['mensaje'];

$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "Este mensaje fue enviado por " . $nombre . ",\r\n";
$mensaje .= "Su e-mail es: " . $mail . " \r\n";
$mensaje .= "su telefono es " .$telefono ." \r\n";
$mensaje .= "Mensaje: " . $_POST['mensaje'] . " \r\n";
$mensaje .= "Enviado el " . date('d/m/Y', time());

$para = 'comercial.revitec@gmail.com';
$asunto = 'Mensaje de la web revitecvigo';

mail($para, $asunto, utf8_decode($mensaje), $header);

    echo "<!DOCTYPE html>";
    echo "<head>";
	echo "<meta charset='UTF-8'>";
	echo "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
	echo "<meta http-equiv='X-UA-Compatible' content='ie=edge'>";
    echo "<title>Modal</title>";
    echo "<link rel='stylesheet' type='text/css' href='css/estilos.css' media='all' />";
	echo "</head>";
    echo "<body>";
	echo "<header>";
				echo "<div class='textos'>";
				echo "<h1>Modal animado | AlexCG Design</h1>";
				echo "<a id='abrir'>Suscribete a este canal</a>";
				echo "</div>";
		 echo "</header>";
	echo "<div id='miModal' class='modal'>";
	echo "<div class='flex' id='flex'>";
			echo "<div class='contenido-modal'>";
			echo "<div class='modal-header flex'>";
			echo "<h2>Formulario de Contacto</h2>";
					echo "<span class='close' id='close'>&times;</span>";
				echo "</div>";
				echo "<div class='modal-body'>";
					echo"<p>Gracias por ponerte en contacto con nosotros, en breve te llamaremos por télefono si as facilitado este dato o te enviaremos un e-mail a la direccion de correo que has indicado en nuestro formulario</p>";
				echo"/div>";
				echo"<div class='footer'>";
				echo "<h3>REVITEC</h3>";
				echo "</div>";
			echo "</div>";
		echo "</div>";
    echo"</div>";
    echo "<script src='js/ventana.js'></script>";
	echo "</body>";
echo "</html> ";
?>