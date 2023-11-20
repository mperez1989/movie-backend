const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')


let id;
test('GET /movies debe traer las peliculas', async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
});

test('POST /movies debe crear un pelicula', async () => {
    const movie = {
        name: "la noche mas oscura",
        image: "http://lanochemasoscura.png",
        synopsis: "Después de los ataques terroristas del 11 de septiembre de 2001, Osama bin Laden se convierte en uno de los hombres más buscados del planeta. La cacería a nivel mundial del líder terrorista ocupa los recursos y atención de dos administraciones presidenciales estadounidenses. El trabajo de una dedicada oficial (Jessica Chastain) de la CIA resulta fundamental para localizar a Laden. En mayo de 2011, SEALs de la Armada lanzan un ataque nocturno en contra de Bin Laden en Pakistán para matarlo.",
        releaseYear: 2001
    }
    const res = await request(app).post('/movies').send(movie)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name)
});

test('PUT /movies/:id debe actualizar una pelicula', async ()=> {
    const movie = {
        name: "la noche mas oscura actualizado",
    }
    const res = await request(app).put(`/movies/${id}`).send(movie)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name)
});

test('POST /movies/:id/actors debe insertar los actores de la pelicula', async ()=> {
    const actor = await Actor.create({
        firstName: "brad",
        lastName: "pid",
        nationality: "estadounidense",
        image: "http://marco-perez.png",
        birthday: "15-01-1972"
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
    
});

test('POST /movies/:id/directors debe insertar a los directores de la pelicula', async() => {
    const director = await Director.create({
        firstName: "charles",
        lastName: "chaplin",
        nationality: "estadounidense",
        image: "http://charles.png",
        birthday: "15-01-1970"
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id])
    await director.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/genres debe insertar a los generos de la pelicula', async() => {
    const genre = await Genre.create({
        name: "drama"
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
})


test('DELETE /movies/:id debe eliminar una pelicula', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
});



