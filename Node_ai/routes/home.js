var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var dbData = new sqlite3.Database('./database/data.db');
var dbRaw = new sqlite3.Database('./database/raw.db');

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

    var raw = function (raw, time, callback) {
        dbRaw.serialize(() => {
            var stmt = dbRaw.prepare("INSERT INTO raw ( raw, time  ) VALUES ( ?, ? )");
            stmt.run(raw, time);
            stmt.finalize();
        })
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
                    array.push({ id: 1, points: row.ele1 })
                    array.push({ id: 2, points: row.ele2 })
                    array.push({ id: 3, points: row.ele3 })
                    array.push({ id: 4, points: row.ele4 })
                    array.push({ id: 5, points: row.ele5 })
                    array.push({ id: 6, points: row.ele6 })
              });
              callback(data, array)
            });
        })
    }

router.get('/', function(req, res, next) {
    var form = []

    function sort(a,b) {
      if (a.points < b.points)
        return -1;
      if (a.points > b.points)
        return 1;
      return 0;
    }

    read(function (data, array) {
            array.sort(sort)

            for(var j = array.length; j>0; j--){
                form.push(array[j-1].id - 1)
            }

            console.log(form)
            res.send({form: form, status: false})
        })
});

router.post('/', function(req, res, next) {
    var click = req.body.click
    var points = []
    var pt = 0.00
    var data = req.body.data

    //console.log(JSON.stringify(req.body.data))

    function include(id, callback) {
        var result = { state: false, index: 0}
        for(var i = 0; i < points.length; i++) {
            if (points[i].id == id) {
                result.state = true
                result.index = i
                break;
            }
        }
        callback(result)
    }

    for(var i = 0; i<data.length; i++) {
        if( data[i].input == true ) {
            pt = data.length - i + ( data[i].skip * 0.5 ) + ( data[i].time / 10000  )

            include(data[i].id, function (result) {
                if (result.state == false) {
                    points.push({id: data[i].id, points: pt})
                } else {
                    points[result.index].points = points[result.index].points + pt
                }
            })
        }
    }
    console.log(points)
    add(points, click, function () {
        raw(JSON.stringify(req.body.data), req.body.time)
        {
            res.send({state: true})
        }
    })
});

module.exports = router;
