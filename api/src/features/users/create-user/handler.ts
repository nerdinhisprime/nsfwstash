import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';

interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

export const createUserHandler = async (
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) => {
  const { email, password, name } = request.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await request.server.pg.query(
      `INSERT INTO users (email, password, name)
      VALUES ($1, $2, $3)
      RETURNING id, email, name, created_at`,
      [email, hashedPassword, name],
    );
    const createdUser = rows[0];

    return reply.status(201).send({
      message: 'The user was completed signed up',
      user: createdUser,
    });
  } catch (error: any) {
    if (error.code === '23505') {
      return reply.status(409).send({
        error: 'Conflict',
        message: 'User with that email already exists',
      });
    }
    request.log.error(error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};
