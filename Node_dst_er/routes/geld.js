var express = require('express');
var router = express.Router();
var logic = require('../logic/logic')
var db = require('../database/dbScore')
var clustering = require('density-clustering');
var kmeans = new clustering.KMEANS();
var optics = new clustering.OPTICS();

router.get('/', function (req, res, next) {
    var form = []

    function sort(a, b) {
        if (a.points < b.points)
            return -1;
        if (a.points > b.points)
            return 1;
        return 0;
    }

    db.createGeld(function () {
        db.selectGeldScore(function (score) {
            score.sort(sort)
            for (var j = score.length; j > 0; j--) {
                form.push(score[j - 1].id - 1)
            }
            //console.log(form)
            res.send({form: form, status: false})
        }) 
    })
});

router.post('/', function (req, res, next) {
    var rawData = req.body.data
    var rawTime = req.body.time

    console.log(rawData)

    var points = []
    points = logic.score(3, rawData)
    //console.log(points)
    db.insertGeldScore(points, function () {
        db.insertGeldRaw(JSON.stringify(rawData), req.body.time, function () {
            res.send({state: true})
        })
    })
});

module.exports = router;
