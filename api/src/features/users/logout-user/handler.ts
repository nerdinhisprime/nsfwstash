import { FastifyReply, FastifyRequest } from 'fastify';

export const logoutUserHandler = async (
  require: FastifyRequest,
  reply: FastifyReply,
) => {
  return reply
    .clearCookie('token', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
    .status(200)
    .send({ message: 'logged out successfully' });
};
