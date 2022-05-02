# A Simple To-do List using Docker

This is dockerized version of the [original app](https://github.com/VictorAlonsoCM/redis-TODO-List) that uses Node.js, Express, Bootstrap and Redis. 
It uses Docker compose to build both the frontend and backend.

<img width="1323" alt="Screen Shot 2022-04-21 at 4 05 40 PM" src="https://user-images.githubusercontent.com/313480/164441075-6e9fec0d-e762-41de-b91d-a234593f7bfb.png">


## Tech Stack

- NPM – a node package manager used for Node.js app development 
- Node.js – our runtime for building web applications
- Express – a backend web-application framework for Node.js 
- Bootstrap – a toolkit for responsive, front-end web development
- Redis – an in-memory, key-value, NoSQL database used for caching, data storage, and message brokering
- Docker Desktop – a suite of software-development tools for creating, sharing, and running individual containers


## Pre-requisite

- [Download and Install Docker Desktop](https://docs.docker.com/desktop/) 



## Bring up the application

We will be using `docker-compose` utility to bring up the app.

```
services:
  
  app:
    build: ./
    volumes:
       - ./:/var/www/app
    ports:
      - 3000:3000
    environment:
      - REDIS_URL=redis://db:6379
      - NODE_ENV=development
      - PORT=3000
    command:
       sh -c 'node app.js'
    depends_on:
      - db
 
  db:
    image: redis
 ```
 
 
Bring up the app: 

```
docker-compose up -d
```

## Accessing the app

Open https://localhost:3000 to see the todo-list app up and running.


