<?php
// guardarReserva.php

// Obtén la entrada JSON
$data = json_decode(file_get_contents('php://input'), true);

// El archivo donde se guardarán las reservas
$file = 'reservas.csv';

// Guarda la reserva en el archivo
if (isset($data['reserva'])) {
    file_put_contents($file, $data['reserva'], FILE_APPEND);
    http_response_code(200);
} else {
    http_response_code(400);
    echo 'Invalid request';
}
?>
