'use strict';

var express = require('express');
var controller = require('./downvote.controller');

var router = express.Router();

router.get('/:songId', controller.index);

module.exports = router;
