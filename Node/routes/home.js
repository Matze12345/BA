var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var dbRatings = new sqlite3.Database('./database/ratings.db');
var dbForms = new sqlite3.Database('./database/forms.db');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("GET home")
    //res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {

    console.log("POST home" + req.body.id + req.body.stars)

    if (req.body.id != 0)
    {
        dbRatings.serialize(function() {
            //dbRatings.run("CREATE TABLE ratings (id INT, stars INT)");

            var stmt = dbRatings.prepare("INSERT INTO ratings VALUES (?,?)");
            stmt.run(req.body.id, req.body.stars);
            stmt.finalize();

            dbRatings.each("SELECT id, stars FROM ratings", function(err, row) {
                console.log("Ratings: id="+row.id +" stars="+row.stars);
            });
        });
    }



    dbForms.serialize(function() {
      /* dbForms.run("CREATE TABLE forms (id INT, labelCol INT, inputCol INT, size TEXT)");

        var stmt = dbForms.prepare("INSERT INTO forms VALUES (?,?,?,?)");
        stmt.run("1", "2", "10", "small");
        stmt.finalize();
        var stmt = dbForms.prepare("INSERT INTO forms VALUES (?,?,?,?)");
        stmt.run("2", "4", "8", "");
        stmt.finalize();
        var stmt = dbForms.prepare("INSERT INTO forms VALUES (?,?,?,?)");
        stmt.run("3", "3", "6", "large");
        stmt.finalize();
        var stmt = dbForms.prepare("INSERT INTO forms VALUES (?,?,?,?)");
        stmt.run("4", "4", "5", "small");
        stmt.finalize(); */
        var sql = "SELECT id, labelCol, inputCol, size FROM forms WHERE id = ?";
        var id = (parseInt(req.body.id) + 1);
        dbForms.each(sql,[id], function(err, row) {
            console.log("User id : "+row.id, row.labelCol, row.inputCol, row.size);
            res.send({ id: row.id, labelCol: row.labelCol, inputCol: row.inputCol, size: row.size })
        });
    });


    //res.send({ id: 1, labelCol: 2, inputCol: 5, size: "large" })
});







module.exports = router;
