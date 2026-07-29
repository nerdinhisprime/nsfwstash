import { FastifyInstance } from 'fastify';
import { createUserSchema } from './schema';
import { createUserHandler } from './handler';

export default async function createUserRoute(fastify: FastifyInstance) {
  fastify.post(
    '/user/register',
    { schema: createUserSchema },
    createUserHandler,
  );
}
