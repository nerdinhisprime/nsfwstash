import { FastifyInstance } from 'fastify';
import { deleteUserSchema } from './schema';
import { deleteUserHandler } from './handler';

export default async function deleteUser(app: FastifyInstance) {
  app.delete(
    '/user/delete',
    { preHandler: [app.authenticate], schema: deleteUserSchema },
    deleteUserHandler,
  );
}
