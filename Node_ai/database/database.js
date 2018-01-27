var sqlite3 = require('sqlite3').verbose();
var dbNeuronal = new sqlite3.Database('./database/neuronal.db');

var selectNeuronal = function (callback) {
    var data = []
    dbNeuronal.serialize(() => {
        let sql = 'SELECT * FROM neuronal';
        dbNeuronal.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
               data.push(row)
            });
            callback(data)
        })
    })
}

module.exports =  {
    selectNeuronal: function (callback) {
        selectNeuronal(function (data) {
            callback(data)
        })
    },
}