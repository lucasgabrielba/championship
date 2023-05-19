import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ORMScore } from '../../../infra/database/entities/ORMScore';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ORMScore])],
  providers: [ScoreService],
  controllers: [ScoreController],
})
export class ScoreModule {}
