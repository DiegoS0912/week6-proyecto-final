require("../models");

const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");

let TOKEN;
let product;
let category;
let productId;

const BASE_URL = '/api/v1/products';
const BASE_URL_LOGIN = '/api/v1/users/login';

beforeAll(async () => {
  // Authenticate and obtain token
  const user = {
    email: "urilop871@gmail.com",
    password: "JH849hh"
  };
  const loginResponse = await request(app)
    .post(BASE_URL_LOGIN)
    .send(user);

  TOKEN = loginResponse.body.token;

  const categoryBody = {
    name: "smart phone"
  }

  category = await Category.create(categoryBody);
  product = {
    title: "Samsung s20",
    description: "Lorem",
    price: 1299.00,
    categoryId: category.id
  };
});

test("POST -> 'URL_BASE', should return status code 201 and res.body.title = product.title", async () => {
  const postResponse = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`);

  productId = postResponse.body.id;

  expect(postResponse.status).toBe(201);
  expect(postResponse.body).toBeDefined();
  expect(postResponse.body.title).toBe(product.title);
});

test("GET -> 'BASE_URL', should return status code 200 and res.body.length = 1", async () => {
  const getResponse = await request(app)
    .get(BASE_URL);

  expect(getResponse.status).toBe(200);
  expect(getResponse.body).toBeDefined();
  expect(getResponse.body).toHaveLength(1);

  expect(getResponse.body[0].category).toBeDefined();
  expect(getResponse.body[0].category.id).toBe(category.id);
});

test("GET ONE -> 'BASE_URL/:id', should return status code 200 and res.body.title = product.title", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${productId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.title).toBe(product.title);
  expect(res.body.category).toBeDefined();
  expect(res.body.category.id).toBe(category.id);
  console.log(category)
  console.log(res.body.category)
});

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.title = productUpdate.title", async () => {
  const productUpdate = { title: "Oppo 5 Lite" };

  const putResponse = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(productUpdate)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(putResponse.status).toBe(200);
  expect(putResponse.body).toBeDefined();
  expect(putResponse.body.title).toBe(productUpdate.title);
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const deleteResponse = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(deleteResponse.status).toBe(204);
  await category.destroy();
});
