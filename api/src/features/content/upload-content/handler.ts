import { FastifyRequest, FastifyReply } from 'fastify';
import { createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadContentHandler = async (
  response: FastifyRequest,
  reply: FastifyReply,
) => {
  const data = await response.file();

  if (!data) return reply.status(400).send({ error: 'File wasnt upload' });

  const fileExtension = path.extname(data.filename);
  const uniqueName = `${crypto.randomUUID()}${fileExtension}`;
  const savePath = path.join(__dirname, '../../../../uploads', uniqueName);

  try {
    await pipeline(data.file, createWriteStream(savePath));
  } catch (err: any) {
    if (data.file.truncated) {
      return reply.status(413).send({ error: 'File is too big' })
    }
  }

  return reply.status(201).send({
    message: 'File susscessfully uploaded and saved',
    file: {
      filename: uniqueName,
      path: `/uploads/${uniqueName}`,
    },
  });
};
