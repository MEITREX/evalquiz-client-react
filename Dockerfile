FROM node:latest as build-stage

WORKDIR /evalquiz-client-react
COPY package.json .
RUN npm install