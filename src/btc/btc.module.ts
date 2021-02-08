import { Module } from '@nestjs/common';
import { BtcService } from './btc.service';
import { BtcController } from './btc.controller';

@Module({
  providers: [BtcService],
  controllers: [BtcController],
})
export class BtcModule {}
