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

router.get('/add', function(req, res, next) {
    var db = req.app.get('db');

    db.query('SELECT plants.Id as PlantId, plants.Name as PlantName FROM plants', function (plantsRow) {

        var plantsjsonarray = JSON.parse(plantsRow);
        var plantarray = [];

        for (var i = 0; i < plantsjsonarray.length; i++) {
            var value = plantsjsonarray[i].PlantId + "__" + plantsjsonarray[i].PlantName;

            plantarray.push(value);
        }

        console.log(plantarray);

        res.render('toursAdd', {title: 'ZHAW Botanic', plants: plantarray});
    });
});

router.post('/upload', function(req, res, next) {
    var name = req.body.nameInput;

    if (!name) {
        res.end("Error : name is empty");
    } else {
        var idChain = "";
        for (var input in req.body) {

            if (input.localeCompare("nameInput")) {
                var id = input.split("__")[0];

                idChain += id;
                idChain += ";";
            }
        }
        idChain = idChain.slice(0, -1);

        var db = req.app.get('db');
        db.query('INSERT INTO tours (Name, Plants, Pillars) VALUES ("' + name + '", "' + idChain + '", "")', function () {
            res.end("The data has been uploaded");
        });
    }
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