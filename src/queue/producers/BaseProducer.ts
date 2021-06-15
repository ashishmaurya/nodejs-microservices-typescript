export default interface IBaseProducer {
    initialize();
    send(data: any);
}
