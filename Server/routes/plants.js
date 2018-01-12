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

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);

    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT * FROM plants WHERE plants.Id = ' + id, function(rows) {
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
});

router.get('/:id/coordinates', function(req, res, next) {
    var id = parseInt(req.params.id);

    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT plants.Coordinates FROM plants WHERE plants.Id = ' + id, function(rows) {
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
});

router.get('/:id/images', function(req, res, next) {
   var id = parseInt(req.params.id);

    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT * FROM images WHERE images.PlantId = ' + id, function(rows) {
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
});

module.exports = router;