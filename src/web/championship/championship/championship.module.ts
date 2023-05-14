import { Module } from '@nestjs/common';
import { ChampionshipService } from './Championship.service';
import { ChampionshipController } from './Championship.controller';

@Module({
  providers: [ChampionshipService],
  controllers: [ChampionshipController],
})
export class ChampionshipModule {}
