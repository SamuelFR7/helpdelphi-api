import Fastify from 'fastify'
import {
  createUser,
  deleteUser,
  getUniqueUser,
  getUsers,
  updateUser,
} from './controllers/user'
import { userSchema } from './validations/user'
import { z } from 'zod'

const app = Fastify({
  logger: true,
})

app.get('/users', async (req, res) => {
  const response = await getUsers()

  return res.status(200).send({
    data: response,
  })
})

app.post('/user', async (req, res) => {
  const body = req.body

  const parsedBody = userSchema.parse(body)

  await createUser(parsedBody)

  return res.status(201).send({
    message: 'Ok',
  })
})

app.get<{
  Params: {
    id: string
  }
}>('/user/:id', async (req, res) => {
  const { id } = req.params

  const user = await getUniqueUser(parseInt(id))

  return res.status(200).send(user)
})

app.patch<{
  Params: {
    id: string
  }
  Body: z.infer<typeof userSchema>
}>('/user/:id', async (req, res) => {
  const { id } = req.params

  const body = req.body

  await updateUser({
    id: parseInt(id),
    ...body,
  })

  return res.status(202).send({ message: 'Ok' })
})

app.delete<{
  Params: {
    id: string
  }
}>('/user/:id', async (req) => {
  const { id } = req.params

  await deleteUser(parseInt(id))

  return {
    message: 'Ok',
  }
})

try {
  await app.listen({ port: 3333 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
