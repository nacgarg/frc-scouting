var dbarray = [];
var mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGO_URL);
var Robot = require('../schemas/robot')
var request = require('request');

Robot.find({}, function(err, docs) {
    if (err) {
        console.log('error');
    }
    dbarray = docs;
    console.log(dbarray)
})
setInterval(function() {
    var that = this

    Robot.find({}, function(err, docs) {
        if (err) {
            console.log('error');
        }
        dbarray = docs;
        dbarray.map(function(item) {
            request.get({'url': 'http://www.thebluealliance.com/api/v2/team/frc'+item.teamNumber+'?X-TBA-App-Id=frc4904:scouting-system:v01'}, function(err, resp, bdy){item.blueAlliance = JSON.parse(bdy)})
        })
        console.log('refreshed db')
        setTimeout(function() {
            that._onTimeout()
        }, 5000)
    })
}, 10000);
module.exports = function() {
    return dbarray
}