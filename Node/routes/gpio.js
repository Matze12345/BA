var express = require('express');
var router = express.Router();

var gpio = require("pi-gpio");



/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('in get request');
    //Gpio abfragen und an server senden
    res.send( { data: [ { type: 'LED', gpio: '1', state: 'off'  },  { type: 'LED', gpio: '2', state: 'off'  },
                        { type: 'LED', gpio: '3', state: 'off'  },  { type: 'LED', gpio: '4', state: 'off'  },
                        { type: 'LED', gpio: '5', state: 'off'  }] } ); //aktueller status senden
});

router.post('/', function(req, res, next) {
    console.log('in post request' + req.body.state);
    //gpio.setup(req.body.gpio, gpio.DIR_OUT, req.body.state);
    //gpio.write(pin, 1, off);

    gpio.open(18, "output", function(err) {		// Open pin 16 for output
        gpio.write(18, 1, function() {			// Set pin 16 high (1)
            gpio.close(18);						// Close pin 16
        });
    });

    res.send( { status: 1 } ); //ergebnis senden, erfolgreich = 1
});

module.exports = router;
