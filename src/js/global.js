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
          },
          dataUrl: 'https://raw.githubusercontent.com/johnnynode/ionic-samples/ionic-v1/src/data',
          mediaUrl: 'https://raw.githubusercontent.com/johnnynode/ionic-samples/ionic-v1/src/media'
      })
})(angular);