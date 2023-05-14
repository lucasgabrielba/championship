import { RepositoryInterface } from '../../../../kernel/domain/repository/RepositoryInterface';
import { ChampionshipFilter } from '../../filters/ChampionshipFilter';
import { Championship } from '../entities/Championship';

export interface ChampionshipRepositoryInterface
  extends RepositoryInterface<Championship, ChampionshipFilter> {}
