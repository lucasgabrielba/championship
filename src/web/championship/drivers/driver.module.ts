import { Module } from '@nestjs/common';
import { DriverService } from './Driver.service';
import { DriverController } from './Driver.controller';

@Module({
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
