var express = require('express');
var app = express();
var router = express.Router();


/* GET home page. */
router.get('/home', function(req, res, next) {
    console.log("GET home")
    //res.render('index', { title: 'Express' });
});

app.post('/home', function(req, res, next) {
    console.log("POST home")
    //res.render('index', { title: 'Express' });
});


module.exports = router;
