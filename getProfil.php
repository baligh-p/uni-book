<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));
$eg = mysqli_connect("localhost", "root", "", "booksite");
if (isset($_GET["getProfil"])) {
    $req1 = "SELECT * FROM profil WHERE clid='$_GET[getProfil]'";
    $result1 = mysqli_query($eg, $req1);
    $table = array();
    while ($row = mysqli_fetch_assoc($result1)) {
        $table[] = $row;
    }
    print_r(json_encode($table));
}