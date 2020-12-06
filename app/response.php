<?php

    $currentPage = "inTouch";


    #files
    require "includes/session.inc.php";
    require "includes/conf.inc.php";
    require "includes/header.inc.php";


    #check response status
    if ($_POST["worthless"] != "") {
        $responseMessage = $GLOBALS["in_touch_field_honeypot_hit"];

        echo "<h2>form invalid, honey pot!</h2>";
    }
    else if (
        $_POST["name"] == "" ||
        $_POST["company"] == "" ||
        $_POST["email"] == "" ||
        $_POST["subject"] == "" ||
        $_POST["comments"] == ""
    ) {
        echo "<h2>form invalid, missing fields</h2>";

        $responseMessage = $GLOBALS["in_touch_error_global"].".<br>".$GLOBALS["in_touch_error_goBack"];
    }

    else  {

        $token_id = stripslashes( $_POST['token'] );


        echo "<h2>form valid, composiong email</h2>";

        //Check for VALID email address
        $email = stripslashes($_POST["email"]);
        $validEmail = eregi('^([0-9a-z]+[-._+&])*[0-9a-z]+@([-0-9a-z]+[.])+[a-z]{2,6}$',$email);

        if(!$validEmail) {
            $responseMessage = $GLOBALS["in_touch_error_valid-email"].".<br>".$GLOBALS["in_touch_error_goBack"];
        }
        else {
            $responseMessage = $GLOBALS["in_touch_success"];

            //all good preparing to send me an e-mail
            $mailRecipient = $recipient;
            $subject = "Contact from {CSS}Guy4hire.com";

            $emailBody  = "
            <!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">
            <html>
            <head>
            </head>
            <body bgcolor=\"#ffffff\" text=\"#000000\">

            <div style=\"font: normal 12px/14px Arial, Helvetica, sans-serif; color: #4E4E4E;\">

            <p style=\"margin: 0px; padding-bottom: 5px;\">
            <strong>Contact details:</strong>
            </p>
            ----------------------------------------------<br /><br />
            ";

            $emailBody.="
            <ul style=\"margin: 0px; padding-bottom: 12px;\">
            <li style=\"padding-bottom: 2px;\"><strong>Name: </strong>".htmlspecialchars($_POST["name"], ENT_QUOTES, 'UTF-8')."</li>
            <li style=\"padding-bottom: 2px;\"><strong>Company: </strong>".htmlspecialchars($_POST["company"], ENT_QUOTES, 'UTF-8')."</li>
            <li style=\"padding-bottom: 2px;\"><strong>E-mail: </strong>".$_POST["email"]."</li>
            <li style=\"padding-bottom: 2px;\"><strong>Subject: </strong>";
            foreach ($GLOBALS["in_touch_field_subject_options"] as $key => $value) {
                if($_POST["subject"] == $key){
                    $emailBody.= htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
                }
            }
            $comments = htmlspecialchars($_POST["comments"], ENT_QUOTES, 'UTF-8');
            $emailBody.="</li>
            <li style=\"padding-bottom: 2px;\"><strong>Comments: </strong><br />".str_replace("\r\n", '<br />', $comments)."</li>
            </ul>

            <br />
            ----------------------------------------------<br /><br />

            </div>

            </body>
            </html>
            ";

            //echo $emailBody;

            //FROM
            $header  = 'MIME-Version: 1.0' . "\r\n";
            $header .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
            $header .= "From: ".$_POST["name"]." <".$_POST["email"].">\r\nReply-To:".$_POST["email"]."\r\nX-Mailer: PHP/".phpversion();


            unset($_POST);

            echo $_POST["email"];

            //send email
            mail($mailRecipient, $subject, $emailBody, $header);
        }
    }

?>

    <!-- CONTENT -->
    <main>
        <div class="js-response">
            <p>
            <?=$responseMessage."\n"?>
            </p>
        </div>
    </main>
    <!-- CONTENT -->

</div>

<?
    require "includes/footer.inc.php";
?>
