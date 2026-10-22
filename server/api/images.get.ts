import { readdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

export default defineEventHandler(async () => {
  const uploadDir = resolve(process.cwd(), 'uploads');

  let files: string[];

  try {
    files = await readdir(uploadDir);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }

    throw error;
  }

  return files
    .filter((file) =>
      ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(
        extname(file).toLowerCase(),
      ),
    )
    .map((filename) => ({
      filename,
      url: `/api/images/${encodeURIComponent(filename)}`,
    }));
});
