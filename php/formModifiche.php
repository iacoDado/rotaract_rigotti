<?php
session_start();

$utenti = [
    [
        "nome" => "admin",
        "password" => "admin"
    ]
];

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $valido = false;
    foreach ($utenti as $u) {
        if(strtolower($_POST["nome"]) == $u["nome"] && $_POST["password"] == $u["password"]){
            $_SESSION["loggato"] = true;
            if($_POST["scelta"] == "1"){
                header("Location: aggiungiPresidente.php");
            }else{
                header("Location: aggiungiBollettino.php");
            }
        }else{
            $errore = "Utente non trovato";
        }
    }
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Effettua il login</h2><br>

    <form action="" method="POST" id="formLogin">
        <label for="nome">Nome: </label>
        <input type="text" placeholder="Inserisci il tuo nome" name="nome" id="nome"><br><br>

        <label for="password">Password: </label>
        <input type="password" placeholder="Inserisci la tua password" name="password" id="password"><br><br>

        <select name="scelta" id="scelta">
            <option value="0">--Seleziona--</option>
            <option value="1">Aggiungi un presidente</option>
            <option value="2">Aggiungi un bollettino</option>
        </select>

        <button type="submit">LOGIN</button>
    </form>

    <?php
        if(isset($errore)){
            ?> 
            <p style="color:red"><?php echo $errore ?> </p>
            <?php
        }
    ?>

    <script src="../js/controlloLogin.js"></script>
</body>
</html>