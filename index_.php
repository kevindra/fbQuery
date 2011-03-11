<?
  include_once 'fbconf.php';
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
    <div id="doc">
      <div class="hd">
          <div id="user-info">
            <div class="info">
              <a class="name" href="/user/{{ logged_in_user.user_id }}">
              </a>
              <a class="logout" onclick="FB.logout()">Logout</a>
            </div>
          </div>
        <a class="logo" href="javascript:void(0);" onclick="CozyFB.publishStory('Hello')">Publish Story</a>
        <a class="logo" href="javascript:void(0);" onclick="CozyFB.publishFeed()">Publish Feed</a>
        <a class="logo" href="javascript:void(0);" onclick="CozyFB.share()">Share</a>
        <a class="logo" href="javascript:void(0);" onclick="CozyFB.invite()">Invite</a>
      </div>

      <div class="message"></div>

      <div class="bd">
      </div>
    </div>

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

