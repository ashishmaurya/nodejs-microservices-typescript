# NodeJs Microservices with Typescript Template

This is a template for creating nodejs microservices with typescript for cleaner services, which includes all common services or packages required to  build the services like logger, express server, queue services(RabbitMQ), Database services(MongoDb, Postgres, MySQL etc).

## How to run services?

- You can use the scripts available in `package.json` file. eg `npm run dev` to start services in development environment or `npm run build` to build generate transpiled javsacript files from typescript which the you can use it run independently.
- Other way(Preferred Way) is to use `docker` to build the container and use other services like `docker-compose`, `kubernetes` or `docker swarm` to run conatiners for better performace, scalability and maintainability of you services.

## Default Service/Folder Architecture

- `src` folder conatains all the user generated files.
- `src/app.ts` creates the express(but does not starts the server which allows us to test our services without actually running the services)
- `src/server.ts` starts the express server
- `src/logger.ts` creates the logger instance(winston logger)
- `src/middleware` directory contains all the middleware for express server.
- `src/validators` directory contains the validator middleware for express ( JOI Validator is used.), as all validation is done in middleware, our main request handler does not have to worry about the validation logic(which makes main request handler very slim and clean).
- `src/routes` directory contains all the routes/controller for express server.
- `src/repositories` directory conatins the repositories for MongoDb(Mongoose). You can delete this and its references if your services is not using MongoDB
- `src/entity` directory contains the Entity for TypeORM(used to handle data persistency with SQL databases like MySQL, Postgres etc.)
- `src/queue` directory contains the producers and consumers for RabbitMQ(handling Async Queue Services). It's advised to run consumer in separate process, however you can use producer's to push message from express server.

### Note: Feel free to give you advise(It's development is still in progress)
