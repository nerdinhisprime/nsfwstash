import { FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

export default fp(async (app) => {
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecretkey231',
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
        return reply
          .status(401)
          .send({ error: 'Unauthorized', message: 'This token is wrong' });
      }
    },
  );
});
