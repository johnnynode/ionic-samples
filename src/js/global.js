(function(angular) {
  'use strict';
  angular.module('ionic-samples')
      .constant("global", {
          apiUrl: function() {
              if (window.cordova) {
                  return {
                      pdf: 'https://mozilla.github.io'
                  }
              } else {
                  var port = window.location.port;
                  return {
                    pdf: 'http://127.0.0.1:'+ port +'/pdf'
                  }
              }
          }
      })
})(angular);