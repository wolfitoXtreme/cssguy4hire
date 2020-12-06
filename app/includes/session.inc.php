<?php
session_start();
//session_destroy();
if (!isset($_SESSION["userid"])) {
    $_SESSION["userid"] = session_id();
}
else {
    // echo "session exist<br />";
}

$_SERVER["HTTP_REFERER"] != "" ? $_SESSION["reference"] = $_SERVER["HTTP_REFERER"] : $_SESSION["reference"] = "No reference";

//language
if ($_GET["lang"]) {
    $_SESSION["lang"] = $_GET["lang"];
}

# base URL
$GLOBALS["base_url"] = "http://".$_SERVER['HTTP_HOST']."/";
# mail Address
$GLOBALS["mail_address"] = "cesar@cssguy4hire.com";

# Force Englis Language
$serverName = $_SERVER['SERVER_NAME'];
$path = $_SERVER['REQUEST_URI'];
$GLOBALS["fullUrlA"] = "http://www.".$serverName.$path;
$GLOBALS["fullUrlB"] = "http://".$serverName.$path;

if($GLOBALS["base_url"] == $GLOBALS["fullUrlA"] || $GLOBALS["base_url"] == $GLOBALS["fullUrlB"]){
    $_SESSION["lang"] = "en";
}

// if NO language defined force as well
if(!isset($_SESSION["lang"])) {
    $_SESSION["lang"] = "en";
}

// language texts includes
if ($_SESSION["lang"] == "en") {
    require_once("includes/lang.en.inc.php");
}

if ($_SESSION["lang"] == "es") {
    require_once("includes/lang.es.inc.php");
}

?>
