import fastify from 'fastify'
import cors from '@fastify/cors'
import { pingRoutes } from './features/ping'
import { hi } from './features/hi'

const app = fastify({ logger: true })

app.register(cors, { origin: true })

app.register(pingRoutes)
app.register(hi)

export { app }
