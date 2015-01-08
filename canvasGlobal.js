/*jslint browser: true, sloppy: false, eqeq: false, vars: false, maxerr: 50, indent: 4, plusplus: true */
/*global $, jQuery, alert, console, tinyMCE */

// These tools were designed to facilitate rapid course development in the Canvas LMS
// Copyright (C) 2014  Kenneth Larsen - Center for Innovative Design and Instruction
// Utah State University

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// http://www.gnu.org/licenses/agpl-3.0.html

////////////////////////////////////////////////////
// KENNETHWARE CONFIG                             //
////////////////////////////////////////////////////

//E. Scull - Add conditional logic to see if we're on test or live Canvas instance. Set URLs accordingly.
var is_test_canvas = (window.location.href.lastIndexOf("https://iu.test.instructure.com", 0) === 0);
console.log("In testing Canvas instance: " + is_test_canvas);
var url_root = "";
if(is_test_canvas){
    //Development URL
    url_root = "https://www.indiana.edu/~oidddev/";
} else {
    //Production URL
    url_root = "https://www.indiana.edu/~oidd/";
}
// ----------------------------------------------

// Development version will be loaded in the following courses
var iframeID,
    // Path to where the canvasCustomTools folder is located
    klToolsPath = url_root + "iu-tools/2.0/", // E. Scull, modified to use our url
    // Path to the tools_variables file
    klToolsVariablesFile = klToolsPath + 'js/tools_variables.js',
    // Path to additional_customization file
    klToolsAdditionalCustomizationFile = klToolsPath + 'js/additional_customization.js',
    // To utilize the features that pull from the Canvas api you will need the hosted php files put their path here
    klApiToolsPath = klToolsPath + 'api/',
    // Path to institutional css file
    globalCSSFile = klToolsPath + 'canvasGlobal.css', // E. Scull, modified to use our url
    klFontAwesomePath = '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css',
    coursenum;

function getCourseNum() {
    'use strict';
    var matches, killspot;
    // Parse Course Number - It is stored in the variable "coursenum"
    coursenum = null;
    matches = location.pathname.match(/\/courses\/(.*)/);
    if (matches) {
        coursenum = matches[1];
        killspot = coursenum.indexOf("/", 0);
        if (killspot >= 0) {
            coursenum = coursenum.slice(0, killspot);
        }
    }
}
getCourseNum();


// Pull in custom variables
$.getScript(klToolsVariablesFile, function () {
    'use strict';
    console.log("tools_variables.js loaded");
});
// Additional Customization
$.getScript(klToolsAdditionalCustomizationFile, function () {
    'use strict';
    console.log("additional_customization.js loaded");
});
// Run code to initialize tools
$.getScript(klToolsPath + "js/master_controls.js", function () {
    'use strict';
    console.log("master_controls.js loaded");
});

////////////////////////////////////////////////////
// END KENNETHWARE CONFIG                         //
////////////////////////////////////////////////////



//E. Scull: If href="#", prevent click. This keeps page from jumping on popovers, etc.
(function () {
    setTimeout(function () {
        $( "a[href='#']" ).click( function(e) {
          e.preventDefault();
          //e.stopImmediatePropagation(); //this was added to keep a trigger's click from immediately closing popovers. Remove if causing other issues.
       } );
    }, 1000);
}());