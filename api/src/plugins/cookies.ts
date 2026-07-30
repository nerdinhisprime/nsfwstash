import fp from 'fastify-plugin';
import fastifyCookies from '@fastify/cookie';

export default fp(async (app) => {
  app.register(fastifyCookies, {
    secret: process.env.COOKIE_SECRET
  });
});
