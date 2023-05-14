import { RepositoryInterface } from '../../../../kernel/domain/repository/RepositoryInterface';
import { DriverFilter } from '../../filters/DriverFilter';
import { Driver } from '../entities/Driver';

export interface DriverRepositoryInterface
  extends RepositoryInterface<Driver, DriverFilter> {}
