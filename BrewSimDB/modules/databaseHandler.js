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
function getGrainByRecipeName(recipeName, callback) {
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
function getYeastByRecipeName(recipeName, callback) {
    var sql = 'SELECT DISTINCT yeast.* ' +
        'FROM yeast, beer_recipe, yeast_in_recipe ' +
        'WHERE beer_recipe.name = ? AND beer_recipe.id = yeast_in_recipe.recipe_id AND yeast.id = yeast_in_recipe.yeast_id;';
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
function getAdditiveByRecipeName(recipeName, callback) {
    var sql = 'SELECT DISTINCT additive.*, additive_in_recipe.amount ' +
        'FROM additive, beer_recipe, additive_in_recipe ' +
        'WHERE beer_recipe.name = ? AND beer_recipe.id = additive_in_recipe.recipe_id AND additive.id = additive_in_recipe.additive_id;';
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


function getHopsByName(name, callback) {
    var sql = 'SELECT * FROM hops WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[name], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getHopsByAA(minAA, maxAA, callback) {
    var sql = 'SELECT * FROM hops WHERE alpha_acid >= ? AND alpha_acid <= ?;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[minAA, maxAA], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getHopsByPurpose(purpose, callback) {
    var sql = 'SELECT * FROM hops WHERE purpose = ? OR purpose = "dual";'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[purpose], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getYeastByName(name, callback) {
    var sql = 'SELECT * FROM yeast WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[name], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getYeastByRegion(region, callback) {
    var sql = 'SELECT * FROM yeast WHERE region = ?;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[region], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getYeastByType(type, callback) {
    var sql = 'SELECT * FROM yeast WHERE yeast_type = ?;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[type], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getYeastByAA(minAA, maxAA, callback) {
    var sql = 'SELECT * FROM yeast WHERE apparent_attenuation >= ? AND apparent_attenuation <= ?;'

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[minAA, maxAA], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getGrainByName(name, callback) {
    var sql = 'SELECT * FROM grain WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[name], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getAdditiveByName(name, callback) {
    var sql = 'SELECT * FROM additive WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[name], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getRecipeByName(name, callback) {
    var sql = 'SELECT * FROM beer_recipe WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[name], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}
function getStyleByName(name, callback) {
    var sql = 'SELECT * FROM beer_style WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[name], function (err, result) {
            if (err) throw err;
            else callback(result);
            console.log(result);
        });
    });
}


module.exports = {'connect': connect, 'disconnect': disconnect,'initializeDatabase': initializeDatabase,
'getHopsByAA': getHopsByAA, 'getHopsByRecipeName': getHopsByRecipeName, 'getGrainByRecipeName': getGrainByRecipeName,
'getAllHops': getAllHops, 'getAllGrain': getAllGrain, 'getAllYeast': getAllYeast, 'getAllBeerRecipe': getAllBeerRecipe,
'getAllBeerStyle': getAllBeerStyle, 'getAllAdditive': getAllAdditive, 'getYeastByRecipeName': getYeastByRecipeName,
'getAdditiveByRecipeName': getAdditiveByRecipeName, 'getYeastByType': getYeastByType, 'getYeastByAA': getYeastByAA,
'getHopsByPurpose': getHopsByPurpose, 'getYeastByRegion': getYeastByRegion, 'getHopsByName': getHopsByName,
'getYeastByName': getYeastByName, 'getGrainByName': getGrainByName, 'getAdditiveByName': getAdditiveByName, 'getRecipeByName': getRecipeByName,
'getStyleByName': getStyleByName, 'disconnect': disconnect, 'disconnect': disconnect, 'disconnect': disconnect,
'disconnect': disconnect, 'disconnect': disconnect, 'disconnect': disconnect, 'disconnect': disconnect,
'disconnect': disconnect, 'disconnect': disconnect, 'disconnect': disconnect, 'disconnect': disconnect};