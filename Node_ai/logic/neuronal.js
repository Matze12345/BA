var brain = require('brain.js')

var net = new brain.NeuralNetwork();

module.exports =  {
    train: function (data) {
        net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
                  {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
                    {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);
        //net.train(data)
        return
    },
    out: function (data) {
        return net.run(data)
    },
}