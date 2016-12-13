/**
 * Created by killer on 2016/12/11.
 */
var mongoose = require('mongoose');

var WordSchema = new mongoose.Schema({
    word: String,
    wordIndex: Number,
    str: String,
    createAtDate: Date,
    updateAtDate: Date,
    ipAddress: String,
    phoneId: String
});

WordSchema.statics = {
    findAll: function (cb) {
        return this
            .find({})
            .exec(cb);
    }
};

module.exports = WordSchema;