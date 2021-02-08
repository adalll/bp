import * as amqp from 'amqplib';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';

export class RabbitMQClient extends ClientProxy {
  constructor(
    private readonly host: string,
    private readonly exchange: string,
    private readonly exchangeType: string,
    private readonly queues: string[],
    private readonly durable: boolean,
    private readonly prefetchCount: number,
    private readonly isGlobalPrefetch: boolean,
  ) {
    super();
  }

  private server: amqp.Connection = null;
  private channel: amqp.Channel = null;

  async sendToExchange<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Promise<void> {
    try {
      this.channel &&
        (await this.channel.publish(
          this.exchange,
          '',
          Buffer.from(JSON.stringify({ pattern, data })),
        ));
    } catch (e) {
      console.log('rabbitMQ server not connected: ', e.message);
    }
  }

  async connect(): Promise<any> {
    this.server = await amqp.connect(this.host);
    this.channel = await this.server.createChannel();
    await this.channel.prefetch(this.prefetchCount, this.isGlobalPrefetch);
    await this.channel.assertExchange(this.exchange, this.exchangeType);
    for (const queue of this.queues) {
      await this.channel.assertQueue(queue, { durable: this.durable });
      await this.channel.bindQueue(queue, this.exchange, '');
    }
  }

  close(): any {
    this.channel && this.channel.close();
    this.server && this.server.close();
  }

  protected publish(
    packet: ReadPacket<any>,
    callback: (packet: WritePacket<any>) => void,
  ): Function {
    throw new Error('Method not implemented.');
  }

  protected dispatchEvent<T = any>(packet: ReadPacket): Promise<T> {
    throw new Error('Method not implemented.');
    return Promise.resolve(undefined);
  }
}
