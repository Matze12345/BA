var express = require('express');
var router = express.Router();
var neuronal = require('../logic/neuronal')
var db = require('../database/database')

const size = (result) => {
    if (result == 1){
        return "big"
    }else{
        return "small"
    }
}
// beim starten vom server train machen mit allen daten  -- angefangen
//beim clicken daten abspeichern in db  -- aber erst nachdem ja bzw nein gedrückt wurde
//
router.post('/', function(req, res, next) {
    //var output = neuronal.out({ r: 1, g: 0.4, b: 0 });
     if(req.body.train == false){
        var output = neuronal.out({ time: req.body.time, click: req.body.click });
        console.log(output)
        res.send({size: size(Math.round(output.output))})
    }else{
        db.insertNeuronal(req.body)
        res.send({size: "small"})
    }
});

module.exports = router;