import { FastifyRequest, FastifyReply } from 'fastify';

interface RegisterBody {
  email: string;
  password: Math | string;
  name: string;
}

export const registerUserHandler = async (
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply
) => {
  const { email, password, name } = request.body;

  const mockUser = {
    id: 'user-123',
    email,
    name,
    password,
  };

  console.log(mockUser);
  return reply.status(201).send(mockUser)
};
