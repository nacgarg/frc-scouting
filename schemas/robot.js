var mongoose = require('mongoose');
var Robot = mongoose.model('Robot', {
    teamNumber: String,
    photo: String,
    abilities: Array,
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = Robot