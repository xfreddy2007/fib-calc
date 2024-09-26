# Fibonacci Calculator

#### An app to demonstrate skills with docker, redis, postgresql, and nginx composition

### start the project

To start the project locally, just run the following command:

```
docker compose up
```

The project contains 3 parts:

1. client: the front end part that user can input the index and get a fibonacci sequence result.
2. server: the back end part to collect and store values in redis cache or postgreSQL respectively.
3. worker: to listen to the redis updates and provides the calculation with the fibonacci sequence result.

### Where to go from here

This is a very basic project to main practice docker environment mechanism. For any project would have more complex backend system or database schema would consider using `Prisma` to do the ORM handle between backend and database. It would be type safer and easy to understand the data schema defined in the DB.

For any development experience improvement will be using the following tools:

- swagger: for api documentation
- logger: for api console info checks
- tailwind: front end css framework to manage all css styles
