var express = require('express');
var router = express.Router();
const databaseScript = require('../server_modules/databaseScript');

router.get('/', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT * FROM plants', function(rows) {
                console.log("Returned rows : ", rows);
                databaseScript.end();

                res.send(rows);
            });
        });
    });
});

router.get('/names', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT plants.Id as Id, plants.Name as Name FROM plants', function(rows) {
                console.log("Returned rows : ", rows);
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No plants have been found");
                }
            });
        });
    });
});

router.get('/descriptions', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT plants.Id as Id, plants.Description as Description FROM plants', function(rows) {
                console.log("Returned rows : ", rows);
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No plants have been found");
                }
            });
        });
    });
});

router.get('/coordinates', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT plants.Id as Id, plants.Coordinates as Coordinates FROM plants', function(rows) {
                console.log("Returned rows : ", rows);
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No plants have been found");
                }
            });
        });
    });
});

router.get('/add', function(req, res, next) {
    databaseScript.init(function () {
        databaseScript.connect(function () {
            databaseScript.query('SELECT pillars.Id as PillarId FROM pillars', function (pillarsRow) {

                var pillarjsonarray = JSON.parse(pillarsRow);
                var pillararray = [];

                pillararray.push(0);

                for (var i = 0; i < pillarjsonarray.length; i++) {
                    pillararray.push(pillarjsonarray[i].PillarId);
                }
                console.log(pillararray);

                res.render('plants', {title: 'Express', pillars: pillararray});

            });
        });
    });
});

router.post('/upload', function(req, res, next) {

    var name = req.body.nameInput;
    var description = req.body.descriptionInput;
    var coordinateX = req.body.coordinateXInput;
    var coordinateY = req.body.coordinateYInput;
    var pillarId = req.body.pillarIdInput;

    if (!name) {
        res.end("Error : The name is empty");
    }
    else if (!description) {
        res.end("Error : The description is empty");
    }
    else if (isNaN(coordinateX) || isNaN(coordinateY)) {
        res.end("Error : Coordinates are not numbers");
    }
    else {
        databaseScript.init(function () {
            databaseScript.connect(function () {
                databaseScript.query('INSERT INTO plants (Name, Description, CoordinateX, CoordinateY, PillarId) VALUES ("' + name + '", "' + description + '", ' + coordinateX + ', ' + coordinateY + ', ' + pillarId + ')', function () {
                    databaseScript.end();
                    res.end("The data has been uploaded");
                });
            });
        });
    }
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        databaseScript.init(function () {
            databaseScript.connect(function () {
                databaseScript.query('SELECT * FROM plants WHERE plants.Id = ' + id, function (rows) {
                    console.log("Returned rows : ", rows);
                    databaseScript.end();

                    if (rows.localeCompare("[]")) {
                        res.send(rows);
                    } else {
                        res.send("No plants with this Id have been found");
                    }
                });
            });
        });
    }
});

router.get('/:id/coordinates', function(req, res, next) {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        databaseScript.init(function () {
            databaseScript.connect(function () {
                databaseScript.query('SELECT plants.Coordinates FROM plants WHERE plants.Id = ' + id, function (rows) {
                    console.log("Returned rows : ", rows);
                    databaseScript.end();

                    if (rows.localeCompare("[]")) {
                        res.send(rows);
                    } else {
                        res.send("No plants with this Id have been found");
                    }
                });
            });
        });
    }
});

router.get('/:id/images', function(req, res, next) {
   var id = parseInt(req.params.id);

   if (isNaN(id)) {
       databaseScript.init(function () {
           databaseScript.connect(function () {
               databaseScript.query('SELECT * FROM images WHERE images.PlantId = ' + id, function (rows) {
                   console.log("Returned rows : ", rows);
                   databaseScript.end();

                   if (rows.localeCompare("[]")) {
                       res.send(rows);
                   } else {
                       res.send("No images with this PlantId have been found");
                   }
               });
           });
       });
   }
});

module.exports = router;