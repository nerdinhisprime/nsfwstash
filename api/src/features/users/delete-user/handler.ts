import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';

interface RequestBody {
  password: string;
}

export const deleteUserHandler = async (
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply,
) => {
  const { password } = request.body;
  const userId = request.user.sub;

  try {
    const { rows } = await request.server.pg.query(
      `SELECT password FROM users WHERE id = $1`,
      [userId],
    );

    const user = rows[0];

    if (!user) {
      return reply
        .status(404)
        .send({ error: 'Not Found', message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: "Your password doesn't match",
      });
    }

    await request.server.pg.query(
      `DELETE FROM users WHERE id = $1`,
      [userId],
    );

    return reply
      .clearCookie('token', { path: '/' })
      .status(200)
      .send({ message: 'Account successfully deleted' });
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to delete account',
    });
  }
};
