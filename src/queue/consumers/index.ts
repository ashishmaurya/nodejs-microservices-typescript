import IBaseConsumer from './BaseConsumer';


export async function startConsumer(consumer: IBaseConsumer) {
  await consumer.initialize();
  await consumer.start();
}