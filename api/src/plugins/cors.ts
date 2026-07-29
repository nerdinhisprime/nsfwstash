import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (app) => {
  await app.register(cors, {
    origin: `http://${process.env.VUE_HOST}:${process.env.VUE_PORT}`,
    credentials: true
  });
});
