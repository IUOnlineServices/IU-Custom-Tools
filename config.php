<?php
	// Display any php errors (for development purposes)
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
	
	/***************************/
	/* TEMPLATE WIZARD CONFIG  */
	/***************************/

	//E. Scull - Added conditional support for production/development values
	$dev_folder = "oidddev";
	$server_path = $_SERVER['SCRIPT_FILENAME'];
	$is_dev_server = (strpos($server_path, $dev_folder)===FALSE)?FALSE:TRUE;


	// The URL for where the "wizard" folder is located
	if($is_dev_server){
		//Development URL
		$_SESSION['template_wizard_url'] = 'https://www.indiana.edu/~oidddev/iu-tools/2.0/wizard';
	} else {
		//Production URL
		$_SESSION['template_wizard_url'] = 'https://www.indiana.edu/~oidd/iu-tools/2.0/wizard';
	}

	require_once __DIR__.'/wizard/resources/blti.php';
	require_once __DIR__.'/wizard/resources/cryptastic.php';
	require_once __DIR__.'/wizard/resources/meekrodb2.2.class.php';

	// Database connection information for Template Wizard
	// E. Scull: Added separate port property rather than use mysql.iu.edu:3891, 
	//           Added conditional for dev/prod database accounts 
	DB::$host ='mysql.iu.edu';
	DB::$port = ($is_dev_server)?'3891':'3844';
	DB::$user = 'root';
	DB::$password = ($is_dev_server)?'tva18fh':'fqq84gy';
	DB::$dbName = 'templatewizard';

	// Strings to help encrypt/decrypt user OAuth tokens
	$pass = 'oidd';
	$salt = 'gUdlWjLcevbt1g0xHgevaH9Wf1gTsBlVsAfhVDSo';

	//E. Scull: Commented out the wizardAPI.php requirement here; it was leading to errors since BLTI (and accompanying session vars) have not been created yet.
	// Include API Calls
	//require_once __DIR__.'/wizard/resources/wizardAPI.php';

	// Your Canvas OAuth2 Developer information. Used for getting OAuth tokens from users
	$client_id = '10000000000432';
	$clientSecret = 'vu4FrUohnISATYIE9laOueuVhCUZBHAgGwEvmY5sPWOIlOCFiemaCbS1T8fbs4Ba';
	
	// The Shared Secret you use when setting up the Template Wizard LTI tool
	$lti_secret = "NASEWYQccRf1kvGAFJttFCDYNsL1LwYdbU9DldU8";

	// Message to display if the OAuth token request fails
	$oauth_error_message = 'There is a problem securing an access token for your request. Please contact Online Instructional Design and Development at iuonlinesupport.iu.edu.';


	// TEMPLATE ARRAY (templateName, minWidth,minHeight, ratioX,ratioY) 
	// This array is for customizing banner images for template themes
	$templates = array (
		array('kl_fp_horizontal_nav_2', 1050,312, 215,64),
		array('kl_fp_panel_nav_2', 	1050,312,  215,64),
		array('kl_fp_squares_1x1', 320,320,  1,1),
		array('kl_fp_circles_1x1', 320,320,  1,1)
	);
	// RATIO ARRAY (ratioX, ratioY)
	$ratios = array (
		array (1,1),
		array(4,3),
		array(5,4),
		array(7,5),
		array(3,2),
		array(16,9)
	);
	
	/***************************/
	/* TOOLS API CONFIG  */
	/***************************/

	// These variables for the Content Tools to make API calls
	$canvasDomain = ($is_dev_server)?'https://iu.test.instructure.com':'https://iu.instructure.com';
	// This OAuth token needs to make GET API calls for any course in your institution
	// E. Scull: This admin-level token provided by Lynn Ward, set using Canvas3.
	$apiToken = "29~CGvSokRCqGbVZZw2lO18HJk0sWvhHSEp1MjbOLAUmKpAEypJJU4WdjE8VtD0B0dn";
?>