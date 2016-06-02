'use strict';

var express = require('express');
var controller = require('./songsinplaylist.controller');

var router = express.Router();

router.get('/:playlistId', controller.index);

module.exports = router;
