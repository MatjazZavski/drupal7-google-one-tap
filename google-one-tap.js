/**
 * @file
 * Google One Tap behaviors.
 */

(function ($, Drupal) {

  /**
   * Behavior description.
   */
  Drupal.behaviors.googleOneTap = {
    attach: function (context, settings) {
      window.onGoogleYoloLoad = (googleyolo) => {
        if ($.cookie('user_logged_out') !== null) {
          $.cookie('user_logged_out', null, {path:'/'});
          return;
        }
        else {
          // The 'googleyolo' object is ready for use.
          googleyolo
          .hint({
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
          (error) => { console.log(error.type); }
        );
        };
      }
    }
  };

} (jQuery, Drupal));
