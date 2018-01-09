var express = require('express');
var router = express.Router();
const databaseScript = require('../server_modules/databaseScript');

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id);

    databaseScript.init(function() {
        databaseScript.connect(function() {
            databaseScript.query('SELECT images.Name FROM images WHERE images.Id = ' + id, function(rows) {
                console.log("Returned rows : ", rows);
                databaseScript.end();

                if (rows.localeCompare("[]")) {
                    var data = JSON.parse(rows);


                    res.sendFile(data[0].Name, {root: './public/images'});
                } else {
                    res.send("No images with this Id have been found");
                }
            });
        });
    });
});

module.exports = router;