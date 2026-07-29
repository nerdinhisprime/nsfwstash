import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';

interface RequestBody {
  password: string;
}

export const deleteUserHandler = async (
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply,
) => {
  const { password } = request.body;
  // 1. Достаем ID пользователя из JWT (из req.user, который положил authenticate)
  const userId = request.user.sub;

  try {
    // 2. Ищем пользователя и его хэш пароля в БД по ID
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

    // 3. Сравниваем введенный пароль с хэшем из базы
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: "Your password doesn't match",
      });
    }

    // 4. Удаляем пользователя из базы
    await request.server.pg.query(
      `DELETE FROM users WHERE id = $1`,
      [userId],
    );

    // 5. Сбрасываем куку с токеном и возвращаем 200/204
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
