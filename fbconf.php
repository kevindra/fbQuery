<?php
    define(COZYAPI_ROOT, '/home/www/cozyservices/'); 

    include_once  $_SERVER['DOCUMENT_ROOT']."/config.php";
    include_once  COZYAPI_ROOT.'classes/session.class.php';
    include_once  COZYAPI_ROOT.'classes/database.inc.php';


    #original for url https://www.classicrummy.com/
    $fbconfig['appid' ]  = "174908202527879";
    $fbconfig['secret']  = "431f52d376a79f340bcaf077340d30ed";
    $fbconfig['api']     = "a8eae68626e3ad767929e380608cb5e8";
    $fbconfig['appname'] = "classicrummyapp";

    #temporary for url: http://115.113.200.141:802/

    $fbconfig['appid' ]  = "158476644202716";
    $fbconfig['secret']  = "776f11a9001fe37a5045f129537bfd2c";
    $fbconfig['api']     = "85a059dbf4b3cd2d96c457071485f5fb";
    $fbconfig['appname'] = "fbtestcozy";


    $appname  = $fbconfig['appname'];

    try{
        include_once 'lib/facebook.php';
    }
    catch(Exception $o){
/*        echo '<pre>';
        print_r($o);
        echo '</pre>';
*/
    }
    // Create our Application instance.
    $facebook = new Facebook(array(
      'appId'  => $fbconfig['appid'],
      'secret' => $fbconfig['secret'],
      'cookie' => true,
    ));
 
    // We may or may not have this data based on a $_GET or $_COOKIE based session.
    // If we get a session here, it means we found a correctly signed session using
    // the Application Secret only Facebook and the Application know. We dont know
    // if it is still valid until we make an API call using the session. A session
    // can become invalid if it has already expired (should not be getting the
    // session back in this case) or if the user logged out of Facebook.
    $session = $facebook->getSession();

    if(!$session) {
      $url = $facebook->getLoginUrl(array(
        'canvas' => 1,
        'fbconnect' => 0,
        'next'=>"http://apps.facebook.com/{$appname}/", 
        'req_perms' => 'publish_stream,email'
      ));
       
      echo "<script type='text/javascript'>top.location.href = '$url';</script>";
    }


    $fbme = null;
    // Session based graph API call.
    if ($session) {
      try {
        //$uid = $facebook->getUser();
        $fbme = $facebook->api('/me');
      } catch (FacebookApiException $e) {
        //d($e);
      }
    }

    include_once 'models/login_handler.php';


    function d($d){
        echo '<pre>';
        print_r($d);
        echo '</pre>';
    }

?>
