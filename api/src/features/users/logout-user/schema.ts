import { FastifySchema } from 'fastify';

export const logoutUserSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
