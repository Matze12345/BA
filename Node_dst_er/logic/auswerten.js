var db = require('../database/dbScore')

var clustering = require('density-clustering');
var kmeans = new clustering.KMEANS();
var optics = new clustering.OPTICS();


module.exports = {

    auswerten: function (callback) {

        db.selectRaw(function (raw, dataTime) {
            var data = []
            var min = []
            var max = []

            //console.log(JSON.parse(raw[1]).length)
            //console.log(time[1])

            // console.log(JSON.parse(raw[0]))

            for (var z = 0; z < raw.length; z++) {


                var rawData = JSON.parse(raw[z])
                var rawTime = dataTime[z]
                var x = []
                var y = []
                var strecke = 0
                var time = 0
                var inputSpeed = 0
                var mouse = 0
                var tab = 0
                for (var i = 0; i < rawData.length; i++) {
                    //Strecke & MoveSpeed
                    if (rawData[i].type == "move") {
                        if (rawData[i].key == "mouse") {
                            mouse++
                            time = time + ( rawData[i].end - rawData[i].start )
                            x = rawData[i].x
                            y = rawData[i].y
                            for (var j = 0; j < x.length - 1; j++) {
                                strecke = strecke + Math.sqrt(Math.pow(Math.abs(x[j]) - Math.abs(x[j + 1]), 2) + Math.pow(Math.abs(y[j]) - Math.abs(y[j + 1]), 2))
                            }
                        } else {
                            tab++
                        }
                    }
                    //Input speed
                    if (rawData[i].type == "input") {
                        if (rawData[i].keyCount > 0) {
                            inputSpeed = inputSpeed + (( rawData[i].end - rawData[i].start ) / rawData[i].keyCount )
                        }
                    }
                }
                var moveSpeed = strecke / time
                //console.log("strecke: " + strecke + " moveSpeed: " + moveSpeed + " inputSpeed: " + inputSpeed + " tab: " + tab + " mouse: " + mouse + " time: " + time)
                console.log(strecke + " ; " + moveSpeed + " ; " + inputSpeed + " ; " + tab + " ; " + mouse)


                if (min.length == 0 && max.length == 0) {
                    console.log("length ===== 0")
                    min.push(strecke, moveSpeed, inputSpeed, tab, mouse, rawTime)
                    max.push(strecke, moveSpeed, inputSpeed, tab, mouse, rawTime)
                } else {
                    //min
                    if (min[0] > strecke) {
                        min[0] = strecke
                    }
                    if (min[1] > moveSpeed) {
                        min[1] = moveSpeed
                    }
                    if (min[2] > inputSpeed) {
                        min[2] = inputSpeed
                    }
                    if (min[3] > tab) {
                        min[3] = tab
                    }
                    if (min[4] > mouse) {
                        min[4] = mouse
                    }
                    if (min[5] > rawTime) {
                        min[5] = rawTime
                    }

                    //max
                    if (max[0] < strecke) {
                        max[0] = strecke
                    }
                    if (max[1] < moveSpeed) {
                        max[1] = moveSpeed
                    }
                    if (max[2] < inputSpeed) {
                        max[2] = inputSpeed
                    }
                    if (max[3] < tab) {
                        max[3] = tab
                    }
                    if (max[4] < mouse) {
                        max[4] = mouse
                    }
                    if (max[5] < rawTime) {
                        max[5] = rawTime
                    }
                }

                data.push([strecke, moveSpeed, inputSpeed, tab, mouse, rawTime])
            }

            var normData = []
            for (var i = 0; i < data.length; i++) {
                normData.push([((data[i][0] - min[0]) / (max[0] - min[0])) * 10 , ((data[i][1] - min[1]) / (max[1] - min[1])), ((data[i][2] - min[2]) / (max[2] - min[2])), ((data[i][3] - min[3]) / (max[3] - min[3])), ((data[i][4] - min[4]) / (max[4] - min[4]))])
            }
          //  console.log(normData)

            //  console.log(max)
            //  console.log(min)
            // console.log(normData)

            console.log("####################################################################")


            var clusters = kmeans.run(normData, 3);
            console.log("####################################################################")


            //  var clusters = optics.run(data, 1000, 2);
            //var plot = optics.getReachabilityPlot();
            //console.log(clusters)

            for (var i = 0; i < clusters.length; i++) {
                 console.log('###############################    CLUSTER ' + (i + 1) + '      #####################################')
                for (var j = 0; j < clusters[i].length; j++) {
                    console.log(normData[clusters[i][j]])
                    /*   if (clusters[i][j] == (data.length - 1)) {
                     clusternr = i + 1;
                     } */
                }
            }


            callback();

        })
    }
}


