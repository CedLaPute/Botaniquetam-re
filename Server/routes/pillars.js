var express = require('express');
var router = express.Router();
const databaseScript = require('../server_modules/databaseScript');

router.get('/', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT * FROM pillars', function(rows) {
                console.log("Returned rows : ", rows);
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
           databaseScript.query('SELECT pillars.Id as Id, pillars.Coordinates as Coordinates FROM pillars', function(rows) {
               console.log("Returned rows : ", rows);
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
                console.log("Returned rows : ", rows);
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
    res.render('pillars', {title: 'Express'});
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

router.get('/:id', function(req, res, next) {
   var id = parseInt(req.params.id);

   if (isNaN(id)) {
       res.send("Requested ID is not a number");
   }
   else {
       databaseScript.init(function () {
           databaseScript.connect(function () {
               databaseScript.query('SELECT * FROM pillars WHERE pillars.Id = ' + id, function (rows) {
                   console.log("Returned rows : ", rows);
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
                databaseScript.query('SELECT pillars.Coordinates FROM pillars WHERE pillars.Id = ' + id, function (rows) {
                    console.log("Returned rows : ", rows);
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
                    console.log("Returned rows : ", rows);
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

module.exports = router;
