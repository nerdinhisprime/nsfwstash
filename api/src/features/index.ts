import { FastifyInstance } from 'fastify';
import registerUserRoute from './users/create-user';
import loginUserRoute from './users/login-user';
import logoutUserRoute from './users/logout-user';
import deleteUserRoute from './users/delete-user';
import uploadContentRoute from './content/upload-content';
import getContentRoute from './content/get-content';

export default async function appFeatures(app: FastifyInstance) {
  await app.register(logoutUserRoute);
  await app.register(registerUserRoute);
  await app.register(loginUserRoute);
  await app.register(deleteUserRoute);

  await app.register(uploadContentRoute);
  await app.register(getContentRoute);
}
