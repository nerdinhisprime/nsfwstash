import { FastifyInstance } from 'fastify';
import { logoutUserSchema } from './schema.ts';
import { logoutUserHandler } from './handler.ts';

export default async function logoutUserRoute(app: FastifyInstance) {
  app.post('/user/logout', { schema: logoutUserSchema }, logoutUserHandler);
}
