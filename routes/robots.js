var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
var robotdb = require('../routes/robotdb')
var request = require('request')
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
    if (lookup[req.params.teamNumber]) {
        if (lookup[req.params.teamNumber].img.data === undefined) {
            res.render('robot-details', {
                teamNumber: req.params.teamNumber,
                abilities: lookup[req.params.teamNumber].abilities,
                other: lookup[req.params.teamNumber].other,
                nickname: lookup[req.params.teamNumber].blueAlliance.nickname,
                website: lookup[req.params.teamNumber].blueAlliance.website,
                location: lookup[req.params.teamNumber].blueAlliance.location,
                name: lookup[req.params.teamNumber].blueAlliance.name
            });
            console.log(lookup[req.params.teamNumber].blueAlliance)
        }
        else {
            res.render('robot-details', {
                teamNumber: req.params.teamNumber,
                abilities: lookup[req.params.teamNumber].abilities,
                other: lookup[req.params.teamNumber].other,
                imageData: lookup[req.params.teamNumber].img.data.toString('base64'),
                imageType: lookup[req.params.teamNumber].img.contentType,
                nickname: lookup[req.params.teamNumber].blueAlliance.nickname,
                website: lookup[req.params.teamNumber].blueAlliance.website,
                location: lookup[req.params.teamNumber].blueAlliance.location,
                name: lookup[req.params.teamNumber].blueAlliance.name
            });
        }
    } else {
        request.get({
            'url': 'http://www.thebluealliance.com/api/v2/team/frc' + req.params.teamNumber + '?X-TBA-App-Id=frc4904:scouting-system:v01'
        }, function(err, resp, bdy) {
            var team = JSON.parse(bdy);
            res.render('robot-details', {
                abilities: ['N/A'],
                other: "N/A",
                teamNumber: req.params.teamNumber,
                nickname: team.nickname,
                website: team.website,
                location: team.location,
                name: team.name
            });
        })
    }
});

module.exports = router;