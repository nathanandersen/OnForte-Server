'use strict';

import mongoose from 'mongoose';

var SongSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,

  title: String,
  annotation: String,
  musicPlatform: String,
  playlistId: String,
  artworkURL: String,
  trackId: String,
  score: Number,
  userId: String,
  activeStatus: Number

});

SongSchema.statics.findByPlaylistId = function(pID, cb) {
  return this.find({playlistId: pID}, cb);
}

export default mongoose.model('Song', SongSchema);
