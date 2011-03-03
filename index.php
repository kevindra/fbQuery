<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml">

  <head>
    <meta charset="utf-8">
    <title>
    </title>
    <meta name="description" content="Cozy Test FB">
    <script src='js/fbQuery.js'></script>
    <script type='text/javascript'> 
      function onload() {
        var options = {
          appId: "158476644202716", postLogin: alert
        };
        fb.init(options);
      }

      function cHandler() {
        fb.user.getUserInfoByUid('kevindra.singh');
      }
    </script>
  </head>

  <body onload='onload()'>
    <script type='text/javascript'>
      window.fbAsyncInit =  function() {
        // Call FB Async Init
        fb.fbAsyncInit();
      }
    </script>
    adasdasd
    <input type='button' onClick="cHandler()" value='Get Username' />
  </body>

</html>
