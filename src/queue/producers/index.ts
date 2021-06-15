import IBaseProducer from './BaseProducer';

export async function startProducer(producer: IBaseProducer) {
  await producer.initialize();
}
