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

// Generic error handler used by all endpoints.
function handleError(res,reason,message,code) {
  console.log("ERROR:" + reason);
  res.status(code || 500).json({"error": message});
}

// PLAYLISTS API ROUTES BELOW
/*
* "/playlists"
* GET: finds all playlists
* POST: creates a new playlist
*/
app.get("/playlists",function(req,res) {
  db.collection(PLAYLISTS_COLLECTION).find({}).toArray(function(err,docs) {
    if (err) {
      handleError(res, err.message, "Failed to get playlists");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/playlists",function(req,res) {
  var newPlaylist = req.body;
  newPlaylist.createDate = new Date();

  if (newPlaylist.name == null) {
    handleError(res, "Invalid user input","Did not provide a name",400);
  }
  if (newPlaylist.playlistId == null) {
    handleError(res, "Invalid user input", "Did not provide a playlist ID",400);
    }
  if (newPlaylist.hostId == null) {
    handleError(res, "Invalid user input", "Did not provide a host ID",400);
  }
  if (newPlaylist.hostIsLoggedInToSpotify == null) {
    handleError(res, "Invalid user input", "Did not provide Spotify login status",400);
  }
  if (newPlaylist.hostIsLoggedInToSoundcloud == null) {
    handleError(res, "Invalid user input", "Did not provide Soundcloud login status",400);
  }
  if (newPlaylist.hostIsLoggedInToAppleMusic == null) {
    handleError(res, "Invalid user input", "Did not provide Apple Music login status",400);
  }

  db.collection(PLAYLISTS_COLLECTION).insertOne(newPlaylist, function(err,doc) {
    if (err) {
      handleError(res,err.message,"Failed to create new playlist.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*
* "/playlists/:id"
* GET: find playlist by id
* PUT: update playlist by id
* DELETE: delete playlist by id
*/

app.get("/playlists/:id",function(req,res) {
  db.collection(PLAYLISTS_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function(err,doc) {
    if (err) {
      handleError(res, err.message, "Failed to get playlist");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/playlists/:id",function(req,res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(PLAYLISTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err,doc) {
    if (err) {
      handleError(res, err.message, "Failed to update playlist");
    } else {
      res.status(204).end();
    }
  });
});


app.delete("/playlists/:id",function(req,res) {
  db.collection(PLAYLISTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err,result) {
    if (err) {
      handleError(res,err.message, "Failed to delete playlist");
    } else {
      res.status(204).end();
    }
  });
});

// FETCH PLAYLIST BY PLAYLISTID
app.get("/playlistid/:id",function(req,res) {
  db.collection(PLAYLISTS_COLLECTION).findOne({playlistId: req.params.id}, function(err,doc) {
    if (err) {
      handleError(res, err.message, "Failed to get songs for playlist");
    } else {
      res.status(200).json(doc);
    }
  });
});

// FETCHING PLAYLIST SONGS API ROUTES BELOW
app.get("/playlistsongs/:id",function(req,res) {
  db.collection(SONGS_COLLECTION).find({playlistId: req.params.id}).toArray(function(err,docs) {
    if (err) {
      handleError(res, err.message, "Failed to get songs for playlist");
    } else {
      res.status(200).json(docs);
    }
  });
});

// SONGS API ROUTES BELOW
/*
* "/songs"
* GET: finds all songs
* POST: creates a new song
*/
app.get("/songs",function(req,res) {
  db.collection(SONGS_COLLECTION).find({}).toArray(function(err,docs) {
    if (err) {
      handleError(res, err.message, "Failed to get songs");
    } else {
      res.status(200).json(docs);
    }
  });
});
app.post("/songs",function(req,res) {
  var newSong = req.body;
  newSong.createDate = new Date();

  if (!(req.body.playlistId && (req.body.title || req.body.description))) {
    handleError(res, "Invalid user input","Must provide a playlist ID and song title or description",400);
  }

  db.collection(SONGS_COLLECTION).insertOne(newSong, function(err,doc) {
    if (err) {
      handleError(res,err.message,"Failed to create new song.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});


/*
* "/songs/:id"
* GET: find song by id
* PUT: update song by id
* DELETE: delete song by id
*/


app.get("/songs/:id",function(req,res) {
  db.collection(SONGS_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function(err,doc) {
    if (err) {
      handleError(res, err.message, "Failed to get song");
    } else {
      res.status(200).json(doc);
    }
  });
});

// This will update the fields specified.
// Typically use it for Active Status
app.put("/songs/:id",function(req,res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(SONGS_COLLECTION).updateOne(
    {_id: new ObjectID(req.params.id)},
    {$set: updateDoc},
    function(err,doc) {
      if (err) {
        handleError(res, err.message, "Failed to update song");
      } else {
        res.status(204).end();
      }
  });
});

app.delete("/songs/:id",function(req,res) {
  db.collection(SONGS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err,result) {
    if (err) {
      handleError(res,err.message, "Failed to delete song");
    } else {
      res.status(204).end();
    }
  });
});


/*
* "/upvote/:id"
*
*/
app.post("/upvote/",function(req,res) {
  db.collection(SONGS_COLLECTION).updateOne(
    {_id: new ObjectID(req.body.id)},
    {$inc: {"score":1}},
    function(err,doc) {
        if (err) {
          handleError(res, err.message, "Failed to upvote song");
        } else {
          res.status(204).end();
        }
  });
});

/*
* "/downvote/:id"
*/
app.post("/downvote/",function(req,res) {
  db.collection(SONGS_COLLECTION).updateOne(
    {_id: new ObjectID(req.body.id)},
    {$inc: {"score":-1}},
    function(err,doc) {
        if (err) {
          handleError(res, err.message, "Failed to downvote song");
        } else {
          res.status(204).end();
        }
  });
});
