import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: 'technician' | 'admin' | 'client'
      sub: string
    }
  }
}
