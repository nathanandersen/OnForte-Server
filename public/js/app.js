angular.module("contactsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
              templateUrl: "home.html",
              controller: "HomeController"
            })
            .when ("/:playlistId", {
              templateUrl: "playlist.html",
              controller: "PlaylistController",
              resolve: {
                songs: function(Songs) {
                  console.log("meh!");
                  return Songs.getSongsByPlaylist();
                }
              }
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Songs", function($http) {
      this.getSongsByPlaylist = function(playlistId) {
        var url = "/playlistsongs/" + playlistId;
        return $http.get(url).
          then(function(response) {
              return response;
          }, function(response) {
            alert("Error getting the songs.");
          });
      }
    })
    .controller("HomeController", function($scope) {
      console.log("Hello, world");
    })
    .controller("PlaylistController", function($scope, $routeParams) {
      Songs.getSongsByPlaylist($routeParams.playlistId).then(function(docs) {
        console.log(docs);
      })
    });
