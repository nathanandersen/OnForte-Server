/**
 * GET     /api/songs/playlistId              ->  index
 */

'use strict';

import _ from 'lodash';
import Song from './../song/song.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of SongsInPlaylist
export function index(req, res) {
  console.log(req.params.playlistId);
  return Song.findByPlaylistId(req.params.playlistId).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
