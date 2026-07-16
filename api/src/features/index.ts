import { FastifyInstance } from 'fastify';
import registerUserRoute from './users/register-user';
import pingRoutes from './ping';

export default async function appFeatures (fastify: FastifyInstance) {
  await fastify.register(registerUserRoute);
  await fastify.register(pingRoutes);
}
