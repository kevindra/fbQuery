<?

/*
  include_once  'fbconf.php';

  $loginUrl = $facebook->getLoginUrl( array(
    'next'=>"http://apps.facebook.com/{$appname}/", 
    'req_perms' => 'read_stream,publish_stream,email'
  ));

  //d($fbme);
  if (!$fbme || !isset($fbme) ) {
    print("<html><head>");
    print("<script type=\"text/javascript\">function redirect(){ top.location.href = \"");
    print($loginUrl);
    print("\"; }</script></head>");
    print("<body onload=\"redirect();\">Please wait...</body></html>"); 

    exit(); 
  }
*/

  $db = Database::GetInstance('main');

  /**
    * @func fconnect
    * @desc invoked when player clicks on FB_CONNECT button
    */
  function fconnect()
  {
    global $db;
    global $fbme;

    if( isset($_SESSION['account_id']) ) return true;

    if( $fbme ) {
      $array = $fbme;
      echo $fb_uid = $array['id'];
      echo $fb_name = $array['name'];
      echo $fb_first_name = $array['first_name'];
      echo $fb_last_name = $array['last_name'];
      echo $fb_gender = $array['gender'];
      echo $fb_birthday = $array['birthday'];
      echo $fb_email = $array['email'];

      // facebook email bug fix.
      if( isset($fb_email) || $fb_email != '' ) $verified = 1;
      else return; // for blank email 

/*      $fp = fopen('debug.txt', 'w');
      
      fwrite($fp, $fb_uid."\n");
      fwrite($fp, $fb_name."\n");
      fwrite($fp, $fb_first_name."\n");
      fwrite($fp, $fb_last_name."\n");
      fwrite($fp, $fb_gender."\n");
      fwrite($fp, $fb_birthday."\n");
      fwrite($fp, $fb_email."\n");
*/

      $qry1 = "SELECT account_id from temp.facebook_map WHERE fb_uid = {$fb_uid}";
      $rs1  = $db->query($qry1);
      $row1 = $db->fetch_row($rs1);
      $account_id = $row1[0];
    
      // if player exists in facebook map
      if( isset($account_id) )  {
        $qry2   = "SELECT alias,passwd from player.account WHERE account_id = {$account_id}";
        $rs2    = $db->query($qry2);
        $row2   = $db->fetch_row($rs2);
        $alias  = $row2[0];
        $passwd = $row2[1];
        
        $_SESSION['fuid']       = $fb_uid;
        $_SESSION['login']      = $alias;
        $_SESSION['account_id'] = $account_id;
        $_SESSION['passwd']     = $passwd;
        CozySession::set_user_session($account_id, session_id());

        $qry11 = 'UPDATE player.acct_status SET last_login = NOW() WHERE account_id = ' . $account_id;
        $db->query($qry11);
      } 
      else  {
        // if player is not in facebook map
        // check if he is registered with our site or not using his email
        $qry3 = "SELECT account_id, alias, passwd from player.account WHERE email = '{$fb_email}'";
        $rs3  = $db->query($qry3);
        $row3 = $db->fetch_row($rs3); 
        $account_id = $row3[0];
        if( isset($account_id) ) {
          //if his email exists in our db
          $alias  = $row3[1];
          $passwd = $row3[2];
          
          // insert entry into facebook_users ans facebook_map
          $qry4 = "INSERT INTO temp.facebook_users 
                      (fb_uid, passwd, first_name, last_name, fdob, gender, femail) 
                      VALUES 
                      ($fb_uid, '{$passwd}', '{$fb_first_name}', '{$fb_last_name}', '{$fb_birthday}', '{$fb_gender}', '{$fb_email}' )";
          $rs4  = $db->query($qry4);

          $qry5 = "INSERT INTO temp.facebook_map VALUES ($fb_uid, $account_id)";
          $rs5  = $db->query($qry5);
          // Set the login session

          $_SESSION['fuid']       = $fb_uid;
          $_SESSION['login']      = $alias;
          $_SESSION['account_id'] = $account_id;
          $_SESSION['passwd']     = $passwd;
          CozySession::set_user_session($account_id, session_id());

          $qry11 = 'UPDATE player.acct_status SET last_login = NOW() WHERE account_id = ' . $account_id;
          $db->query($qry11);
        }
        else  {

          $email  = $fb_email;
          $passwd = createRandomPassword();
          $alias  = createAlias($fb_first_name);
          $gender = $fb_gender;
          $spasswd  = md5($passwd);
        
          if( !$fb_birthday || $fb_birthday == '' ) {
            $dob  = '0000-00-00';
          }
          else  {
            $fbdob  = explode('/', $fb_birthday);
            $dob = $fb_birthday[2].'-'.$fb_birthday[0].'-'.$fb_birthday[1];
          }

          global $_SITE_ID;
          // insert user in player.account
          $qry6  = "INSERT INTO player.account (email, passwd, alias, verified, country, dateofbirth, sex, system_id) values ('{$email}', '{$spasswd}', '{$alias}', {$verified}, 'IN', '{$dob}', '{$gender[0]}',{$_SITE_ID})";
          $rs   = $db->query($qry6);
        
          // fetch the account_id
          $qry7  = "SELECT account_id FROM player.account where alias =  '{$alias}';";
          $rs7   = $db->query($qry7);
          $row7  = $db->fetch_row($rs7);

          $account_id = $row7[0];

          if( !$account_id )  {
            //something went wrong.... unable to create user.
          } else  {
            $acct_status = 'player.acct_status';      
            $qry8 =  "INSERT INTO $acct_status (account_id, status, last_login, chat,
              lang, gender, acquired, created, currency, subscribed)
             VALUES($account_id, 1, NOW(), 1, 'en', '$gender', 0, NOW(),'INR', 1)";

            $db->query($qry8);
  
            $qry9  = "INSERT INTO temp.facebook_map values({$fb_uid}, {$account_id})";
            $rs9   = $db->query($qry9);

            // insert entry into facebook_users ans facebook_map
            $qry10 = "INSERT INTO temp.facebook_users 
                      (fb_uid, passwd, first_name, last_name, fdob, gender, femail) 
                      VALUES 
                      ($fb_uid, '{$passwd}', '{$fb_first_name}', '{$fb_last_name}', '{$fb_birthday}', '{$fb_gender}', '{$fb_email}' )";
            $db->query($qry10);
            
            $_SESSION['fuid']       = $fb_uid;
            $_SESSION['account_id'] = $account_id;
            $_SESSION['login']      = $alias;
            $_SESSION['passwd']     = $passwd;
        
            CozySession :: set_user_session($account_id, session_id());  

            $qry11 = 'UPDATE player.acct_status SET last_login = NOW() WHERE account_id = ' . $account_id;
            $db->query($qry11);
            
            $db->query("UPDATE player.acct_status SET compbalance = (compbalance+100) WHERE account_id = $account_id");
        }
      }
    }
  }
}

function  createRandomPassword() {
  $chars = "abcdefghijkmnopqrstuvwxyz023456789";
  srand((double)microtime()*1000000);
  $i = 0;
  $pass = '' ;
  while ($i <= 7) {
    $num = rand() % 33;
    $tmp = substr($chars, $num, 1);
    $pass = $pass . $tmp;
    $i++;
  }
  return $pass;
}

function createAlias( $first_name ) {
  global $db;
  $alias  = '';
  // Register the player.
  $user_exists = true;
  while( $user_exists )
  {
    $rand = rand(0, 100000);
    $first_name = strtolower($first_name);
    $alias  = $first_name.$rand;
    $alias  = str_replace(" ", "", $alias);

    $qry  = "SELECT account_id FROM player.account where alias = '{$alias}'";
    $rs   = $db->query($qry);
    if( $db->num_rows($rs) > 0 )
      continue;
    else
      break;
  }
  return $alias;
}

fconnect();


/**
  * if user logs out the current FB account, and logs in using another FB account in same browser
  * then destroy the current classicrummy session
  * and set session of the current fb account.
  */
if( $fbme['id'] != $_SESSION['fuid'] ) {
  foreach( $_SESSION as $key => $val ) {
    unset ( $_SESSION[$key] );
  }
  fconnect();
}

?>
