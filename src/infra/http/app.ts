import fastify from 'fastify'
import { usersRoutes } from './routes/user-routes'
import { ZodError } from 'zod'
import { env } from '@/env.mjs'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(fastifyCors, {})

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal server error ' })
})
