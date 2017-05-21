<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $data = json_decode(file_get_contents("php://input"));

    $conn = new mysqli("sbazy.uek.krakow.pl", "s187772", "xZL2WCBM", "s187772");
    $result = $conn->query("INSERT INTO spa_favourites (user_id, name) VALUES ($data->id, '$data->name')");
    $conn->close();
    echo json_encode($result);
?>