import swaggerJsDoc from 'swagger-jsdoc';
import { config } from './index';

const swaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'Fan Tv API',
    version: '0.0.1',
  },
  servers: [
    {
      url: config.BASE_ORIGIN + ':' + config.PORT + config.BASE_PATH,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/docs/*/*.docs.ts'],
};

export const swaggerSpec = swaggerJsDoc(options);
