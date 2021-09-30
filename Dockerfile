FROM node:16-alpine as base

RUN mkdir /app
COPY package.json index.js /app
COPY config /app/config
COPY controllers /app/controllers
COPY models /app/models
COPY static /app/static
COPY views /app/views
WORKDIR /app
RUN npm install

FROM base as runtime
ENTRYPOINT [ "npm", "start" ]