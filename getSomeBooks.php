<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
try {
    if (isset($_GET["selector"])) {
        $table = array();

        $base = mysqli_connect("localhost", "root", "", "booksite");
        $req1 = "select b.*,p.username from book b,profil p where b.autId=p.clid order by name";
        $result = mysqli_query($base, $req1);
        $word = strtoupper($_GET["selector"]);
        while ($donne = mysqli_fetch_assoc($result)) {
            if (preg_match("#$word#", strtoupper($donne["name"]))) {
                $table[] = $donne;
            }
        }
        print_r(json_encode($table));
    }
    if (isset($_GET["selectedBook"])) {
        $table = array();
        $base = mysqli_connect("localhost", "root", "", "booksite");
        $req1 = "select * from book,profil where bookId='$_GET[selectedBook]' and autId=clid ";
        $req2 = "select count(*) as cn from commentsbook where bookId='$_GET[selectedBook]'";
        $result2 = mysqli_query($base, $req2);
        while ($data = mysqli_fetch_assoc($result2)) {
            $nbr = $data["cn"];
        }
        $result = mysqli_query($base, $req1);
        while ($donne = mysqli_fetch_assoc($result)) {
            $donne["nombreCommentaire"] = $nbr;
            $table[] = $donne;
        }
        print_r(json_encode($table));
    }
} catch (Exception $e) {
    print_r($e);
}