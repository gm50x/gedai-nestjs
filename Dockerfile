FROM node:18.17.1-alpine3.17 AS Build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18.17.1-alpine3.17 AS Runtime
ENV PORT 3000
WORKDIR /app
COPY package*.json .
RUN npm ci --omit=dev
COPY --from=Build /app/dist ./dist
EXPOSE $PORT
CMD ["npm", "run", "start:prod"]