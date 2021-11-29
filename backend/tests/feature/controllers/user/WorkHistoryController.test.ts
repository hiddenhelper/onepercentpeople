export { };

const request = require('supertest');
const app = require('../../../../app');

const endpoint = '/v1/user/work-history';


describe("Test getting work_history", () => {
  test("It should return a list of the user's work_history", async () => {
    const response = await request(app).get(endpoint);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test get work_history", () => {
  test("It should return a single work_history", async () => {
    const id = 1;
    const response = await request(app).get(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test create work_history", () => {
  test("It should create a new work_history", async () => {
    const response = await request(app)
      .post(endpoint)
      .send({
        "user_id": 1,
        "job_title": "Senior Tax Accountant",
        "company": "The company name",
        "city": "Los Angeles",
        "country_id": 225,
        "from_month": 9,
        "from_year": 2010,
        "to_month": 6,
        "to_year": 2014,
      });
    expect(response.statusCode).toBe(200);
  });
});


describe("Test update work history", () => {
  test("It should update the work history", async () => {
    const id = 1;
    const response = await request(app).put(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test delete work_history", () => {
  test("It should delete the work_history", async () => {
    const id = 1;
    const response = await request(app).delete(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});
