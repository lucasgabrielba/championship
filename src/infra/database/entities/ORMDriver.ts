import { Entity, Column, OneToMany } from 'typeorm';
import { ORMScore } from './ORMScore';
import { ORMBase } from './utils/ORMBase';

@Entity()
export class ORMDriver extends ORMBase {
  @Column()
  name: string;

  @OneToMany(() => ORMScore, (score) => score.driver, { onDelete: 'CASCADE' })
  scores?: ORMScore[];
}
