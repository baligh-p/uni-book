<?php
function generateID($n)
{
    $commentId = "";
    for ($i = 0; $i < $n; $i++) {
        $rand = rand(0, 2);
        if ($rand == 1) {
            $commentId = $commentId . rand(0, 9);
        } else if ($rand == 2) {
            $commentId = $commentId . chr(rand(97, 122));
        } else {
            $commentId = $commentId . chr(rand(65, 90));
        }
    }
    return $commentId;
}