var express = require('express');
var router = express.Router();
var neuronal = require('../logic/neuronal')


// beim starten vom server train machen mit allen daten  -- angefangen
//beim clicken daten abspeichern in db  -- aber erst nachdem ja bzw nein gedrückt wurde
//
router.post('/', function(req, res, next) {
    var output = neuronal.out({ r: 1, g: 0.4, b: 0 });
    console.log(output)
});

module.exports = router;