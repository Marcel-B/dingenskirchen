FROM node:16 AS build-env
WORKDIR /app
COPY . ./
WORKDIR /app/packages/form-controls
RUN yarn
RUN yarn add -D typescript
RUN yarn run build

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=build-env /app/packages/form-controls/dist .

EXPOSE 80
