import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitModule } from './rabbit/rabbit.module';
import { BtcModule } from './btc/btc.module';

@Module({
  imports: [BtcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
