/**
 * Playlist model events
 */

'use strict';

import {EventEmitter} from 'events';
import Playlist from './playlist.model';
var PlaylistEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlaylistEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Playlist.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PlaylistEvents.emit(event + ':' + doc._id, doc);
    PlaylistEvents.emit(event, doc);
  }
}

export default PlaylistEvents;
