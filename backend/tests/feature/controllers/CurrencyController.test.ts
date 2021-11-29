export { };

const request = require('supertest');
const app = require('../../../app');

const endpoint = '/v1/currencies';


describe("Test getting currencies", () => {
  test("It should return a list of currencies", async () => {
    const response = await request(app).get(endpoint);
    expect(response.statusCode).toBe(200);
  });
});
