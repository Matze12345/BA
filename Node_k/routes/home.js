var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var dbData = new sqlite3.Database('./database/data.db');



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
    add(req.body.click, req.body.time, function () {
        read(function (data) {
            res.send({status: ""})
        })
    })
});

module.exports = router;
