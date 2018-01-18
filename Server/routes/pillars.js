var express = require('express');
var router = express.Router();
const databaseScript = require('../server_modules/databaseScript');

router.get('/', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT * FROM pillars', function(rows) {
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No pillars have been found");
                }
            });
        });
    });
});

router.get('/names', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT pillars.Id as Id, pillars.Name as Name FROM pillars', function(rows) {
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No pillars have been found");
                }
            });
        });
    });
});

router.get('/coordinates', function(req, res, next) {
   databaseScript.init(function() {
       databaseScript.connect(function() {
           databaseScript.query('SELECT pillars.Id as Id, pillars.CoordinateX as CoordinateX, pillars.CoordinateY as CoordinateY FROM pillars', function(rows) {
               databaseScript.end();

               if (rows.localeCompare("[]")) {
                   res.send(rows);
               } else {
                   res.send("No pillars have been found");
               }
           });
       });
   });
});

router.get('/descriptions', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT pillars.Id as Id, pillars.Description as Description FROM pillars', function(rows) {
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No pillars have been found");
                }
            });
        });
    });
});

router.get('/add', function(req, res, next) {
    res.render('pillarsAdd', {title: 'Express'});
});

router.post('/upload', function(req, res) {

    var name = req.body.nameInput;
    var description = req.body.descriptionInput;
    var coordinateX = req.body.coordinateXInput;
    var coordinateY = req.body.coordinateYInput;

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
                databaseScript.query('INSERT INTO pillars (Name, Description, CoordinateX, CoordinateY) VALUES ("' + name + '", "' + description + '", ' + coordinateX + ', ' + coordinateY + ')', function () {
                    databaseScript.end();
                    res.end("The data has been uploaded");
                });
            });
        });
    }
});

router.get('/update/:id', function(req, res, next) {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.send("Requested ID is not a number");
    }
    else {
        databaseScript.init(function () {
            databaseScript.connect(function () {
                databaseScript.query('SELECT * FROM pillars WHERE pillars.Id = ' + id, function (rows) {
                    databaseScript.end();

                    if (rows.localeCompare("[]") === 0) {
                        res.send("No pillars with this Id have been found");
                    } else {
                        var pillarArray = JSON.parse(rows);

                        res.render('pillarsUpdate', {title: 'Express', pillarId: pillarArray[0].Id, pillarName: pillarArray[0].Name,
                            pillarDescription: pillarArray[0].Description, pillarCoordinateX: pillarArray[0].CoordinateX, pillarCoordinateY: pillarArray[0].CoordinateY});
                    }
                });
            });
        });
    }
});

router.post('/updateData', function(req, res) {

    var id = req.body.idInput;
    var name = req.body.nameInput;
    var description = req.body.descriptionInput;
    var coordinateX = req.body.coordinateXInput;
    var coordinateY = req.body.coordinateYInput;

    if (isNaN(id)) {
        res.end("Error : Id is not a number");
    } else if (!name) {
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
                databaseScript.query('UPDATE pillars SET Name="' + name + '", Description="' + description + '", CoordinateX= ' + coordinateX + ', CoordinateY=' + coordinateY + '  WHERE Id = ' + id, function () {
                    databaseScript.end();
                    res.end("The data has been updated");
                });
            });
        });
    }
});

router.get('/:id', function(req, res, next) {
   var id = parseInt(req.params.id);

   if (isNaN(id)) {
       res.send("Requested ID is not a number");
   }
   else {
       databaseScript.init(function () {
           databaseScript.connect(function () {
               databaseScript.query('SELECT * FROM pillars WHERE pillars.Id = ' + id, function (rows) {
                   databaseScript.end();

                   if (rows.localeCompare("[]")) {
                       res.send(rows);
                   } else {
                       res.send("No pillars with this Id have been found");
                   }
               });
           });
       });
   }
});

router.get('/:id/coordinates', function(req, res, next) {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.send("Requested ID is not a number");
    }
    else {
        databaseScript.init(function () {
            databaseScript.connect(function () {
                databaseScript.query('SELECT pillars.CoordinateX as CoordinateX, pillars.CoordinateY as CoordinateY FROM pillars WHERE pillars.Id = ' + id, function (rows) {
                    databaseScript.end();

                    if (rows.localeCompare("[]")) {
                        res.send(rows);
                    } else {
                        res.send("No pillars with this Id have been found");
                    }
                });
            });
        });
    }
});

router.get('/:id/plants', function(req, res, next) {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.send("Requested ID is not a number");
    }
    else {
        databaseScript.init(function () {
            databaseScript.connect(function () {
                databaseScript.query('SELECT * FROM plants WHERE plants.PillarId = ' + id, function (rows) {
                    databaseScript.end();

                    if (rows.localeCompare("[]")) {
                        res.send(rows);
                    } else {
                        res.send("No plants with this PillarId have been found");
                    }
                });
            });
        });
    }
});

router.get('/:id/images', function(req, res, next) {
   var id = parseInt(req.params.id);

   if (isNaN(id)) {
       res.send("Requested ID is not a number");
   }
   else {
       databaseScript.init(function () {
           databaseScript.connect(function () {
               databaseScript.query('SELECT * FROM images WHERE images.PillarId = ' + id, function (rows) {
                   databaseScript.end();

                   if (rows.localeCompare("[]")) {
                       res.send(rows);
                   } else {
                       res.send("No images with this PillarId have been found");
                   }
               });
           });
       });
   }
});

module.exports = router;
