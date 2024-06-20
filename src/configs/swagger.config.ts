import swaggerJsDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'Fan Tv API',
    version: '0.0.1',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/docs/*/*.docs.ts'],
};

export const swaggerSpec = swaggerJsDoc(options);
