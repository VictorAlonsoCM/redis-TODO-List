FROM node:lts-alpine
  
WORKDIR '/var/www/app'

RUN npm install --save express redis ejs dotenv

COPY . .

EXPOSE 3000

