/**
 * Created by Kristofer on 6/21/2017.
 */

var mysql     =    require('mysql');
var execSQL   =    require('exec-sql');

var pool = null;

function connect(db, user, password) {
    pool  = mysql.createPool({
        connectionLimit : 10,
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
    pool.disconnect;
    pool = null;
}

function getAllHops(callback) {
    var sql = 'SELECT * FROM hops;'

    pool.query(sql, function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}



function getAllGrain(callback) {
    var sql = 'SELECT * FROM grain;'

    pool.query(sql, function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getAllYeast(callback) {
    var sql = 'SELECT * FROM yeast;'

    pool.query(sql, function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getAllAdditive(callback) {
    var sql = 'SELECT * FROM additive;'

    pool.query(sql, function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getAllBeerRecipe(callback) {
    var sql = 'SELECT * FROM beer_recipe;'

    pool.query(sql, function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getAllBeerStyle(callback) {
    var sql = 'SELECT * FROM beer_style;'

    pool.query(sql, function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getHopsByRecipeName(recipeName, callback) {
    var sql = 'SELECT DISTINCT hops.*, hops_in_recipe.amount, hops_in_recipe.exposure_time ' +
        'FROM hops, beer_recipe, hops_in_recipe ' +
        'WHERE beer_recipe.name = ? AND beer_recipe.id = hops_in_recipe.recipe_id AND hops.id = hops_in_recipe.hops_id;';
    console.log(sql);
    pool.query(sql,[recipeName], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getGrainByRecipeName(recipeName, callback) {
    var sql = 'SELECT DISTINCT grain.*, grain_in_recipe.amount ' +
        'FROM grain, beer_recipe, grain_in_recipe ' +
        'WHERE beer_recipe.name = ? AND beer_recipe.id = grain_in_recipe.recipe_id AND grain.id = grain_in_recipe.grain_id;';
    console.log(sql);
    pool.query(sql,[recipeName], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getYeastByRecipeName(recipeName, callback) {
    var sql = 'SELECT DISTINCT yeast.* ' +
        'FROM yeast, beer_recipe, yeast_in_recipe ' +
        'WHERE beer_recipe.name = ? AND beer_recipe.id = yeast_in_recipe.recipe_id AND yeast.id = yeast_in_recipe.yeast_id;';
    console.log(sql);
    pool.query(sql,[recipeName], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getAdditiveByRecipeName(recipeName, callback) {
    var sql = 'SELECT DISTINCT additive.*, additive_in_recipe.amount ' +
        'FROM additive, beer_recipe, additive_in_recipe ' +
        'WHERE beer_recipe.name = ? AND beer_recipe.id = additive_in_recipe.recipe_id AND additive.id = additive_in_recipe.additive_id;';
    console.log(sql);
    pool.query(sql,[recipeName], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getHopsByName(name, callback) {
    var sql = 'SELECT * FROM hops WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    pool.query(sql,[name], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getHopsByAA(minAA, maxAA, callback) {
    var sql = 'SELECT * FROM hops WHERE alpha_acid >= ? AND alpha_acid <= ?;'

    pool.query(sql,[minAA, maxAA], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getHopsByPurpose(purpose, callback) {
    var sql = 'SELECT * FROM hops WHERE purpose = ? OR purpose = "dual";'

    pool.query(sql,[purpose], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getYeastByName(name, callback) {
    var sql = 'SELECT * FROM yeast WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    pool.query(sql,[name], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getYeastByRegion(region, callback) {
    var sql = 'SELECT * FROM yeast WHERE region = ?;'

    pool.query(sql,[region], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getYeastByType(type, callback) {
    var sql = 'SELECT * FROM yeast WHERE yeast_type = ?;'

    pool.query(sql,[type], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getYeastByAA(minAA, maxAA, callback) {
    var sql = 'SELECT * FROM yeast WHERE apparent_attenuation >= ? AND apparent_attenuation <= ?;'

    pool.query(sql,[minAA, maxAA], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getGrainByName(name, callback) {
    var sql = 'SELECT * FROM grain WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    pool.query(sql,[name], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getGrainByRegion(region, callback) {
    var sql = 'SELECT * FROM grain WHERE region = ?;'

    pool.query(sql,[region], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getGrainByPE(minPE, maxPE, callback) {
    var sql = 'SELECT * FROM grain WHERE potential_extract >= ? AND potential_extract <= ?;'

    pool.query(sql,[minPE, maxPE], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getGrainByLovibonds(minL, maxL, callback) {
    var sql = 'SELECT * FROM grain WHERE lovibonds >= ? AND lovibonds <= ?;'

    pool.query(sql,[minL, maxL], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getAdditiveByName(name, callback) {
    var sql = 'SELECT * FROM additive WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    pool.query(sql,[name], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getRecipeByName(name, callback) {
    var sql = 'SELECT * FROM beer_recipe WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    pool.query(sql,[name], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getStyleByName(name, callback) {
    var sql = 'SELECT * FROM beer_style WHERE name LIKE ?;'
    name = '\%' + name + '\%';

    pool.query(sql,[name], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getStyleByRecipe(name, callback) {
    var sql = 'SELECT beer_style.* FROM beer_style, beer_recipe, style_of_recipe WHERE beer_recipe.name = ? '+
    'AND beer_recipe.id = style_of_recipe.recipe_id AND beer_style.id = style_of_recipe.style_id;'

    pool.query(sql,[name], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getRecipeByAmountOfHops(minHops,maxHops, callback) {
    var sql = 'SELECT beer_recipe.*, SUM(hops_in_recipe.amount) '+
        'FROM beer_recipe, hops_in_recipe '+
        'Where beer_recipe.id = hops_in_recipe.recipe_id '+
        'GROUP BY hops_in_recipe.recipe_id '+
        'HAVING SUM(hops_in_recipe.amount) >= ? '+
        'AND SUM(hops_in_recipe.amount) <= ?;';
    console.log(sql);

    pool.query(sql,[minHops,maxHops], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getRecipeByAmountOfGrain(minGrain,maxGrain, callback) {
    var sql = 'SELECT beer_recipe.*, SUM(grain_in_recipe.amount) '+
        'FROM beer_recipe, grain_in_recipe '+
        'Where beer_recipe.id = grain_in_recipe.recipe_id '+
        'GROUP BY grain_in_recipe.recipe_id '+
        'HAVING SUM(grain_in_recipe.amount) >= ? '+
        'AND SUM(grain_in_recipe.amount) <= ?;';
    console.log(sql);

    pool.query(sql,[minGrain,maxGrain], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getRecipeByGrainName(grain, callback) {
    var sql = 'SELECT DISTINCT beer_recipe.name, beer_recipe.id AS \'recipe_id\' '+
        'FROM grain, beer_recipe, grain_in_recipe '+
        'WHERE grain.name  LIKE ? '+
        'AND beer_recipe.id = grain_in_recipe.recipe_id AND grain.id = grain_in_recipe.grain_id;';
    grain = '\%' + grain + '\%';
    console.log(sql);

    pool.query(sql,[grain], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getRecipeByYeastName(yeast, callback) {
    var sql = 'SELECT DISTINCT beer_recipe.name, beer_recipe.id AS \'recipe_id\' '+
        'FROM yeast, beer_recipe, yeast_in_recipe '+
        'WHERE yeast.name LIKE ? '+
        'AND beer_recipe.id = yeast_in_recipe.recipe_id AND yeast.id = yeast_in_recipe.yeast_id;';
    yeast = '\%' + yeast + '\%';
    console.log(sql);

    pool.query(sql,[yeast], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function getRecipeByHopsName(hops, callback) {
    var sql = 'SELECT DISTINCT beer_recipe.name, beer_recipe.id AS \'recipe_id\' '+
        'FROM hops, beer_recipe, hops_in_recipe '+
        'WHERE hops.name LIKE ? '+
        'AND beer_recipe.id = hops_in_recipe.recipe_id AND hops.id = hops_in_recipe.hops_id;';
    hops = '\%' + hops + '\%';
    console.log(sql);

    pool.query(sql,[hops], function (err, result) {
        if (err) throw err;
        else callback(result);
        console.log(result);
    });
}
function addHops(name, AA, purpose, description) {
    // optional: description
    var sql = 'INSERT INTO hops(name, description, alpha_acid, purpose) '+
        'VALUES(?, ?, ?, ?);'

    pool.query(sql,[name, description, AA, purpose], function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function addGrain(name, PE, lovibonds, region, description) {
    // optional: region, description
    var sql = 'INSERT INTO grain(name, description, region, potential_extract, lovibonds) '+
        'VALUES(?, ?, ?, ?, ?);'

    pool.query(sql,[name, description, region, PE, lovibonds], function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function addYeast(name, region, AA, type, description) {
    // optional: description
    var sql = 'INSERT INTO yeast(name, region, apparent_attenuation, yeast_type, description) '+
        'VALUES(?, ?, ?, ?, ?);'

    pool.query(sql,[name, region, AA, type, description], function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function addAdditive(name, useCase, description) {
    // optional: description
    var sql = 'INSERT INTO additive(name, description, use_case) '+
        'VALUES(?, ?, ?);'

    pool.query(sql,[name, useCase, description], function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

function getIBUByRecipe(name, callback) {
    var sql = 'SELECT @gravityOfBoil := SUM((grain.potential_extract * grain_in_recipe.amount * equipment.extract_efficeny)/equipment.batch_size/1000) '+
        'FROM beer_recipe, grain, grain_in_recipe, equipment '+
        'WHERE beer_recipe.name = ? AND equipment.id = 1 '+
        'AND beer_recipe.id = grain_in_recipe.recipe_id AND grain.id = grain_in_recipe.grain_id; '+
        'SELECT beer_recipe.name, SUM(((hops.alpha_acid) * (1.65 * POW(0.00125, (@gravityOfBoil)))*((1.0-POW(2.71828, (-(0.04)*hops_in_recipe.exposure_time))) / 4.15 ) * 74.89)/equipment.batch_size) AS IBU '+
        'FROM beer_recipe, hops, hops_in_recipe, equipment '+
        'WHERE beer_recipe.name = ? AND equipment.id = 1 '+
        'AND beer_recipe.id = hops_in_recipe.recipe_id AND hops.id = hops_in_recipe.hops_id '+
        'GROUP BY hops_in_recipe.recipe_id;';

    pool.query(sql,[name, name], function (err, result) {
        if (err) throw err;
        else callback(result[1]);
        console.log(result[1]);
    });
}
function getABVByRecipe(name, callback) {
    var sql = 'SELECT @OG := SUM((grain.potential_extract * grain_in_recipe.amount * equipment.extract_efficeny)/equipment.batch_size) '+
    'FROM beer_recipe, grain, grain_in_recipe, equipment '+
    'WHERE beer_recipe.name = ? AND equipment.id = 1 '+
    'AND beer_recipe.id = grain_in_recipe.recipe_id AND grain.id = grain_in_recipe.grain_id; '+
    'SELECT beer_recipe.name, ((@OG - (1+((SUM((grain.potential_extract * grain_in_recipe.amount * equipment.extract_efficeny)/equipment.batch_size)-1)*(1-yeast.apparent_attenuation))))*0.129) AS ABV '+
    'FROM beer_recipe, grain, yeast, yeast_in_recipe, grain_in_recipe, equipment '+
    'WHERE beer_recipe.name = ? AND equipment.id = 1 '+
    'AND beer_recipe.id = yeast_in_recipe.recipe_id AND yeast.id = yeast_in_recipe.yeast_id '+
    'AND beer_recipe.id = grain_in_recipe.recipe_id AND grain.id = grain_in_recipe.grain_id; ';

    pool.query(sql,[name, name], function (err, result) {
        if (err) throw err;
        else callback(result[1]);
        console.log(result[1]);
    });
}



module.exports = {'connect': connect, 'disconnect': disconnect,'initializeDatabase': initializeDatabase,
'getHopsByAA': getHopsByAA, 'getHopsByRecipeName': getHopsByRecipeName, 'getGrainByRecipeName': getGrainByRecipeName,
'getAllHops': getAllHops, 'getAllGrain': getAllGrain, 'getAllYeast': getAllYeast, 'getAllBeerRecipe': getAllBeerRecipe,
'getAllBeerStyle': getAllBeerStyle, 'getAllAdditive': getAllAdditive, 'getYeastByRecipeName': getYeastByRecipeName,
'getAdditiveByRecipeName': getAdditiveByRecipeName, 'getYeastByType': getYeastByType, 'getYeastByAA': getYeastByAA,
'getHopsByPurpose': getHopsByPurpose, 'getYeastByRegion': getYeastByRegion, 'getHopsByName': getHopsByName,
'getYeastByName': getYeastByName, 'getGrainByName': getGrainByName, 'getAdditiveByName': getAdditiveByName,
'getStyleByName': getStyleByName, 'getGrainByRegion': getGrainByRegion, 'getGrainByPE': getGrainByPE,
'getRecipeByName': getRecipeByName, 'getGrainByLovibonds': getGrainByLovibonds, 'getRecipeByAmountOfHops': getRecipeByAmountOfHops,
'getRecipeByAmountOfGrain': getRecipeByAmountOfGrain, 'getRecipeByGrainName': getRecipeByGrainName,
'getRecipeByYeastName': getRecipeByYeastName, 'getRecipeByHopsName': getRecipeByHopsName, 'getStyleByRecipe': getStyleByRecipe,
'addHops': addHops, 'addGrain': addGrain, 'addYeast': addYeast,
'addAdditive': addAdditive, 'getIBUByRecipe': getIBUByRecipe, 'getABVByRecipe': getABVByRecipe,
'disconnect': disconnect, 'disconnect': disconnect, 'disconnect': disconnect,
'disconnect': disconnect, 'disconnect': disconnect, 'disconnect': disconnect,
'disconnect': disconnect, 'disconnect': disconnect, 'disconnect': disconnect};