DROP DATABASE IF EXISTS BrewSimDB;

CREATE DATABASE BrewSimDB;

USE BrewSimDB;


CREATE TABLE grain(
	#Below is generic ingredient attributes
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	description VARCHAR(255),
	#Below is unique attributes
	region VARCHAR(30),
	potential_extract INT NOT NULL,
	lovibonds INT NOT NULL
);

CREATE TABLE hops(
	#Below is generic ingredient attributes
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	description VARCHAR(255),
	#Below is unique attributes
	region VARCHAR(30),
	alpha_acid DOUBLE(3,1) NOT NULL, #3 = max digits, 1 = precision right of decimal
	purpose SET('bitter','aroma'),
	aroma VARCHAR(120)
);

CREATE TABLE yeast(
	#Below is generic ingredient attributes
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	description VARCHAR(255),
	#Below is unique attributes
	region VARCHAR(30),
	brand VARCHAR(30),
	apparent_attenuation INT(3) NOT NULL, #percentage, usually 65%-80%
	yeast_type ENUM('ale','lager','other') NOT NULL
);

CREATE TABLE additive(
	#Below is generic ingredient attributes
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	description VARCHAR(255),
	#Below is unique attributes
	use_case VARCHAR(30)
);

CREATE TABLE beer_recipe(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	boil_time INT NOT NULL,
	description VARCHAR(255),
	instructions VARCHAR(1000)
);

CREATE TABLE beer_style(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	description VARCHAR(255) NOT NULL,
	origin VARCHAR(30),
	min_bitterness DOUBLE(5,1) NOT NULL, # could be over 100
	max_bitterness DOUBLE(5,1) NOT NULL, # could be over 100, highest found was 2500
	min_color DOUBLE(3,1) NOT NULL, # scale of 1-40
	max_color DOUBLE(3,1) NOT NULL, # scale of 1-40
	min_ABV DOUBLE(3,1) NOT NULL, # percent, usually from 3%-12%
	max_ABV DOUBLE(3,1) NOT NULL # percent, usually from 3%-12%
);

CREATE TABLE equipment(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	batch_size DOUBLE(7,1), # In gallons, allows up to 3000 barrel system.
	extract_efficeny DOUBLE(3,1) # percent, usually 60%-80%
);

CREATE TABLE style_of_recipe(
	recipe_id INT NOT NULL,
	style_id INT NOT NULL,
	PRIMARY KEY (recipe_id), # there can only be one beer style per recipe
	FOREIGN KEY (style_id)
		REFERENCES beer_style(id)
		ON UPDATE CASCADE ON DELETE CASCADE, # need to determine if this is correct...
	FOREIGN KEY (recipe_id) 
		REFERENCES beer_recipe(id)
		ON UPDATE CASCADE ON DELETE CASCADE # need to determine if this is correct...
);

CREATE TABLE grain_in_recipe(
	grain_id INT NOT NULL,
	recipe_id INT NOT NULL,
	amount INT NOT NULL,
	PRIMARY KEY (grain_id, recipe_id),
	FOREIGN KEY (recipe_id) 
		REFERENCES beer_recipe(id)
		ON UPDATE CASCADE ON DELETE CASCADE, # need to determine if this is correct...
	FOREIGN KEY (grain_id) 
		REFERENCES grain(id)
		ON UPDATE CASCADE ON DELETE CASCADE # need to determine if this is correct...
);

CREATE TABLE hops_in_recipe(
	hops_id INT NOT NULL,
	recipe_id INT NOT NULL,
	amount INT NOT NULL,
	exposure_time INT NOT NULL,
	PRIMARY KEY (hops_id, recipe_id, exposure_time),
	FOREIGN KEY (recipe_id) 
		REFERENCES beer_recipe(id)
		ON UPDATE CASCADE ON DELETE CASCADE, # need to determine if this is correct...
	FOREIGN KEY (hops_id) 
		REFERENCES hops(id)
		ON UPDATE CASCADE ON DELETE CASCADE # need to determine if this is correct...
);

CREATE TABLE yeast_in_recipe(
	yeast_id INT NOT NULL,
	recipe_id INT NOT NULL,
	PRIMARY KEY (recipe_id), # because only 1 yeast per recipe
	FOREIGN KEY (recipe_id) 
		REFERENCES beer_recipe(id)
		ON UPDATE CASCADE ON DELETE CASCADE, # need to determine if this is correct...
	FOREIGN KEY (yeast_id) 
		REFERENCES yeast(id)
		ON UPDATE CASCADE ON DELETE CASCADE # need to determine if this is correct...
);

CREATE TABLE additive_in_recipe(
	additive_id INT NOT NULL,
	recipe_id INT NOT NULL,
	amount INT NOT NULL,
	exposure_time INT NOT NULL,
	PRIMARY KEY (additive_id, recipe_id, exposure_time),
	FOREIGN KEY (recipe_id) 
		REFERENCES beer_recipe(id)
		ON UPDATE CASCADE ON DELETE CASCADE, # need to determine if this is correct...
	FOREIGN KEY (additive_id) 
		REFERENCES additive(id)
		ON UPDATE CASCADE ON DELETE CASCADE # need to determine if this is correct...
);

CREATE TABLE recipe_scales_to_equipment(
	equipment_id INT NOT NULL,
	recipe_id INT NOT NULL,
    batch_size INT,
    efficiency INT,
	PRIMARY KEY (equipment_id, recipe_id),
	FOREIGN KEY (recipe_id) 
		REFERENCES beer_recipe(id)
		ON UPDATE CASCADE ON DELETE CASCADE, # need to determine if this is correct...
	FOREIGN KEY (equipment_id) 
		REFERENCES equipment(id)
		ON UPDATE CASCADE ON DELETE CASCADE # need to determine if this is correct...
);



























