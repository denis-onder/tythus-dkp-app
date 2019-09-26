FROM node:10.16.3-alpine

WORKDIR /app

COPY . .

ENV NODE_ENV=container

ENV SERVER_PORT=9002

ENV GATEWAY_PORT=9000

RUN npm install

CMD [ "npm", "start" ]