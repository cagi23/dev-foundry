FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm ci --omit=dev
COPY mock-bank.js ./
EXPOSE 4000
CMD ["npm", "start"]
