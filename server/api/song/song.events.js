/**
 * Song model events
 */

'use strict';

import {EventEmitter} from 'events';
import Song from './song.model';
var SongEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SongEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Song.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SongEvents.emit(event + ':' + doc._id, doc);
    SongEvents.emit(event, doc);
  }
}

export default SongEvents;
