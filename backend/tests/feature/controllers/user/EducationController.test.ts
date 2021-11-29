export { };

const request = require('supertest');
const app = require('../../../../app');

const endpoint = '/v1/user/education';


describe("Test getting education", () => {
  test("It should return a list of the user's educations", async () => {
    const response = await request(app).get(endpoint);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test get education", () => {
  test("It should return a single education", async () => {
    const id = 1;
    const response = await request(app).get(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});


describe("Test create education", () => {
  test("It should create a new education", async () => {
    const response = await request(app)
      .post(endpoint)
      .send({
        "user_id": 1,
        "education_level": "1",
        "field_of_study": "Arts",
        "school_name": "Test School",
        "country_id": null,
        "city": "Test City",
        "from_month": 9,
        "from_year": 2010,
        "to_month": 6,
        "to_year": 2014,
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


describe("Test delete education", () => {
  test("It should delete the education", async () => {
    const id = 1;
    const response = await request(app).delete(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
  });
});
