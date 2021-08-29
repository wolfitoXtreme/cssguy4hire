<?php

    #page
    $currentPage = "error-404";
    
    #styles 
    $_styles = ""
        ."<link rel=\"stylesheet\" type=\"text/css\" href=\"css/app.css\" media=\"screen\">\n";
    
    #scripts
    $_scripts = ""
        ."<script type=\"text/javascript\" src=\"js/app.js\"></script>\n";

    # files
    require "includes/session.inc.php";
    require "includes/conf.inc.php";
    require "includes/header.inc.php";


?>

<main class="error-page">

        <!-- section -->
        <section class="error-page__section">
            
            <h2><?=$GLOBALS[$currentPage."_title"]?></h2>

            <p>
            <?=$GLOBALS[$currentPage."_texts"]?>
            </p>
            
        </section>
        <!-- section -->

</main>

<?
require "includes/footer.inc.php";
?>


