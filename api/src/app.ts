import fastify from 'fastify';
import autoload from '@fastify/autoload';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = fastify({ logger: true });

await app.register(autoload, {
  dir: join(__dirname, 'plugins'),
});

await app.register(autoload, {
  dir: join(__dirname, 'features'),
  matchFilter: (path) => path.endsWith('index.ts') || path.endsWith('index.ts'),
});

export { app };
