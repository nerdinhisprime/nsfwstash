import { FastifyInstance } from 'fastify';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

interface ImageQuery {
  cursor?: string;
  limit?: string;
}

interface IdParams {
  id: string;
}
type MediaType = 'image' | 'video';

const PREVIEW_WIDTH = 400;

async function generatePreview(
  sourcePath: string,
  previewPath: string,
  fileType: 'image' | 'video',
  timeOffset: string = '00:00:01',
): Promise<void> {
  if (fileType === 'image') {
    await sharp(sourcePath)
      .resize({ width: PREVIEW_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(previewPath);
  } else if (fileType === 'video') {
    const execFileAsync = promisify(execFile);
    const args = [
      '-ss',
      timeOffset,
      '-i',
      sourcePath,
      '-vframes',
      '1',
      '-q:v',
      '2',
      previewPath,
      '-y',
    ];

    try {
      await execFileAsync('ffmpeg', args);
    } catch (err) {
      throw new Error(`FFmpeg failed to generate preview: ${err}`);
    }
  }
}

const checkMediaType = (mimetype: string): MediaType => {
  if (mimetype.startsWith('image/')) {
    return 'image';
  } else if (mimetype.startsWith('video/')) {
    return 'video';
  } else {
    throw new Error(`Херовый тип ${mimetype}`);
  }
};

export default async function mediaRoute(app: FastifyInstance) {
  app.post('/upload-single', async (req, reply) => {
    const data = await req.file();
    if (!data) return reply.code(400).send({ error: 'No file uploaded' });
    const ALLOWED_MIME = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'video/mp4',
      'image/webp',
    ];

    if (!ALLOWED_MIME.includes(data.mimetype)) {
      data.file.resume();
      return reply.code(415).send({ error: 'Unsopported file type' });
    }

    const fileName = `${randomUUID()}${path.extname(data.filename)}`;
    let filePath, previewPath;
    filePath = previewPath =
      process.env.WHATISTHIS_PATH || '/var/www/uploads/whatisthis';
    const fileType = checkMediaType(data.mimetype);

    const previewFileName = `${randomUUID()}-preview.webp`;
    if (fileType === 'image') {
      filePath = path.join(
        process.env.IMG_PATH || '/var/www/uploads/images',
        fileName,
      );
      previewPath = path.join(
        process.env.PREVIEW_PATH || '/var/www/uploads/preview',
        previewFileName,
      );
    } else if (fileType === 'video') {
      filePath = path.join(
        process.env.VIDEO_PATH || '/var/www/uploads/videos',
        fileName,
      );
      previewPath = path.join(
        process.env.PREVIEW_PATH || '/var/www/uploads/preview',
        previewFileName,
      );
    }
    await pipeline(data.file, createWriteStream(filePath));
    await generatePreview(filePath, previewPath, fileType);
    if (data.file.truncated) {
      return reply.code(413).send({ error: 'File too large' });
    }
    await app.pg.query(
      `INSERT INTO media (user_id, file_path, preview_path, mimetype, media_type, size) VALUES ($1, $2, $3, $4, $5, $6);`,
      [1, filePath, previewPath, data.mimetype, fileType, 1024],
    );
    return reply.send({ filename: fileName });
  });
  app.get('/get-list', async (_, reply) => {
    const { rows } = await app.pg.query(
      `SELECT id, file_path, preview_path, mimetype, media_type, created_at FROM media ORDER BY created_at DESC;`,
    );
    const files = rows.map(
      (i: { file_path: string; preview_path: string }) => ({
        originalFilePath: `${process.env.VITE_MEDIA_HOSTNAME}/${rows[0].media_type === 'image' ? 'image' : 'video'}/${path.basename(i.file_path)}`,
        previewFilePath: `${process.env.VITE_MEDIA_HOSTNAME}/preview/${path.basename(i.preview_path)}`,
      }),
    );
    return reply.send({ urls: files });
  });
  app.get<{ Querystring: ImageQuery }>('/get-list-img', async (req) => {
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor ? Number(req.query.cursor) : null;

    const { rows } = await app.pg.query(
      `SELECT id, file_path, preview_path, media_type FROM media WHERE ($1::int IS NULL OR id < $1) ORDER BY id DESC LIMIT $2`,
      [cursor, limit],
    );
    const items = rows.map(
      (i: {
        id: number;
        file_path: string;
        preview_path: string;
        media_type: 'image' | 'video';
      }) => ({
        id: i.id,
        originalUrl: `${process.env.VITE_MEDIA_HOSTNAME}/${i.media_type === 'image' ? 'image' : 'video'}/${path.basename(i.file_path)}`,
        previewUrl: `${process.env.VITE_MEDIA_HOSTNAME}/preview/${path.basename(i.preview_path)}`,
      }),
    );
    return {
      items,
      nextCursor: rows.length === limit ? (rows.at(-1)?.id ?? null) : null,
    };
  });
  app.get<{ Params: IdParams }>('/get-img/:id', async (req, reply) => {
    const { id } = req.params;
    const { rows } = await app.pg.query(
      `SELECT file_path, preview_path, media_type FROM media WHERE id = $1`,
      [id],
    );
    return reply.send({
      previewUrl: `${process.env.VITE_MEDIA_HOSTNAME}/preview/${path.basename(rows[0].preview_path)}`,
      originalUrl: `${process.env.VITE_MEDIA_HOSTNAME}/${rows[0].media_type === 'image' ? 'image' : 'video'}/${path.basename(rows[0].file_path)}`,
      mediaType: rows[0].media_type,
    });
  });
}
