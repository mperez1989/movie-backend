const Actor = require("./Actor");
const Movie = require("./Movie");
const Director = require("./Director")
const Genre = require("./Genre")

Actor.belongsToMany(Movie, { through: "movieActors"});
Movie.belongsToMany(Actor, { through: "movieActors"});

Movie.belongsToMany(Director, { through: "movieDirectos"});
Director.belongsToMany(Movie, { through: "movieDirectos"});

Movie.belongsToMany(Genre, {through: "movieGenre"});
Genre.belongsToMany(Movie, {through: "movieGenre"});