var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
var robotdb = require('../routes/robotdb')

var Robot = require('../schemas/robot')

/* GET add page. */
router.get('/', function(req, res) {
    res.render('robots', {
        results: robotdb().map(function(item) {
            return item.teamNumber
        })
    });
});
router.get('/:teamNumber', function(req, res) {
    var lookup = {};
    for (var i = 0, len = robotdb().length; i < len; i++) {
        lookup[robotdb()[i].teamNumber] = robotdb()[i];
    }
    res.render('robot-details', {
        teamNumber: req.params.teamNumber,
        abilities: lookup[req.params.teamNumber].abilities,
        other: lookup[req.params.teamNumber].other,
        imageData: lookup[req.params.teamNumber].img.data.toString('base64'),
        imageType: lookup[req.params.teamNumber].img.contentType
    });
});

module.exports = router;