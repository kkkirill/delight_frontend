FROM node:lts

RUN npm i -g @angular/cli

WORKDIR /usr/src/app

COPY package.json* package-lock.json* ./
RUN npm install

COPY . .