

if(!window.fb) fb = {
  defaults : {
    locale : 'en_US',
    appId: '', 
    status: true, 
    cookie: true, 
    xfbml: true,
    perms:'read_stream,publish_stream,offline_access',
    postLogin: console.log
  },
  session : '',
  init: function(options) {
    if(options == undefined || options.appId == undefined) { console.log('Please provide appId in fb.init function. Usage: fb.init({appId: <your app id>}'); }

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
      document.getElementById('fb-root').appendChild(s);
    } catch(ex) { alert('here'+ex); console.log(ex); }
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
            fb.options.postLogin('logged in and grant permissions');
          } else {
            // user is logged in, but did not grant any permissions 
            fb.options.postLogin('logged in but didnt grant permissions');
          }
        } else {
          // user is not logged in
          fb.options.postLogin('not logged in');
        }
      }, options.perms);

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
        FB.api('/'+params.uid, function(response) {
          try {
            params.callback(response);
          } catch(ex) { console.log(ex); }
        });
      } catch(ex) { console.log(ex); }
    }
  },

  // Helpers Package
  helpers : {
    extend : function ( obj1, obj2 )  {
      if(obj2 == undefined) return obj1;
      for(idx in obj2) { obj1[idx] = obj2[idx]; }
      return obj1;
    }
  },

  debug : {
    printObj  : function  ( obj ) {
      for(idx in obj) {
        if( typeof(obj[idx]) == 'object' || typeof obj[idx] == Array) {
          console.log(idx + " -> \n");
          fb.debug.printObj(obj[idx]);
        }
        else console.log(idx + " -> " + obj[idx] + "\n"); 
      }
    }
  }
}
