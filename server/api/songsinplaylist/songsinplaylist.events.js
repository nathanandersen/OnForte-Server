/**
 * Song model events
 */

'use strict';

import {EventEmitter} from 'events';
var SongsInPlaylistEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)
SongsInPlaylistEvents.setMaxListeners(0);
export default SongsInPlaylistEvents;
