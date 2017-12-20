var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var dbData = new sqlite3.Database('./database/data.db');

var clustering = require('density-clustering');
var kmeans = new clustering.KMEANS();


    var add = function (click, time, callback) {
        dbData.serialize(() => {
            var stmt = dbData.prepare("INSERT INTO data VALUES (?,?)");
                stmt.run(click, time);
                stmt.finalize();
            callback();
        })
    }

    var read = function (callback) {
        var data = []
        dbData.serialize(() => {
            let sql = 'SELECT * FROM data';
            dbData.all(sql, [], (err, rows) => {
              if (err) {
                throw err;
              }
              rows.forEach((row) => {
                    data.push([row.click, row.time])
              });
              callback(data)
            });
        })
    }


router.post('/', function(req, res, next) {
    var clusternr = 0;
    add(req.body.click, req.body.time, function () {
        read(function (data) {

            var clusters = kmeans.run(data, 4);
            //console.log(clusters)
            for (var i = 0; i < clusters.length; i++){
                //console.log("cluster number: "+ (i + 1))
                for(var j = 0; j < clusters[i].length; j++){
                    //console.log(data[clusters[i][j]] )
                    if(clusters[i][j] == (data.length-1)){
                        clusternr = i + 1;
                    }
                }
            }
            console.log("Datensatz wurde dem Cluster: " + clusternr + " zugewiesen")

            var optics = new clustering.OPTICS();
            // parameters: 2 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
            var clusters = optics.run(data, 50000, 2);
            //var plot = optics.getReachabilityPlot();
            console.log(clusters);

            res.send({status: ""})
        })
    })
});

module.exports = router;
