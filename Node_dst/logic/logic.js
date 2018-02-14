module.exports =  {
    score: function (data, elements) {
        var pt = 0.00
        var points = []

        function include(id, callback) {
            var result = { state: false, index: 0}
            for(var i = 0; i < points.length; i++) {
                if (points[i].id == id) {
                    result.state = true
                    result.index = i
                    break;
                }
            }
            callback(result)
        }

        for(var i = 0; i<data.length; i++) {
            if( data[i].input == true ) {
                pt = data.length - i + ( data[i].skip * 0.4 * data[i].time / 10000  )

                include(data[i].id, function (result) {
                    if (result.state == false) {
                        points.push({id: data[i].id, points: pt})
                    } else {
                        points[result.index].points = points[result.index].points + pt
                    }
                })
            }
        }
        return points
    }
}

