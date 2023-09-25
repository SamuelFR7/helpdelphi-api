import Fastify, { FastifyReply, FastifyRequest } from 'fastify'

const app = Fastify({
  logger: true
})

app.get('/', async function handler (request: FastifyRequest, reply: FastifyReply) {
  return { hello: "world" }
})

try {
  await app.listen({ port: 3333 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
