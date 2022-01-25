<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));
$eg = mysqli_connect("localhost", "root", "", "booksite");
if (isset($data->{"typerId"})) {
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
    $insertComment = $table->prepare("INSERT INTO commentsbook(typerId,comment,dateComment,type,commentId,bookId) VALUES (?,?,Now(),?,?,?)");
    $insertComment->execute(array($data->{"typerId"}, $data->{"comment"}, $data->{"typeComment"}, $commentId, $data->{"bookId"}));
}
if (isset($_GET["getComments"])) {
    $requete1 = "SELECT username,comment,commentId,dateComment FROM profil p, commentsbook cb WHERE p.clid=cb.typerId and bookId='$_GET[book]' and cb.type='$_GET[type]' ORDER BY dateComment ";
    $result1 = mysqli_query($eg, $requete1);
    $table = array();
    while ($row = mysqli_fetch_assoc($result1)) {
        $table[] = $row;
    }
    print_r(json_encode($table));
}