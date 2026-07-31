import fastify from 'fastify';
import autoload from '@fastify/autoload';
import { join } from 'path';

const app = fastify({ logger: true });

await app.register(autoload, {
  dir: join(import.meta.dirname, 'plugins'),
});

await app.register(autoload, {
  dir: join(import.meta.dirname, 'features'),
  matchFilter: (path) => path.endsWith('index.ts') || path.endsWith('index.ts'),
});

export { app };
