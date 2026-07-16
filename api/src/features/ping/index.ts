import { FastifyInstance } from 'fastify';

export default async function pingRoutes (fastify: FastifyInstance) {
  fastify.get('/ping', () => {
    return { status: 'ok', message: 'pong' };
  });
}
