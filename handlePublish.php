<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
if (isset($_POST["name"])) {
    $bookID = "";
    for ($i = 0; $i < 20; $i++) {
        $rand = rand(0, 2);
        if ($rand == 1) {
            $bookID .= rand(0, 9);
        } else if ($rand == 2) {
            $bookID .= chr(rand(97, 122));
        } else {
            $bookID .= chr(rand(65, 90));
        }
    }

    /* chemin photo+file handle  */

    $image = "";
    for ($i = 0; $i < 20; $i++) {
        $rand = rand(0, 2);
        if ($rand == 1) {
            $image .= rand(0, 9);
        } else if ($rand == 2) {
            $image .= chr(rand(97, 122));
        } else {
            $image .= chr(rand(65, 90));
        }
    }
    if (isset($_FILES["file"])) {
        $file = "";
        for ($i = 0; $i < 20; $i++) {
            $rand = rand(0, 2);
            if ($rand == 1) {
                $file .= rand(0, 9);
            } else if ($rand == 2) {
                $file .= chr(rand(97, 122));
            } else {
                $file .= chr(rand(65, 90));
            }
        }
        $t = pathinfo($_FILES["file"]["name"]);
        $s = $t['extension'];
        move_uploaded_file($_FILES['file']['tmp_name'], './../ltw/my-application/public/uploadedFiles/files/' . basename($file) . '.' . $s);
        $file = 'uploadedFiles/files/' . $file . '.' . $s;
    } else {
        $file = "none";
    }

    /*file handle*/


    /*image handle*/

    $h = pathinfo($_FILES["photo"]["name"]);
    $o = $h['extension'];
    move_uploaded_file($_FILES['photo']['tmp_name'], './../ltw/my-application/public/uploadedFiles/photoBook/' . basename($image) . '.' . $o);
    $image = 'uploadedFiles/photoBook/' . $image . '.' . $o;

    /*execution insertion dans table book*/

    $table = new PDO("mysql:host=localhost;dbname=booksite", "root", "");
    $req1 = $table->prepare("INSERT INTO book(name,description,prix,numberPage,cheminImage,autId,cheminFile,bookId,type,dateBook) VALUES (?,?,?,?,?,?,?,?,?,Now())");
    $req1->execute(array($_POST["name"], $_POST["description"], $_POST["price"], $_POST["numberPage"], $image, $_POST["clid"], $file, $bookID, $_POST["type"]));

    /*execution de l'insertion dans table language book*/

    $tab = preg_split("/[,]/", $_POST["languages"]);
    foreach ($tab as $el) {
        $req2 = $table->prepare("INSERT INTO languagebook(language,bookId) VALUES(?,?)");
        $req2->execute(array(strtoupper($el), $bookID));
    }

    /*execution de l'insertion dans table lieuDisponible*/

    $tab2 = preg_split("/[,]/", $_POST["available"]);
    foreach ($tab2 as $el) {
        $req2 = $table->prepare("INSERT INTO lieuDisponible(lieu,bookId) VALUES(?,?)");
        $req2->execute(array(strtoupper($el), $bookID));
    }
}