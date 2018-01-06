class db {
    constructor() {
        this._dbMysql = require('mysql');
        this._dbConnection = this._dbMysql.createConnection({
           host: 'localhost',
           user: 'root',
           password: 'm&><gu$b',
           database: 'garden'
        });
    }
}

var database = null;

module.exports = {
    db: db,
    database: database,

    init: function(_callback) {
        database = new db();
        _callback();
    },

    connect: function(_callback) {
        database._dbConnection.connect(function(err) {
            if (err) throw err;
            console.log("Connected at localhost:garden database");
            _callback();
        });
    },

    query: function(query, _callback) {
        var result;

        database._dbConnection.query(query, function(err, rows, field) {
            if (err) throw err;

            result = JSON.stringify(rows);
            _callback(result);
        });
    },

    end: function() {
        database._dbConnection.end();
    }
};