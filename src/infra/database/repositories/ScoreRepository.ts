import { Injectable } from '@nestjs/common';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { ORMScore } from '../entities/ORMScore';
import { Result } from '../../../../kernel/Result/Result';
import { ScoreRepositoryInterface } from '../../../championship/domain/repository/ScoreRepositoryInterface';
import { Score } from '../../../championship/domain/entities/Score';

@Injectable()
export class ScoreRepository
  extends Repository<ORMScore>
  implements ScoreRepositoryInterface {
  constructor(dataSource: DataSource) {
    super(ORMScore, dataSource.createEntityManager());
  }

  async persist(instance: Score): Promise<Result<void>> {
    try {
      await this.save(ORMScore.import(instance));
      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error(e.message));
      }
      throw e;
    }
  }

  async findById(id: string): Promise<Result<Score>> {
    const result = await this.findOne({
      where: { id: id.toString() },
      relations: ['championship', 'driver'],
    });
    if (!result) {
      return Result.fail(new Error('not found'));
    }

    return Result.ok<Score>(result.export());
  }

  async findOneEntity(where?: object): Promise<Result<Score>> {
    try {
      const result = await this.findOne({
        where: where,
        relations: ['championship', 'driver'],
      });

      if (!result) {
        return Result.fail(new Error('not found'));
      }

      const Score = result.export();
      return Result.ok(Score);
    } catch (error) {
      return Result.fail(error);
    }
  }
  async findEntity(where?: object): Promise<Result<Score[]>> {
    const result = await this.find({
      where: where,
      relations: ['championship', 'driver'],
    });

    const results = result.map((Score) => Score.export());
    return Result.ok(results);
  }

  async deleteEntity(instance: Score): Promise<Result<void>> {
    try {
      const entity = await this.findOne({
        where: { id: instance.id.toString() },
      });
      if (!entity) return Result.fail(new Error('invalid'));
      await this.softRemove(entity);
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error('invalid'));
      }
      throw e;
    }
  }
}
