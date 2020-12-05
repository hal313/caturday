/* global $ */

(function() {
  'use strict';

  // Invoked when jQuery is ready
  $(document).ready(function onReady() {

    /**
     * Populates an image.
     */
    var populateImage = function populateImage() {
        // The cache bust tag
        var cacheBust = new Date().getTime();

        // Remove the existing elements
        $('#main-image-placeholder').empty();

        // Add more elements
        $('#main-image-placeholder').append(
          '<img id="main-image" src="http://thecatapi.com/api/images/get?format=src&type=gif&cachebust=' +
          cacheBust +
          '">'
        );
      };

    // The "next" button handler
    $('#button-next').click(populateImage);

    // Populate the image (initial display)
    populateImage();
  });
})();
