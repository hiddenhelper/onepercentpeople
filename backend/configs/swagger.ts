const swaggerConfigs = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OPP - API',
      version: 'dev-1.0.0',
    },
  },
  apis: ['**/*.ts'],
};

module.exports = {
  swaggerConfigs
}
