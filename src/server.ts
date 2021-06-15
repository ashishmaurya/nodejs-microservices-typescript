import config from 'config';
import app from './app';

const port = config.get('PORT') || 8080
const server = app.listen(port, () => {
  const address = server.address();
  if (typeof address === 'object') {
    console.log('Server Started on port', address?.port);
  }
});
