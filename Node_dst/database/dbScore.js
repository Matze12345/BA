var sqlite3 = require('sqlite3').verbose();
var dbData = new sqlite3.Database('./database/data.db');
var dbRaw = new sqlite3.Database('./database/raw.db');
var dbNearest = new sqlite3.Database('./database/nearest.db');


var selectScore = function (callback) {
    var score = []
    dbData.serialize(() => {
        let sql = 'SELECT SUM(e1) as e1, SUM(e2) as e2, SUM(e3) as e3, SUM(e4) as e4, SUM(e5) as e5, SUM(e6) as e6 FROM data';
        dbData.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                score.push({ id: 1, points: row.e1 })
                score.push({ id: 2, points: row.e2 })
                score.push({ id: 3, points: row.e3 })
                score.push({ id: 4, points: row.e4 })
                score.push({ id: 5, points: row.e5 })
                score.push({ id: 6, points: row.e6 })
            });
            callback(score)
        });
    })
}

var insertScore = function (data, callback) {
    var insert = ""
    var values = ""
    for(var i = 0; i<data.length; i++){
        insert = insert + "e" + data[i].id +","
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

var insertRaw = function (raw, time, callback) {
    dbRaw.serialize(() => {
        var stmt = dbRaw.prepare("INSERT INTO raw ( raw, time  ) VALUES ( ?, ? )");
        stmt.run(raw, time);
        stmt.finalize();
    })
    callback();
}

var selectRaw = function (callback) {
    var data = []
    var time = []
    dbRaw.serialize(() => {
            let sql = 'SELECT * FROM raw';
            dbRaw.all(sql, [], (err, rows) => {
              if (err) {
                throw err;
              }
              rows.forEach((row) => {
                    data.push(row.raw)
                    time.push(row.time)
              });
              callback(data[1], time[1])
            });
     })
}

var insertNearest = function (strecke, moveSpeed, inputSpeed, tab, mouse, time, callback) {
     dbNearest.serialize(() => {
        var stmt = dbNearest.prepare("INSERT INTO nearest ( strecke, moveSpeed, inputSpeed, tab, mouse, time  ) VALUES ( ?, ?, ?, ?, ?, ? )");
        stmt.run(strecke, moveSpeed, inputSpeed, tab, mouse, time);
        stmt.finalize();
    })
    callback();
}

var selectNearest = function (callback) {
     var data = []
    dbNearest.serialize(() => {
            let sql = 'SELECT * FROM nearest';
            dbNearest.all(sql, [], (err, rows) => {
              if (err) {
                throw err;
              }
              rows.forEach((row) => {
                    data.push([row.strecke, row.moveSpeed, row.inputSpeed, row.tab, row.mouse, row.time])
              });
              callback(data)
            });
     })
}

module.exports =  {
    selectScore: function (callback) {
        selectScore(function (score) {
            callback(score)
        })
    },
    insertScore: function (data, callback) {
        insertScore(data, function () {
            callback()
        })
    },
    insertRaw: function (raw, time, callback) {

        //console.log(raw.toString(), time)
        insertRaw(raw.toString(), time, function () {
            callback()
        })
    },
    selectRaw: function (callback) {
        selectRaw(function (raw, time) {
            callback(raw, time)
        })
    },
    insertNearest: function (strecke, moveSpeed, inputSpeed, tab, mouse, time, callback) {
        insertNearest(strecke, moveSpeed, inputSpeed, tab, mouse, time,function () {
            callback()
        })
    },
    selectNearest: function (callback) {
        selectNearest(function (data) {
            callback(data)
        })
    }
}