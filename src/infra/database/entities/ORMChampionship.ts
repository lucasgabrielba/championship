import { Column, Entity, OneToMany } from 'typeorm';
import { ORMScore } from './ORMScore';
import { ORMBase } from './utils/ORMBase';

@Entity()
export class ORMChampionship extends ORMBase {
  @Column()
  name: string;

  @Column('integer')
  stage: number;

  @Column('integer')
  rounds: number;

  @OneToMany(() => ORMScore, (score) => score.championship, {
    onDelete: 'CASCADE',
  })
  scores?: ORMScore[];
}
