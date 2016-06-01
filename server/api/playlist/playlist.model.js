'use strict';

import mongoose from 'mongoose';

var PlaylistSchema = new mongoose.Schema({
  name: String,
  playlistId: String,
  userId: String,
  hostIsLoggedInToSpotify: Boolean,
  hostIsLoggedInToSoundcloud: Boolean,
  hostIsLoggedInToAppleMusic: Boolean,
  info: String
});
// 'info' schema is just for testing.

export default mongoose.model('Playlist', PlaylistSchema);
