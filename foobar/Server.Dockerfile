FROM node:16 AS build-env

WORKDIR /app
COPY package.json ./
RUN yarn
COPY . .
WORKDIR /app/packages/server

RUN yarn
RUN yarn run build

FROM node:16
WORKDIR /app
COPY --from=build-env /app/packages/server/dist .
EXPOSE 8080

CMD ["node", "main.js"]
