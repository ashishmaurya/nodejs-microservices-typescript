import { Channel, ConsumeMessage } from 'amqplib';
import { consumeFromQueue } from '../index';

export const consumeDummyQueue = (
  channel: Channel,
  handler: (payload: ConsumeMessage) => void,
) => {
  consumeFromQueue('QUEUE_DUMMY', channel, handler,{
    noAck:false
  });
};
