# syntax=docker/dockerfile:1.4

FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS builder
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Copy only the dist artefacts we need for Next.js
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "run", "start"]
