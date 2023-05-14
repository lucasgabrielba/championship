import { RepositoryInterface } from '../../../../kernel/domain/repository/RepositoryInterface';
import { ScoreFilter } from '../../filters/ScoreFilter';
import { Score } from '../entities/Score';

export interface ScoreRepositoryInterface
  extends RepositoryInterface<Score, ScoreFilter> {}
