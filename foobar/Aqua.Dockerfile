FROM node:16 AS build-env
WORKDIR /app
COPY . ./
WORKDIR /app/packages/aqua
RUN yarn
RUN yarn run build

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=build-env /app/packages/aqua/dist .

EXPOSE 80
