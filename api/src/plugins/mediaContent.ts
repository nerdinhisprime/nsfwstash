import fp from 'fastify-plugin';
import multipart from '@fastify/multipart';

export default fp(async (app) => {
  app.register(multipart, {
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  });
});
