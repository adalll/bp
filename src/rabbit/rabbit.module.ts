import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { RabbitController } from './rabbit.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'CUSTOM_QUEUE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: JSON.parse(process.env.RMQ_URLS),
    //       queue: 'custom_sub',
    //       noAck: false,
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
  ],
  providers: [RabbitService],
  controllers: [RabbitController],
  exports: []
})
export class RabbitModule {}
