var dbarray = [];
var mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGO_URL);
var Robot = require('../schemas/robot')
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
        console.log('refreshed db')
        setTimeout(function() {
            that._onTimeout()
        }, 5000)
    })
}, 10000);
module.exports = function() {
    return dbarray
}