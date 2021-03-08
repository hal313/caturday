/* global $ */

(function() {
  'use strict';

  // Invoked when jQuery is ready
  $(document).ready(function onReady() {

    /**
     * Populates an image.
     */
    var populateImage = function populateImage() {
        // The image URL (with a cachebust)
        var imageUrl = 'https://thecatapi.com/api/images/get?format=src&type=gif&cachebust=' + new Date().getTime();
        // NOTE: Use this for testing purposes; the dimensions can change in order to test images of different sizes
        // var imageUrl = 'https://via.placeholder.com/350x150';

        $('#main-image').attr('src', imageUrl);
      };

    // The "next" button handler
    $('#button-next').click(populateImage);

    // Populate the image (initial display)
    populateImage();
  });
})();
