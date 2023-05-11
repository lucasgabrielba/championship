import { Entity, Column, OneToMany } from 'typeorm';
import { ORMScore } from './ORMScore';
import { ORMBase } from './utils/ORMBase';

@Entity()
export class ORMRunner extends ORMBase {
  @Column()
  name: string;

  @OneToMany(() => ORMScore, (score) => score.runner, { onDelete: 'CASCADE' })
  scores?: ORMScore[];
}
