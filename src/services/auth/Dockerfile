FROM node:10.16.3-alpine

WORKDIR /app

COPY . .

ENV NODE_ENV=container

ENV SERVER_PORT=9001

RUN npm install

CMD [ "npm", "start" ]