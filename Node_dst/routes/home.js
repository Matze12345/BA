var express = require('express');
var router = express.Router();
var logic = require('../logic/logic')
var db = require('../database/dbScore')

router.get('/', function(req, res, next) {
    var form = []

    function sort(a,b) {
      if (a.points < b.points)
        return -1;
      if (a.points > b.points)
        return 1;
      return 0;
    }

    db.selectScore(function (score) {
        score.sort(sort)
        for(var j = score.length; j>0; j--){
            form.push(score[j-1].id - 1)
        }
        console.log(form)
        res.send({form: form, status: false})
    })
});

router.post('/', function(req, res, next) {
    var points = []

    //points = logic.score(req.body.data, 6)

    //db.insertScore(points, function () {
        //db.insertRaw(JSON.stringify(req.body.data), req.body.time, function () {
        db.insertRaw(JSON.stringify(req.body.data), req.body.time, function () {
            res.send({state: true})
        })
    //})
});

module.exports = router;
