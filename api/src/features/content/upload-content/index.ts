import { FastifyInstance } from "fastify";
import { uploadContentHandler } from './handler.ts'

export default async function uploadContentRoute(app: FastifyInstance) {
  app.post('/upload', { schema: {}}, uploadContentHandler)
}
