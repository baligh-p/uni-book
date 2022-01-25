<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));
if (isset($data->{"emailContactUs"})) {
    $commentId = "";
    for ($i = 0; $i < 30; $i++) {
        $rand = rand(0, 2);
        if ($rand == 1) {
            $commentId = $commentId . rand(0, 9);
        } else if ($rand == 2) {
            $commentId = $commentId . chr(rand(97, 122));
        } else {
            $commentId = $commentId . chr(rand(65, 90));
        }
    }
    $table = new PDO("mysql:host=localhost;dbname=booksite", "root", "");
    $req = $table->prepare("INSERT INTO contact(email,message,date,numMessage) VALUES(?,?,NOW(),?)");
    $req->execute(array($data->{"emailContactUs"}, $data->{"messageContactUs"}, $commentId));
}