import express from 'express';
import expressFileUpload from 'express-fileupload';
import logger from './logger';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import 'reflect-metadata'
import cors from 'cors';
import userAccountRoutes from './routes/userAccountRoutes';
import { startConsumer } from './queue/consumers';
import TestConsumer from './queue/consumers/TestConsumer';
import TestProducer from './queue/producers/TestProducer';
import { startProducer } from './queue/producers';
dotenv.config();

//Enable Mongoose
// mongoose.connect(process.env.MONGO_DB as string, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

//Enable TypeORM
// createConnection().then(()=>{
//     console.log("Connected TypeORM")
// }).catch(err=>console.log(err))


const app: express.Application = express();

app.use(cors())
app.use(express.json())
app.use(expressFileUpload({
  tempFileDir: './tmp/',
  createParentPath: true,
}));

//Add your routes here
app.use(userAccountRoutes);
process.on('uncaughtException', (ex) => {
  logger.info('UNCAUGHT EXCEPTION! 💥 Shutting down...', ex);
  process.exit(1);
});

export default app;
