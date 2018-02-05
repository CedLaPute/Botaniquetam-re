var express = require('express');
var router = express.Router();
const databaseScript = require('../server_modules/databaseScript');

router.get('/', function(req, res, next) {
    databaseScript.init(function () {
        databaseScript.connect(function () {
            databaseScript.query('SELECT * FROM beacons', function (rows) {
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No beacons have been found");
                }
            });
        });
    });
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.send("Requested ID is not a number");
    }
    else {
        databaseScript.init(function () {
            databaseScript.connect(function () {
                databaseScript.query('SELECT * FROM beacons WHERE beacons.Id = ' + id, function (rows) {
                    databaseScript.end();

                    if (rows.localeCompare("[]")) {
                        res.send(rows);
                    } else {
                        res.send("No beacons with this Id have been found");
                    }
                });
            });
        });
    }
});

module.exports = router;