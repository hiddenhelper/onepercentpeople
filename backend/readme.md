# One Percent People — Backend

The backend folder contains an [Express.js](https://expressjs.com/) app.

The backend is an API only and does not handle displaying html.

<br />

### Node
Using Node.js version 16.5

<br />

## API Docs
We are using [Swagger, OpenAPI Specification](https://swagger.io/specification/) to document the API.

View api docs locally at [/docs](http://localhost:3000/docs/).

<br />

## Circle CI
Using CircleCI for deployment.

<br />

## Database and Modeling
We are using [Knex](https://knexjs.org/) and [Objection](https://vincit.github.io/objection.js/) for ORM and modeling.

<br />

## Request Validation
We are using [Express Validator](https://express-validator.github.io/docs/) to handle request validations.

All validations live in their own file placed in `/middlewares/validators/`.

<br />

## Testing
Backend is using Jest and Supertest to run tests.

Tests run using `NODE_ENV=test`.

Run Tests: `npm run test`

[Jest](https://jestjs.io/docs/getting-started)

[Supertest](https://github.com/visionmedia/supertest#readme)

Note: Authentication mocking has not been setup in the tests and is the next step needed to further develop the tests.

<br />

## Developer Setup Instructions
Create a `.env` in the `/backend` directory.

See the `.env.example` file to see what fields are available.

Spin up a local MySQL database or connect to the hosted development database.

Add your database credentials to the `.env` file.

Install NPM Packages. `npm i`

If using a locally hosted database, migrate and seed.

Migrate the database. `knex migrate:latest`.

Run the database seeds. `knex seed:run`.

<br />

Start the dev server, `npm run watch`.
