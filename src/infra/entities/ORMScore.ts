import { Entity, Column, ManyToOne } from 'typeorm';
import { ORMBase } from './utils/ORMBase';
import { ORMChampionship } from './ORMChampionship';
import { ORMRunner } from './ORMRunner';

@Entity()
export class ORMScore extends ORMBase {
  @ManyToOne(() => ORMChampionship, (championship) => championship.scores)
  championship: ORMChampionship;
  @Column()
  championshipId: string;

  @ManyToOne(() => ORMRunner, (runner) => runner.scores)
  runner: ORMRunner;
  @Column()
  runnerId: string;

  @Column('integer')
  points: number;
}
