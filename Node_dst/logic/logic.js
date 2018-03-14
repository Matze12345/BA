module.exports =  {
    score: function (data) {
        var pt = 0.00
        var points = []
        var skip = 0
        var cnt = 6

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
            if( data[i].type == "input" ) {
                if(data[i].keyCount != 0) {
                    pt = data[i].id


                    //pt = data.length - i + ( data[i].skip * 0.4 * data[i].time / 10000  )

                    include(data[i].id, function (result) {
                        if (result.state == false) {
                            //points.push({id: data[i].id, points: pt})
                            points.push({id: data[i].id, points: cnt})
                            cnt--
                        } else {
                            //points[result.index].points = points[result.index].points + pt
                        }
                    })
                }
            }
        }
        return points
    }
}

