import config from 'config';
import app from './app';
<<<<<<< HEAD
import './swagger'
let server = app.listen(8080, () => {
    let address = server.address();
    if (typeof address == "object") {
        console.log(`Server Started on port`, address?.port)
    }
})
=======
import healthcheckBootstrap from './healthcheck';
import logger from './logger';

const port = config.get('app.port');
const server = app.listen(port, () => {
  const address = server.address();
  if (typeof address === 'object') {
    logger.info(`Server Started on port ${address?.port}`);
  }
});

healthcheckBootstrap()
  .then((message) => {
    logger.info(message);
  })
  .catch((err) => {
    logger.error('unable to start health check app');
    logger.error(err.message);
    process.exit(0);
  });

process.on('SIGTERM', () => {
  logger.info('SIGTERM Signal received');
  //TODO:: Do some cleanup if required
  process.exit(0);
});

process.on('SIGINT', () => {
  console.info('SIGINT signal recceived');
  //TODO:: Do some cleanup if required
  process.exit(0);
});

process.on('uncaughtException', (ex) => {
  logger.info('UNCAUGHT EXCEPTION! 💥 Shutting down...', ex);
  process.exit(1);
});
>>>>>>> main
