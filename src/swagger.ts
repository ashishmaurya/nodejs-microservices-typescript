import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";
import app from "./app";
import logger from "./logger";

const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        // API informations (required)
        title: 'Sample Service', 
        version: '1.0.0', 
        description: 'A sample API Built with NodeJS',
    },
    // host: `localhost:8080`, // Host (optional)
    basePath: '/', // Base path (optional),
    servers: [
        {
            url:"http://localhost:8080/",
            description: "Development Server"
        },
        {
            url:"http://localhost:8080/",
            description: "Staging Server"
        }
    ],
    securityDefinitions:{ 
        APIAuth : {
            type: "apiKey",
            name: "authorization",
            in: "header"
        }
    },
    tags:["login", "hi"]
    
};

// Options for the swagger docs
const options = {
    // Import swaggerDefinitions
    swaggerDefinition,
    // Path to the API docs
    // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
    apis: ['./src/routes/*'],
};
// const fs = require('fs');
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
logger.info(swaggerSpec);
// fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec));

const swaggerUi = require('swagger-ui-express');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));