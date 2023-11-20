const request = require('supertest');
const app = require('../app');
require('../models')

let id;
test('GET /actors debe traer los actores', async() => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
});

test('POST /actors debe crear un actor', async () => {
    const actor = {
        firstName: "marco",
        lastName: "perez",
        nationality: "perú",
        image: "http://marco-perez.png",
        birthday: "15-01-1989"
    }
    const res = await request(app).post('/actors').send(actor)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName)
});



test('PUT /actors/:id debe actualizar un actor', async ()=> {
    const actor = {
        lastName: "perez actualizado",
    }
    const res = await request(app).put(`/actors/${id}`).send(actor)
    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(actor.lastName)
});

test('DELETE /actors/:id debe eliminar un actor', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
})