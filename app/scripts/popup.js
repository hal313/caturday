/* global $ */

(function() {
    'use strict';

    $(document).ready(function() {

        var populateImage = function() {
            // A function to populate a cat image
            var cacheBust = new Date().getTime();
            $('#main-image-placeholder').empty();
            $('#main-image-placeholder').append('<img id="main-image" src="http://thecatapi.com/api/images/get?format=src&type=gif&cachebust=' + cacheBust + '">');
        };

        // The "next" button handler
        $('#button-next').click(function() {
            populateImage();
        });

        // Populate the image
        populateImage();
    });

})();