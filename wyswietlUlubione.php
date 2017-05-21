<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $data = json_decode(file_get_contents("php://input"));

    $conn = new mysqli("sbazy.uek.krakow.pl", "s187772", "xZL2WCBM", "s187772");
    $result = $conn->query("SELECT name FROM spa_favourites WHERE user_id = '$data->id'");

    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"name":"'  . $rs["name"] . '"}';
    }
    $outp ='{"records":['.$outp.']}';
    $conn->close();
    echo $outp;
?>