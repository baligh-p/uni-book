<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
try {
    include "infoForServer.php";
    if (isset($_POST["typeReact"])) {
        if ($_POST["typeReact"] == "like") {
            $table = new PDO("mysql:host=localhost;dbname=booksite", "root", "");
            $verif = $table->query("SELECT count(*) from react where idPost='$_POST[idPost]' and clid='$_POST[clid]' and typeReact='like'");
            if ($verif->fetchColumn() == 0) {
                $result = $table->prepare("UPDATE post SET jaime=jaime+1 WHERE idPost=(?)");
                $result->execute((array($_POST["idPost"])));
                $result2 = $table->prepare("INSERT INTO react VALUES(?,?,?,Now())");
                $result2->execute(array($_POST["idPost"], $_POST["clid"], $_POST["typeReact"]));
            } else {
                $result3 = $table->prepare("UPDATE post SET jaime=jaime-1 WHERE idPost=(?)");
                $result3->execute((array($_POST["idPost"])));
                $result3 = $table->query("DELETE FROM react WHERE idPost='$_POST[idPost]' and clid='$_POST[clid]' and typeReact='like'");
            }
        }
    }
    if (isset($_GET["clidVerif"])) {
        $table = new PDO("mysql:host=localhost;dbname=booksite", "root", "");
        $verif = $table->query("SELECT count(*) from react where idPost='$_GET[idPostVerif]' and clid='$_GET[clidVerif]' and typeReact='$_GET[type]' ");
        $verif->fetchColumn() == 0 ? print_r(1) : print_r(0);
    }
} catch (Exception $e) {
    print_r("fat error");
}