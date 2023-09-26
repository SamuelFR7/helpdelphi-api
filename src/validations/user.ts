import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().toUpperCase(),
  company: z.string().toUpperCase(),
  email: z.string().email().toLowerCase(),
  document: z.string(),
  phone: z.string().length(11, { message: 'Invalid phone number ' }),
  role: z.enum(['TECNICO', 'CLIENTE']),
  username: z.string().toLowerCase(),
  password: z.string(),
})
