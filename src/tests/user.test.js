const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/users'

test("POST -> 'BASE_URL', should return statusCode 201, and res.body.firstName === user.firstName", async () => {

    const user = {
    firstName: "Luis",
    lastName: "Torres",
    email: "luistor01@gmail.com",
    password: "luis1234",
    phone: "176664"
    }

    const res = await request (app)
        .post(BASE_URL)
        .send(user)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 2", async () => {
    const res = await request(app)
        .get(BASE_URL)

    console.log(res.body);

    expect(res.status).toBe(200)
})
