<?php
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $password = $data->password;
    $err = "Podano błędne hasło lub email";

    mysql_connect("sbazy.uek.krakow.pl", "s187772", "xZL2WCBM");
    mysql_select_db("s187772");

    $mail = mysql_query("SELECT id FROM users WHERE email='".$email."'");
    $rows = mysql_num_rows($mail);

    if($rows == 1) {
        $pass = mysql_query("SELECT password FROM users WHERE email='".$email."'");
        if($pass == $password) {
            echo $email;
        } else {
            echo $err;
        }
    } else {
        echo $err;
    }
?>

