1. Install gauth module and library google-api-php-client
 
    Download the latest release of google php client library from
      https://github.com/google/google-api-php-client/releases and
      extract it in libraries folder of the site, mostly located at
      sites/all/libraries, the path is 
     'sites/all/libraries/google-api-php-client/src..'
2. Create API key and OAuth client https://console.developers.google.com
    
    For more information go to gauth module and check README.txt section GOOGLE CONFIGURATION

3. Go to https://console.developers.google.com/apis/library?project=your_project and enable Admin SDK
4. Create new gauth account ?q=admin/config/services/gauth_account/add
5. Enable Google Directory and Google OAuth2 service in gauth admin configuration.
6. Go to ?q=admin/config/services/google_one_tap and choose gauth user.
7. If you go to the login, register or front page and if you are not logged in there should be visible google login popup.
