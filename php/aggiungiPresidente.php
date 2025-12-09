<?php
session_start();
if(isset($_SESSION["loggato"])){
    if(!$_SESSION["loggato"]){
        header("Location: formModifiche.php");
    }
}else{
    header("Location: formModifiche.php");
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $nome = $_POST['nome'];
    $mandato = $_POST['dataInizio'] . "-" . $_POST['dataFine'];
    
    $json_path = "../src/presidenti.json";

    if(file_exists($json_path)){
        $json = json_decode(file_get_contents($json_path), true);
    }else{
        $json = [];
    }

    
    $nuovo_presidente = [
        "nome" => $nome,
        "mandato" => $mandato
    ];

    $json['presidenti'][] = $nuovo_presidente;



    if (file_put_contents($json_path, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        $messaggio = "Presidente aggiunto con successo!";
    } else {
        $messaggio = "Errore nel salvataggio del file JSON.";
    }
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aggiungi presidente</title>
    <style>
        .msg { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Aggiungi un presidente</h1>

    <?php if(isset($messaggio)): ?>
        <p class="<?= strpos($messaggio, 'Errore') !== false ? 'error' : 'msg' ?>">
            <?= $messaggio ?>
        </p>
    <?php endif; ?>

    <form action="" method="POST" id="formPresidente">
        <label>Nome: </label>
        <input type="text" id="nome" name="nome" placeholder="Inserisci nome e cognome" required><br><br>
        <label>Mandato: </label>
        <input type="number" id="dataInizio" name="dataInizio" min="" max="" required>
        <label> - </label>
        <input type="number" id="dataFine" name="dataFine" min="" max="" required>
        
        
        <br><br>

        <button type="submit">Aggiungi</button>
    </form>

    <script src="../js/presidenti.js"></script>
    
</body>
</html>