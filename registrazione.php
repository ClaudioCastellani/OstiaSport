<?php
// Connessione al database (XAMPP)
$servername = "localhost";
$servername2 = "localhost:3307";
$servername3 = "localhost:5500";

$username = "root";
$password = "";
$ports = [5500, 3307, 5500];
foreach ($ports as $port) {
    $conn = @new mysqli($servername, $username, $password, '', $port);

    if ($conn->connect_error) {
        // La connessione ha fallito, prova con la prossima porta
        continue;
    } else {
        // Connessione riuscita
        echo "Connessione stabilita sulla porta $port!";
        break; // Esci dal ciclo
    }
}

// Verifica se è stata stabilita una connessione
if ($conn === null) {
    die("Connessione fallita su tutte le porte!");
}
// Crea la connessione al server MySQL
//$conn = new mysqli($servername, $username, $password);

// Verifica la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Crea il database se non esiste
$dbname = "ecommerce";
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";

if ($conn->query($sql) === FALSE) {
    echo "Errore nella creazione del database: " . $conn->error;
}

// Chiudi la connessione al server MySQL
$conn->close();

// Connessione al database appena creato
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la connessione al database
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Crea la tabella utenti se non esiste
$sql = "CREATE TABLE IF NOT EXISTS utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL
)";

if ($conn->query($sql) === FALSE) {
    echo "Errore nella creazione della tabella: " . $conn->error;
}

// Prendi i valori inviati dal form
$nome = $_POST['nome'];
$cognome = $_POST['cognome'];

// Inserisci il nuovo utente nella tabella
$sql = "INSERT INTO utenti (nome, cognome) VALUES ('$nome', '$cognome')";

if ($conn->query($sql) === TRUE) {
    echo "Registrazione avvenuta con successo!";
} else {
    echo "Errore durante la registrazione: " . $conn->error;
}

// Chiudi la connessione al database
$conn->close();
?>
