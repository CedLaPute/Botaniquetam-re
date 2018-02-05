var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.send("Requested ID is not a number");
    }
    else {
        var db = req.app.get('db');

        db.query('SELECT images.Id as Id, images.Name as Name FROM images WHERE images.Id = ' + id, function (rows) {

            if (rows.localeCompare("[]")) {
                var data = JSON.parse(rows);


                res.sendFile(data[0].Name, {root: './public/images'});
            } else {
                res.send("No images with this Id have been found");
            }
        });
    }
});

module.exports = router;