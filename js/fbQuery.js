

if(!window.fb) fb = {
  defaults : {
    locale : 'en_US',
    appId: '', 
    status: true, 
    cookie: true, 
    xfbml: true,
    perms: '',
    postLogin: console.log
  },
  session : '',
  init: function(options) {
    if(options == undefined || options.appId == undefined) { console.error('Please provide appId in fb.init function. Usage: fb.init({appId: <your app id>}'); }

    if(!fb.options) fb.options = fb.helpers.extend(fb.defaults, options);

    try {
      // Create DIV fb-root for facebook to access.
      var body = document.getElementsByTagName('body')[0];
      var fb_root = document.createElement('div');
      fb_root.setAttribute('id', 'fb-root');
      body.appendChild(fb_root);
      
      // Load Facebook Script Asyncronously 
      var s = document.createElement('script'); s.async = true;
      s.src = document.location.protocol +
      '//connect.facebook.net/'+ fb.options.locale +
      '/all.js';
      s.type  = 'text/javascript';
      body.appendChild(s);
    } catch(ex) { alert('here'+ex); console.warn(ex); }
  },
  
  // FB Async Init
  fbAsyncInit : function() {
    var options = fb.options;
    // Init FB 
    FB.init({
            appId: options.appId, 
            status: options.status, 
            cookie: options.cookie, 
            xfbml: options.xfbml
    });

    var session = FB.getSession();

    if(session == undefined) {
      FB.login(function(response) {
        if (response.session) {
          if (response.perms) {
            // user is logged in and granted some permissions.
            // perms is a comma separated list of granted permissions
            alert('logged in and grant permissions');
          } else {
            // user is logged in, but did not grant any permissions 
            alert('logged in but didnt grant permissions');
          }
        } else {
          // user is not logged in
          alert('not logged in');
        }
      }, {'perms': options.perms} );

      session = FB.getSession();
    }

    fb.session = session;
    //Print Session in Console
    fb.debug.printObj(fb.session);
  },

  //User Package
  user : {
    getUserInfo: function  ( params ) {
      try {
        FB.api('/'+params.user, function(response) {
          try {
            params.callback(response);
          } catch(ex) { console.warn(ex); }
        });
      } catch(ex) { console.warn(ex); }
    },
    /** Only returns the lists of friends not friends **/
    getFriendLists: function  ( params  ) {
      try {
        FB.login ( function(response) {
          if(response.session && response.perms) {
            FB.api('/' + params.user + '/friendlists', function(response)  {
              params.callback(response);
            });
          }
        }, {perms: 'read_friendlists'});
      } catch(ex) { console.warn(ex);  }
    },
    /** Returns the set of objects of friends **/
    getFriends: function  ( params  ) {
      try {
        FB.login( function(response)  {
          if(response.session && response.perms)  {
            FB.api('/' + params.user + '/friends',  function(response)  {
              params.callback(response);
            });
          }
        },  { perms:  'read_friendlists'} );
      } catch(ex) { console.warn(ex); }
    },
    
    getAlbums : function  ( params  ) {
      try {
        FB.login( function(response)  {
          if(response.session && response.perms)  {
            FB.api('/' + params.user + '/albums',  function(response)  {
              params.callback(response);
            });
          }
        },  { perms:  'user_photos'} );
      } catch(ex) { console.warn(ex); }
    },

    /** Get Photos uploaded by user, categorized album wise **/ 
    getPhotos :  function ( params  ) {
      try {
        FB.login( function(response)  {
          if(response.session && response.perms)  {
            FB.api('/' + params.user + '/photos',  function(response)  {
              params.callback(response);
            });
          }
        },  { perms:  'user_photos,user_photo_video_tags'} );
      } catch(ex) { console.warn(ex); }
    },

    /** Get posts from the user **/
    getPosts  : function  ( params  ) {
      try {
        FB.login( function(response)  {
          if(response.session && response.perms)  {
            FB.api('/' + params.user + '/posts',  function(response)  {
              params.callback(response);
            });
          }
        },  { perms:  'read_stream'} );
      } catch(ex) { console.warn(ex); }
    },

    /** Get status messages from the user **/
    getStatuses : function  ( params  ) {
      try {
        FB.login( function(response)  {
          if(response.session && response.perms)  {
            FB.api('/' + params.user + '/statuses',  function(response)  {
              params.callback(response);
            });
          }
        },  { perms:  'read_stream'} );
      } catch(ex) { console.warn(ex); }
    },

    /** Get Profile Picture **/
    getProfilePicture:  function  (params)  {
      if(params.user == 'me') params.uid = fb.session.uid;

      if(params.uid) {
        FB.api({
          method: 'fql.query',
          query:  "SELECT pic_square FROM user WHERE uid = " + params.uid
        },
        function (response) {
          params.callback(response);
        });
      }
      else  {
        FB.api({
          method: 'fql.query',
          query:  "SELECT pic_square FROM user WHERE username = '" + params.user + "'"
        },
        function (response) {
          params.callback(response);
        });
      }
    }



  },//User package ends.
 
 
  // Helpers Package
  helpers : {
    extend : function ( obj1, obj2 )  {
      if(obj2 == undefined) return obj1;
      for(idx in obj2) { obj1[idx] = obj2[idx]; }
      return obj1;
    }
  },

  debug : {
    printObj  : function  (obj) {
      console.dir(obj);
    }
  }
}
