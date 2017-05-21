<?php
          $data = json_decode(file_get_contents("php://input"));
          $email = $data->email;
          $password = $data->password;

          $username = $data->username;
          $pass = $data->pass;

          echo $username;

          mysql_connect("sbazy.uek.krakow.pl", "s187772", "xZL2WCBM");
          mysql_select_db("s187772");

          mysql_query("INSERT INTO users(email, password) VALUES ('".$email."','".$password."')") or die(mysql_error());
      ?>