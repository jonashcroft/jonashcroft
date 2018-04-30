<?php
/*--------------------------------------------------
    Theme Supports
--------------------------------------------------*/

function ja_theme_support(){

	// Dynamic Title tag
	add_theme_support( 'title-tag' );

	// Register menus
	register_nav_menus( [
		'main-menu'    => __( 'Main Menu' ),
    ] );

	// HTML5 on WP elements
	add_theme_support( 'html5', [ 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'title-tag' ] );

	// Add support for Post Thumbnails
	add_theme_support( 'post-thumbnails' );

	add_image_size( 'post-header', 992, 99999, false ); // (scaled)
	add_image_size( 'aboutgallery', 250, 99999, false ); // (scaled)
	add_image_size( 'newsfeed', 480, 480, false ); // (scaled)

	// Remove WP emoji
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); // remove emoji support
    remove_action( 'wp_print_styles', 'print_emoji_styles' );   // remove emoji support


}
add_action( 'after_setup_theme', 'ja_theme_support' );

/*-------------------------------------
  Register ACF 'Options' Page(s)
-------------------------------------*/
if ( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}

/*-------------------------------------
	Speed Up ACF in /wp-admin
	- https://www.advancedcustomfields.com/resources/acf-settings/
-------------------------------------*/
add_filter('acf/settings/remove_wp_meta_box', '__return_true');
