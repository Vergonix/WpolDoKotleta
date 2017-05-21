<?php
    $data = json_decode(file_get_contents("php://input"));
    $username = $data->username;
    $pass = $data->pass;
    $err = "Podano błędne hasło lub email";

    echo $username;

    mysql_connect("sbazy.uek.krakow.pl", "s187772", "xZL2WCBM");
    mysql_select_db("s187772");

    $mail = mysql_query("SELECT id, email, password FROM users WHERE email='".$username."'");
    //$wynik = mysql_fetch_row($mail);
    $row = mysql_result($mail, 0 , 1 );



   // $rows = mysql_num_rows($mail);

    /*if($rows == 1) {
        $pass = mysql_query("SELECT password FROM users WHERE email='".$email."'");
        if($pass == $password) {
            echo $email;
        } else {
            echo $err;
        }
    } else {
        echo $err;


    }*/
?>

