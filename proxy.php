<?php
/*
* Proxy.php is for local development to get around
* same-origin policy restrictions with regards to
* loading remote JSON and data.  In production,
* proxy.php should be removed from the server.
*/

$resource = 'http://scratch.mit.edu/' . $_GET['resource'];

// Strip the /get/ suffix for calculating the extension
// and then get the file extension to pass on to the browser.
// This is an unfortunate hack, but then so is the proxy.
$extension = pathinfo(substr($resource, 0, strlen($resource)-4),
					  PATHINFO_EXTENSION);

header('Access-Control-Allow-Origin: *');

$contents = @file_get_contents($resource);

switch($extension) {
    case 'json':header('Content-type: text/plain'); break;
    case 'png':	header('Content-type: image/png'); break;
    case 'jpg':	header('Content-type: image/jpeg'); break;
    case 'svg':
    	header('Content-type: image/svg+xml');
		// Extremely ugly hack to temporarily repair broken SVGs generated
		// by the Scratch editor for blank backgrounds.
		// TODO: Fix the Scratch editor
		$contents = str_replace('<svg width="480" height="360">',
			'<svg width="480" height="360" xmlns="http://www.w3.org/2000/svg" ' .
			'version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">',
			$contents
		);
    	break;
    case 'swf':
		// For testing
    	header('Content-type: application/x-shockwave-flash');
		header("Cache-Control: no-cache, must-revalidate");
		header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
    	break;
    default:	header('Content-type: text/plain'); break;
}

die($contents);
?>
