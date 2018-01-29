var express = require('express');
var router = express.Router();
var neuronal = require('../logic/neuronal')
var db = require('../database/database')

const open = (result) => {
    if (result == 1){
        return true
    }else{
        return false
    }
}

router.post('/', function(req, res, next) {
    console.log(req.body)
    var data = []
    data.push(Math.round(req.body.time)/10000)
    data.push(Math.round(req.body.click)/10000)
    var output = neuronal.out(data);
    console.log(output[0])
    res.send({ open: open(Math.round(output[0])) })
});

module.exports = router;