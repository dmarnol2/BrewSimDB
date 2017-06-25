# The Homebrewers Database


This is a database application written for the class Database Management, SER 322 at Arizona State University. The database is a MySQL database, and the application is written with node.js, express.js, and pug.
The application domain of the Homebrewers Database provides information on beer brewing recipes. This includes what ingredients are needed, basic information on each ingredient, necessary instructions for someone who is familiar with homebrewing, and the ability to check if a recipe fits a certain style guideline as defined by the Brewers Association. The database application would be able to store information about beer recipes and output expected information about the beer brewed by the recipe, such as bitterness, alcohol content, and color.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to install npm, node.js, express.js, mysql.

### Installing

A step by step series of examples that tell you have to get a development env running

First, you need to clone the repository.

```
git clone https://github.com/dmarnol2/BrewSimDB.git
```

Then, you need to set up your local environment. Using the '.sample_env' as a template, create and fill out a '.env' file as follows, replacing username and password with the username and password for your installation of MySQL.

```
DB_NAME='brewsimdb'
DB_USER='username'
DB_PASSWORD='password'
```

Then to launch change into the root directory and run the app with nodemon.

```
..\workspace\> cd brewsimdb
..\workspace\BrewSimDB\> cd brewsimdb
..\workspace\BrewSimDB\BrewSimDB\> nodemon app.js
```
If it won't launch because any dependencies aren't install, run the following command replacing 'dependency' with the name of the dependency you need to install.
```
..\workspace\BrewSimDB\BrewSimDB\> npm install dependency --save
```

Finally, to access the app, open your browser and type:

```
localhost:3000
```

## Running the app

On the Queries page is a form you can fill out to execute queries. Simply input the information and click submit.

## Built With

* [Node](https://nodejs.org/) - Web server used
* [Express](https://expressjs.com/) - Web framework used
* [MySQL](https://dev.mysql.com/downloads/) - Database used

## Contributing

This project is not open for contribution at this time.

## Versioning

We are still in beta for this project.

## Authors

* **David Arnold**  - [dmarnold2](https://github.com/dmarnol2)
* **Kristofer Hoadley**  - [kchoadley](https://github.com/kchoadley)
* **Gabriel Martinez** - [Gabo-Mart](https://github.com/gabo-mart)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
