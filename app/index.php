<?php
    
    #page
    $currentPage = "home";
    
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

    <!-- SVG icon sprites -->
    <div id="svg-icons" data-include="icons"></div>
    <!-- SVG icon sprites -->

    <!-- HEADER -->
    <header id="home" class="js-header panel panel--cover" title="<?=$GLOBALS["home_title"]?>">

        <div class="cover panel__detail">
            
            <!-- logo -->
            <h2 title="<?=$GLOBALS["title"]?> - <?=$GLOBALS["title_description"]?>" class="site-heading">
                <div class="site-logo">
                    <div class="site-logo__img-set">
                        <img class="hidden" src="/img/logo-default.svg" alt="">
                        <img class="site-logo-img" src="/img/logo.svg" width="0" height="0" alt="">
                        <img class="site-logo-img site-logo-img--landscape" src="/img/logo-landscape.svg" width="0" height="0" alt="">
                    </div>
                </div>
                <span class="hidden"><?=$GLOBALS["title"]?> - <?=$GLOBALS["title_description"]?></span>
            </h2>
            <!-- logo -->

            <!-- jump to content -->
            <p class="hidden">
            <a href="#about" class="js-hidden"><?=$GLOBALS["jumpContent"]?></a>
            </p>
            <!-- jump to content -->

            <article class="cover__content panel-content cover-disposable">
                
                <p>
                <?=$GLOBALS["phrase"]."\n"?>
                </p>

            </article>


            <!-- main menu -->
            <nav class="js-nav-main-menu nav-main-menu">
                
                <h5 class="nav-main-menu__heading"><?=$GLOBALS["mMenu_title"]?>:</h5>
                
                <ul class="nav-main-menu__list main-menu">
                    <li class="main-menu__item main-menu__item--home">
                        <a href="#home" title="<?=$GLOBALS["mMenu_item_home"]?>" class="main-menu__item-link">
                            <strong class="main-menu__item-text"><?=$GLOBALS["mMenu_item_home"]?></strong>
                        </a>
                    </li>
                    <li class="main-menu__item">
                        <a href="#about" title="<?=$GLOBALS["mMenu_item_about"]?>" class="main-menu__item-link">
                            <svg class="main-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-about" />
                            </svg><strong class="main-menu__item-text"><?=$GLOBALS["mMenu_item_about"]?></strong>
                        </a>
                    </li>
                    <li class="main-menu__item">
                        <a href="#skills" title="<?=$GLOBALS["mMenu_item_skills"]?>" class="main-menu__item-link">
                            <svg class="main-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-skills" />
                            </svg><strong class="main-menu__item-text"><?=$GLOBALS["mMenu_item_skills"]?></strong>
                        </a>
                    </li>
                    <li class="main-menu__item">
                        <a href="#roles" title="<?=$GLOBALS["mMenu_item_roles"]?>" class="main-menu__item-link">
                            <svg class="main-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-roles" />
                            </svg><strong class="main-menu__item-text"><?=$GLOBALS["mMenu_item_roles"]?></strong>
                        </a>
                    </li>
                    <li class="main-menu__item">
                        <a href="#work" title="<?=$GLOBALS["mMenu_item_work"]?>" class="main-menu__item-link">
                            <svg class="main-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-work" />
                            </svg><strong class="main-menu__item-text"><?=$GLOBALS["mMenu_item_work"]?></strong>
                        </a>
                    </li>
                    <li class="main-menu__item">
                        <a href="#contact" title="<?=$GLOBALS["mMenu_item_contact"]?>" class="main-menu__item-link">
                            <svg class="main-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-contact" />
                            </svg><strong class="main-menu__item-text"><?=$GLOBALS["mMenu_item_contact"]?></strong>
                        </a>
                    </li>
                </ul>
                
            </nav>
            <!-- main menu -->


            <!-- utilities menu -->
            <nav class="js-nav-util-menu nav-util-menu">
                
                <h5 class="nav-util-menu__heading"><?=$GLOBALS["uMenu_title"]?>:</h5>
                
                <ul class="nav-util-menu__list util-menu">
                    <li class="util-menu__item">
                        <a href="https://github.com/wolfitoXtreme" title="<?=$GLOBALS["uMenu_item_GitHub"]?>" target="_blank" class="util-menu__item-link">
                            <svg class="util-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-github" />
                            </svg><span class="util-menu__item-text"><?=$GLOBALS["uMenu_item_GitHub"]?></span>
                        </a>
                    </li>
                    <li class="util-menu__item">
                        <a href="https://es.linkedin.com/pub/cesar-candela/37/254/865/" title="<?=$GLOBALS["uMenu_item_LinkedIn"]?>" target="_blank" class="util-menu__item-link">
                            <svg class="util-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-linkedin" />
                            </svg><span class="util-menu__item-text"><?=$GLOBALS["uMenu_item_LinkedIn"]?></span>
                        </a>
                    </li>
                    <li class="util-menu__item">
                        <a href="http://codepen.io/wolfitoXtreme/" title="<?=$GLOBALS["uMenu_item_CodePen"]?>" target="_blank" class="util-menu__item-link">
                            <svg class="util-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-codepen" />
                            </svg><span class="util-menu__item-text"><?=$GLOBALS["uMenu_item_CodePen"]?></span>
                        </a>
                    </li>
                    <li class="util-menu__item">
                        <a href="http://stackoverflow.com/users/1364026/wolfitoxtreme/" title="<?=$GLOBALS["uMenu_item_StackOverflow"]?>" target="_blank" class="util-menu__item-link">
                            <svg class="util-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-stackoverflow" />
                            </svg><span class="util-menu__item-text"><?=$GLOBALS["uMenu_item_StackOverflow"]?></span>
                        </a>
                    </li>
                    <li class="util-menu__item">
                        <a href="https://www.behance.net/cssguy4hire/" title="<?=$GLOBALS["uMenu_item_Behance"]?>" target="_blank" class="util-menu__item-link">
                            <svg class="util-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-behance" />
                            </svg><span class="util-menu__item-text"><?=$GLOBALS["uMenu_item_Behance"]?></span>
                        </a>
                    </li>
                    <li class="util-menu__item">
                        <a href="/cv/cv-<?=$_SESSION["lang"]?>.pdf" title="<?=$GLOBALS["uMenu_item_resume"]?>" target="_blank" class="util-menu__item-link">
                            <svg class="util-menu__item-icon" width="0" height="0">
                                <use xlink:href="#icon-cv" />
                            </svg><span class="util-menu__item-text"><?=$GLOBALS["uMenu_item_resume"]?></span>
                        </a>
                    </li>
                </ul>
                
                <h5 class="nav-util-menu__heading"><?=$GLOBALS["lang_title"]?>:</h5>
                
                <ul class="nav-util-menu__list util-menu util-menu--lang">
                <li class="util-menu__item">
                <?
                    if($_SESSION["lang"] != "en") {
                ?>
                    <a href="/" title="<?=$GLOBALS["lang_en"]?>" class="util-menu__item-link util-menu__item-link--lang">
                        <svg class="util-menu__item-icon util-menu__item-icon--lang" width="0" height="0">
                            <use xlink:href="#icon-lang-en" />
                        </svg><span class="util-menu__item-text"><?=$GLOBALS["lang_en"]?></span>
                    </a>
                <?
                    }
                    if($_SESSION["lang"] != "es") {
                ?>
                    <a href="/es/" title="<?=$GLOBALS["lang_es"]?>" class="util-menu__item-link util-menu__item-link--lang">
                        <svg class="util-menu__item-icon util-menu__item-icon--lang" width="0" height="0">
                            <use xlink:href="#icon-lang-es" />
                        </svg><span class="util-menu__item-text"><?=$GLOBALS["lang_es"]?></span>
                    </a>
                <?
                    }
                ?>
                </li>
                </ul>
                
            </nav>
            <!-- utilities menu -->

        </div>

        <!-- section navigation -->
        <p class="nav-panel">
            <a href="#about" class="js-nav-panel-next nav-panel__link" title="<?=$GLOBALS["section_nav_next_text"]?>">
                <svg class="nav-panel__icon" width="0" height="0">
                    <use xlink:href="#icon-panel-arrow" />
                </svg><?=$GLOBALS["section_nav_next_text"]?>
            </a>
        </p>
        <!-- section navigation -->

        <hr>

    </header>
    <!-- HEADER -->

    <!-- CONTENT -->
    <main class="js-panels main panels">

        <!-- section (About) -->
        <section id="about" class="panel panel--about" title="<?=$GLOBALS["about_title"]?>">
            
            <div class="panel__detail">
            
                <h2 class="panel-heading"><?=$GLOBALS["about_title"]?></h2>
            
                <article class="panel-content">
                
                    <p>
                    <?=$GLOBALS["about_texts"][0]."\n"?>
                    </p>

                    <p class="about-disposable">
                    <?=$GLOBALS["about_texts"][1]."\n"?>
                    </p>

                    <p>
                    <?=$GLOBALS["about_texts"][2]."\n"?>
                    </p>

                </article>

            </div>

            <!-- section navigation -->
            <p class="nav-panel">
                <a href="#home" class="js-nav-panel-prev nav-panel__link nav-panel__link--prev" title="<?=$GLOBALS["section_nav_prev_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_prev_text"]?>
                </a>

                <a href="#skills" class="js-nav-panel-next nav-panel__link" title="<?=$GLOBALS["section_nav_next_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_next_text"]?>
                </a>
            </p>
            <!-- section navigation -->

            <hr>
            
        </section>
        <!-- section (About) -->

        <!-- section (skills) -->
        <section id="skills" class="panel panel--skills" title="<?=$GLOBALS["skills_title"]?>">
            
            <div class="skills panel__detail">
                <h2 class="panel-heading slider-heading"><?=$GLOBALS["skills_title"]?></h2>
                
                <article class="panel-content">
                    
                    <ul class="js-slider slider">
                    
                    <li class="slider__item">
                        
                        <div class="slider__item-content">
                            
                            <h4 class="panel-title"><?=$GLOBALS["skills_programming_title"]?>:</h4>
                            
                            <ul class="js-skills-rating skills-expertise">
                            <?
                                if(isset($GLOBALS["skills_programming_texts"])) {
                                    for($i = 0; $i < count($GLOBALS["skills_programming_texts"]); $i++) {
                                ?>
                                    <li class="skills-expertise__item skills-expertise__item--no-bullet" data-skill-degree="<?=$GLOBALS["skills_programming_texts"][$i][1]?>">
                                        <span class="skills-expertise__item-text"><?=$GLOBALS["skills_programming_texts"][$i][0]?></span>
                                    </li>
                                <?
                                    }
                                }
                            ?>
                            </ul>

                            <p class="skills-additional"><b class="skills-additional-bold"><?=$GLOBALS["skills_additional"]?></b>: <?=$GLOBALS["skills_programming_additional"]?></p>
                        
                        </div>
                    
                    </li>
                    
                    <li class="slider__item">
                        
                        <div class="slider__item-content">
                            
                            <h4 class="panel-title"><?=$GLOBALS["skills_digital_title"]?>:</h4>

                            <ul class="js-skills-rating skills-expertise">
                            <?
                                if(isset($GLOBALS["skills_digital_texts"])) {
                                    for($i = 0; $i < count($GLOBALS["skills_digital_texts"]); $i++) {
                                ?>
                                    <li class="skills-expertise__item skills-expertise__item--no-bullet" data-skill-degree="<?=$GLOBALS["skills_digital_texts"][$i][1]?>">
                                        <span class="skills-expertise__item-text"><?=$GLOBALS["skills_digital_texts"][$i][0]?></span>
                                    </li>
                                <?
                                    }
                                }
                            ?>
                            </ul>

                            <p class="skills-additional"><b class="skills-additional-bold"><?=$GLOBALS["skills_additional"]?></b>: <?=$GLOBALS["skills_digital_additional"]?></p>
                        
                        </div>

                    </li>
                    
                    <li class="slider__item">
                        
                        <div class="slider__item-content">
                            
                            <h4 class="panel-title"><?=$GLOBALS["skills_personal_title"]?>:</h4>
                                
                            <ul class="column-list skills-expertise">
                            <?
                                if(isset($GLOBALS["skills_personal_texts"])) {
                                    for($i = 0; $i < count($GLOBALS["skills_personal_texts"]); $i++) {
                                ?>
                                    <li class="skills-expertise__item"><?=$GLOBALS["skills_personal_texts"][$i]?></li>
                                <?
                                    }
                                }
                            ?>
                            </ul>
        
                        </div>
                    
                    </li>
                    
                    </ul>

                </article>
            </div>

            <!-- section navigation -->
            <p class="nav-panel">
                <a href="#about" class="js-nav-panel-prev nav-panel__link nav-panel__link--prev" title="<?=$GLOBALS["section_nav_prev_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_prev_text"]?>
                </a>
                <a href="#roles" class="js-nav-panel-next nav-panel__link" title="<?=$GLOBALS["section_nav_next_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_next_text"]?>
                </a>
            </p>
            <!-- section navigation -->

            <hr>
            
        </section>
        <!-- section (skills) -->


        <!-- section (Roles) -->
        <section id="roles" class="panel panel--roles" title="<?=$GLOBALS["roles_title"]?>">
            
            <div class="panel__detail">

                <h2 class="panel-heading"><?=$GLOBALS["roles_title"]?></h2>
                
                <article class="panel-content">
                    
                    <ul  class="column-list">
                    <?
                        if(isset($GLOBALS["roles_texts"])) {
                            for($i = 0; $i < count($GLOBALS["roles_texts"]); $i++) {
                        ?>
                            <li class="column-list__item"><?=$GLOBALS["roles_texts"][$i]?></li>
                        <?
                            }
                        }
                    ?>
                    </ul>

                </article>

            </div>

            <!-- section navigation -->
            <p class="nav-panel">
                <a href="#skills" class="js-nav-panel-prev nav-panel__link nav-panel__link--prev" title="<?=$GLOBALS["section_nav_prev_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_prev_text"]?>
                </a>
                <a href="#work" class="js-nav-panel-next nav-panel__link" title="<?=$GLOBALS["section_nav_next_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_next_text"]?>
                </a>
            </p>
            <!-- section navigation -->

            <hr>
            
        </section>
        <!-- section (Roles) -->


        <!-- section (Work) -->
        <section id="work" class="panel panel--work" title="<?=$GLOBALS["work_title"]?>">
            <div class="work panel__detail">

                <h2 class="panel-heading slider-heading"><?=$GLOBALS["work_title"]?></h2>
                
                <article class="panel-content">

                    <div class="slider-details work-disposable">
                        <p><?=$GLOBALS["work_texts"]?>:</p>
                    </div>
                    
                    <ul class="js-slider slider">
                    <? 
                        if(isset($GLOBALS["work_projects"])) {
                            // for($i = 0; $i < count($GLOBALS["work_projects"]); $i++) {
                            foreach ($GLOBALS["work_projects"] as $project => $value) {
                    ?>

                    <li class="slider__item">
                        
                        <div class="slider__item-content work-sample">
                            
                            <div class="work-sample__detail">
                                <h4 class="work-sample__detail-title"><?=$value['title']?></h4>
                                <h5 class="work-sample__detail-system"><?=$value['system']?></h5>
                                <p>
                                <?=$value['description']?>
                                </p>

                            </div>

                            <div class="work-sample__image">
                                <div class="sample-image">
                                    <div class="sample-image__set">
                                        <figure class="sample-image-large">
                                            <img class="sample-image-large__img" src="/img/sample-image-large--<?=$project?>.jpg" height="220" alt="">
                                            <img class="sample-image-large__device" src="/img/sample-device-large.svg" width="0" height="0" alt="">
                                        </figure>
                                        <figure class="sample-image-small">
                                            <img class="sample-image-small__img" src="/img/sample-image-small--<?=$project?>.jpg" height="220" alt="">
                                            <img class="sample-image-small__device" src="/img/sample-device-small.svg" width="0" height="0" alt="">
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    
                    </li>
                    
                    <?
                            }
                        }
                    ?>

                    
                    </ul>

                </article>
            </div>

            <!-- section navigation -->
            <p class="nav-panel">
                <a href="#roles" class="js-nav-panel-prev nav-panel__link nav-panel__link--prev" title="<?=$GLOBALS["section_nav_prev_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_prev_text"]?>
                </a>
                <a href="#contact" class="js-nav-panel-next nav-panel__link" title="<?=$GLOBALS["section_nav_next_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_next_text"]?>
                </a>
            </p>
            <!-- section navigation -->

            <hr>
            
        </section>
        <!-- section (Work) -->


        <!-- section (Contact) -->
        <section id="contact" class="js-contact-panel panel panel--contact" title="<?=$GLOBALS["contact_title"]?>">
            <div class="panel__detail">
            
                <h2 class="panel-heading"><?=$GLOBALS["contact_title"]?></h2>
                
                <article class="panel-content">
                       
                    <h4 class="panel-title"><?=$GLOBALS["contact_subtitle"]?></h4>

                    <p>
                    <?=$GLOBALS["contact_texts"]?>
                    </p>


                    <nav class="nav-contact-menu">
                    
                        <!-- get in touch -->
                        <ul class="nav-contact-menu__list get-in-touch">
                            <li class="get-in-touch__item">
                                <a href="#" class="js-open-contact-panel button button-icon">
                                    <?=$GLOBALS["contact_link"]?>
                                    <svg class="button-icon__icon" width="0" height="0">
                                        <use xlink:href="#icon-button-arrow" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <!-- get in touch -->


                        <!-- contact menu -->
                        <ul class="nav-contact-menu__list contact-menu">
                        <li class="contact-menu__item">
                            <a href="https://github.com/wolfitoXtreme" title="<?=$GLOBALS["uMenu_item_GitHub"]?>" class="contact-menu__item-link" target="_blank">
                                <svg class="contact-menu__item-icon" width="0" height="0">
                                    <use xlink:href="#icon-github-inv" />
                                </svg><?=$GLOBALS["uMenu_item_GitHub"]?>
                            </a>
                        </li>
                        <li class="contact-menu__item">
                            <a href="https://es.linkedin.com/pub/cesar-candela/37/254/865/" title="<?=$GLOBALS["uMenu_item_LinkedIn"]?>" class="contact-menu__item-link" target="_blank">
                                <svg class="contact-menu__item-icon" width="0" height="0">
                                    <use xlink:href="#icon-linkedin-inv" />
                                </svg><?=$GLOBALS["uMenu_item_LinkedIn"]?>
                            </a>
                        </li>
                        <li class="contact-menu__item">
                            <a href="http://codepen.io/wolfitoXtreme/" title="<?=$GLOBALS["uMenu_item_CodePen"]?>" class="contact-menu__item-link" target="_blank">
                                <svg class="contact-menu__item-icon" width="0" height="0">
                                    <use xlink:href="#icon-codepen-inv" />
                                </svg><?=$GLOBALS["uMenu_item_CodePen"]?>
                            </a>
                        </li>
                        <li class="contact-menu__item">
                            <a href="http://stackoverflow.com/users/1364026/wolfitoxtreme/" title="<?=$GLOBALS["uMenu_item_StackOverflow"]?>" class="contact-menu__item-link" target="_blank">
                                <svg class="contact-menu__item-icon" width="0" height="0">
                                    <use xlink:href="#icon-stackoverflow-inv" />
                                </svg><?=$GLOBALS["uMenu_item_StackOverflow"]?>
                            </a>
                        </li>
                        <li class="contact-menu__item">
                            <a href="https://www.behance.net/cssguy4hire/" title="<?=$GLOBALS["uMenu_item_Behance"]?>" class="contact-menu__item-link" target="_blank">
                                <svg class="contact-menu__item-icon" width="0" height="0">
                                    <use xlink:href="#icon-behance-inv" />
                                </svg><?=$GLOBALS["uMenu_item_Behance"]?>
                            </a>
                        </li>
                        <li class="contact-menu__item">
                            <a href="/cv/cv-<?=$_SESSION["lang"]?>.pdf" title="<?=$GLOBALS["uMenu_item_resume"]?>" class="contact-menu__item-link" target="_blank">
                                <svg class="contact-menu__item-icon" width="0" height="0">
                                    <use xlink:href="#icon-cv-inv" />
                                </svg><?=$GLOBALS["uMenu_item_resume"]?>
                            </a>
                        </li>
                        </ul>
                        <!-- contact menu -->

                    </nav>

                </article>

            </div>

            <!-- section navigation -->
            <p class="nav-panel">
                <a href="#work" class="js-nav-panel-prev nav-panel__link nav-panel__link--prev" title="<?=$GLOBALS["section_nav_prev_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_prev_text"]?>
                </a>
                <a href="#get-in-touch" class="js-hidden nav-panel__link" title="<?=$GLOBALS["section_nav_next_text"]?>">
                    <svg class="nav-panel__icon" width="0" height="0">
                        <use xlink:href="#icon-panel-arrow" />
                    </svg><?=$GLOBALS["section_nav_next_text"]?>
                </a>
            </p>
            <!-- section navigation -->

            <hr>
            
        </section>
        <!-- section (Contact) -->


        <!-- section (Get in touch) -->
        <section id="get-in-touch" class="js-form-panel panel panel--contact form-panel" title="<?=$GLOBALS["in_touch_title"]?>">
            
            <div class="panel__detail">
            
                <h2 class="panel-heading"><?=$GLOBALS["in_touch_title"]?></h2>
                
                <article class="panel-content">
            
                    <button class="form-panel-close-btn" title="close">
                        <svg class="form-panel-close-btn__icon" width="0" height="0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
                        </svg><?=$GLOBALS["in_touch_btn_close"]?>
                    </button>

                    <!-- contact form -->
                    <?
                        # form init vars
                        $target = $_SESSION["lang"] == "en" ? "/response/" : "/".$_SESSION["lang"]."/response/";

                        $token_id = md5( uniqid( "", true ) );

                        if (! array_key_exists('token', $_SESSION)) {
                            $_SESSION['token'] = md5(time() . 'salt value');
                        }

                    ?>


                    <form action="<?php echo htmlentities($target); ?>" method="post" class="js-contact-form form form-panel__form" novalidate>
                     
                        <fieldset>
                        
                            <legend><strong><?=$GLOBALS["in_touch_legend"]?></strong></legend>
                            <div class="form-description">
                                <p>
                                    <?=$GLOBALS["in_touch_quote"]?>
                                </p>
                            </div>
                            
                            <div class="form-row">
                                
                                <div class="form-column">
                                    <div class="form-field">
                                        <label for="name"><?=$GLOBALS["in_touch_field_name"]?>: <br></label>
                                        <input type="text" id="name" name="name" size="30" value="" placeholder="<?=$GLOBALS["in_touch_field_name_placeholder"]?>"  autocomplete="off" required class="wide" >
                                    </div>
                                    
                                    <div class="form-field">
                                        <label for="company"><?=$GLOBALS["in_touch_filed_company"]?>: <br></label>
                                        <input type="text" id="company" name="company" size="30" value="" placeholder="<?=$GLOBALS["in_touch_filed_company_placeholder"]?>" autocomplete="off" required class="wide" >
                                    </div>
                                    
                                    <div class="form-field">
                                        <label for="email"><?=$GLOBALS["in_touch_field_email"]?>: <br></label>
                                        <input type="email" id="email" name="email" size="30" value="" placeholder="<?=$GLOBALS["in_touch_field_email_placeholder"]?>:" autocomplete="off" required class="wide">
                                    </div>
                                    
                                    <div class="form-field">
                                        <label for="subject"><?=$GLOBALS["in_touch_field_subject"]?>: <br></label>
                                        <select id="subject" name="subject" required class="wide">
                                        <?
                                            #set options
                                            if(isset($GLOBALS["in_touch_field_subject_options"])) {
                                        ?>
                                                <option value="" selected="selected"><?=$GLOBALS["in_touch_field_subject_placeholder"]?></option>
                                        <?
                                                foreach ($GLOBALS["in_touch_field_subject_options"] as $key => $value) {
                                                    echo"<option value=\"".$key."\">".$value."</option>\n";
                                                }
                                            }
                                        ?>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-column">
                                    <div class="form-field comment">
                                        <label for="id_comments"><?=$GLOBALS["in_touch_field_comments"]?>: <br></label>
                                        <textarea id="id_comments" rows="8" cols="32" name="comments"  placeholder="enter your comments" class="wide form-column__textarea-tall" required></textarea>
                                    </div>
                                </div>

                            </div>

                            <div class="hidden">
                                <?=$token_id?><br>
                                <?=$_SESSION['token']?><br>
                                <label for="worthless"><?=$GLOBALS["in_touch_field_honeypot"]?><br></label>
                                <input type="text" id="worthless" name="worthless" size="30">
                                <input type="hidden" name="token" value="<?=$token_id?>">
                                <input type="hidden" name="instance" value="<?=$_SESSION['token']?>">
                            </div>

                        </fieldset>
                        
                        <div class="form-buttons">
                            <button type="reset" name="reset-btn" value="reset" class="button">
                                <?=$GLOBALS["in_touch_btn_reset"]?>
                            </button>
                            <button type="submit" name="submit" value="submit" class="button button-icon">
                                <?=$GLOBALS["in_touch_btn_send"]?>
                                <svg class="button-icon__icon" width="0" height="0">
                                    <use xlink:href="#icon-button-arrow" />
                                </svg>
                            </button>
                        </div>
                    
                    </form>
                    <!-- contact form -->

                </article>

            </div>

            <!-- section navigation -->
            <p class="js-hidden nav-panel">
                <a href="#contact" class="nav-panel__link nav-panel__link--prev" title="<?=$GLOBALS["section_nav_prev_text"]?>"><?=$GLOBALS["section_nav_prev_text"]?></a>
            </p>
            <!-- section navigation -->

            <hr>
            
        </section>
        <!-- section (get in touch) -->

    </main>
    <!-- CONTENT -->


<?
    require "includes/footer.inc.php";
?>
