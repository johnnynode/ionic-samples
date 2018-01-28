(function(angular) {
  'use strict';
  angular.module('ionic-samples')
      .constant("Global", {
          apiUrl: function() {
              if (window.cordova) {
                  return {
                      base: ''
                  }
              } else {
                  var port = window.location.port;
                  return {
                      base: 'http://127.0.0.1:'+ port +'/base'
                  }
              }
          }
      })
})(angular);