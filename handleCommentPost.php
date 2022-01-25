<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
try {
    include "generateID.php";
    $table = new PDO("mysql:host=localhost;dbname=booksite", "root", "");
    if (isset($_POST["comment"])) {
        $id = generateID(30);
        $result1 = $table->prepare("INSERT INTO commentpost VALUES (?,?,?,?,NOW())");
        $result1->execute(array($_POST["clid"], $_POST["idPost"], $id, $_POST["comment"]));
    } else if (isset($_GET["idPost"])) {
        $database = mysqli_connect("localhost", "root", "", "booksite");
        $request2 = "SELECT p.username,c.idComment,c.comment,c.dateComment from profil p,commentpost c where c.idPost='$_GET[idPost]' and p.clid=c.typer order by c.dateComment";
        $result2 = mysqli_query($database, $request2);
        $arr = array();
        while ($data = mysqli_fetch_assoc($result2)) {
            $arr[] = $data;
        }
        print_r(json_encode($arr));
    }
} catch (Exception $e) {
    print_r("big fat error");
}