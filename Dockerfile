FROM node:lts-alpine

COPY package*.json ./
  
WORKDIR '/var/www/app'

RUN npm install --save express redis ejs dotenv

COPY . .

EXPOSE 3000

