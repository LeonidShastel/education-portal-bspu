<?php

function route($method, $urlData, $formData) {

    $conn = new mysqli("thelax67.beget.tech", "thelax67_educ", "G4ut*kCc", "thelax67_educ");
    if ($conn->connect_error) {
        header('HTTP/1.0 400 Bad Request');
        echo json_encode(array(
            'error' => 'Connection DB failed'
        ));
    }

    if ($method === 'GET' && $formData) {
        $login = $formData["login"];
        $password = ($formData["password"]);

        $data = $conn->query("SELECT * FROM `users` WHERE `login` LIKE '".$login."' AND `password` LIKE '".$password."'");
        $result = array(
            'method'=>'GET',
            'data'=>[]
        );
        if($data->num_rows>0){
            while ($obj = $data->fetch_object()){
                $user = [array(
                    'id'=>$obj->id,
                    "login"=>$obj->login,
                    "first_name"=>$obj->first_name,
                    "last_name"=>$obj->last_name,
                    "permissions"=>$obj->permissions
                )];
                $result["data"] = $user;
            }
        }

        echo json_encode($result);

        return;
    }

    // Возвращаем ошибку
    header('HTTP/1.0 400 Bad Request');
    echo json_encode(array(
        'error' => 'Bad Request'
    ));

}