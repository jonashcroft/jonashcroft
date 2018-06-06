<?php
/*--------------------------------------------------
	Enqueue CSS and JS files
--------------------------------------------------*/
function enqueueStyleScrips() {
	$time = time();

    /*-------------
	Stylesheets
	--------------*/
	wp_enqueue_style('main', get_template_directory_uri().'/dist/app.min.css', '', $time, false);

	wp_enqueue_style('fontAwesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
	wp_enqueue_style('GoogleFonts', 'https://fonts.googleapis.com/css?family=Nunito:700,900|Roboto:400,500');


	/*-------------
	Scripts
	--------------*/
	wp_enqueue_script('appjs', get_template_directory_uri().'/dist/app.min.js', array('jquery'), $time, true);



}
add_action( 'wp_enqueue_scripts', 'enqueueStyleScrips' );

/*--------------------------------------------------
jQuery

* Just to be clear, we're only loading this for WP plugins
--------------------------------------------------*/
function loadjQuery() {
    wp_deregister_script('jquery');
	wp_enqueue_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js', '', '', true );
	wp_enqueue_script('jquery');
}
if (!is_admin()) add_action('wp_enqueue_scripts', 'loadjQuery', 11);

/*--------------------------------------------------
Web Font Loader

Note - was going to use this, but my hosting provider
gives FOUT. (Moving to DigitalOcean ASAP)
--------------------------------------------------*/
function webFontLoader() { ?>
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script>
	WebFont.load({
		google: {
			families: ["Nunito:700,900", "Roboto:400,500"]
		}
	});
</script>
<?php }