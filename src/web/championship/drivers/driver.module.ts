import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { ORMDriver } from '../../../infra/database/entities/ORMDriver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ORMDriver])],
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
