<?php
class Record {
    private $server;
    private $user;
    private $pass;
    private $dbname;
    private $conn;

    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "records";

        // Conectar a la base de datos
        $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        // Verificar la conexión
        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }
    }

    // Método para cerrar la conexión
    public function closeConnection() {
        $this->conn->close();
    }

    public function guardarRecord($nombre, $apellidos, $nivel, $tiempo) {
        $stmt = $this->conn->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssif", $nombre, $apellidos, $nivel, $tiempo);
        $stmt->execute();
        $stmt->close();
    }

    public function obtenerTopRecords($nivel) {
    $stmt = $this->conn->prepare("SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo ASC LIMIT 10");
    $stmt->bind_param("i", $nivel);
    $stmt->execute();
    $result = $stmt->get_result();
    $records = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $records;
}

    
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Raymond Deabsa Peralta">
    <meta name="description" content="Juego de tiempo de reacción basado en semáforo para F1 Desktop.">
    <meta name="keywords" content="F1, juego de tiempo de reacción, semáforo, Fórmula 1, Desktop">
    <title>Juego de Tiempo de Reacción</title>
    <link rel="stylesheet" href="estilo/semaforo.css">
    <script src="js/semaforo.php" defer></script>
</head>
<body>
    <header>
        <h1>Juego de Tiempo de Reacción - F1 Desktop</h1>
        <nav>
            <ul>
                <li><a href="juegos.html">Volver al menú de juegos</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="juego-semaforo">
            <h2>Presiona "Reaccionar" cuando las luces esten verdes</h2>
            <div class="semaforo">
                <div id="luz-1" class="luz"></div>
                <div id="luz-2" class="luz"></div>
                <div id="luz-3" class="luz"></div>
                <div id="luz-4" class="luz"></div>
            </div>
            <div id="botones">
                <button id="iniciar-juego">Iniciar Juego</button>
                <button id="reaccionar-juego" disabled>Reaccionar</button>
            </div>
            <p id="resultado"></p>
        </section>
    </main>
</body>
</html>
