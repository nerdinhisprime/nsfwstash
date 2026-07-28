import { FastifyInstance } from 'fastify';
import registerUserRoute from './users/register-user';
import loginUserRouter from './users/login-user';

export default async function appFeatures(fastify: FastifyInstance) {
  await fastify.register(registerUserRoute);
  await fastify.register(loginUserRouter);
}
