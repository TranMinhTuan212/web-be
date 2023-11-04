FROM --platform=linux/amd64 node:18-alpine3.17 AS BUILD_IMAGE

RUN mkdir -p /home/node/app/

RUN apk add --update vim python3 make g++ && rm -rf /var/cache/apk/* 


WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18-alpine3.17

WORKDIR /home/node/app

COPY --from=BUILD_IMAGE /home/node/app .

RUN npm install

EXPOSE 8000

CMD [ "npm" , "run", "dev" ]