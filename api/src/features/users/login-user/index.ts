import { FastifyInstance } from 'fastify';
import { loginUserSchema } from './schema';
import { loginUserHandler } from './handler';

export default async function loginUserRoute(fastify: FastifyInstance) {
  fastify.post('/user/login', { schema: loginUserSchema }, loginUserHandler);
}
