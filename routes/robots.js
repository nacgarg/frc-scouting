var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var Robot = require('../schemas/robot')

/* GET add page. */
router.get('/', function(req, res) {
    //res.send('Loading...')
    var numbers = []
    console.log('as')
    Robot.find({}, function(err, docs) {
        console.log('asdf')
        console.log(err)
        console.log(docs)
        numbers = docs.map(function(item) {
            return item.teamNumber
        });
        console.log('asdfsdf: ' + numbers)
        res.render('robots', {
            results: numbers
        });
    });
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
        });
        if (err) {
            res.send('error')
        }
    })

});

module.exports = router;