var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var PLAYLISTS_COLLECTION = "playlists";
var SONGS_COLLECTION = "songs";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// PLAYLISTS API ROUTES BELOW
/*
* A playlist looks like...
* {
* "_id": <ObjectId>
* ... flesh this out ....
* }
*/

// Generic error handler used by all endpoints.
function handleError(res,reason,message,code) {
  console.log("ERROR:" + reason);
  res.status(code || 500).json({"error": message});
}

/*
* "/playlists"
* GET: finds all playlists
* POST: creates a new playlist
*/
app.get("/playlists",function(req,res) {
});
app.post("/playlists",function(req,res) {
  var newPlaylist = req.body;

  if (!(req.body.name && req.body.playlistId)) {
    handleError(res, "Invalid user input","Must provide a playlist title and ID",400);
  }

  newPlaylist.createDate = new Date();

  db.collection(PLAYLISTS_COLLECTION).insertOne(newPlaylist, function(err,doc) {
    if (err) {
      handleError(res,err.message,"Failed to create new playlist.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });

//  newPlaylist.isLoggedInToSpotify = false;
//  newPlaylist.isLoggedInToSoundcloud = true;
//  newPlaylist.isLoggedInToAppleMusic = true;

});

/*
* "/playlists/:id"
* GET: find playlist by id
* PUT: update playlist by id
* DELETE: deletes playlist by id
*/

app.get("/playlists/:id",function(req,res) {
});
app.post("/playlists/_id",function(req,res) {
});
app.delete("/playlists/_id",function(req,res) {
});
