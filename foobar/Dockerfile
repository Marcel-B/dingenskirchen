FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn

COPY . .
WORKDIR /usr/src/app/packages/server

RUN yarn
RUN yarn run build

WORKDIR /usr/src/app/packages/server/dist
EXPOSE 8080

CMD ["node", "main.js"]
