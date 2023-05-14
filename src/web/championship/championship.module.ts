import { Module } from '@nestjs/common';
import { ChampionshipModule } from 'championship/championship.module';
import { DriverModule } from 'drivers/driver.module';
import { EntrypointModule } from 'entrypoint/entrypoint.module';
import { ScoreModule } from 'scores/score.module';

@Module({
  imports: [ChampionshipModule, DriverModule, ScoreModule],
  providers: [EntrypointModule],
  exports: [ChampionshipModule, DriverModule, ScoreModule],
})
export class WebModule {}
