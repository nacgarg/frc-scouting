var mongoose = require('mongoose');
var Robot = mongoose.model('Robot', {
    teamNumber: String,
    abilities: Array,
    img: {
        data: Buffer,
        contentType: String
    },
    other: String
});

module.exports = Robot