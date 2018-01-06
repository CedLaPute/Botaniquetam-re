var express = require('express');
var router = express.Router();
const databaseScript = require('../server_modules/databaseScript');

/* GET pillars listing. */
router.get('/', function(req, res, next) {
    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT * FROM pillars', function(rows) {
                console.log("Returned rows : ", rows);
                databaseScript.end();

                res.send(rows);
            });
        });
    });
});

router.get('/:id', function(req, res, next) {
   var id = parseInt(req.params.id);

    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT * FROM pillars WHERE pillars.Id = ' + id, function(rows) {
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
});

router.get('/:id/coordinates', function(req, res, next) {
    var id = parseInt(req.params.id);

    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT pillars.Coordinates FROM pillars WHERE pillars.Id = ' + id, function(rows) {
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
});

module.exports = router;
