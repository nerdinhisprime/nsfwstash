import { FastifyPluginAsync } from 'fastify'

export const pingRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/ping', () => {
    return { status: 'ok', message: 'pong' }
  })
}
