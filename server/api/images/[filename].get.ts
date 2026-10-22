import { readFile } from 'node:fs/promises';
import { resolve, basename, extname } from 'node:path';
import { createError, setHeader } from 'h3';

const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

export default defineEventHandler(async (event) => {
  const filename = getRouterParam(event, 'filename');

  if (!filename || basename(filename) !== filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Некорректное имя файла',
    });
  }

  const uploadDir = resolve(process.cwd(), 'uploads');
  const filePath = resolve(uploadDir, filename);

  let data: Buffer;

  try {
    data = await readFile(filePath);
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Изображение не найдено',
    });
  }

  const contentType = mimeTypes[extname(filename).toLowerCase()];

  if (!contentType) {
    throw createError({
      statusCode: 415,
      statusMessage: 'Неподдерживаемый формат изображения',
    });
  }

  setHeader(event, 'Content-Type', contentType);
  setHeader(event, 'Cache-Control', 'public, max-age=3600');

  return data;
});
