import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQClient } from './custom-transport/rm-client';

@Injectable()
export class RabbitService implements OnModuleInit {
  constructor(
    //@Inject('CUSTOM_QUEUE') private readonly customQueue: ClientProxy,
  ) {
  }
 // private customClient = new RabbitMQClient(JSON.parse(process.env.RMQ_URLS)[0], 'rpc', 'fanout', ['db', 'wallet'], true, 1, true);

  async onApplicationBootstrap() {
    //console.log('bootstaraping...');
  }

  async onModuleInit() {
    // console.log('module loading...');
    // await this.customClient.connect();
    // //customClient.emit('msg', { pattern: 'inner', data: 'Hello from Rabbit Client!' });
    //
    // //await this.customClient.connect();
    // await this.customClient.sendToExchange('msg', { blockchain: 'ethereum', data: 'Hello from Rabbit Client!' });
    //
    //
    // console.log('Hello from RabbitService!!!');
    // //this.customQueue.emit('msg', { pattern: 'inner', data: 'Hello from Rabbit Client!' });
  }
}
