import { FastifyInstance } from "fastify";
import { uploadContentHandler } from './handler.ts'

export default async function uploadContent(app: FastifyInstance) {
  app.post('/upload', { schema: {}}, uploadContentHandler)
}
