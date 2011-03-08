(function(window){

  _fCache = {};

  _fCache  = function (selector) {
    alert(selector);
  }
  
  _fCache.init = _init = function( options ) {
    alert(options.a);
  }

  window.fQuery = window.f  = _fCache;
})(window);

f('adasd');
f.init({a: 1});
