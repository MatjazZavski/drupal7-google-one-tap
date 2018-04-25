/**
 * @file
 * Google One Tap behaviors.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Behavior description.
   */
  Drupal.behaviors.googleOneTap = {
    attach: function (context, settings) {
      // The 'googleyolo' object is ready for use.
      window.onGoogleYoloLoad = (googleyolo) => {
        console.log('i ran');
        if ($.cookie('user_logged_out') !== null) {
          $.cookie('user_logged_out', null, {path:'/'});
          return;
        }
        else {
          googleyolo
          .retrieve(settings['google_one_tap'])
          .then(
            (credential) => {
            $.ajax({
            url: '?q=google-one-tap/login',
            type: 'POST',
            data: credential,
            dataType: 'json',
            success: function (xssFilteredValue) {
              window.location.reload();
            },
            error: function (xssFilteredValue) {
              alert(Drupal.t('One Tap Sign-In Failed'));
              console.log(xssFilteredValue);
            }
          });
        },
          (error) => { console.log(error.type); }
        );
        }

      }
    }
  };
} (jQuery, Drupal));
