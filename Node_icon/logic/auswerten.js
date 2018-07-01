var db = require('../database/dbScore')

var clustering = require('density-clustering');
var kmeans = new clustering.KMEANS();
var optics = new clustering.OPTICS();
var dbscan = new clustering.DBSCAN();

var skmeans = require("skmeans");

module.exports = {

    auswerten: function (callback) {


        db.selectSet3Raw(function (raw, dataTime) {
            var data = []
            var min = []
            var max = []

            //console.log(JSON.parse(raw[1]).length)
            //console.log(time[1])
            // console.log(JSON.parse(raw[0]))

            var wrongCol = 0
            var wrongGro = 0
            var wrongKle = 0
            var wrongDel = 0

            var timeCol = 0
            var timeGro = 0
            var timeKle = 0
            var timeDel = 0

            var streckeCol = 0
            var streckeGro = 0
            var streckeKle = 0
            var streckeDel = 0

            for (var z = 0; z < raw.length; z++) {


                var rawData = JSON.parse(raw[z])
                var x = []
                var y = []
                var strecke = 0
                var time = 0
                var wrong = 0


                for (var i = 0; i < rawData.length; i++) {
                    if (rawData[i].type == "input") {
                        if (rawData[i].answered == true) {
                            switch (rawData[i].id) {
                                case "1":
                                    wrongCol = wrongCol + wrong
                                    timeCol = timeCol + time
                                    streckeCol = streckeCol + strecke
                                    break;
                                case "2":
                                    wrongKle = wrongKle + wrong
                                    timeKle = timeKle + time
                                    streckeKle = streckeKle + strecke
                                    break;
                                case "3":
                                    wrongGro = wrongGro + wrong
                                    timeGro = timeGro + time
                                    streckeGro = streckeGro + strecke
                                    break;
                                case "4":
                                    wrongDel = wrongDel + wrong
                                    timeDel = timeDel + time
                                    streckeDel = streckeDel + strecke
                                    break;
                            }
                            time = 0
                            wrong = 0
                            strecke = 0
                        } else if (rawData[i].answered == false) {
                            console.log("wrong")
                            wrong = wrong + 1
                        }
                    } else {
                        x = rawData[i].x
                        y = rawData[i].y
                        for (var j = 0; j < x.length - 1; j++) {
                            strecke = strecke + Math.sqrt(Math.pow(Math.abs(x[j]) - Math.abs(x[j + 1]), 2) + Math.pow(Math.abs(y[j]) - Math.abs(y[j + 1]), 2))
                        }
                        time = time + rawData[i].end - rawData[i].start
                    }
                }
                //console.log("strecke: " + strecke + " moveSpeed: " + moveSpeed + " inputSpeed: " + inputSpeed + " tab: " + tab + " mouse: " + mouse + " time: " + time)
            }
            console.log("Color: " + wrongCol + " ; " + timeCol + " ; " + streckeCol)
            console.log("Klein: " + wrongKle + " ; " + timeKle + " ; " + streckeKle)
            console.log("Groß: " + wrongGro + " ; " + timeGro + " ; " + streckeGro)
            console.log("Delete: " + wrongDel + " ; " + timeDel + " ; " + streckeDel)

            callback();

        });
    }



    /*       db.selectSet1Raw(function (raw, dataTime) {
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
     var falsch = 0
     var mouse = 0
     var tab = 0
     var inputSpeed = 0
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
     }
     }
     //Input speed
     if (rawData[i].type == "input") {
     if (rawData[i].answered == false) {
     falsch++
     }
     }
     }
     var moveSpeed = strecke / time
     //console.log("strecke: " + strecke + " moveSpeed: " + moveSpeed + " inputSpeed: " + inputSpeed + " tab: " + tab + " mouse: " + mouse + " time: " + time)
     console.log(strecke + " ; " + moveSpeed + " ; " + falsch + " ; " + mouse)


     if (min.length == 0 && max.length == 0) {
     console.log("length ===== 0")
     min.push(strecke, moveSpeed, falsch, mouse, rawTime)
     max.push(strecke, moveSpeed, falsch, mouse, rawTime)
     } else {
     //min
     if (min[0] > strecke) {
     min[0] = strecke
     }
     if (min[1] > moveSpeed) {
     min[1] = moveSpeed
     }
     if (min[2] > falsch) {
     min[2] = falsch
     }
     if (min[3] > mouse) {
     min[3] = mouse
     }
     if (min[4] > rawTime) {
     min[4] = rawTime
     }

     //max
     if (max[0] < strecke) {
     max[0] = strecke
     }
     if (max[1] < moveSpeed) {
     max[1] = moveSpeed
     }
     if (max[2] < falsch) {
     max[2] = falsch
     }
     if (max[3] < mouse) {
     max[3] = mouse
     }
     if (max[4] < rawTime) {
     max[4] = rawTime
     }
     }

     data.push([strecke, moveSpeed, falsch, mouse, rawTime])
     }


     var normData = []
     var normOutData = []
     for (var i = 0; i < data.length; i++) {
     normData.push([((data[i][0] - min[0]) / (max[0] - min[0])), ((data[i][1] - min[1]) / (max[1] - min[1])), ((data[i][2] - min[2]) / (max[2] - min[2])), ((data[i][3] - min[3]) / (max[3] - min[3]))])
     //normData.push([((data[i][0] - min[0]) / (max[0] - min[0])), ((data[i][1] - min[1]) / (max[1] - min[1])), ((data[i][2] - min[2]) / (max[2] - min[2])), 0, ((data[i][4] - min[4]) / (max[4] - min[4]))])
     //  normOutData.push([Math.round(((data[i][0] - min[0]) / (max[0] - min[0]))*1000)/1000+";"+ Math.round(((data[i][1] - min[1]) / (max[1] - min[1]))*1000)/1000+";"+ Math.round(((data[i][2] - min[2]) / (max[2] - min[2]))*1000)/1000+";"+ Math.round(((data[i][3] - min[3]) / (max[3] - min[3]))*1000)/1000+";"+ Math.round(((data[i][4] - min[4]) / (max[4] - min[4]))*1000)/1000])
     normOutData.push([Math.round(((data[i][0] - min[0]) / (max[0] - min[0])) * 1000) / 1000 + ";" + Math.round(((data[i][1] - min[1]) / (max[1] - min[1])) * 1000) / 1000 + ";" + Math.round(((data[i][2] - min[2]) / (max[2] - min[2])) * 1000) / 1000 + ";" + Math.round(((data[i][3] - min[3]) / (max[3] - min[3])) * 1000) / 1000])
     }
     console.log(data)

     //  console.log(max)
     //  console.log(min)
     // console.log(normData)


     /*    var res = skmeans(normData, 4, ["kmpp"], [20000])

     var res = skmeans(normData, 4, [[ 0, 0, 0.2894590972991365, 0, 0.23529411764705882],
     [1,0.48869234924517113,0.17801444477695727,0,0.4117647058823529],
     [0.3490197434864035,0.37453329620947545,0.03905828199092338,0,0.17647058823529413],
     [0.3447312407560549,0.3844999378828552,0.26494284865128725,0.5,0]], [20000])

     console.log(res)
     console.log("################################### CLUSTER 1 #################################")
     console.log(res.idxs)
     for (var i = 0; i < res.idxs.length; i++) {
     if (res.idxs[i] == '0') {
     console.log(normData[i].toString())
     }
     }
     console.log("################################### CLUSTER 2 #################################")
     for (var i = 0; i < res.idxs.length; i++) {
     if (res.idxs[i] == "1") {
     console.log(normData[i].toString())
     }
     }
     console.log("################################### CLUSTER 3 #################################")
     for (var i = 0; i < res.idxs.length; i++) {
     if (res.idxs[i] == "2") {
     console.log(normData[i].toString())
     }
     }
     console.log("################################### CLUSTER 4 #################################")
     for (var i = 0; i < res.idxs.length; i++) {
     if (res.idxs[i] == "3") {
     console.log(normData[i].toString())
     }
     }
     */
    /*

     var clusters = kmeans.run(normData, 4);
     console.log("####################################################################")


     //var clusters = dbscan.run(normData, 0.2, 2);

     //console.log(normData)
     //  var clusters = optics.run(data, 9000, 3);
     //var plot = optics.getReachabilityPlot();
     //console.log(clusters)

     for (var i = 0; i < clusters.length; i++) {
     console.log('###############################    CLUSTER ' + (i + 1) + " Länge " + clusters[i].length + '      #####################################')
     for (var j = 0; j < clusters[i].length; j++) {
     console.log(data[clusters[i][j]].toString())
     //  if (clusters[i][j] == (data.length - 1)) {
     //    clusternr = i + 1;
     //  }
     }
     }

     //console.log('###############################    LAST CLUSTER ' + " Länge " + dbscan.noise.length + '      #####################################')
     //for (var i = 0; i < dbscan.noise.length; i++) {
     //    console.log(data[dbscan.noise[i]])
     // }
     //      console.log(dbscan.noise)

     callback();

     }) */
}


