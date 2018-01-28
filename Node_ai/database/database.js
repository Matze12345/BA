var sqlite3 = require('sqlite3').verbose();
var dbNeuronal = new sqlite3.Database('./database/neuronal.db');

var selectNeuronal = function (callback) {
    var input = []
    var output = []
    dbNeuronal.serialize(() => {
        let sql = 'SELECT * FROM neuronal';
        dbNeuronal.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
               input.push(row)
            });

            let sql = 'SELECT * FROM result';
            dbNeuronal.all(sql, [], (err, rows) => {
                if (err) {
                    throw err;
                }
                rows.forEach((row) => {
                   output.push(row)
                });
                callback(input, output)
            })
        })
    })
}

var insertNeuronal = function (data, callback) {
    var stmt = dbNeuronal.prepare("INSERT INTO neuronal VALUES (?,?)");
    stmt.run(data.time, data.click);
    stmt.finalize();

    var stmt = dbNeuronal.prepare("INSERT INTO result VALUES (?)");
    stmt.run(data.result);
    stmt.finalize();

    callback();
}


module.exports =  {
    selectNeuronal: function (callback) {
        selectNeuronal(function (input, output) {

            const trainData = input.map((input,index) => {
                return {
                    input: input,
                    output: output[index]
                }
            });

            callback(trainData)
        })
    },
    insertNeuronal: function (data, callback) {
        console.log("inset")
        insertNeuronal(data, function () {
            console.log("inseted bitch")
            callback()
        })
    }
}