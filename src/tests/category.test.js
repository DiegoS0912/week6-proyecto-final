const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/categories'
const BASE_URL_AUTH = '/api/v1/users/login'
let TOKEN, categoryId

beforeAll(async () => {
    const body = {
      email: "urilop871@gmail.com",
      password: "JH849hh"
    }
    const res = await request(app)
      .post(BASE_URL_AUTH)
      .send(body)
  
    TOKEN = res.body.token
  })

test("POST -> 'BASE_URL', should return statusCode 201 and res.body.name === category.name", async () => {

    const category = {
        name: 'videogames'
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)

    categoryId = res.body.id 

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test("GET -> 'BASE_URL', should return statusCode 200, res.body to defined and res.body.length === 1", async() => {

    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Delete, 'BASE_URL/:id', should return statusCode 204", async () => {

    const res = await request(app)
      .delete(`${BASE_URL}/${categoryId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(204)
  })