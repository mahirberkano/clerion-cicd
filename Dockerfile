# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-bookworm-slim AS base

ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

USER node
EXPOSE 3000

CMD ["npm", "run", "start"]
