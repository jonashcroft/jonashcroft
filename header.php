<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#E84D5B;">
<?php wp_head(); ?>

<link rel="apple-touch-icon" sizes="152x152" href="<?php echo home_url(); ?>/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="<?php echo home_url(); ?>/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="<?php echo home_url(); ?>/favicon-16x16.png">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-57916704-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-57916704-1');
</script>
</head>
<body id="<?php echo appendBodyName(); ?>">

<?php if ( !is_front_page() ) { ?>
<header id="main">
    <b><a href="<?php echo home_url(); ?>">Jon Ashcroft</a></b>
</header>

<nav id="main-menu">
    <?php
        wp_nav_menu( array(
            'theme_location' => 'main-menu',
            'container'=> false,
            'menu_class'=> 'main-nav',
            )
        );
    ?>
</nav>
<?php } ?>