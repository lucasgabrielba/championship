import { Injectable } from '@nestjs/common';
import {
  CreateChampionshipPropsPrimitive,
  Championship,
  UpdateChampionshipPropsPrimitive,
} from '../../../championship/domain/entities/Championship';
import { ChampionshipApplicationService } from '../../../championship/application/service/ChampionshipApplicationService';
import { Result } from '../../../../kernel/Result/Result';
import { ChampionshipEntrypoint } from 'entrypoint/championship.entrypoint';

@Injectable()
export class ChampionshipService {
  protected applicationService: ChampionshipApplicationService;

  constructor(entrypoint: ChampionshipEntrypoint) {
    this.applicationService = entrypoint.getApplicationService();
  }

  async listAllChampionship(): Promise<Result<Championship[]>> {
    const result = await this.applicationService.all();
    return result;
  }

  async findOne(id: string): Promise<Result<Championship>> {
    return await this.applicationService.getById(id);
  }

  async create(
    data: CreateChampionshipPropsPrimitive,
  ): Promise<Result<Championship>> {
    return await this.applicationService.create(data);
  }

  async update(
    id: string,
    data: UpdateChampionshipPropsPrimitive,
  ): Promise<Result<Championship>> {
    const entity = await this.applicationService.getById(id);

    if (entity.isFailure) {
      return Result.fail(new Error(entity.error.toString()));
    }

    let ChampionshipDTO = entity.data.toDTO();
    ChampionshipDTO = {
      ...ChampionshipDTO,
      ...data,
    };

    return await this.applicationService.update(ChampionshipDTO);
  }

  async remove(id: string): Promise<Result<boolean>> {
    return await this.applicationService.remove(id);
  }
}
