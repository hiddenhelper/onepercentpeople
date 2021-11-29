export { };

const request = require('supertest');
const app = require('../../../../app');

const endpoint = '/v1/employer/companies';


describe("Test getting companies", () => {
  test("It should return a list of companies", async () => {
    const response = await request(app).get(endpoint);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test get company", () => {
  test("It should return a single company", async () => {
    const id = 1;
    const response = await request(app).get(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test create company", () => {
  test("It should create a new company", async () => {
    const response = await request(app)
      .post(endpoint)
      .send({
        user_id: 1,
        title: 'Job title from test',
      });
    expect(response.statusCode).toBe(200);
  });
});


describe("Test update company", () => {
  test("It should update the company", async () => {
    const id = 1;
    const response = await request(app).put(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test delete company", () => {
  test("It should delete the company", async () => {
    const id = 1;
    const response = await request(app).delete(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});
