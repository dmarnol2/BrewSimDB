/**
 * Created by Kristofer on 6/21/2017.
 */

var mysql     =    require('mysql');
var execSQL   =    require('exec-sql');

var connection = null;

function connect(db, user, password) {
    connection = mysql.createConnection({
        host     : 'localhost',
        database : db,
        user     : user,
        password : password,
        multipleStatements: true
    });
}

function initializeDatabase(dir) {
    execSQL.connect('', process.env.DB_USER, process.env.DB_PASSWORD); // first field, database name, intentionally left as empty string. The script creates the database.
    execSQL.executeDirectory(dir, function(err) {
        if(err) throw err;
        execSQL.disconnect();
        console.log('Done executing directory ' + dir);
    });
}

function disconnect() {
    connection.end();
    connection = null;
}

function getHops(hopName) {
    console.log('entered into getHops function with hop: ' + hopName);
    //var sql = 'SELECT * FROM hops WHERE hops.name = ?;'
    var sql = 'SELECT * FROM hops;'
    console.log(sql);
    var toReturn = {};

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            toReturn = result;
        });
    });

    return toReturn;
}


module.exports = {'connect': connect, 'disconnect': disconnect,'initializeDatabase': initializeDatabase, 'getHops': getHops};