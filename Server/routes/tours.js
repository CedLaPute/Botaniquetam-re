var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var db = req.app.get('db');

    db.query("SELECT tours.Id as Id, tours.Name as Name FROM tours", function(rows) {
        if (rows.localeCompare("[]")) {
            res.send(rows);
        } else {
            res.send("No tours have been found");
        }
    });
});

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.send("Requested ID is not a number");
    }
    else {
        var db = req.app.get('db');

        db.query('SELECT * FROM tours WHERE tours.Id = ' + id, function (rows) {

            if (rows.localeCompare("[]")) {
                res.send(rows);
            } else {
                res.send("No tours with this Id have been found");
            }
        });
    }
});

module.exports = router;