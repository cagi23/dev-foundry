
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./ 2>/dev/null || true
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist/bank-reconcile-web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
