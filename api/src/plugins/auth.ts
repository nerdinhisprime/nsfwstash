import { FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

export default fp(async (app) => {
  app.register(fastifyJwt, {
    secret: process.env.JSW_SECRET || 'supersecretkey231',
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });
  app.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply
          .status(401)
          .send({ error: 'Unauthorized', message: 'This token is wrong' });
      }
    },
  );
});
