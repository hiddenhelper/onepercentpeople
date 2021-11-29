export { };

const request = require('supertest');
const app = require('../../../../app');

const endpoint = '/v1/employer/jobs';


describe("Test getting jobs", () => {
  test("It should return a list of jobs", async () => {
    const response = await request(app).get(endpoint);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test get job", () => {
  test("It should return a single job", async () => {
    const id = 1;
    const response = await request(app).get(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test create job", () => {
  test("It should create a new job", async () => {
    const response = await request(app)
      .post(endpoint)
      .send({
        user_id: 1,
        company_id: 5,
        title: 'Job title from test',
        role_id: 1,
        description: "asjdf",
        num_hires_wanted: 1
      });
    expect(response.statusCode).toBe(200);
  });
});


describe("Test update job", () => {
  test("It should update the job", async () => {
    const id = 1;
    const response = await request(app).put(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test delete job", () => {
  test("It should delete the job", async () => {
    const id = 1;
    const response = await request(app).delete(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});
