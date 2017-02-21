/**
 * User models
 * Created by killer on 2017/2/20.
 */
let express = require('express');
let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

UserSchema.statics = {
    findByUsername: function (username, cb) {
        return this
            .findOne({username:username})
            .exec(cb);
    }
};

let User = mongoose.model('User',UserSchema);
module.exports = User;