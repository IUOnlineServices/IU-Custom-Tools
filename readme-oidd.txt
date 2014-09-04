E. Scull - Modifications and IU Overrides to the USU Custom Tools
 

Edits to the files to adapt them for use at IU are primarily found in:
  config.php
  canvasGlobal.css
  canvasGlobal.js

Modified the config.php and canvasGlobal.js to allow for conditional checks for dev/prod environments.

Additional edits to apply minor fixes and corrections are noted by comments in the code
beginning with "E. Scull: ". Searching for "Scull" will find these edits in various files.







*** Template Wizard installation notes ***
Search for "Scull" in the code to find comments where I've made changes/additions.
===============================================

Note: SQL script for required table has changed on GitHub since Canvas docs were written. 
Now token.sql, not users.sql. Table structure is different.

=============================================== 

Initially hit error in WizardAPI.php. It is require_once() in config.php, before the session is started. 
However, it assumes that the SESSION["userID"] is present, but BLTI does not get intantiated until later. 

Controller.php  —> requires config.php —> requires WizardAPI.php

WizardAPI: Line 12-13:   
//retrieve user token from database
$encrypted_token = DB::query("SELECT encrypted_token FROM tokens WHERE canvas_user_id = " . $_SESSION['userID'] );

This resulted in:

QUERY: SELECT encrypted_token FROM tokens WHERE canvas_user_id =
ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '' at line 1

**** SOLUTION: Comment out config.php line 29:
//require_once __DIR__.'/wizard/resources/wizardAPI.php';

===============================================

Several "header already sent" errors regarding header() redirects. 
See comments in controller.php for spots where I commented out some output to get by those errors.

===============================================

Session save location issue:

According to Webmaster, need to set session.save_path to local account root, rather than default (/tmp). 
Tried globally in php.ini, but didn't seem to take. Webmaster suggested adding line to wwws/.htaccess:

SetEnv PHP_INI_SCAN_DIR /ip/oidd/

And add php.ini at oidd account root with: 
session.save_path = "/ip/oidd/sessions"



===============================================

Canvas Dev Key requested and applied in config.php. Seems to only work on production instance of Canvas, not on test. 
On test, programming flow led to oauth2response.php which led to blank screen, no output, no error, no success.

TODO: Check after test instance is re-cloned from prod to see if key starts working on test.

On production, works.

TODO: See if we can update the name of the key message on Canvas token request screen displayed to user. Currently "OIDD Dev Key". 
This was set when key was requested from Instructure...didn't know what the "Key Name" referred to.

===============================================

wizard_image_crop.php:

Line 117-118: Heigh and Width variables are accidentally reversed. Switched to appropriate array indexes:
WAS:
$imageHeight = $size[0];
$imageWidth = $size[1];

NOW:
$imageHeight = $size[1];
$imageWidth = $size[0];

Line 119: Added output of image dimensions in the case that the uploaded image is too small. For usability and debugging.


===============================================

