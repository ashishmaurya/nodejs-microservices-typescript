import express from 'express';
import mongoose from 'mongoose';
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


var app: express.Application = express();

app.use(cors())
app.use(express.json())
app.use(expressFileUpload({
    tempFileDir: "./tmp/",
    createParentPath: true,
}));

//Add your routes here
app.use(userAccountRoutes);

// //Queueing Services
// (async function () {
//     await startConsumer(new TestConsumer());
// })();

// const testProducer = new TestProducer();
// (async function () {
//     await startProducer(testProducer);
// })();
// app.use('/test/producer', async (req: any, res: express.Response) => {
//     testProducer.send({ subject: "how are you doing?", random: Math.random() * 100 | 0 })
//     res.json({ sent: true });
// });

//Sample error handler for express
// app.use(function(err,req,res,next){
// })

process.on('uncaughtException', (ex) => {
    logger.error("exception:", ex)
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    process.exit(1);
});

export default app;
