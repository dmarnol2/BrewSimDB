# This should only be run once, right after running createBrewDB.

# Equipment Table

INSERT INTO equipment(batch_size, extract_efficeny)
VALUES(5,0.70); # default values, 5 gallon batch with 70% efficiency

# Hops Table
INSERT INTO hops(name, description, alpha_acid, purpose)
VALUES('Cascade 5.5AA', null, 5.5,'aroma'),
  ('Citra 11AA', null, 11,'dual'),
  ('Centennial 9AA', null, 9,'dual'),
  ('Horizon 13AA', null, 13,'bitter'),
  ('Amarillo 9AA', null, 9,'dual'),
  ('Simcoe 12AA', null, 12,'bitter');

# Grain Table
INSERT INTO grain(name, region, potential_extract, lovibonds)
VALUES('Vienna Malt', null, 35, 4),
  ('White Wheat Malt', null, 37, 2),
  ('Victory Malt', null, 34, 25),
  ('Dextrin (carapils)', null, 33, 1),
  ('Black Barley', null, 25, 525),
  ('Crystal Malt 10', null, 34, 10),
  ('Crystal Malt 20', null, 34, 20),
  ('Crystal Malt 30', null, 34, 30),
  ('Crystal Malt 40', null, 34, 40),
  ('Crystal Malt 50', null, 34, 50),
  ('Crystal Malt 60', null, 34, 60),
  ('Crystal Malt 70', null, 34, 70),
  ('Crystal Malt 80', null, 34, 80),
  ('Crystal Malt 90', null, 34, 90),
  ('Crystal Malt 120', null, 34, 120),
  ('Melanoidin', 'German', 37, 25),
  ('2-row Pale Malt', null, 37, 1),
  ('6-row Pale Malt', null, 35, 1),
  ('Special Roast', null, 35, 50),
  ('Wheat Malt', null, 38, 2),
  ('Chocolate Malt', null, 34, 350),
  ('RoastedBarley', null, 25, 300),
  ('Munich Malt', null, 34, 10),
  ('Munich Malt Light', null, 37, 6),
  ('Black Patent Malt', null, 26, 500);

# Yeast Table
INSERT INTO yeast(name, region, apparent_attenuation, yeast_type)
VALUES('WLP001 California Ale', 'American', 0.75, 'ale'),
  ('WLP002 English Ale Yeast', 'English', 0.68, 'ale'),
  ('WLP004 Irish Ale Yeast', 'Irish', 0.72, 'ale'),
  ('WLP005 British Ale Yeast', 'English', 0.71, 'ale'),
  ('WLP008 East Coast Ale Yeast', 'English', 0.72, 'ale'),
  ('WLP009 Australian Ale Yeast', 'Australian', 0.71, 'ale'),
  ('WLP011 European Ale Yeast', 'European', 0.68, 'ale'),
  ('WLP028 Edinburgh Scottish Ale Yeast', 'Scottish', 0.72, 'ale'),
  ('WLP029 German/Kölsch Ale Yeast', 'German', 0.76, 'ale'),
  ('WLP036 Düsseldorf Alt Ale Yeast', 'German', 0.69, 'ale'),
  ('WLP080 Cream Ale Yeast Blend', 'American', 0.78, 'ale'),
  ('WLP085 English Ale Yeast Blend', 'English', 0.71, 'ale'),
  ('WLP800 Pilsner Lager Yeast', 'European', 0.73, 'lager'),
  ('WLP810 San Francisco Lager Yeast', 'American', 0.68, 'lager'),
  ('WLP820 Oktoberfest/Märzen Lager Yeast', 'German', 0.70, 'lager'),
  ('WLP830 German Lager Yeast', 'German', 0.77, 'lager'),
  ('WLP840 American Lager Yeast', 'American', 0.78, 'lager'),
  ('WLP940 Mexican Lager Yeast', 'Mexican', 0.74, 'lager'),
  ('WLP300 Hefeweizen Ale Yeast', 'German', 0.74, 'ale'),
  ('WLP320 American Hefeweizen Ale Yeast', 'American', 0.73, 'ale'),
  ('WLP400 Belgian Wit Ale Yeast', 'Belgian', 0.76, 'ale'),
  ('WLP545 Belgian Strong Ale Yeast', 'Belgian', 0.81, 'ale'),
  ('WLP568 Belgian-Style Saison Ale Yeast Blend', 'Belgian', 0.75, 'ale'),
  ('WLP570 Belgian Golden Ale Yeast', 'Belgian', 0.76, 'ale'),
  ('WLP630 Berliner Weisse Blend', 'Berlin', 0.77, 'other'),
  ('WLP665 Flemish Ale Blend', 'Belgian', 0.71, 'ale'),
  ('WLP670 American Farmhouse Blend', 'American', 0.79, 'ale');

# Additive Table
INSERT INTO additive(name, description, use_case)
VALUES('Whirloc', null, 'fining'),
  ('Irish Moss', null, 'fining');


# Beer Style Table
INSERT INTO beer_style(name, min_bitterness, max_bitterness, min_color, max_color, min_ABV, max_ABV)
VALUES('American Imperial Porter', 35, 50, 39, 40, 7, 12),
  ('Hefeweizen', 10, 15, 3, 9, 4.9, 5.6),
  ('American Brown Ale', 25, 45, 5, 26, 4, 6.4),
  ('Belgian Saison', 20, 38, 5, 7, 4.4,6.8),
  ('American Lager', 5, 15, 2, 6, 3.2, 4),
  ('Kolsch', 18, 28, 3, 6, 4.8, 5.3),
  ('American IPA', 50, 70, 6, 12, 6.3, 7.5),
  ('American Stout', 35, 60, 39, 40, 5.7, 8.9),
  ('American Imperial IPA', 65, 100, 5, 15, 7.5, 10.5),
  ('American Pale Ale', 20, 50, 3, 14, 4.2, 6.2);

# Beer Recipes constructed below

# Build recipe for Hoppiness is an IPA American IPA
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

# Build recipe for Zombie Dust Clone
INSERT INTO beer_recipe(name, boil_time, description, instructions)
VALUES('Zombie Dust Clone Pale Ale', 60, null, 'https://www.brewersfriend.com/homebrew/recipe/view/280731/zombie-dust-clone-brain-eater');
# grabs last auto_increment id used
SET @recipe = (SELECT beer_recipe.id FROM beer_recipe WHERE beer_recipe.id=LAST_INSERT_ID());
# Add 11lbs of 2-row pale malt
SET @grain = (SELECT grain.id FROM grain WHERE name='2-row Pale Malt');
INSERT INTO grain_in_recipe(grain_id, recipe_id, amount)
VALUES(@grain,@recipe, 12);
# Add 0.5 lbs of munich malt light
SET @grain = (SELECT grain.id FROM grain WHERE name='Munich Malt Light');
INSERT INTO grain_in_recipe(grain_id, recipe_id, amount)
VALUES(@grain,@recipe, 1.5);
# Add 0.5 lbs of Melanoidin
SET @grain = (SELECT grain.id FROM grain WHERE name='Melanoidin');
INSERT INTO grain_in_recipe(grain_id, recipe_id, amount)
VALUES(@grain,@recipe, 0.5);
# Add 0.5 lbs of carapils
SET @grain = (SELECT grain.id FROM grain WHERE name LIKE '%Carapils%');
INSERT INTO grain_in_recipe(grain_id, recipe_id, amount)
VALUES(@grain,@recipe, 0.5);
# Add 0.5 lbs of crystal malt 60
SET @grain = (SELECT grain.id FROM grain WHERE name='Crystal Malt 60');
INSERT INTO grain_in_recipe(grain_id, recipe_id, amount)
VALUES(@grain,@recipe, 0.5);
# Add 0.5 oz of citra hops
SET @hops = (SELECT hops.id FROM hops WHERE name LIKE '%Citra%');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 0.5, 60);
# Add 1 oz of citra hops
SET @hops = (SELECT hops.id FROM hops WHERE name LIKE '%Citra%');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 1, 15);
# Add 1 oz of citra hops
SET @hops = (SELECT hops.id FROM hops WHERE name LIKE '%Citra%');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 1, 10);
# Add 1 oz of citra hops
SET @hops = (SELECT hops.id FROM hops WHERE name LIKE '%Citra%');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 1, 5);
# Add 1 oz of citra hops
SET @hops = (SELECT hops.id FROM hops WHERE name LIKE '%Citra%');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 1, 0);
# Add 3 oz of citra hops
SET @hops = (SELECT hops.id FROM hops WHERE name LIKE '%Citra%');
INSERT INTO hops_in_recipe(hops_id, recipe_id, amount, exposure_time)
VALUES(@hops,@recipe, 3, -7);
# Add california ale yeast
SET @yeast = (SELECT yeast.id FROM yeast WHERE name='WLP001 California Ale');
INSERT INTO yeast_in_recipe(yeast_id, recipe_id)
VALUES(@yeast,@recipe);
# Add 3 oz of citra hops
SET @additive = (SELECT additive.id FROM additive WHERE name LIKE '%Whirloc%');
INSERT INTO additive_in_recipe(additive_id, recipe_id, amount, exposure_time)
VALUES(@additive,@recipe, 1, 20);
# Add american pale ale style
SET @style = (SELECT beer_style.id FROM beer_style WHERE name='American Pale Ale');
INSERT INTO style_of_recipe(style_id, recipe_id)
VALUES(@style,@recipe);