var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var dbData = new sqlite3.Database('./database/data.db');

    var add = function (data, raw, callback) {
        var insert = ""
        var values = ""
        for(var i = 0; i<data.length; i++){
            insert = insert +"ele"+ data[i].id +","
            values = values + data[i].points +","
        }
        if (insert.length > 0 && values.length > 0) {
            insert = insert.substring(0, insert.length - 1);
            values = values.substring(0, values.length - 1);
            dbData.serialize(() => {
                var stmt = dbData.prepare("INSERT INTO data ( " + insert + " ) VALUES ( " + values + " )");
                stmt.run();
                stmt.finalize();
            })
        }
        callback();
    }


    var read = function (callback) {
        var data = 0;
        var array = []
        dbData.serialize(() => {
            let sql = 'SELECT SUM(ele1) as ele1, SUM(ele2) as ele2, SUM(ele3) as ele3, SUM(ele4) as ele4, SUM(ele5) as ele5, SUM(ele6) as ele6 FROM data';
            dbData.all(sql, [], (err, rows) => {
              if (err) {
                throw err;
              }
              rows.forEach((row) => {
                    data = row
                    array.push(row.ele1)
                    array.push(row.ele2)
                    array.push(row.ele3)
                    array.push(row.ele4)
                    array.push(row.ele5)
                    array.push(row.ele6)
              });
              callback(data, array)
            });
        })
    }


router.post('/', function(req, res, next) {
    var form = []
    var click = req.body.click
    var points = []
    var pt = 0

    function sortNumber(a,b) {
        return a - b;
    }

    for(var i = 0; i<click.length; i++) {
        pt = click.length - i
        points[click[i].id - 1] = { id: click[i].id, points: pt }
    }

    add(points, click, function () {
        console.log("added new row")
        read(function (data, array) {
            console.log(data)
            array.sort(sortNumber)

            for (var i = array.length; i>=0; i--){
                switch(array[i]){
                    case data.ele1:
                        form.push(0)
                        break
                    case data.ele2:
                        form.push(1)
                        break
                    case data.ele3:
                        form.push(2)
                        break
                    case data.ele4:
                        form.push(3)
                        break
                    case data.ele5:
                        form.push(4)
                        break
                    case data.ele6:
                        form.push(5)
                        break
                }
            }
            console.log(form)
            res.send({form: form})
        })
    })
});

module.exports = router;
