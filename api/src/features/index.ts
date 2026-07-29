import { FastifyInstance } from 'fastify';
import registerUserRoute from './users/create-user';
import loginUserRoute from './users/login-user';
import logoutUserRoute from './users/logout-user';
import deleteUserRoute from './users/delete-user';

export default async function appFeatures(app: FastifyInstance) {
  await app.register(logoutUserRoute);
  await app.register(registerUserRoute);
  await app.register(loginUserRoute);
  await app.register(deleteUserRoute);
}
