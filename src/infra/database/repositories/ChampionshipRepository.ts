import { Injectable } from '@nestjs/common';
import { ObjectLiteral, QueryFailedError, Repository } from 'typeorm';
import { ChampionshipRepositoryInterface } from '../../../championship/domain/repository/ChampionshipRepositoryInterface';
import { ORMChampionship } from '../entities/ORMChampionship';
import { Championship } from '../../../championship/domain/entities/Championship';
import { Result } from '../../../../kernel/Result/Result';
import { ChampionshipFilter } from '../../../championship/filters/ChampionshipFilter';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChampionshipRepository implements ChampionshipRepositoryInterface {
  constructor(
    @InjectRepository(ORMChampionship)
    private repository: Repository<ORMChampionship>,
  ) {}

  async persist(instance: Championship): Promise<Result<void>> {
    try {
      await this.repository.save(ORMChampionship.import(instance));
      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error(e.message));
      }
      throw e;
    }
  }

  async findById(id: string): Promise<Result<Championship>> {
    const result = await this.repository.findOne({
      where: { id: id.toString() },
    });
    if (!result) {
      return Result.fail(new Error('not found'));
    }

    return Result.ok<Championship>(result.export());
  }

  async findOne(options: ChampionshipFilter): Promise<Result<Championship>> {
    const where: ObjectLiteral = options.where || {};

    try {
      const result = await this.repository.findOne({ where });
      if (!result) {
        return Result.fail(new Error('not found'));
      }

      const Championship = result.export();
      return Result.ok(Championship);
    } catch (error) {
      return Result.fail(error);
    }
  }
  async find(): Promise<Result<Championship[]>> {
    const result = await this.repository.find();
    const results = result.map((Championship) => Championship.export());
    return Result.ok(results);
  }

  async delete(instance: Championship): Promise<Result<void>> {
    try {
      const entity = await this.repository.findOne({
        where: { id: instance.id.toString() },
      });
      if (!entity) return Result.fail(new Error('invalid'));
      await this.repository.softRemove(entity);
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error('invalid'));
      }
      throw e;
    }
  }
}
