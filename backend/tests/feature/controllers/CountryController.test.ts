export { };

const request = require('supertest');
const app = require('../../../app');

const endpoint = '/v1/countries';


describe("Test getting countries", () => {
  test("It should return a list of countries", async () => {
    const response = await request(app).get(endpoint);
    expect(response.statusCode).toBe(200);
  });
});
