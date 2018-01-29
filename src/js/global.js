(function(angular) {
  'use strict';
  angular.module('ionic-samples')
      .constant("global", {
          apiUrl: function() {
              if (window.cordova) {
                  return {
                      
                  }
              } else {
                  var port = window.location.port;
                  return {
                        
                  }
              }
          }
      })
})(angular);