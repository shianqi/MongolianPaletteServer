let mongoose = require('mongoose');

let AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

module.exports = mongoose.module('Admin', AdminSchema);