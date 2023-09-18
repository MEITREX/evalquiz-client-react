FROM node:latest

WORKDIR /evalquiz-client-react
COPY package.json .
RUN npm install

COPY . .
