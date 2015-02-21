var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGO_URL);

var Robot = require('../schemas/robot')

/* GET add page. */
router.get('/', function(req, res) {
    Robot.find({}, function(err, docs) {
        console.log(err, docs)
        res.render('robots', {
            results: docs
        });
    })

});

router.get('/:teamNumber', function(req, res) {
    Robot.find({
        teamNumber: req.params.teamNumber
    }, function(err, docs) {
        console.log(docs[0])
        res.render('robot-details', {
            teamNumber: req.params.teamNumber,
            abilities: docs[0].abilities,
            other: docs[0].other,
            imageData: docs[0].img.data.toString('base64'),
            imageType: docs[0].img.contentType
        })
    })

});

module.exports = router;