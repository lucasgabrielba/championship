import { Module, Global } from '@nestjs/common';
import { ORMChampionship } from './ORMChampionship';
import { ORMDriver } from './ORMDriver';
import { ORMScore } from './ORMScore';

@Global()
@Module({
  providers: [ORMChampionship, ORMDriver, ORMScore],
  exports: [ORMChampionship, ORMDriver, ORMScore],
})
export class ORMModule {}
