var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var dbRatings = new sqlite3.Database('./database/ratings.db');
var dbForms = new sqlite3.Database('./database/forms.db');
var anzForms = null;

router.post('/', function(req, res, next) {


  /*  dbForms.serialize(function () {
            var sql = "SELECT COUNT(*) as cnt FROM forms";
            dbForms.each(sql, function (err, row) {
               anzForms = row.cnt;
            });
        }); */


    if (req.body.id != 0)
    {
        dbRatings.serialize(function() {
            var stmt = dbRatings.prepare("INSERT INTO ratings VALUES (?,?)");
            stmt.run(req.body.id, req.body.stars);
            stmt.finalize();
        });
    }

    if (req.body.id < 4) {
        dbForms.serialize(function () {
            var sql = "SELECT id, labelCol, inputCol, size, color FROM forms WHERE id = ?";
            var id = (parseInt(req.body.id) + 1);
            dbForms.each(sql, [id], function (err, row) {
               // console.log("User id : " + row.id, row.labelCol, row.inputCol, row.size);
                res.send({id: row.id, labelCol: row.labelCol, inputCol: row.inputCol, color: row.color, size: row.size, hide:false, msg:""})
            });
        });
    }
    else{
        res.send({id: "", labelCol: "", inputCol: "", size: "", color: '#42f45c', hide: true, msg: "Danke fürs bewerten!"})
    }
});

module.exports = router;
