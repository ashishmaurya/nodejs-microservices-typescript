import express from 'express';
import mongoose from 'mongoose';
import expressFileUpload from 'express-fileupload';
import logger from './logger';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import 'reflect-metadata'
import createRabbitMQChannel from './queue';
import cors from 'cors';
dotenv.config()

//Enable Mongoose
mongoose.connect(process.env.MONGO_DB as string, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

//Enable TypeORM
// createConnection().then(()=>{
//     console.log("Connected TypeORM")
// }).catch(err=>console.log(err))

//Enable Queue Service
// (async function () {
//     let channel = await createRabbitMQChannel(process.env.RABBITMQ)
// })()


var app: express.Application = express();

app.use(cors())
app.use(express.json())
app.use(expressFileUpload({
    tempFileDir: "./tmp/",
    createParentPath: true,
}));

//Add your routes here

//Sample error handler for express
// app.use(function(err,req,res,next){
// })

process.on("uncaughtException",(err)=>{
    logger.error(err)
})
process.on('uncaughtException', (ex) => {
    logger.error(ex)
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    process.exit(1);
});

export default app;
