<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
if (isset($_GET["offset"])) {
    try {
        $base = mysqli_connect("localhost", "root", "", "booksite");
        $requete1 = "SELECT * FROM post ,profil WHERE post.clid=profil.clid order by post.datePost desc LIMIT 5 OFFSET $_GET[offset]";
        $result = mysqli_query($base, $requete1);
        $table = array();
        while ($donne = mysqli_fetch_assoc($result)) {
            $table[] = $donne;
        }
        print_r(json_encode($table));
    } catch (Exception $e) {
        print_r($e);
    }
}