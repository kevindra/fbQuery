
if(!window.CozyFB) CozyFB = {
  /** config **/
  Config: {
    appId : '158476644202716',
    xfbml : true,
    canvasName : 'fbtestcozy'
  },

  /** facebook init **/
  init : function () {
    config = CozyFB.Config;

    FB.init({
      appId:  config.appId,
      xfbml:  config.xfbml,
      channelUrl:
        window.location.protocol + '//' + window.location.host + '/channel.html'
    });
    FB.Event.subscribe ('auth.sessionChange', CozyFB.Handlers.sessionChange);
    FB.Canvas.setAutoResize();

    
    if(window == top) CozyFB.Handlers.goHome(); //  if application opened directly then go to facebook app.
  },

  /** publish story **/
  publishStory  : function (title)  {
    FB.ui({
      method: 'stream.publish',
      attachment: {
        name: title,
        caption: "I'm running!",
        media: [{
          type: 'image',
          href: 'http://runwithfriends.appspot.com/',
          src: 'http://runwithfriends.appspot.com/splash.jpg'
        }]
      },
      action_links: [{
        text: 'Join the Run',
        href: 'http://runwithfriends.appspot.com/'
      }],
      user_message_prompt: 'Tell your friends about the run:'
    });    
  },

  /** publish feed **/
  publishFeed : function () {
    FB.ui(
      {
        method: 'feed',
        name: 'Facebook Dialogs',
        link: 'http://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://fbrell.com/f8.jpg',
        caption: 'Reference Documentation',
        description: 'Dialogs provide a simple, consistent interface for applications to interface with users.',
        message: 'Facebook Dialogs are easy!'
      },
      function(response) {
        if (response && response.post_id) {
          alert('Post was published.');
        } else {
          alert('Post was not published.');
        }
      }
    );
  },

  /** share **/
  share : function () {
    var shareParams = {
      method: 'stream.share',
      u: 'http://apps.facebook.com/'+ CozyFB.Config.canvasName
    };

    FB.ui( shareParams, function(response) {
      alert(response);
    } );
  },

  invite : function ()  {
    //var oldSize = FB.UIServer.Methods["fbml.dialog"].size;

    FB.UIServer.Methods["fbml.dialog"].size = {width:640, height:400};
    //var oldSize = FB.UIServer.Methods["fbml.dialog"].size;

/*    FB.api('/me', function(response) {
      alert(response.name);
    });
*/

    var fbml  = fb_getInviteFBML();
    //var fbml  = fbSendGiftFBML();

    FB.ui({
      method: 'fbml.dialog',
      display: 'popup',
      fbml: ( fbml )
    },
    function (response) {
      alert(response);
    }
    );

  }
};

if(!window.CozyFB.Handlers) CozyFB.Handlers = {
  sessionChange : function (response) {
    alert('session change');
    if( !response.session ) {
      CozyFB.Handlers.goHome();
    }
    /*if ((Config.userIdOnServer && !response.session) ||
        Config.userIdOnServer != response.session.uid) {
      goHome();
    } */   
  },
  goHome : function () {
    top.location = 'http://apps.facebook.com/' + CozyFB.Config.canvasName + '/';
  }
};

function fb_getInviteFBML() {
    var uid = FB.getSession().uid;

    var fbml = "";

    try {
    fbml = 
    '<fb:fbml>\n' +
        '<fb:request-form\n'+
                            //Redirect back to this page
                            ' action="'+ document.location +'"\n'+
                            ' method="POST"\n'+
                            ' invite="true"\n'+
                            ' type="Classic Rummy Invite"\n' +
                            ' content="I need your help to discover all the Weblings and save the Internet! WebWars: Weblings is a cool new game where we can collect fantastic creatures while surfing our favorite websites. Come find the missing Weblings with me!'+ 
                            //Callback the server with the appropriate Webwars Account URL
                            ' <fb:req-choice url=\'http://apps.facebook.com/fbtestcozy&reftype=Facebook label=\'Check out Classic Rummy\' />"\n'+
                      '>\n'+
                       ' <fb:multi-friend-selector\n'+
                            ' rows="2"\n'+
                            ' cols="4"\n'+
                            ' bypass="Cancel"\n'+
                            ' showborder="false"\n'+
                            ' actiontext="Use this form to invite your friends to connect with WebWars: Weblings."/>\n'+
                ' </fb:request-form>'+
        ' </fb:fbml>';
    } catch (ex) {  alert(ex); }
    return fbml;
}

/** not working now **/
function fbSendGiftFBML ()  {
  var fbml  = '<fb:fbml>\n'+
                '<fb:request-form\n'+
                    'action="index.php"\n'+
                    'method="POST"\n'+
                    'invite="false"\n'+
                    'type="HalloweenMosters"\n'+
                    'content="You have received a gift from HalloweenMosters.\n'+
                    '<fb:multi-friend-selector email_invite="false" import_external_friends="false" condensed=\'false\' actiontext="To donate an adorable Monster to a friend" showborder="false" rows="3" cols="4"/>\n'+
                '</fb:request-form>\n'+
              '</fb:fbml>\n';
  return fbml;
}
