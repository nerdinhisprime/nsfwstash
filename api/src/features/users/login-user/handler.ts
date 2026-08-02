import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';

interface LoginBody {
  email: string;
  password: string;
}

export const loginUserHandler = async (
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) => {
  const { email, password } = request.body;

  try {
    const { rows } = await request.server.pg.query(
      `SELECT id, email, password, name FROM users WHERE email = $1`,
      [email],
    );
    const user = rows[0];

    if (!user)
      return reply
        .status(400)
        .send({ error: 'Bad Request', message: 'Wrong email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply
        .status(400)
        .send({ error: 'Bad Request', message: 'Wrong email or password' });
    }

    const token = request.server.jwt.sign(
      { sub: user.id, email: user.email, role: user.role || 'user' },
      { expiresIn: '1d' },
    );
    return reply
      .setCookie('token', token, {
        path: '/',
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production',
        secure: true, // защита от MitM, Wireshark и др. WiFi снифферов (WiFi sniffer)
        sameSite: 'lax',
        maxAge: 24 * 60 * 60,
      })
      .status(200)
      .send({ message: ' токен в куках' });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};
