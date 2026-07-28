import { FastifyInstance } from 'fastify';

export default async function getMeRoute(app: FastifyInstance) {
  app.get(
    '/user/me',
    {
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const currentUser = request.user as { id: number; email: string };
      const { rows } = await request.server.pg.query(
        `SELECT id, email, name, created_at FROM users WHERE id = $1`,
        [currentUser.id],
      );

      return rows[0];
    },
  );
}
