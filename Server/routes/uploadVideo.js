var express = require('express');
var router = express.Router();
const databaseScript = require('../server_modules/databaseScript');

router.get('/', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function () {
            databaseScript.query('SELECT pillars.Id as PillarId FROM pillars', function (pillarsRow) {

                var pillarjsonarray = JSON.parse(pillarsRow);
                var pillararray = [];

                pillararray.push(0);

                for (var i = 0; i < pillarjsonarray.length; i++) {
                    pillararray.push(pillarjsonarray[i].PillarId);
                }

                databaseScript.query('SELECT plants.Id as PlantId FROM plants', function (plantsRow) {

                    var plantjsonarray = JSON.parse(plantsRow);
                    var plantarray = [];

                    plantarray.push(0);

                    for (var i = 0; i < plantjsonarray.length; i++) {
                        plantarray.push(plantjsonarray[i].PlantId);
                    }

                    databaseScript.end();

                    res.render('uploadVideo', {title: 'Express', plants: plantarray, pillars: pillararray});
                });
            });
        });
    });
});

router.post('/upload', function(req, res) {

    var pillarId = req.body.selectPillarId;
    var plantId = req.body.selectPlantId;
    var url = req.body.UrlInput;
    
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (!match) {
        res.end("Url is not a youtube url");
    } else if (isNaN(pillarId)) {
        res.end("PillarId is not a number");
    } else if (isNaN(plantId)) {
        res.end("PlantId is not a number");
    } else if (!url) {
        res.end("URL is empty");
    }
    else {
        databaseScript.init(function () {
            databaseScript.connect(function () {
                databaseScript.query('INSERT INTO videos (URL, PlantId, PillarId) VALUES ("' + url + '", ' + plantId + ', ' + pillarId + ')', function () {
                    databaseScript.end();
                });
            });
        });

        res.end("Files have been uploaded");
    }
});

module.exports = router;