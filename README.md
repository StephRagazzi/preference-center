# The Preference Center challenge

## Description

You're building a Preference Center for your users where they can manage their choice regarding the channel they want to get notified on. They can choose between getting notified by email, SMS, neither, or both. To do this you need to provide an API to manage your users and their consents.

## Installation

Clone the repository

    git clone https://github.com/StephRagazzi/preference-center.git

Switch to the repo folder

    cd preference-center

Install dependencies

    npm install

Create an .env file in the application root folder which contains the MongoDB standard connection string

    MONGO_URI='mongodb://<USERNAME>:<USERPASSWORD>@localhost:27017'

## Database

The application uses MongoDB for data persistence. You can either use a local instance or use a container.  
Run docker-compose from the app root directory in order to use a container:

    docker-compose up

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Prototyping the API

You can send requests and check the result using Swagger:  
[http://localhost:3000/api](http://localhost:3000/api)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TODOs

- Write tests
- Use a fake db for tests / Implement a mechanism to switch from a real database (prod) to a fake db (dev)
- Manage exceptions that may occur
- add checks during operations
- add security
