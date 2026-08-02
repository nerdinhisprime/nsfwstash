import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fs from 'node:fs';
// import { getContentHandler } from './handler';

interface RequestParams {
  search: string;
}

export default async function getContentRoute(app: FastifyInstance) {
  app.get(
    '/image',
    async (
      request: FastifyRequest<{ Querystring: RequestParams }>,
      reply: FastifyReply,
    ) => {
      const { search } = request.query;
      const { rows } = await request.server.pg.query(
        `SELECT * FROM images WHERE id = $1;`,
        [search],
      );
      const { file_path, mime_type } = rows[0];
      reply.type(mime_type ?? 'application/octet-stream');
      return reply.send(fs.createReadStream(file_path));
    },
  );
}
