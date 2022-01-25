<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));
$eg = mysqli_connect("localhost", "root", "", "booksite");
if (isset($data->{"email"})) {
    $clid = "";
    for ($i = 0; $i < 7; $i++) {
        $clid = $clid . rand(0, 9) . chr(rand(97, 122));
    }
    echo $clid;
    $vector = new PDO("mysql:host=localhost;dbname=booksite", "root", "");
    $req1 = $vector->prepare("INSERT INTO profil(username,password,email,accountBirthday,clid) VALUES(?,?,?,NOW(),'$clid')");
    $req1->execute(array($data->{"username"}, $data->{"password"}, $data->{"email"}));
}
if (isset($_GET["im"])) {
    $req2 = "SELECT * FROM profil WHERE email='$_GET[im]'";
    $result1 = mysqli_query($eg, $req2);
    $table = array();
    while ($row = mysqli_fetch_assoc($result1)) {
        $table[] = $row;
    }
    print_r(json_encode($table));
}
if (isset($_GET["Un"])) {
    $req2 = "SELECT * FROM profil WHERE username='$_GET[Un]'";
    $result1 = mysqli_query($eg, $req2);
    $table = array();
    while ($row = mysqli_fetch_assoc($result1)) {
        $table[] = $row;
    }
    print_r(json_encode($table));
}
if (isset($_GET["un"]) && ($_GET["pwd"])) {
    $req3 = "SELECT * FROM profil WHERE username='$_GET[un]' AND password='$_GET[pwd]'";
    $result2 = mysqli_query($eg, $req3);
    $table2 = array();
    while ($row2 = mysqli_fetch_assoc($result2)) {
        $table2[] = $row2;
    }
    print_r(json_encode($table2));
}