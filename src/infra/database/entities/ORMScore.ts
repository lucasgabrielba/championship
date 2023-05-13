import { Entity, Column, ManyToOne } from 'typeorm';
import { ORMBase } from './utils/ORMBase';
import { ORMChampionship } from './ORMChampionship';
import { ORMDriver } from './ORMDriver';

@Entity()
export class ORMScore extends ORMBase {
  @ManyToOne(() => ORMChampionship, (championship) => championship.scores)
  championship: ORMChampionship;
  @Column()
  championshipId: string;

  @ManyToOne(() => ORMDriver, (driver) => driver.scores)
  driver: ORMDriver;
  @Column()
  driverId: string;

  @Column('integer')
  points: number;
}
