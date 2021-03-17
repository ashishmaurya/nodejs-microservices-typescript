import { Channel, ConsumeMessage } from "amqplib";
import createRabbitMQChannel, { assertQueue, consumeFromQueue, sendToQueue } from "..";

import IBaseProducer from "./BaseProducer";

export default class TestProducer implements IBaseProducer {
    QUEUE_NAME: string = 'TEST_EMAIL_QUEUE';
    channel: Channel;
    public async initialize() {
        this.channel = await createRabbitMQChannel(process.env.RABBIT_MQ || "amqp://localhost");
        await assertQueue(this.QUEUE_NAME, this.channel, {});
    }
    public async send(data: any) {
        sendToQueue(this.QUEUE_NAME, this.channel, data);
    }

}