import { FastifyRequest, FastifyReply } from 'fastify';
import { createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import { unlink } from 'fs/promises';
import path from 'path';
import crypto from 'node:crypto';

export const uploadContentHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const data = await request.file();

  if (!data) return reply.status(400).send({ error: 'File wasnt upload' });

  const uniqueName = `${crypto.randomUUID()}${path.extname(data.filename)}`;
  const savePath = path.join(process.env.IMG_PATH, uniqueName);

  try {
    await pipeline(data.file, createWriteStream(savePath));
  } catch (err: any) {
    if (data.file.truncated) {
      await unlink(savePath).catch(() => {});
      return reply.status(413).send({ error: 'File is too big' });
    }
    await unlink(savePath).catch(() => {});
    throw err;
  }

  try {
    const { rows } = await request.server.pg.query(
      `
      INSERT INTO images (original_name, stored_name, file_path, file_size, mime_type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at;
    `,
      [data.filename, uniqueName, savePath, data.file.bytesRead, data.mimetype],
    );

    return reply.status(201).send({
      message: 'File successfully uploaded and saved',
      file: {
        id: rows[0].id,
        filename: uniqueName,
        originalName: data.filename,
        path: `/var/www/uploads/images/${uniqueName}`,
        size: data.file.bytesRead,
        createdAt: rows[0].created_at,
      },
    });
  } catch (dbErr) {
    await unlink(savePath).catch(() => {});

    request.log.error(dbErr);
    return reply.status(500).send({ error: 'Database save error' });
  }
};
