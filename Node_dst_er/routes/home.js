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

     db.createStandard(function () {
         db.selectScore(function (score) {
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

    //db.selectRaw(function (raw, timeR) {
    //for(var k = 0; k<raw.length; k++) {
    //var rawData = JSON.parse(raw)
    //var rawTime = timeR

    var rawData = req.body.data
    var rawTime = req.body.time
    var x = []
    var y = []
    var strecke = 0
    var time = 0
    var inputSpeed = 0
    var mouse = 0
    var tab = 0
    for (var i = 0; i < rawData.length; i++) {
        //Strecke & MoveSpeed
        if (rawData[i].type == "move") {
            if (rawData[i].key == "mouse") {
                mouse++
                time = time + ( rawData[i].end - rawData[i].start )
                x = rawData[i].x
                y = rawData[i].y
                for (var j = 0; j < x.length - 1; j++) {
                    strecke = strecke + Math.sqrt(Math.pow(Math.abs(x[j]) - Math.abs(x[j + 1]), 2) + Math.pow(Math.abs(y[j]) - Math.abs(y[j + 1]), 2))
                }
            } else {
                tab++
            }
        }
        //Input speed
        if (rawData[i].type == "input") {
            if (rawData[i].keyCount > 0) {
                inputSpeed = inputSpeed + (( rawData[i].end - rawData[i].start ) / rawData[i].keyCount )
            }
        }
    }
    var moveSpeed = strecke / time


    var clusternr = 0;
    db.insertNearest(strecke, moveSpeed, inputSpeed, tab, mouse, rawTime, function () {
        db.selectNearest(function (data) {
            var clusters = kmeans.run(data, 3);
            //var clusters = optics.run(data, 50000, 2);
            //var plot = optics.getReachabilityPlot();
            for (var i = 0; i < clusters.length; i++) {
                //console.log("cluster number: "+ (i + 1))
                for (var j = 0; j < clusters[i].length; j++) {
                    //console.log(data[clusters[i][j]] )
                    if (clusters[i][j] == (data.length - 1)) {
                        clusternr = i + 1;
                    }
                }
            }
            console.log("Datensatz wurde dem Cluster: " + clusternr + " zugewiesen")

            var points = []
            points = logic.score(6, rawData)
            //console.log(points)
            db.insertScore(points, function () {
                db.insertRaw(JSON.stringify(rawData), req.body.time, function () {
                    res.send({state: true})
                })
            })
        })
    })
})
// console.log("strecke: "+strecke + " moveSpeed: "+moveSpeed+" inputSpeed: "+inputSpeed+" tab: "+tab+ " mouse: "+mouse+" time: "+ req.body.time)
//})
;

module.exports = router;
