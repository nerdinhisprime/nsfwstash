import fastify from 'fastify'
import cors from '@fastify/cors'
import autoload from '@fastify/autoload'
import fastifyPostgres from '@fastify/postgres'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = fastify({ logger: true })

app.register(cors, { origin: true })

app.register(fastifyPostgres, {
  connectionString: `postgres://${process.env.DB_USR}:${process.env.DB_PSWD}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`
})

app.register(autoload, {
  dir: join(__dirname, 'features'),
  matchFilter: (path) => path.endsWith('index.ts') || path.endsWith('index.ts')
});

export { app }
