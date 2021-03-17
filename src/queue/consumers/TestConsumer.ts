import { Channel, ConsumeMessage } from "amqplib";
import createRabbitMQChannel, { assertQueue, consumeFromQueue } from "..";
import IBaseConsumer from "./BaseConsumer";


export default class TestConsumer implements IBaseConsumer {

    QUEUE_NAME: string = 'TEST_EMAIL_QUEUE';
    channel: Channel;
    public async initialize() {
        this.channel = await createRabbitMQChannel(process.env.RABBIT_MQ || "amqp://localhost");
        await assertQueue(this.QUEUE_NAME, this.channel, {});
    }

    public async start() {
        await consumeFromQueue(this.QUEUE_NAME, this.channel, (data: ConsumeMessage) => {
            //TODO:: Send Email
            console.log("Sending Email with content", data.content.toString());
            this.channel.ack(data);
        }, { noAck: false });
    }
}