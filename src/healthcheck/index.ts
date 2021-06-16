import express from 'express';
import config from 'config';
import logger from '../logger';
function healthcheckBootstrap() {
  return new Promise((res, rej) => {
    const app: express.Application = express();
    const startedAt = new Date().getTime();
    app.get('/v1/health', (req: express.Request, res: express.Response) => {
      //TODO:: Check readyness and liveness
      res.send('ready');
    });
    const port =
      (config.has('HEALTH_PORT') ? config.get('HEALTH_PORT') : null) || 3001;
    logger.info('Called healthhcheck');
    const server = app.listen(port, () => {
      const address = server.address();
      if (typeof address === 'object') {
        res(`healthcheck Server Started on port ${address?.port}`);
      }
    });
  });
}

export default healthcheckBootstrap;
