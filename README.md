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
