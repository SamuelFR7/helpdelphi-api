FROM node:18-alpine AS deps

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@latest
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /usr/app
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
USER node
ENV DATBASE_URL $DATBASE_URL
ENV JWT_SECRET $JWT_SECRET
ENV NODE_ENV="production"

EXPOSE 3333
CMD ["npm", "start"]
