import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('rabbit')
export class RabbitController {
  @EventPattern('block')
  async handleBlock(
    @Payload() data: { pattern: string; data: any },
    @Ctx() context: RmqContext,
  ): Promise<void> {
    //const channel = context.getChannelRef();
    //const originalMsg = context.getMessage();

    const block = data.data;
    console.log('from controller: ', block);

    //await channel.ack(originalMsg);
  }

  @EventPattern('tx')
  async handleTx(
    @Payload() data: { pattern: string; data: any },
    @Ctx() context: RmqContext,
  ): Promise<void> {
    //const channel = context.getChannelRef();
    //const originalMsg = context.getMessage();

    const tx = data.data;
    console.log('from controller: ', tx);

    //await channel.ack(originalMsg);
  }

  @MessagePattern('msg')
  async handleMsg(
    @Payload() data: { pattern: string; data: any },
    @Ctx() context: RmqContext,
  ): Promise<string> {
    //const channel = context.getChannelRef();
    //const originalMsg = context.getMessage();

    const tx = data.data;
    console.log('from controller: ', tx);

    //await channel.ack(originalMsg);
    return 'return from @messagepattern...';
  }
}
