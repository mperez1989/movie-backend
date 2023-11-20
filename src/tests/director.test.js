const request = require('supertest');
const app = require('../app');
require('../models')



test('GET /directors debe traer los directores', async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
});

test('POST /directors debe crear un director', async () => {
    const director = {
        firstName: "akira",
        lastName: "masamoto",
        nationality: "japon",
        image: "http://akira.png",
        birthday: "20-01-1970"
    }
    const res = await request(app).post('/directors').send(director)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName)
});

test('PUT /directors/:id debe actualizar un director', async ()=> {
    const director = {
        lastName: "akira actualizado",
    }
    const res = await request(app).put(`/directors/${id}`).send(director)
    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(director.lastName)
});

test('DELETE /directors/:id debe eliminar un director', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
})