var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.createConnection(process.env.MONGO_URL);

var Robot = require('../schemas/robot')
/* GET add page. */
router.get('/', function(req, res) {
    res.render('add');
});

/* POST add page. */
router.post('/', function(req, res) {
    console.log('fssfds', req.body.other)
    fs.readFileSync('uploads/' + req.files.image.name)
    var robot = new Robot({
        teamNumber: req.body.teamNumber,
        abilities: req.body.abilities,
        other: req.body.other
    });
    robot.img.data = fs.readFileSync('uploads/' + req.files.image.name);
    robot.img.contentType = 'image/png';
    fs.unlinkSync('uploads/' + req.files.image.name)
    robot.save();
    res.send('Done. It might take a while for it to show up in /robots')

});

module.exports = router;