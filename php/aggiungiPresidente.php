<?php
session_start();
if(isset($_SESSION["loggato"])){
    if(!$_SESSION["loggato"]){
        header("Location: formModifiche.php");
    }
}else{
    header("Location: formModifiche.php");
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aggiungi presidente</title>
</head>
<body>
    <h1>Aggiungi un presidente</h1>

    <form action="" method="post" id="formPresidente">
        <label>Nome: </label>
        <input type="text" id="nome" name="nome" placeholder="Inserisci nome e cognome"><br><br>
        <label>Mandato: </label>
        <input type="number" id="dataInizio" name="dataInizio" min="" max="" >
        <label> - </label>
        <input type="number" id="dataFine" name="dataFine" min="" max=""><br><br>

        <button type="submit">Aggiungi</button>
    </form>

    <script src="../js/presidenti.js"></script>
    
</body>
</html>