import { mkdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createError, readMultipartFormData } from 'h3';

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);

  const img = parts?.find((part) => part.name === 'image' && part.filename);

  if (!img) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Файл не передан',
    });
  }

  const uploadDir = resolve(process.cwd(), 'uploads');
  await mkdir(uploadDir, { recursive: true });

  const ext = extname(img.filename).toLowerCase();
  const filename = `${randomUUID()}${ext}`;
  const filePath = resolve(uploadDir, filename);

  await writeFile(filePath, img.data, { flag: 'wx' });

  return {
    message: 'Файл сохранен',
    filename,
  };
});
