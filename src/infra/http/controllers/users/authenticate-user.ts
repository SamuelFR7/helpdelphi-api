import { authenticateUserUseCase } from '@/application/users/use-cases/authenticate-user-use-case'
import { authSchema } from '@/core/validations/user'
import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function authenticateUserController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { username, password } = authSchema.parse(req.body)

  try {
    const user = await authenticateUserUseCase({ username, password })

    const token = await res.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
        },
      }
    )

    return res.status(200).send({
      user: {
        username: user.username,
      },
      token,
    })
  } catch (error) {
    return res.status(400).send({ message: 'Invalid username or password' })
  }
}
