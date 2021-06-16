import config from 'config';
import app from './app';
import healthcheckBootstrap from './healthcheck';
import logger from './logger';

const port = (config.has('PORT') ? config.get('PORT') : null) || 8080;
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
