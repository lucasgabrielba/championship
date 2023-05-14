import { Injectable } from '@nestjs/common';
import {
  CreateScorePropsPrimitive,
  Score,
  UpdateScorePropsPrimitive,
} from '../../../championship/domain/entities/Score';
import { ScoreApplicationService } from '../../../championship/application/service/ScoreApplicationService';
import { Result } from '../../../../kernel/Result/Result';
import { ScoreDTOPrimitive } from '../../../championship/DTO/ScoreDTO';
import { ScoreEntrypoint } from 'entrypoint/score.entrypoint';

@Injectable()
export class ScoreService {
  protected applicationService: ScoreApplicationService;

  constructor(entrypoint: ScoreEntrypoint) {
    this.applicationService = entrypoint.getApplicationService();
  }

  async listAllScore(): Promise<Result<Score[]>> {
    const result = await this.applicationService.all();
    return result;
  }

  async findOne(id: string): Promise<Result<Score>> {
    return await this.applicationService.getById(id);
  }

  async create(data: CreateScorePropsPrimitive): Promise<Result<Score>> {
    return await this.applicationService.create(data);
  }

  async update(
    id: string,
    data: UpdateScorePropsPrimitive,
  ): Promise<Result<Score>> {
    const entity = await this.applicationService.getById(id);

    if (entity.isFailure) {
      return Result.fail(new Error(entity.error.toString()));
    }

    const scoreData = entity.data.toDTO();
    const scoreDTO: ScoreDTOPrimitive = {
      ...scoreData,
      ...data,
      championshipId: data.championshipId ?? scoreData.championship.id,
      driverId: data.driverId ?? scoreData.driver.id,
    };

    return await this.applicationService.update(scoreDTO);
  }

  async remove(id: string): Promise<Result<boolean>> {
    return await this.applicationService.remove(id);
  }
}
