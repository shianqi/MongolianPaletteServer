/**
 * Created by killer on 2016/12/11.
 */
var mongoose = require('mongoose');
var WordSchema = require('../schemas/Word');

var Word = mongoose.model('Word',WordSchema);

module.exports = Word;