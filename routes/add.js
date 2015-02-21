var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect(process.env.MONGO_URL);

var Robot = require('../schemas/robot')
/* GET add page. */
router.get('/', function(req, res) {
    res.render('add');
});

/* POST add page. */
router.post('/', function(req, res) {
    fs.readFileSync('uploads/' + req.files.image.name)
    var robot = new Robot({
        teamNumber: req.body.teamNumber,
        abilities: req.body.abilities,
        other: req.body.other,
    });
    robot.img.data = fs.readFileSync('uploads/' + req.files.image.name);
    robot.img.contentType = 'image/png';
    fs.unlinkSync('uploads/' + req.files.image.name)
    robot.save();
    backURL = req.header('Referer') || '/';
    res.redirect(backURL);

});

module.exports = router;