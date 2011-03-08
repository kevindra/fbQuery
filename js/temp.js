function mycircle(x,y,r) {
  this.xcoord = x;
  this.ycoord = y;
  this.radius = r;
  this.retArea = getTheArea;
  //This next line uses an alternative syntax
  this.retCirc = function () { return ( Math.PI * this.radius * 2 ); };
  this.mvBy = mvCclBy;
}
function getTheArea() {
  return ( Math.PI * this.radius * this.radius );
}
function mvCclBy(xDis,yDis) {
  this.xcoord += xDis;
  this.ycoord += yDis;
}

/*
create a mycircle called testcircle where testcircle.xcoord is 3
and testcircle.ycoord is 4 and testcircle.radius is 5
*/
var testcircle = new mycircle(3,4,5);
/*
use the mvBy method to displace the centre of testcircle.
move it by 2 in the x direction and 3 in the y direction
*/
testcircle.mvBy(2,3);
//testcircle.xcoord is now 5 and testcircle.ycoord is now 7

window.alert( 'The area of the circle is ' + testcircle.retArea() );
window.alert( 'The circumference is ' + testcircle.retCirc() );

(function (){
  try {
  var fQuery = (function(){
    var fQuery = function(selector){
      return new fQuery.fn.init(selector); 
    }
  
  
    fQuery.fn  = fQuery.prototype = {
      init: function(selector){
        /** SELECTOR FUNCTIONS **/

        //Handle fQuery(""), fQuery(null) or fQuery(undefined)
        if(!selector) {
          return fQuery.fn.find('');
        }
  
        //Handle fQuery("#....") 
        if(typeof selector  ==  "string") {
          if(selector[0]  ==  "#")  alert(selector.substr(1,selector.length-1));
          else alert('malformed param');
          /** check for invalid selectors **/
          return fQuery.fn.find(selector);
        }
      }
    };

    fQuery.fn.find = function  (selector)  {
      return this;
    }
    
    fQuery.fn.sayHello = function  (selector)  {
      alert('hello');
      return this;
    }

    /** GENERAL FUNCTIONS **/    
    fQuery.extend  = fQuery.fn.extend = function(obj1, obj2)  {
      if(obj2 == undefined) return obj1;
      for(idx in obj2) obj1[idx]  = obj2[idx];
      return obj1;
    }


    /** Extending Default Boot Options to fQuery **/
    fQuery.extend(fQuery, {
      options:  { 
        locale : 'en_US',
        appId: '', 
        status: true, 
        cookie: true, 
        xfbml: true,
        perms: ''
      }
    });

    /** FB API Boot **/
    fQuery.boot = function( params  ) {
      if(params == undefined) params = {};
      //Boot the FB API here.
      alert('Booting Facebook API...');
      fQuery.extend(fQuery.options, params);

      if(this.options.appId == undefined || this.options.appId == '') { console.error('Please provide appId in fb.init function. Usage: f.boot({appId: <your app id>}'); }

      // Create DIV fb-root fot facebook API to access
      var body  = document.getElementsByTagName("body")[0];
      var fb_root = document.createElement("div");
      fb_root.setAttribute("id", "fb-root");
      body.appendChild(fb_root);
      
      // Load Facebook Script Asyncronously
      var s = document.createElement("script"); s.sync  = true;
      s.src = document.location.protocol  + 
      "//connect.facebook.net/" + this.options.locale + 
      "/all.js";
      s.type  = "text/javascript";
      body.appendChild(s);
     
       
      // Init FB 
      FB.init({
              appId: this.options.appId, 
              status: this.options.status, 
              cookie: this.options.cookie, 
              xfbml: this.options.xfbml
      });

      console.dir(this.options);
      return this;
    }

    return fQuery; 
  })();

  window.$  = window.f  = fQuery;
  } catch(ex) { alert(ex);  }
})();


try {
//  console.dir(f.boot({appId: '158476644202716'}));
  console.dir(jQuery);
  console.dir(jQuery("adasda").find('asdasd'));
} catch(ex) { alert(ex);  }



function onload() {
  f.boot({appId: '158476644202716'});
  /*var options = {
    appId: "158476644202716", postLogin: alert
  };
  fb.init(options);*/
}
