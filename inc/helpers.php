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

/*------------------------------------
// Escape HTML in <code> or <pre><code> tags.
------------------------------------*/
function escapeHTML($arr) {
    if (version_compare(PHP_VERSION, '5.2.3') >= 0) {
        $output = htmlspecialchars($arr[2], ENT_NOQUOTES, get_bloginfo('charset'), false);
    }
    else {
        $specialChars = array(
            '&' => '&amp;',
            '<' => '&lt;',
            '>' => '&gt;'
        );
        // decode already converted data
        $data = htmlspecialchars_decode($arr[2]);
        // escapse all data inside <pre>
        $output = strtr($data, $specialChars);
    }
    if (! empty($output)) {
        return  $arr[1] . $output . $arr[3];
    }   else    {
        return  $arr[1] . $arr[2] . $arr[3];
    }
}
function filterCode($data) { // Uncomment if you want to escape anything within a <pre> tag
    //$modifiedData = preg_replace_callback('@(<pre.*>)(.*)(<\/pre>)@isU', 'escapeHTML', $data);
    $modifiedData = preg_replace_callback('@(<code.*>)(.*)(<\/code>)@isU', 'escapeHTML', $data);
    $modifiedData = preg_replace_callback('@(<tt.*>)(.*)(<\/tt>)@isU', 'escapeHTML', $modifiedData);
    return $modifiedData;
}
add_filter( 'content_save_pre', 'filterCode', 9 );
add_filter( 'excerpt_save_pre', 'filterCode', 9 );



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