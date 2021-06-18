let PROTO_PATH = __dirname + '/protos/sample_api.proto';

let grpc = require('@grpc/grpc-js');
let protoLoader = require('@grpc/proto-loader');

import config from 'config';

let packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
let hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

export default ()=>{
  const  target = config.get('GRPC_ENDPOINT') ||  'localhost:50051';
  //TODO:: On Production use SSL for extra security
  let client = new hello_proto.Greeter(target,
    grpc.credentials.createInsecure());
  return client;
}
