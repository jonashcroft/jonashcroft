<?php

/*------------------------------------
Add Page/Post type to body
------------------------------------*/

function appendBodyName() {

	global $post;
	$bodyName = '';

	if ( is_front_page()  ) {
		$bodyName = 'home';
	}
	elseif ( is_single() ) {
		$bodyName = 'single-post';
	}
	elseif ( is_home() ) {
		$bodyName = 'writing';
	}
	elseif ( is_404() ) {
		$bodyName = 'four-oh-four';
	}
	elseif ( is_archive() ) {
		$bodyName = 'archive';
	}
	else {
		$bodyName = 'page-' . $post->post_name;
	}

	return $bodyName;
}

/*
** Prettier and better debugging
*/
function debug() {
	$trace = debug_backtrace();
	$rootPath = dirname(dirname(__FILE__));
	$file = str_replace($rootPath, '', $trace[0]['file']);
	$line = $trace[0]['line'];
	$var = $trace[0]['args'][0];
	$lineInfo = sprintf('<div><strong>%s</strong> (line <strong>%s</strong>)</div>', $file, $line);
	$debugInfo = sprintf('<pre id="phpdebug">%s</pre>', print_r($var, true));
	print_r($lineInfo.$debugInfo);
}