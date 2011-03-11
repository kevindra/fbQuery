<?
  $SuperRewardsConf['appsecret'] = '0c8d018b01e3655540a28df500b73ad3';
 
  define(COZYAPI_ROOT, '/home/www/cozyservices/'); 

  include_once COZYAPI_ROOT.'globals/config.php';
  include_once CLASS_ROOT.'database.inc.php';
  include_once MODEL_ROOT.'player.model.php';
 
  $db = Database::GetInstance('main'); 

  $tid    = $_REQUEST['id'];  //  Unique transaction ID
  $new    = $_REQUEST['new']; //  points user earned
  $total  = $_REQUEST['total']; //  total chips accumulated by user
  $uid    = $_REQUEST['uid']; //  Facebook UID of the user
  $oid    = $_REQUEST['oid']; //  Super Rewards offer Identifier
  $sig    = $_REQUEST['sig']; //  MD5 code sent from Super Rewards After successful payment

  $checkSum = md5($tid.':'.$new.':'.$uid.':'.$SuperRewardsConf);  //For Security Purpose
  
  if( $sig != $checkSum ) {
    echo '0'; // Send Error, Request not authenticated successfully.
  }
  else {
    $qry  = "SELECT account_id FROM temp.facebook_map WHERE fb_uid  = {$uid}";
    $rs = $db->query($qry);
    $row  = $db->fetch_row($rs);

    if(!$row) {
      echo '0';
    }
    else  {
        $account_id = $row[0];
  
        //echo "Account ID: ".$account_id."<br>";
        
        if( $account_id )  {
          $qry = "INSERT INTO temp.super_rewards (uid, tid, new_chips, total_chips, oid, sig, datetime) 
                    VALUES ({$uid}, {$tid}, {$new}, {$total}, {$oid}, '{$sig}', NOW())";
          $rs   = $db->query($qry);
    
          $qry = "INSERT INTO serialize.serial_details (account_id, trans_type, amount_type, amount, note)
                    VALUES ({$account_id}, 45, 4, {$new}, 'Facebook Application Credit')";
          $rs   = $db->query($qry);
        }
      echo '1';
    }
  }
?>
