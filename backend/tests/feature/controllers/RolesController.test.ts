export { };

const request = require('supertest');
const app = require('../../../app');

const endpoint = '/v1/roles';


describe("Test getting roles", () => {
  test("It should return a list of roles", async () => {
    const response = await request(app).get(endpoint);
    expect(response.statusCode).toBe(200);
  });
});
