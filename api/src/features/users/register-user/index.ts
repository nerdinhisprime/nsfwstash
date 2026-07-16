import { FastifyInstance } from 'fastify';
import { registerUserSchema } from './schema';
import { registerUserHandler } from './handler';

export default async function registerUserRoute (fastify: FastifyInstance) {
  fastify.post('/user/register', { schema: registerUserSchema }, registerUserHandler);
}
