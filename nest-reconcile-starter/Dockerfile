FROM node:20-alpine as deps
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./ 2>/dev/null || true
RUN npm ci
FROM node:20-alpine as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build || true
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
