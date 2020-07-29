import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RabbitMQServer } from './rabbit/custom-transport/rm-server';
import { RabbitModule } from './rabbit/rabbit.module';


async function bootstrap() {

  // const customRmqTransport = await NestFactory.createMicroservice(RabbitModule, {
  //   strategy: new RabbitMQServer(JSON.parse(process.env.RMQ_URLS)[0], 'wallet'),
  // });
  // customRmqTransport.listen(() => {
  //   console.log('listening...');
  // });

  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: customRmqTransport,
  //   options: {
  //     urls: JSON.parse(process.env.RMQ_URLS),
  //     queue: 'custom',
  //     noAck: true,
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.startAllMicroservices();
  await app.listen(process.env.PORT, process.env.HOST);
}

bootstrap();