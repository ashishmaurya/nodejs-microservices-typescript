import * as amqp from 'amqplib';
import * as fs from 'fs';
import { Channel } from 'amqplib';
import logger from '../logger';

/**
 * Creates a RabbitMQ channel
 * @param rabbitmqURL RabbitMQ URL
 */
const createRabbitMQChannel = async (rabbitmqURL: string) => {
  try {
    const connection = await amqp.connect(`${rabbitmqURL}?heartbeat=50`, {
      ca: [process.env.NODE_ENV === 'production' ? fs.readFileSync('./rabbitmq.cert') : null],
    });
    logger.info.apply(logger, ['Connection Succefful', { label: 'AMQP' }]);

    connection.on('error', (err) => {
      logger.error(err, { label: 'AMQP' });
    });

    connection.on('close', () => {
      logger.error('Channel closed, reconnecting...', { label: 'AMQP' });
      // Reconnect to RabbitMQ or close the process itself
    });

    const channel = await connection.createChannel();
    return channel;
  } catch (e) {
    logger.error(e, { label: 'AMQP' });
    process.exit(1);
  }
};

export const assertQueue = async (queueName: string,
  channel: amqp.Channel,
  options: amqp.Options.AssertQueue) => {
  await channel.assertQueue(queueName, options);
};

export const consumeFromQueue = async (
  queueName: string,
  channel: amqp.Channel,
  handler: (payload: amqp.ConsumeMessage) => void,
  options: amqp.Options.Consume,
) => {
  await channel.consume(queueName, handler, options || { noAck: false });
};

export const sendToQueue = (queueName: string, channel: Channel, payload?: any) => {
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), {
    persistent: true,
  });
};

export default createRabbitMQChannel;
