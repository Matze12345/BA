var express = require('express');
var router = express.Router();
var neuronal = require('../logic/neuronal')
var db = require('../database/dbNeuronal')

router.post('/', function(req, res, next) {
    console.log(req.body)
    db.insertNeuronal(req.body, function () {
        db.selectNeuronal(function (data) {
            neuronal.train(data)
        })
    })

    if (req.body.result == true){
        res.send({size: "big"})
    }
    else{
        res.send({size: "small"})
    }
});

module.exports = router;