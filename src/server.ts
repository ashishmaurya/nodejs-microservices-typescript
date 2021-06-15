import app from './app';

const server = app.listen(9091, () => {
  const address = server.address();
  if (typeof address === 'object') {
    console.log('Server Started on port', address?.port);
  }
});
