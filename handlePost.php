<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
if (isset($_POST["typer"])) {
    include "./generateID.php";
    $IDpost = generateID(30);
    $base = new PDO("mysql:host=localhost;dbname=booksite", "root", "");
    if (isset($_POST["bookId"])) {
        $req1 = $base->prepare("INSERT INTO post(idPost,messagePost,bookId,clid,datePost) VALUES(?,?,?,?,Now())");
        $req1->execute(array($IDpost, $_POST["postTxt"], $_POST["bookId"], $_POST["typer"]));
    } else {
        $req1 = $base->prepare("INSERT INTO post(idPost,messagePost,clid,datePost,bookName) VALUES('$IDpost',?,?,Now(),?)");
        $req1->execute(array($_POST["postTxt"], $_POST["typer"], $_POST["bookName"]));
    }
}