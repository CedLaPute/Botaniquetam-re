var express = require('express');
var router = express.Router();
var multer = require('multer');

var datenow = Date.now();

var storage = multer.diskStorage({
   destination: function(req, file, callback) {
       callback(null, './public/images');
   },
    filename: function(req, file, callback) {
       callback(null, datenow + file.originalname);
    }
});

var upload = multer({storage: storage}).array('image');

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

                    res.render('upload', {title: 'Express', pillars: pillararray, plants: plantarray});
                });
            });
        });
    });
});

router.post('/image', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file");
        }

        var pillarId = req.body.selectPillarId;
        var plantId = req.body.selectPlantId;

        var filenames = req.files.map(function(file) {
           return file.filename;
        });

        databaseScript.init(function() {
            databaseScript.connect(function() {

                for (i in filenames) {
                    databaseScript.query('INSERT INTO images (Name, PlantId, PillarId) VALUES ("' + filenames[i] + '", ' + plantId + ', ' + pillarId + ')', function(){});
                }
                databaseScript.end();
            });
        });

        res.end("Files have been uploaded");
   });
});

module.exports = router;