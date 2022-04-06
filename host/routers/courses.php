<?php


function route($method, $urlData, $formData)
{

    $conn = new mysqli("thelax67.beget.tech", "thelax67_educ", "G4ut*kCc", "thelax67_educ");
    if ($conn->connect_error) {
        header('HTTP/1.0 400 Bad Request');
        echo json_encode(array(
            'error' => 'Connection DB failed'
        ));
    }

    //INSERT INTO `courses_list` (`id`, `title`) VALUES (NULL, 'JavaScript');

    if ($method === 'GET' && $urlData) {
        $title = $urlData[0];

        $data = $conn->query("SELECT * FROM `".$title."`");
        $result = array(
            'method' => 'GET',
            'data' => []
        );
        if ($data->num_rows > 0) {
            while ($obj = $data->fetch_object()) {

            }
        }

        echo json_encode($result);

        return;
    }
    else if($method === "GET"){
        $data = $conn->query("SELECT * FROM `courses_list`");

        $result = array(
            'method'=>'GET',
            'data'=>[]
        );

        if($data->num_rows > 0){
            $rows_courses = [];
            while ($obj = $data->fetch_object()){

                $sub_rows = $conn->query("SELECT * FROM `course-".$obj->id."`");
                $rows_sub_courses = [];

                if($sub_rows->num_rows>0)
                    while ($sub_obj = $sub_rows->fetch_object()){
                        $rows_sub_courses[] = array(
                            "id" => $sub_obj->id,
                            "title" => $sub_obj->title
                        );
                    }

                $rows_courses[] = array(
                    "id" => $obj->id,
                    "title" => $obj->title,
                    "sub-title" => $rows_sub_courses
                );
            }

            $result["data"] = $rows_courses;
        }

        echo json_encode($result);

        return;
    }
    else if($method === "POST"){

        $new_course = $conn->query("INSERT INTO `courses_list` (`id`, `title`) VALUES (NULL, '".$formData["title"]."')");
        $conn->query("CREATE TABLE `thelax67_educ`.`course-".$conn->insert_id."` ( `id` INT NOT NULL AUTO_INCREMENT , `title` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB");

        json_encode(array(
            'method'=>'POST',
            'create'=>true
        ));

        return;
    }

    // Возвращаем ошибку
    header('HTTP/1.0 400 Bad Request');
    echo json_encode(array(
        'error' => 'Bad Request'
    ));

}