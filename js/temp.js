/**
  * for popup http://nyromodal.nyrodev.com/
  */

(function (){
  try {
  var fQuery = (function(){
    var fQuery = function(selector){
      return new fQuery.fn.init(selector); 
    }
  
    fQuery.fn  = fQuery.prototype = {
      init: function(selector){

        if(fQuery.isBoot  ==  false)  {
          console.error("f(..) called before f.boot(..)."); 
          return null;
        }
        /** SELECTOR FUNCTIONS **/

        //Handle fQuery(""), fQuery(null) or fQuery(undefined)
        if(!selector) {
          return fQuery;
        }
  
        //Handle fQuery("#....") 
        if(typeof selector  ==  "string") {
          fQuery.selector = fQuery.formatQuery(selector);
          return fQuery;
        }
      },

      /** The current version of fQuery being used. **/
      fQuery: '1.0.0'
    };

    /** start with an empty selector **/
    fQuery.selector = "";
    
    /** facebook permissions empty by default **/
    fQuery.perms  = "";


    /** extends two objects **/
    fQuery.extend  = fQuery.fn.extend = function(obj1, obj2)  {
      if(obj2 == undefined) return obj1;
      for(idx in obj2) obj1[idx]  = obj2[idx];
      return obj1;
    }

    fQuery.fn.find = function  (selector)  {
      return this.toArray(this);
    }

    /** Functions applicable to user object => f(user).func() **/
    fQuery.extend(fQuery, {
      album:  function( aid )  {
        if(aid) fQuery.selector = '/' + aid + '/';
        else fQuery.selector += 'albums/';
        return fQuery;
      },

      photos: function ( pid ) {
        if(pid) fQuery.selector = '/' + aid + '/';
        else fQuery.selector  += 'photos/';
        return fQuery;
      },

      /** Friends (Array of friends as object) **/
      friends: function ()  {
        fQuery.selector +=  'friends/';
        return fQuery;
      },

      /** Profile Feed (Wall) **/
      wall: function  ()  {
        fQuery.selector +=  'feed/';
        return fQuery;
      },

      /** News Feeds (USER) **/
      feed : function () {
        fQuery.selector += 'home/';
        return fQuery;
      },
     
      /** Application Requests to User **/
      apprequests:  function()  {
        fQuery.selector += 'apprequests/';
        return fQuery;
      },

      /** profile pic **/
      picture  : function ()  {
        /*if(params.uid) {
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
        }*/
      },

      /** Get User's Accounts ( Pages/Applications etc) **/
      accounts: function () {
        fQuery.selector += 'accounts/';
        return fQuery;
      },

      /** User's Activity Pages **/
      activities: function()  {
        fQuery.selector += 'activities/';
        return fQuery;
      },
      
      /** List of Books **/
      books: function() {
        fQuery.selector += 'books/';
        return fQuery;
      },

      /** Checkins **/
      checkins: function() {
        fQuery.selector += 'checkins/';
        return fQuery;
      },

      /** Events of user **/
      events: function()  {
        fQuery.selector +=  'events/';
        return fQuery;
      },

      /** Friend Groups of User **/
      friendlists: function() {
        fQuery.selector += 'friendlists/';
        return fQuery;
      },

      /** Message Inbox of User **/
      inbox: function() {
        fQuery.selector += 'inbox/';
        return fQuery;
      },

      /** interests of users **/
      interests: function() {
        fQuery.selector += 'interests/';
        return fQuery;
      },

      /** List of Objects liked by the user **/
      likes: function(){
        fQuery.selector += 'likes/';
        return fQuery;
      },

      /** List of user's posted links **/
      links: function() {
        fQuery.selector += 'links/';
        return fQuery;
      },

      /** movies user likes **/
      movies: function()  {
        fQuery.selector += 'movies/';
        return fQuery;
      },

      /** music user likes **/
      music: function() {
        fQuery.selector += 'music/';
        return fQuery;
      },

      /** Notes written by user **/
      notes: function() {
        fQuery.selector += 'notes/';
        return fQuery;
      },

      /** Outbox User **/
      outbox: function(){
        fQuery.selector += 'outbox/';
        return fQuery;
      },
      
      /** POSTS from user **/
      posts: function(){
        fQuery.selector += 'posts/';
        return fQuery;
      },

      /** User's Statuses **/
      statuses: function() {
        fQuery.selector += 'statuses/';
        return fQuery;
      },

      /** objects in which user got tagged **/
      tagged: function() {
        fQuery.selector += 'tagged/';
        return fQuery;
      },
      
      /** TV shows user likes **/
      television: function() {
        fQuery.selector += 'television/';
        return fQuery;
      },
      
      /** Updates in user's inbox **/
      updates: function() {
        fQuery.selector += 'updates/';
        return fQuery;
      },

      videos: function() {
        fQuery.selector += 'videos/';
        return fQuery;
      },

      exec: function( callback )  {
        FB.api( fQuery.selector, function (response)  {
          console.dir(response);
          callback(response);
        });
        delete fQuery;
      }
    });

    /** GENERAL FUNCTIONS **/    
    fQuery.fn.formatQuery = fQuery.formatQuery  = function(query) {
      if(!query || typeof query != 'string')  return null;

      query = query.replace(/^[\s]+/,'').replace(/[\s]+$/,'').replace(/[\s]{2,}/,' ');  //trimming spaces in both sides of query string
      query = query.replace(/[^a-zA-Z 0-9.]+/g,'');  //trimming non-alphanumeric letters
      querys  = query.split(' ');
      fquery  = "/";
      for(idx in querys)  {
        if(querys[idx]) fquery += querys[idx] + '/';
      }
      return fquery;
    },



    /** Extending Default Boot Options to fQuery **/
    fQuery.extend(fQuery, {
      options:  { 
        locale : 'en_US',
        appId: '', 
        status: true, 
        cookie: true, 
        xfbml: true,
        perms: 'read_stream'
      }
    });

    /** FB Session Object **/
    fQuery.session  = "";

    /** FB Boot Flag **/
    fQuery.isBoot = false;

    /** FB API Init **/
    fQuery.init = function( params  ) {
      if(params == undefined) params = {};
      //Boot the FB API here.
      alert('Fetching Facebook API...');
      fQuery.extend(fQuery.options, params);

      if(this.options.appId == undefined || this.options.appId == '') { console.error('Please provide appId in fb.init function. Usage: f.init({appId: <your app id>}'); }

      // Create DIV fb-root fot facebook API to access
      var body  = document.getElementsByTagName("body")[0];
      var fb_root = document.createElement("div");
      fb_root.setAttribute("id", "fb-root");
      body.appendChild(fb_root);
      
      // Load Facebook Script Asyncronously
      var s = document.createElement("script"); s.sync  = false;
      s.src = document.location.protocol  + 
      "//connect.facebook.net/" + this.options.locale + 
      "/all.js";
      s.type  = "text/javascript";
      body.appendChild(s);
     
      return this;
    }

    /** FB API Boot **/
    /** @todo make it more user defined and flexible **/
    fQuery.boot = function  ( params  ) {
      alert('Booting FB API...');
      // Init FB 
      FB.init({
              appId: this.options.appId, 
              status: this.options.status, 
              cookie: this.options.cookie, 
              xfbml: this.options.xfbml
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
        }, {'perms': fQuery.options.perms} );
  
        session = FB.getSession();
      }

      fQuery.isBoot = true;
      fQuery.session  = session;
      return this;
    }

    return fQuery; 
  })();

  window.f  = window.fQuery = fQuery;
  } catch(ex) { alert(ex);  }
})();


function onload() {
  var perms = "user_about_me,friends_about_me,user_activities,friends_activities,user_birthday,friends_birthday,user_education_history,friends_education_history,user_events,friends_events,user_groups,friends_groups,user_hometown,friends_hometown,user_interests,friends_interests,user_likes,friends_likes,user_location,friends_location,user_notes,friends_notes,user_online_presence,friends_online_presence,user_photo_video_tags,friends_photo_video_tags,user_photos,friends_photos,user_relationships,friends_relationships,user_relationship_details,friends_relationship_details,user_religion_politics,friends_religion_politics,user_status,friends_status,user_videos,friends_videos,user_website,friends_website,user_work_history,friends_work_history,email,read_friendlists,manage_friendlists,read_insights,read_mailbox,read_requests,read_stream,xmpp_login,ads_management,user_checkins,friends_checkins";

  f.init({appId: '158476644202716', perms: perms});
}

function user() {
  fQuery('me').friends().exec(function(response){
    console.log(response);
  });
}

function renderObj( obj )  {
  for ( idx in obj ) {
    if( typeof obj[idx] == "object" ) {
      renderObj(obj[idx]);
      window.h  +=  "<hr/>";
    }
    else window.h += " [" + idx + ": " + obj[idx] + "] <br/><br/>";
  }
}

function userBasic(u) {
  showLoadingImage();
  fQuery(u).exec(function(response){
    removeLoadingImage();
    if( response.error )  {
      window.h  = "";
      renderObj(response);
      $("#output-arena").html( window.h );
    }
    else if( response.data && response.data.length == 0 ){
      $("#output-arena").html( "Access denied or no data." );
    }
    else {
      window.h = "";
      renderObj(response);
      $("#output-arena").html(window.h);
    }
  });
}

function execute( scr ) {
  showLoadingImage();
  eval(scr);
}

function printFBResponse( response ){
  if( response.error )  {
    window.h  = "";
    renderObj(response);
    $("#output-arena").html( window.h );
  }
  else if( response.data && response.data.length == 0 ){
    $("#output-arena").html( "Access denied or no data." );
  }
  else {
    window.h = "";
    renderObj(response);
    $("#output-arena").html(window.h);
  }
  removeLoadingImage();
}

function userNewsFeed( u ) {
  showLoadingImage();
  fQuery( u ).feed().exec(function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userAppRequests( u ) {
  showLoadingImage();
  fQuery( u ).apprequests().exec(function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userBooks( u ) {
  showLoadingImage();
  fQuery( u ).books().exec(function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userActivities( u ) {
  showLoadingImage();
  fQuery( u ).activities().exec(function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userCheckins( u ) {
  showLoadingImage();
  fQuery( u ).checkins().exec(function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userEvents( u ) {
  showLoadingImage();
  fQuery( u ).events().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userFriendLists( u )  {
  showLoadingImage();
  fQuery( u ).friendlists().exec( function(response){
    printFBResponse(response);
    removeLoadingImage();
  });
}

function userInbox( u ) {
  showLoadingImage();
  fQuery( u ).inbox().exec( function(response) {
    printFBResponse(response);
    removeLoadingImage();
  });
}

function userInterests( u ) {
  showLoadingImage();
  fQuery( u ).interests().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userLikes( u ) {
  showLoadingImage();
  fQuery( u ).likes().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userLinks( u ) {
  showLoadingImage();
  fQuery( u ).links().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userMovies( u ) {
  showLoadingImage();
  fQuery( u ).movies().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userMusic( u ) {
  showLoadingImage();
  fQuery( u ).music().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userNotes( u ) {
  showLoadingImage();
  fQuery( u ).notes().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userOutbox( u ) {
  showLoadingImage();
  fQuery( u ).outbox().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userPosts( u ) {
  showLoadingImage();
  fQuery( u ).posts().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userStatuses( u ) {
  showLoadingImage();
  fQuery( u ).statuses().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userTagged( u ) {
  showLoadingImage();
  fQuery( u ).tagged().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userTelevision( u ) {
  showLoadingImage();
  fQuery( u ).television().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userUpdates( u ) {
  showLoadingImage();
  fQuery( u ).updates().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userVideos( u ) {
  showLoadingImage();
  fQuery( u ).videos().exec( function(response){
    printFBResponse( response );
    removeLoadingImage();
  });
}

function userWall( u ) {
  showLoadingImage();
  fQuery( u ).wall().exec(function(response) {
    if( response.error )  {
      window.h  = "";
      renderObj(response);
      $("#output-arena").html( window.h );
    }
    else if( response.data && response.data.length == 0 ){
      $("#output-arena").html( "Access denied or no data." );
    }
    else {
      window.h = "";
      renderObj(response);
      $("#output-arena").html(window.h);
    }
    removeLoadingImage();
  });
}

function userAlbums( u ) {
  showLoadingImage();

  fQuery( u ).album().exec(function(response)  {
    if( response.error )  {
      window.h  = "";
      renderObj(response);
      $("#output-arena").html( window.h );
    }
    else if( response.data && response.data.length == 0 ){
      $("#output-arena").html( "Access denied or no data." );
    }
    else  {
      var html = renderAlbums(response);
      removeLoadingImage();
      $("#output-arena").append("<div id='response-div'>" + html + "</div>");
    }
  });
}

function userPhotos( u ) {
  showLoadingImage();
  fQuery( u ).album().exec(function(response){
    if( response.error )  {
      window.h  = "";
      renderObj(response);
      $("#output-arena").html( window.h );
    }
    else if( response.data && response.data.length == 0 ){
      $("#output-arena").html( "Access denied or no data." );
    }
    else  {
      var response  = response.data;
      var len = response.length;
      for(var i=0;  i<len;  i++)  {
        fQuery(response[i].id).photos().exec(function(response){
          if( response.error )  {
            window.h  = "";
            renderObj(response);
            $("#output-arena").html( window.h );
          }
          else  {
            removeLoadingImage();
            var html = renderPhotos(response);
            $("#output-arena").append("<div id='response-div'>" + html + "</div><hr/>");
            $(".nyroModal").nyroModal();
          }
        });
      }
    }
  });
}

function renderAlbums( output ) {
  output = output.data;
  var len = output.length;
  var html = "";

  for(var i = 0; i < len; i++)  {
    html += "Album From: " + output[i].from.name + "<br/>";
    html += "Album ID: " + output[i].id + "<br/>" ;
    html += "<a href='"+ output[i].link + "'>" + output[i].name + "</a><br/><hr/>" ;
  }

  return html;
}

function userFriends( u ) {
  showLoadingImage();
  fQuery(u).friends().exec(function(response){

    if( response.error )  {
      window.h  = "";
      renderObj(response);
      $("#output-arena").html( window.h );
    }
    else if( response.data && response.data.length == 0 ){
      $("#output-arena").html( "Access denied or no data." );
    }
    else  {
      console.dir(response);
      var response  = response.data;
      var html = "";
      console.dir(response);
      for(var i=0; i<response.length; i++)  {
        html += "UID: " + response[i].id;
        html += "Name: <a href='http://www.facebook.com/profile.php?id=" + response[i].id + "'>" + response[i].name + "</a>";
        html += "<hr/>";
      }
      removeLoadingImage();
  
      $("#output-arena").html(html);
    }
  });
}

function userAccounts( u ) {
  fQuery(u).accounts().exec(function(response){
    showLoadingImage();
    printFBResponse(response);
  });
}

function renderPhotos( output ) {
  output  = output.data;
  var len = output.length;

  var html = "";
  for(var i=0; i<len; i++)  {
    img = "<img src='"+ output[i].images[3].source + "'/>";
    html += "<a href='"+ output[i].source + "' class='nyroModal' title='Photo' rel='gal'>"+ img +"</a>";
  }
  return html;
}

function showLoadingImage(){
  $("#output-arena").html("<img src='/fbtestcozy/loading.gif' style='align: center' id='loading-gif'/>");
}

function removeLoadingImage(){
  $("#loading-gif").remove();
}
