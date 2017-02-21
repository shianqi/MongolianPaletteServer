/**
 * Word Models
 * Created by killer on 2016/12/11.
 */
let mongoose = require('mongoose');

let WordSchema = new mongoose.Schema({
    word: String,
    wordIndex: Number,
    str: String,
    createAtDate: Date,
    updateAtDate: Date,
    ipAddress: String,
    phoneId: String,
    userId: String,
    paid: Boolean
});

WordSchema.statics = {
    findAll : function (cb) {
        return this
            .find({})
            .exec(cb);
    },
    getNoPaidSizeByUsername: function (username, cb) {
        return this
            .find({userId:username,paid:false})
            .count()
            .exec(cb);
    },
    getPaidSizeByUsername: function (username, cb) {
        return this
            .find({userId:username,paid:true})
            .count()
            .exec(cb);
    },
};


let Word = mongoose.model('Word',WordSchema);

module.exports = Word;