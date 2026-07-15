import { FastifyPluginAsync } from 'fastify'

export const hi: FastifyPluginAsync = async (fastify) => {
  fastify.get('/hi', () => {
    return { status: 'ok', message: 'hello there' }
  })
}
