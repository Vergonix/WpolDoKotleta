<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $data = json_decode(file_get_contents("php://input"));

    $conn = new mysqli("sbazy.uek.krakow.pl", "s187772", "xZL2WCBM", "s187772");
    $result = $conn->query("SELECT * FROM spa_users WHERE email = '$data->user' AND password = '$data->pass'");

    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"id":"'  . $rs["id"] . '",';
        $outp .= '"email":"'. $rs["email"]     . '",';
        $outp .= '"password":"'. $rs["password"]     . '"}';
    }
    $outp ='{"records":['.$outp.']}';
    $conn->close();
    echo $outp;
?>