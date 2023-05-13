import { ORMDriver } from '../../../infra/database/entities/ORMDriver';
import { CreateDriverDTO, UpdateDriverDTO } from '../../DTO/DriverDTO';
import { NotFoundException } from '@nestjs/common';
import { DriverCoreService } from '../../domain/CoreService/DriverCoreService';

export class DriverApplicationService {
  constructor(protected service: DriverCoreService) {
    this.service = service;
  }

  async getById(id: string): Promise<ORMDriver | NotFoundException> {
    const result = await this.service.getById(id);
    if (!result) {
      return new NotFoundException('Driver not found');
    }

    return result;
  }

  async getAll(): Promise<ORMDriver[]> {
    const result = await this.service.getAll();

    return result;
  }

  async filter(): Promise<ORMDriver | NotFoundException> {
    const result = await this.service.filter();
    if (!result) {
      return new NotFoundException('Driver not found');
    }

    return result;
  }

  async create(data: CreateDriverDTO): Promise<ORMDriver | NotFoundException> {
    const result = await this.service.create(data);

    if (!result) {
      return new NotFoundException('Driver not found');
    }

    return result;
  }

  async update(data: UpdateDriverDTO): Promise<ORMDriver | NotFoundException> {
    const result = await this.service.update(data);

    if (!result) {
      return new NotFoundException('Driver not found');
    }

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.service.delete(id);

    return result;
  }
}
