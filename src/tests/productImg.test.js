const request = require("supertest")
const app = require('../app')
const path = require('path')

let TOKEN
let imageId

const BASE_URL = '/api/v1/product_img'
const BASE_URL_USERS = '/api/v1/users'

beforeAll(async () => {
  const user = {
    email: "urilop871@gmail.com",
    password: "JH849hh"
  }
  const res = await request(app)
    .post(`${BASE_URL_USERS}/login`)
    .send(user)

  TOKEN = res.body.token
})


test("POST -> 'BASE_URL', async() should return status code 201, res.body.url, res.body.filename to be Defined", async () => {

  const localImage = path.join(__dirname, 'createData', 'imageTest.jpg')

  const res = await request(app)
    .post(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)
    .attach('image', localImage)

  imageId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body.url).toBeDefined()
  expect(res.body.filename).toBeDefined()
})

test("GET -> 'BASE_URL', should return statusCode 200, res.body to defined and res.body.length === 2", async() => {

    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(0)
})

test("Delete, 'BASE_URL/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${imageId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(204)
})