<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));
$eg = mysqli_connect("localhost", "root", "", "booksite");
if (isset($_GET["getTypes"])) {
    $req = "SELECT * FROM typebook order by nameType";
    $result = mysqli_query($eg, $req);
    $table = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $table[] = $row;
    }
    print_r(json_encode($table));
}