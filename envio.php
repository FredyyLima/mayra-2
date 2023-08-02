<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $mensagem = $_POST["mensagem"];

    // Configurações do e-mail
    $destinatario = "fredyy_lima@live.com"; // Insira o endereço de e-mail que receberá as mensagens
    $assunto = $_POST["assunto"];

    // Corpo do e-mail
    $corpo = "Nome: $nome\n";
    $corpo .= "E-mail: $email\n";
    $corpo .= "Mensagem: $mensagem\n";

    // Envia o e-mail
    if (mail($destinatario, $assunto, $corpo)) {
        echo "E-mail enviado com sucesso!";
    } else {
        echo "Erro ao enviar o e-mail.";
    }
}
?>
