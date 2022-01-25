<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
try {
    if (isset($_GET["selectedBook"])) {
        $table = array();
        $base = mysqli_connect("localhost", "root", "", "booksite");
        $req1 = "select b.*,p.username from book b,profil p where b.bookId='$_GET[selectedBook]' and b.autId=p.clid ";
        $req3 = "select language from languagebook l,book b where b.bookId=l.bookId and b.bookId='$_GET[selectedBook]'";
        $languages = array();
        $result3 = mysqli_query($base, $req3);
        while ($data = mysqli_fetch_array($result3)) {
            $languages[] = $data[0];
        }
        $languages = $languages;
        $result = mysqli_query($base, $req1);
        while ($donne = mysqli_fetch_assoc($result)) {
            $donne["languages"] = $languages;
            $table[] = $donne;
        }
        print_r(json_encode($table));
    }
} catch (Exception $e) {
    print_r("big fat error");
}