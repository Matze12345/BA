var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var dbData = new sqlite3.Database('./database/data.db');

var clustering = require('density-clustering');
var kmeans = new clustering.KMEANS();


    var add = function (ele1, ele2, ele3, ele4, ele5, ele6, callback) {
        dbData.serialize(() => {
            var stmt = dbData.prepare("INSERT INTO data VALUES (?,?,?,?,?,?)");
                stmt.run(ele1, ele2, ele3, ele4, ele5, ele6);
                stmt.finalize();
            callback();
        })
    }

    var read = function (callback) {
        var data = 0;
        dbData.serialize(() => {
            let sql = 'SELECT SUM(ele1) as ele1, SUM(ele2) as ele2, SUM(ele3) as ele3, SUM(ele4) as ele4, SUM(ele5) as ele5, SUM(ele6) as ele6 FROM data';
            dbData.all(sql, [], (err, rows) => {
              if (err) {
                throw err;
              }
              rows.forEach((row) => {
                    data = row
              });
              callback(data)
            });
        })
    }


router.post('/', function(req, res, next) {
    add(req.body.ele1, req.body.ele2, req.body.ele3, req.body.ele4, req.body.ele5, req.body.ele6, function () {
        read(function (data) {
            console.log(data)

            res.send({status: ""})
        })
    })
});

module.exports = router;
