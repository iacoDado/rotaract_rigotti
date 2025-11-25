<?php

if(empty($_SESSION["loggato"])){/*
    if(!$_SESSION["loggato"]){
        header("Location: formModifiche.php");
    }*/
}else{
    header("Location: formModifiche.php");
}


$file_json = 'bollettini.json';
$cartella_upload = 'bollettini/';

$messaggio = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $titolo = $_POST['titolo'];
    $data_bollettino = $_POST['data'];
    
    $percorso_file = "";
    
    
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        
        if (!is_dir($cartella_upload)) {
            mkdir($cartella_upload, 0777, true);
        }

        $nome_file = basename($_FILES['file']['name']);
        $target_path = $cartella_upload . $nome_file;

        
        if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
            $percorso_file = $target_path;
        } else {
            $messaggio = "Errore nel caricamento del file.";
        }
    } else {
        
        $percorso_file = "Nessun file caricato"; 
    }

    if ($titolo && $data_bollettino && $percorso_file) {
        
        
        if (file_exists($file_json)) {
            $json_content = file_get_contents($file_json);
            $db = json_decode($json_content, true);
        } else {
            $db = [];
        }

        
        if (!isset($db['bollettini']) || !is_array($db['bollettini'])) {
            $db['bollettini'] = [];
        }

        
        $nuovo_elemento = [
            "data" => $data_bollettino,
            "titolo" => $titolo,
            "percorso" => $percorso_file
        ];

        

        array_unshift($db['bollettini'], $nuovo_elemento);

        
        if (file_put_contents($file_json, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
            $messaggio = "Bollettino aggiunto con successo!";
        } else {
            $messaggio = "Errore nel salvataggio del file JSON.";
        }
    } else {
        $messaggio = "Compila tutti i campi.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aggiungi bollettino</title>
    <style>
        .msg { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Aggiungi un bollettino</h1>

    <?php if($messaggio): ?>
        <p class="<?= strpos($messaggio, 'Errore') !== false ? 'error' : 'msg' ?>">
            <?= $messaggio ?>
        </p>
    <?php endif; ?>

    <form action="" method="post" id="formBollettino" enctype="multipart/form-data">
        <label>Inserisci il titolo: </label>
        <input type="text" id="titolo" name="titolo" required><br><br>
        
        <label>Inserisci la data (IMPORTANTE!!! -> formato: prime 3 lettere del mese + anno, es: Set 2025): </label>
        <input type="text" id="data" name="data" required><br><br>
        
        <label>Carica il file: </label>
        <input type="file" id="file" name="file" required><br><br>

        <button type="submit">Aggiungi bollettino</button>
    </form>
</body>
</html>