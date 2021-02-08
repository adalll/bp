import * as amqp from 'amqplib';
import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export class RabbitMQServer extends Server implements CustomTransportStrategy {
  private server: amqp.Connection = null;
  private channel: amqp.Channel = null;

  constructor(private readonly host: string, private readonly queue: string) {
    super();
  }

  public async listen(callback: () => void) {
    await this.init();
    this.channel.consume(`wallet`, this.handleMessage.bind(this), {
      noAck: false,
    });
  }

  public close() {
    this.channel && this.channel.close();
    this.server && this.server.close();
  }

  private async handleMessage(message) {
    console.log('got the message: ', message.content.toString());

    const { content } = message;
    const messageObj = JSON.parse(content.toString());

    const handlers = this.getHandlers();

    //const pattern = JSON.stringify(messageObj.pattern);
    const pattern = messageObj.pattern;

    if (!this.messageHandlers.get(pattern)) {
      console.log('no message handler, return!');
      return;
    }

    const handler = this.messageHandlers.get(pattern);
    const response$ = this.transformToObservable(
      await handler(messageObj.data),
    ) as Observable<any>;

    response$.subscribe(res => console.log('from controller observable', res));
    response$ && this.send(response$, data => this.sendMessage(data));
    this.channel.ack(message);
  }

  public sendMessage(message) {
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.sendToQueue(`${this.queue}_pub`, buffer);
  }

  private async init() {
    this.server = await amqp.connect(this.host);
    this.channel = await this.server.createChannel();
    this.channel.assertQueue(`wallet`, { durable: true });
    this.channel.assertQueue(`db`, { durable: true });
  }
}
