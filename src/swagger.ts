import swaggerJSDoc from "swagger-jsdoc";
import app from "./app";

const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'Sample Service', 
        version: '1.0.0', 
        description: 'A sample API',
    },
    host: `localhost:8080`, // Host (optional)
    basePath: '/', // Base path (optional)
};

// Options for the swagger docs
const options = {
    // Import swaggerDefinitions
    swaggerDefinition,
    // Path to the API docs
    // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
    apis: ['./src/routes/*'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

const swaggerUi = require('swagger-ui-express');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(swaggerSpec)
