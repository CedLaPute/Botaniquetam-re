var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var db = req.app.get('db');

    console.log("got db");
    db.query("SELECT * FROM beacons", function(rows) {
        if (rows.localeCompare("[]")) {
            res.send(rows);
        } else {
            res.send("No beacons have been found");
        }
    });
});

router.get('/:uuid', function(req, res, next) {
    var uuid = req.params.uuid;
    var db = req.app.get('db');

    db.query('SELECT * FROM beacons WHERE beacons.uuid LIKE ' + uuid, function (rows) {

        if (rows.localeCompare("[]")) {
            res.send(rows);
        } else {
            res.send("No beacons with this uuid have been found");
        }
    });
});

module.exports = router;