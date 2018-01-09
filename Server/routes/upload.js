var express = require('express');
var router = express.Router();
var multer = require('multer');

var datenow = Date.now();

var storage = multer.diskStorage({
   destination: function(req, file, callback) {
       callback(null, './public/images');
   },
    filename: function(req, file, callback) {
       callback(null, datenow + file.originalname);
    }
});

var upload = multer({storage: storage}).array('image');

const databaseScript = require('../server_modules/databaseScript');

router.get('/', function(req, res, next) {
   res.render('upload', {title: 'Express'});
});

router.post('/image', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file");
        }

        var filenames = req.files.map(function(file) {
           return file.filename;
        });

        databaseScript.init(function() {
            databaseScript.connect(function() {

                for (i in filenames) {
                    databaseScript.query('INSERT INTO images (Name, PlantId, PillarId) VALUES ("' + filenames[i] + '", 0, 0)', function(){});
                }
                databaseScript.end();
            });
        });

        res.end("Files have been uploaded");
   });
});

module.exports = router;