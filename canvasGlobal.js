/*jslint browser: true, sloppy: false, eqeq: false, vars: false, maxerr: 50, indent: 4, plusplus: true */
/*global $, jQuery, alert, console */

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

///////////////////////////////////
// Kenneth's Custom Canvas Tools //
///////////////////////////////////
// Path to where the canvasCustomTools folder is located

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


var klToolsPath = url_root + "iu-tools/2.0/",
    globalCSSPath = url_root + "iu-tools/2.0/canvasGlobal.css";

    console.log('canvasGlobal.js loading');
    //Parse Course Number - It is stored in the variable "coursenum"//
var coursenum, matches, killspot;
coursenum = null;
matches = location.pathname.match(/\/courses\/(.*)/);
if (matches) {
    coursenum = matches[1];
    killspot = coursenum.indexOf("/", 0);
    if (killspot >= 0) {
        coursenum = coursenum.slice(0, killspot);
    }
}

(function () {
    'use strict';
    var timestamp =  +(new Date());
    // Identify if editing a wiki-page
    setTimeout(function () {
        if ($('.new_page').length > 0 || ($('#editor_tabs').length > 0 && $('.edit_link').length === 0)) {
            // Include Font-Awesome icons
            $("head").append($("<link/>", { rel: "stylesheet", href: "//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.css"}));
            // Load tools js
            $.getScript(klToolsPath + "js/tools_variables.js", function () {
                console.log("KennethWare tools_variables loaded");
            });
            $.getScript(klToolsPath + "js/tools_main.js", function () {
                console.log("KennethWare tools_main loaded");
            });
            // Spectrum color picker
            $.getScript(klToolsPath + "js/spectrum.js", function () {
                console.log("KennethWare spectrum loaded");
            });
            $("head").append($("<link/>", { rel: "stylesheet", href: klToolsPath + "css/spectrum.css?" + timestamp }));
        }
        // Live view for tools
        if ($('#template-wrapper').length > 0 || $('#kl_wrapper').length > 0 || $("#studentVerification").length > 0 || $("#course_syllabus").length > 0 || $("#usu-template-front").length > 0) {
            $.getScript(klToolsPath + "/js/tools_liveView.js", function () {
                console.log("KennethWare tools_liveView.js Loaded.");
            });
        }

    }, 1000);
    setTimeout(function () {
        // Front Page Custom banner image
        if ($("#kl_banner_image").length > 0) {
            $('head').prepend('<style>#kl_banner_image {background: url(/courses/' + coursenum + '/file_contents/course%20files/global/css/images/homePageBanner.jpg) no-repeat center center; }</style>');
        }
        if ($("#usu-home-img").length > 0) {
            $('head').prepend('<style>#usu-home-img {background: url(/courses/' + coursenum + '/file_contents/course%20files/global/css/images/homePageBanner.jpg) no-repeat center center; }</style>');
        }
    }, 1000);

    // add css for font-awesome if a course is using any of their icons
    // E. Scull: Changed selector here to use class*='fa'. 
    // Seemed to have trouble finding .fa in elements with multiple classes (i.e. <li class="fa fa-asterisk">)
    // if ($(".fa").length > 0) {
    if ($("[class*='fa']").length > 0) {
        $("head").append($("<link/>", { rel: "stylesheet", href: "//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.css?" + timestamp }));
    }

    // The following provides the tooltip instructions for updating grade scheme
    function getURLParameter(name) {
        return decodeURI(
            (new RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [null])[1]
        );
    }
    // Step by step instructions for creating grading scheme
    (function () {
        var task = getURLParameter("task");
        if (task === "setGradeScheme") {
            console.log('Show how to set grade scheme');
            setTimeout(function () {
                $(".edit_course_link").get(0).scrollIntoView();
                $("#course_details_tabs").tabs("option", "active", 0);
                $(".edit_course_link").attr({"data-tooltip": "top", "title": "Click Here"}).trigger('mouseenter').click(function () {
                    setTimeout(function () {
                        $(".grading_standard_checkbox").get(0).scrollIntoView();
                        $(".grading_standard_checkbox").attr({"data-tooltip": "top", "title": "Check this box"}).trigger('mouseenter').change(function () {
                            setTimeout(function () {
                                $(".edit_letter_grades_link").attr({"data-tooltip": "top", "title": "Click this link"}).trigger('mouseenter').click(function () {
                                    setTimeout(function () {
                                        $(".edit_grading_standard_link").attr({"data-tooltip": "top", "title": "Click this link if you want to make changes."}).trigger('mouseenter');
                                        $(".display_grading_standard .done_button").attr({"data-tooltip": "top", "title": "When you are finished, click here."}).trigger('mouseenter').click(function () {
                                            $(".edit_letter_grades_link").trigger("mouseout");
                                            $(".edit_grading_standard_link").trigger("mouseout");
                                            setTimeout(function () {
                                                $(".coursesettings .form-actions .btn-primary").get(0).scrollIntoView();
                                                $(".coursesettings .form-actions .btn-primary").attr({"data-tooltip": "top", "title": "<strong>Next Steps:</strong><ol style='text-align:left;'><li>Click this button to save changes.</li><li>Wait for the page to save.</li><li>Close this tab.</li></ol>"}).trigger('mouseenter');
                                            }, 600);
                                        });
                                    }, 600);
                                });
                            }, 600);
                        });
                    }, 600);
                });
            }, 1000);
        }
    }());


    //E. Scull: If href="#", prevent click. This keeps page from jumping.
    setTimeout(function () {
        $( "a[href='#']" ).click( function(e) {
          e.preventDefault();
          //e.stopImmediatePropagation(); //this was added to keep a trigger's click from immediately closing popovers. Remove if causing other issues.
       } );
    }, 1000);

   
}());