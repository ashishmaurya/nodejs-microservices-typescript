import app from './app';

const server = app.listen(process.env.PORT || 8080, () => {
  const address = server.address();
  if (typeof address === 'object') {
    console.log('Server Started on port', address?.port);
  }
});
