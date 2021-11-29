require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require("cookie-parser");
// const csrf = require("csurf");
// var csrfProtection = csrf({ cookie: true })

const app = express();
const morgan = require('morgan');
import Knex from 'knex';
const knexConfig = require('./knexfile');
import { Model, ForeignKeyViolationError, ValidationError } from 'objection';
const { swaggerConfigs } = require('./configs/swagger');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Initialize knex.
const knex = Knex(knexConfig[process.env.NODE_ENV]);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex() method.
Model.knex(knex)

const indexRouter = require('./routes/index');
// const csrfMiddleware = csrf({ cookie: true });
const port = process.env.PORT || '3000';
const origin = process.env.NODE_ENV === "production" ? "https://onepercentpeople.com" : "http://localhost:4200";
const corsOptions = { origin: origin, allowedHeaders: 'Content-Type,Authorization,Accept,OPP-CONTAINS-FILE', credentials: true };

app.set('port', port);
// app.use('*', csrfProtection);
app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
// app.use(csrfMiddleware);

// app.use((req: any, res: Response, next: NextFunction) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });

app.use('/v1', indexRouter);

// Swagger Open API documentation
if (process.env.NODE_ENV === "development") {
  const openapiSpecification = swaggerJSDoc(swaggerConfigs);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500);
  res.json({ 'error_code': err.status, 'message': err.message });
});


module.exports = app;
