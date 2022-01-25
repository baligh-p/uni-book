<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
try {
    $base = mysqli_connect("localhost", "root", "", "booksite");
    if (isset($_GET["lang"])) {
        if ($_GET["lang"] == "all") {
            $req1 = "SELECT b.*,p.username from book b,profil p where b.autId=p.clid order by (b.dislike+b.like) desc LIMIT $_GET[nbr]";
            $result = mysqli_query($base, $req1);
            $table = array();
            while ($data = mysqli_fetch_assoc($result)) {
                $table[] = $data;
            }
            print_r(json_encode($table));
        } else {
            $req1 = "SELECT b.*,p.username from book b,profil p where b.autId=p.clid and
             b.bookId in (select bookId from languagebook where language='$_GET[lang]') 
             order by (b.like+b.dislike) desc LIMIT $_GET[nbr]";
            $result = mysqli_query($base, $req1);
            $table = array();
            while ($data = mysqli_fetch_assoc($result)) {
                $table[] = $data;
            }
            print_r(json_encode($table));
        }
    } else if (isset($_GET["type"])) {
        $req1 = "SELECT b.*,p.username from book b,profil p where b.autId=p.clid and b.type='$_GET[type]' order by (b.dislike+b.like) desc LIMIT $_GET[nbr]";
        $result = mysqli_query($base, $req1);
        $table = array();
        while ($data = mysqli_fetch_assoc($result)) {
            $table[] = $data;
        }
        print_r(json_encode($table));
    } else if (isset($_GET["prix"])) {
        $req1 = "SELECT b.*,p.username from book b,profil p where b.autId=p.clid and b.prix<='$_GET[prix]' order by (b.dislike+b.like) desc LIMIT $_GET[nbr]";
        $result = mysqli_query($base, $req1);
        $table = array();
        while ($data = mysqli_fetch_assoc($result)) {
            $table[] = $data;
        }
        print_r(json_encode($table));
    }
} catch (Exception $e) {
    print_r("big fat error");
}