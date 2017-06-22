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

function getHops(hopName, callback) {
    var sql = 'SELECT * FROM hops WHERE name = ?;'
    if(hopName == null)
        sql = 'SELECT * FROM hops;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[hopName], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getAllHops(callback) {
    var sql = 'SELECT * FROM hops;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getAllGrain(callback) {
    var sql = 'SELECT * FROM grain;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getAllYeast(callback) {
    var sql = 'SELECT * FROM yeast;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getAllAdditive(callback) {
    var sql = 'SELECT * FROM additive;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getAllBeerRecipe(callback) {
    var sql = 'SELECT * FROM beer_recipe;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getAllBeerStyle(callback) {
    var sql = 'SELECT * FROM beer_style;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getHopsByRecipeName(recipeName, callback) {
    var sql = 'SELECT DISTINCT hops.*, hops_in_recipe.amount, hops_in_recipe.exposure_time ' +
        'FROM hops, beer_recipe, hops_in_recipe ' +
        'WHERE beer_recipe.name = ? AND beer_recipe.id = hops_in_recipe.recipe_id AND hops.id = hops_in_recipe.hops_id;';
    console.log(sql);
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[recipeName], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getGrainsByRecipeName(recipeName, callback) {
    var sql = 'SELECT DISTINCT grain.*, grain_in_recipe.amount ' +
        'FROM grain, beer_recipe, grain_in_recipe ' +
        'WHERE beer_recipe.name = ? AND beer_recipe.id = grain_in_recipe.recipe_id AND grain.id = grain_in_recipe.grain_id;';
    console.log(sql);
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[recipeName], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}


module.exports = {'connect': connect, 'disconnect': disconnect,'initializeDatabase': initializeDatabase,
'getHops': getHops, 'getHopsByRecipeName': getHopsByRecipeName, 'getGrainsByRecipeName': getGrainsByRecipeName,
'getAllHops': getAllHops, 'getAllGrain': getAllGrain, 'getAllYeast': getAllYeast, 'getAllBeerRecipe': getAllBeerRecipe,
'getAllBeerStyle': getAllBeerStyle, 'getAllAdditive': getAllAdditive, 'disconnect': disconnect, 'disconnect': disconnect};