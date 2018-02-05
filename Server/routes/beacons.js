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

router.get('/:uuid', function(req, res, next) {
    var uuid = req.params.uuid;

    databaseScript.init(function () {
        databaseScript.connect(function () {
            databaseScript.query('SELECT * FROM beacons WHERE beacons.uuid LIKE ' + uuid, function (rows) {
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    res.send(rows);
                } else {
                    res.send("No beacons with this uuid have been found");
                }
            });
        });
    });
});

module.exports = router;