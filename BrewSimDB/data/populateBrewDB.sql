# This should only be run once, right after running createBrewDB.

# Hops Table
INSERT INTO hops(name, alpha_acid, purpose)
VALUES('Cascade 5.5AA', 5.5,'aroma');
INSERT INTO hops(name, alpha_acid, purpose)
VALUES('Centennial 9AA', 9,'dual');
INSERT INTO hops(name, alpha_acid, purpose)
VALUES('Horizon 13AA', 13,'bitter');
INSERT INTO hops(name, alpha_acid, purpose)
VALUES('Amarillo 9AA', 9,'dual');
INSERT INTO hops(name, alpha_acid, purpose)
VALUES('Simcoe 12AA', 12,'bitter');

# Grain Table
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Vienna Malt', 35, 4);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('White Wheat Malt', 37, 2);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Victory Malt', 34, 25);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Dextrin (carapils)', 33, 1);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Black Barley', 25, 525);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 10', 34, 10);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 20', 34, 20);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 30', 34, 30);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 40', 34, 40);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 50', 34, 50);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 60', 34, 60);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 70', 34, 70);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 80', 34, 80);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 90', 34, 90);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Crystal Malt 120', 34, 120);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('2-row Pale Malt', 37, 1);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('6-row Pale Malt', 35, 1);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Special Roast', 35, 50);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Wheat Malt', 38, 2);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Chocolate Malt', 34, 350);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('RoastedBarley', 25, 300);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Munich Malt', 34, 10);
INSERT INTO grain(name, potential_extract, lovibonds)
VALUES('Black Patent Malt', 26, 500);

# Yeast Table
INSERT INTO yeast(name, apparent_attenuation, yeast_type)
VALUES('WLP001 California Ale', 0.75, 'ale');

# Beer Style Table
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('American Imperial Porter', 35, 50, 39, 40, 7, 12);
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('Hefeweizen', 10, 15, 3, 9, 4.9, 5.6);
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('American Brown Ale', 25, 45, 5, 26, 4, 6.4);
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('Belgian Saison', 20, 38, 5, 7, 4.4,6.8);
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('American Lager', 5, 15, 2, 6, 3.2, 4);
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('Kolsch', 18, 28, 3, 6, 4.8, 5.3);
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('American IPA', 50, 70, 6, 12, 6.3, 7.5);
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('American Stout', 35, 60, 39, 40, 5.7, 8.9);
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('American Imperial IPA', 65, 100, 5, 15, 7.5, 10.5);
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('American Pale Ale', 20, 50, 3, 14, 4.2, 6.2);

# Beer Recipes constructed below

# Build recipe for Hoppiness is and IPA American IPA
INSERT INTO beer_recipe(name, boil_time, description, instructions)
VALUES('Hoppiness is an IPA', 60, 'For those in the “pursuit of hoppiness,” you won’t want to miss this one! With a nice variety of hops, this beer from Brewing Classic Styles by Jamil Zainasheff and John J. Palmer, is perfect for those who can’t get enough of hops.','https://www.homebrewersassociation.org/homebrew-recipe/beer-recipe-of-the-week-hoppiness-is-an-ipa/');
# grabs last auto_increment id used
SET @recipe = (SELECT beer_recipe.id FROM beer_recipe WHERE beer_recipe.id=LAST_INSERT_ID());
# Add 12.75lbs of 2-row pale malt
SET @grain = (SELECT grain.id FROM grain WHERE name='2-row Pale Malt');
INSERT INTO grain_in_recipe(grain_id, recipe_id, amount)
VALUES(@grain,@recipe, 12.75);
# Add 2 lbs of munich malt
SET @grain = (SELECT grain.id FROM grain WHERE name='Munich Malt');
INSERT INTO grain_in_recipe(grain_id, recipe_id, amount)
VALUES(@grain,@recipe, 2);
# Add 1 oz of horizon hops
SET @hops = (SELECT hops.id FROM hops WHERE name='Horizon 13AA');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 1, 60);
# Add 1 oz of centennial hops
SET @hops = (SELECT hops.id FROM hops WHERE name='Centennial 9AA');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 1, 10);
# Add 1 oz of simcoe hops
SET @hops = (SELECT hops.id FROM hops WHERE name='Simcoe 12AA');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 1, 5);
# Add 1 oz of amarillo hops
SET @hops = (SELECT hops.id FROM hops WHERE name='Amarillo 9AA');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 1, 0);
# Add california ale yeast
SET @yeast = (SELECT yeast.id FROM yeast WHERE name='WLP001 California Ale');
INSERT INTO yeast_in_recipe(yeast_id, recipe_id)
VALUES(@yeast,@recipe);
# Add american ipa style
SET @style = (SELECT beer_style.id FROM beer_style WHERE name='American IPA');
INSERT INTO style_of_recipe(style_id, recipe_id)
VALUES(@style,@recipe);

# Build recipe for Classic American Pale Ale
INSERT INTO beer_recipe(name, boil_time)
VALUES('Classic American Pale Ale', 60);
# grabs last auto_increment id used
SET @recipe = (SELECT beer_recipe.id FROM beer_recipe WHERE beer_recipe.id=LAST_INSERT_ID());
# Add 11lbs of 2-row pale malt
SET @grain = (SELECT grain.id FROM grain WHERE name='2-row Pale Malt');
INSERT INTO grain_in_recipe(grain_id, recipe_id, amount)
VALUES(@grain,@recipe, 11);
# Add 0.5 lbs of crystal malt 40
SET @grain = (SELECT grain.id FROM grain WHERE name='Crystal Malt 40');
INSERT INTO grain_in_recipe(grain_id, recipe_id, amount)
VALUES(@grain,@recipe, 0.5);
# Add 2 oz of amarillo hops
SET @hops = (SELECT hops.id FROM hops WHERE name='Cascade 5.5AA');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 2, 60);
# Add 2 oz of amarillo hops
SET @hops = (SELECT hops.id FROM hops WHERE name='Cascade 5.5AA');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 2, 10);
# Add california ale yeast
SET @yeast = (SELECT yeast.id FROM yeast WHERE name='WLP001 California Ale');
INSERT INTO yeast_in_recipe(yeast_id, recipe_id)
VALUES(@yeast,@recipe);
# Add american pale ale style
SET @style = (SELECT beer_style.id FROM beer_style WHERE name='American Pale Ale');
INSERT INTO style_of_recipe(style_id, recipe_id)
VALUES(@style,@recipe);