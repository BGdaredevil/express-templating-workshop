FROM node:16-alpine as base

RUN mkdir /app

COPY package.json index.js /app

WORKDIR /app

RUN npm install

FROM base as runtime
COPY index.js /app
COPY config /app/config
COPY controllers /app/controllers
COPY models /app/models
COPY static /app/static
COPY views /app/views
RUN npm install

ENTRYPOINT [ "npm", "start" ]