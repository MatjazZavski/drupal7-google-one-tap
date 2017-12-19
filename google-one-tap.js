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
        if (settings['logged_out'] !== undefined) {
          googleyolo.disableAutoSignIn();
        }
        else {
          // The 'googleyolo' object is ready for use.
          googleyolo
          .retrieve({
            supportedAuthMethods: [
              "https://accounts.google.com",
              "googleyolo://id-and-password"
            ],
            supportedIdTokenProviders: [
              {
                uri: "https://accounts.google.com",
                clientId: settings['client_id']
              }
            ]
          })
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
          (error) => {
              console.log(error.type);
          });
        };
      }
    }
  };
} (jQuery, Drupal));
