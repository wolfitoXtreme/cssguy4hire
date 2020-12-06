    <!-- FOOTER -->
    <footer class="js-footer footer">
        
        <!-- jump to content -->
        <p class="hidden">
        <a href="#" class="js-hidden"><?=$GLOBALS["jumpTop"]?></a>
        </p>
        <!-- jump to content -->

        <div class="footer-signature">
            <h6 class="footer-signature__heading">
                <div class="footer-signature__heading-logo">
                    <img class="hidden" src="/img/logo-default.svg" width="120" alt="">
                    <img class="footer-logo-img" src="/img/logo-footer.svg" width="0" height="0" alt="">
                </div>
                <span class="hidden"><?=$GLOBALS["title"]?></span>
            </h6>
        </div>
                
        <address>
        <?=$GLOBALS["footer_contact"]?>
        </address>

    </footer>
    <!-- FOOTER -->


    <div class="js-not-displayable not-displayable">
        <svg class="not-displayable__icon" width="0" height="0">
            <use xlink:href="#icon-resize-up" />
        </svg>
        <p class="not-displayable__text">
            <?=$GLOBALS["text_limit_screen"]?>
        </p>
    </div>
    
</body>
</html>