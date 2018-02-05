var express = require('express');
var router = express.Router();
const databaseScript = require('../server_modules/databaseScript');

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.send("Requested ID is not a number");
    }
    else {
        var db = req.app.get('db');

        db.query('SELECT videos.Id as Id, videos.URL as URL FROM videos WHERE videos.Id = ' + id, function (rows) {

            if (rows.localeCompare("[]")) {
                res.send(rows);
            } else {
                res.send("No videos with this Id have been found");
            }
        });
    }
});

module.exports = router;