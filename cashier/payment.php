<?
  include_once '../fbconf.php';
  $uid = $facebook->getUser();
?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml">
  <head>
    <meta charset="utf-8">
    <title>
    </title>
    <meta name="description" content="Cozy Test FB">
  </head>
  <body>
    <iframe src="http://www.superrewards-offers.com/super/offers?h=lnjrmxkkmki.703818501662&uid=<?=$uid?>" frameborder="0" width="728" height="2400" scrolling="no"></iframe>


    <script type='text/javascript' src="/fbtestcozy/js/cozyfb.js"></script>
    <div id="fb-root"></div>
    <script>
      if( !window.CozyFB ) alert('not defined');

      window.fbAsyncInit = function() { 
        try {
          CozyFB.init();
        } catch (ex) { alert(ex); }
      };

      (function() {
        var e = document.createElement('script');
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e);
      }());
    </script>
  </body>
</html>
                                                                                                                                                                             73,1          Bot

