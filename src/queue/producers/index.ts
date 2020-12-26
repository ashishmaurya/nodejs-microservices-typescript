import { assertQueue, sendToQueue } from '../index';
import { Channel } from 'amqplib';

export const produceDummyProducer = (channel: Channel, payload?: any) => {
  sendToQueue('QUEUE_DUMMY', channel, payload);
};
