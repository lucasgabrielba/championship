import { Injectable } from '@nestjs/common';
import {
  CreateDriverPropsPrimitive,
  Driver,
  UpdateDriverPropsPrimitive,
} from '../../../championship/domain/entities/Driver';
import { DriverApplicationService } from '../../../championship/application/service/DriverApplicationService';
import { Result } from '../../../../kernel/Result/Result';
import { DriverEntrypoint } from 'entrypoint/driver.entrypoint';

@Injectable()
export class DriverService {
  protected applicationService: DriverApplicationService;

  constructor(entrypoint: DriverEntrypoint) {
    this.applicationService = entrypoint.getApplicationService();
  }

  async listAllDriver(): Promise<Result<Driver[]>> {
    const result = await this.applicationService.all();
    return result;
  }

  async findOne(id: string): Promise<Result<Driver>> {
    return await this.applicationService.getById(id);
  }

  async create(data: CreateDriverPropsPrimitive): Promise<Result<Driver>> {
    return await this.applicationService.create(data);
  }

  async update(
    id: string,
    data: UpdateDriverPropsPrimitive,
  ): Promise<Result<Driver>> {
    const entity = await this.applicationService.getById(id);

    if (entity.isFailure) {
      return Result.fail(new Error(entity.error.toString()));
    }

    let driverDTO = entity.data.toDTO();
    driverDTO = {
      ...driverDTO,
      ...data,
    };

    return await this.applicationService.update(driverDTO);
  }

  async delete(id: string): Promise<Result<boolean>> {
    return await this.applicationService.remove(id);
  }
}
