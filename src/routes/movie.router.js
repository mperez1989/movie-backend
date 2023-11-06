const { getAll, create, getOne, remove, update, setMovieActors, setMovieDirectors, setMovieGenres } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update)

movieRouter.route('/:id/actors')
    .post(setMovieActors)
movieRouter.route('/:id/directors')
    .post(setMovieDirectors)

movieRouter.route('/:id/genres')
    .post(setMovieGenres);
    
    

module.exports = movieRouter;