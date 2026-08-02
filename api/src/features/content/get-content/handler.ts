import fs from 'fs';
import { FastifyReply, FastifyRequest } from 'fastify';

export const getContentHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { params } = request.params;
  console.log(params);
  const rows = await request.server.pg.query(
    `
      SELECT * FROM images WHERE id = 1;
    `,
  );
  const image = rows[0];
  reply?.type(image.mime_type);
  console.log(rows);
  return reply.send(fs.createReadStream(image.file_path));
};
