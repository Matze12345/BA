var sqlite3 = require('sqlite3').verbose();
var dbData = new sqlite3.Database('./database/data.db');
var dbRaw = new sqlite3.Database('./database/raw.db');
var dbNearest = new sqlite3.Database('./database/nearest.db');

var dbGeldData = new sqlite3.Database('./database/dataGeld.db');
var dbGeldRaw = new sqlite3.Database('./database/rawGeld.db');
var dbAutoData = new sqlite3.Database('./database/dataAuto.db');
var dbAutoRaw = new sqlite3.Database('./database/rawAuto.db');
var dbLagerData = new sqlite3.Database('./database/dataLager.db');
var dbLagerRaw = new sqlite3.Database('./database/rawLager.db');
var dbThermData = new sqlite3.Database('./database/dataTherm.db');
var dbThermRaw = new sqlite3.Database('./database/rawTherm.db');


var selectScore = function (callback) {
    var score = []
    dbData.serialize(() => {
        let sql = 'SELECT SUM(e1) as e1, SUM(e2) as e2, SUM(e3) as e3, SUM(e4) as e4, SUM(e5) as e5, SUM(e6) as e6 FROM data';
        dbData.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                score.push({id: 1, points: row.e1})
                score.push({id: 2, points: row.e2})
                score.push({id: 3, points: row.e3})
                score.push({id: 4, points: row.e4})
                score.push({id: 5, points: row.e5})
                score.push({id: 6, points: row.e6})
            });
            callback(score)
        });
    })
}

var insertScore = function (data, callback) {
    var insert = ""
    var values = ""
    for (var i = 0; i < data.length; i++) {
        insert = insert + "e" + data[i].id + ","
        values = values + data[i].points + ","
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

var selectGeldScore = function (callback) {
    var score = []
    dbGeldData.serialize(() => {
        let sql = 'SELECT SUM(e1) as e1, SUM(e2) as e2, SUM(e3) as e3, SUM(e4) as e4, SUM(e5) as e5 FROM dataGeld';
        dbGeldData.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                score.push({id: 1, points: row.e1})
                score.push({id: 2, points: row.e2})
                score.push({id: 3, points: row.e3})
                score.push({id: 4, points: row.e4})
                score.push({id: 5, points: row.e5})
            });
            callback(score)
        });
    })
}

var insertGeldScore = function (data, callback) {
    var insert = ""
    var values = ""
    for (var i = 0; i < data.length; i++) {
        insert = insert + "e" + data[i].id + ","
        values = values + data[i].points + ","
    }
    if (insert.length > 0 && values.length > 0) {
        insert = insert.substring(0, insert.length - 1);
        values = values.substring(0, values.length - 1);
        dbGeldData.serialize(() => {
            var stmt = dbGeldData.prepare("INSERT INTO dataGeld ( " + insert + " ) VALUES ( " + values + " )");
            stmt.run();
            stmt.finalize();
        })
    }
    callback();
}

var insertGeldRaw = function (raw, time, callback) {
    dbGeldRaw.serialize(() => {
        var stmt = dbGeldRaw.prepare("INSERT INTO rawGeld ( raw, time  ) VALUES ( ?, ? )");
        stmt.run(raw, time);
        stmt.finalize();
    })
    callback();
}

var selectAutoScore = function (callback) {
    var score = []
    dbAutoData.serialize(() => {
        let sql = 'SELECT SUM(e1) as e1, SUM(e2) as e2, SUM(e3) as e3, SUM(e4) as e4, SUM(e5) as e5 FROM dataAuto';
        dbAutoData.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                score.push({id: 1, points: row.e1})
                score.push({id: 2, points: row.e2})
                score.push({id: 3, points: row.e3})
                score.push({id: 4, points: row.e4})
                score.push({id: 5, points: row.e5})
            });
            callback(score)
        });
    })
}

var insertAutoScore = function (data, callback) {
    var insert = ""
    var values = ""
    for (var i = 0; i < data.length; i++) {
        insert = insert + "e" + data[i].id + ","
        values = values + data[i].points + ","
    }
    if (insert.length > 0 && values.length > 0) {
        insert = insert.substring(0, insert.length - 1);
        values = values.substring(0, values.length - 1);
        dbAutoData.serialize(() => {
            var stmt = dbAutoData.prepare("INSERT INTO dataAuto ( " + insert + " ) VALUES ( " + values + " )");
            stmt.run();
            stmt.finalize();
        })
    }
    callback();
}

var insertAutoRaw = function (raw, time, callback) {
    dbAutoRaw.serialize(() => {
        var stmt = dbAutoRaw.prepare("INSERT INTO rawAuto ( raw, time  ) VALUES ( ?, ? )");
        stmt.run(raw, time);
        stmt.finalize();
    })
    callback();
}

var selectThermScore = function (callback) {
    var score = []
    dbThermData.serialize(() => {
        let sql = 'SELECT SUM(e1) as e1, SUM(e2) as e2, SUM(e3) as e3 FROM dataTherm';
        dbThermData.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                score.push({id: 1, points: row.e1})
                score.push({id: 2, points: row.e2})
                score.push({id: 3, points: row.e3})
            });
            callback(score)
        });
    })
}

var insertThermScore = function (data, callback) {
    var insert = ""
    var values = ""
    for (var i = 0; i < data.length; i++) {
        insert = insert + "e" + data[i].id + ","
        values = values + data[i].points + ","
    }
    if (insert.length > 0 && values.length > 0) {
        insert = insert.substring(0, insert.length - 1);
        values = values.substring(0, values.length - 1);
        dbThermData.serialize(() => {
            var stmt = dbThermData.prepare("INSERT INTO dataTherm ( " + insert + " ) VALUES ( " + values + " )");
            stmt.run();
            stmt.finalize();
        })
    }
    callback();
}

var insertThermRaw = function (raw, time, callback) {
    dbThermRaw.serialize(() => {
        var stmt = dbThermRaw.prepare("INSERT INTO rawTherm ( raw, time  ) VALUES ( ?, ? )");
        stmt.run(raw, time);
        stmt.finalize();
    })
    callback();
}

var selectLagerScore = function (callback) {
    var score = []
    dbLagerData.serialize(() => {
        let sql = 'SELECT SUM(e1) as e1, SUM(e2) as e2, SUM(e3) as e3 FROM dataLager';
        dbLagerData.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                score.push({id: 1, points: row.e1})
                score.push({id: 2, points: row.e2})
                score.push({id: 3, points: row.e3})
            });
            callback(score)
        });
    })
}

var insertLagerScore = function (data, callback) {
    var insert = ""
    var values = ""
    for (var i = 0; i < data.length; i++) {
        insert = insert + "e" + data[i].id + ","
        values = values + data[i].points + ","
    }
    if (insert.length > 0 && values.length > 0) {
        insert = insert.substring(0, insert.length - 1);
        values = values.substring(0, values.length - 1);
        dbLagerData.serialize(() => {
            var stmt = dbLagerData.prepare("INSERT INTO dataLager ( " + insert + " ) VALUES ( " + values + " )");
            stmt.run();
            stmt.finalize();
        })
    }
    callback();
}

var insertLagerRaw = function (raw, time, callback) {
    dbLagerRaw.serialize(() => {
        var stmt = dbLagerRaw.prepare("INSERT INTO rawLager ( raw, time  ) VALUES ( ?, ? )");
        stmt.run(raw, time);
        stmt.finalize();
    })
    callback();
}


var selectRaw = function (callback) {
    var data = []
    var time = []
    dbLagerRaw.serialize(() => {
        let sql = 'SELECT * FROM raw';
        dbLagerRaw.all(sql, [], (err, rows) => {
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

module.exports = {
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
        insertNearest(strecke, moveSpeed, inputSpeed, tab, mouse, time, function () {
            callback()
        })
    },
    selectNearest: function (callback) {
        selectNearest(function (data) {
            callback(data)
        })
    },

    selectGeldScore: function (callback) {
        selectGeldScore(function (score) {
            callback(score)
        })
    },
    insertGeldScore: function (data, callback) {
        insertGeldScore(data, function () {
            callback()
        })
    },
    insertGeldRaw: function (raw, time, callback) {
        insertGeldRaw(raw.toString(), time, function () {
            callback()
        })
    },
    createGeld: function (callback) {
        dbGeldData.run("CREATE TABLE IF NOT EXISTS dataGeld( e1 FLOAT, e2 FLOAT, e3 FLOAT, e4 FLOAT, e5 FLOAT )")
        dbGeldRaw.run("CREATE TABLE IF NOT EXISTS rawGeld( raw TEXT, time FLOAT )")
        callback();
    },
    selectAutoScore: function (callback) {
        selectAutoScore(function (score) {
            callback(score)
        })
    },
    insertAutoScore: function (data, callback) {
        insertAutoScore(data, function () {
            callback()
        })
    },
    insertAutoRaw: function (raw, time, callback) {
        insertAutoRaw(raw.toString(), time, function () {
            callback()
        })
    },
    createAuto: function (callback) {
        dbAutoData.run("CREATE TABLE IF NOT EXISTS dataAuto( e1 FLOAT, e2 FLOAT, e3 FLOAT, e4 FLOAT, e5 FLOAT )")
        dbAutoRaw.run("CREATE TABLE IF NOT EXISTS rawAuto( raw TEXT, time FLOAT )")
        callback();
    },
    selectThermScore: function (callback) {
        selectThermScore(function (score) {
            callback(score)
        })
    },
    insertThermScore: function (data, callback) {
        insertThermScore(data, function () {
            callback()
        })
    },
    insertThermRaw: function (raw, time, callback) {
        insertThermRaw(raw.toString(), time, function () {
            callback()
        })
    },
    createTherm: function (callback) {
        dbThermData.run("CREATE TABLE IF NOT EXISTS dataTherm( e1 FLOAT, e2 FLOAT, e3 FLOAT )")
        dbThermRaw.run("CREATE TABLE IF NOT EXISTS rawTherm( raw TEXT, time FLOAT )")
        callback();
    },
    selectLagerScore: function (callback) {
        selectLagerScore(function (score) {
            callback(score)
        })
    },
    insertLagerScore: function (data, callback) {
        insertLagerScore(data, function () {
            callback()
        })
    },
    insertLagerRaw: function (raw, time, callback) {
        insertLagerRaw(raw.toString(), time, function () {
            callback()
        })
    },
    createLager: function (callback) {
        dbLagerData.run("CREATE TABLE IF NOT EXISTS dataLager( e1 FLOAT, e2 FLOAT, e3 FLOAT )")
        dbLagerRaw.run("CREATE TABLE IF NOT EXISTS rawLager( raw TEXT, time FLOAT )")
        callback();
    }
}