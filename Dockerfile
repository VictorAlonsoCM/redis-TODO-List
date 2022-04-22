FROM node:16
  
WORKDIR '/var/www/app'

COPY . .

EXPOSE 3000

