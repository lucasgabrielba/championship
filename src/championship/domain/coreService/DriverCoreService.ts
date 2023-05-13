import { ORMDriver } from '../../../infra/database/entities/ORMDriver';
import { CreateDriverDTO, UpdateDriverDTO } from '../../DTO/DriverDTO';
import { DriverRrepositoryInterface } from '../repository/DriverRepositoryInterface';
import { NotFoundException } from '@nestjs/common';

export class DriverCoreService {
  constructor(protected repository: DriverRrepositoryInterface) {
    this.repository = repository;
  }

  async getById(id: string): Promise<ORMDriver | NotFoundException> {
    const result = await this.repository.getById(id);
    if (!result) {
      return new NotFoundException('Driver not found');
    }

    return result;
  }

  async getAll(): Promise<ORMDriver[]> {
    const result = await this.repository.getAll();

    return result;
  }

  async filter(): Promise<ORMDriver | NotFoundException> {
    const result = await this.repository.filter();
    if (!result) {
      return new NotFoundException('Driver not found');
    }

    return result;
  }

  async create(data: CreateDriverDTO): Promise<ORMDriver | NotFoundException> {
    const result = await this.repository.create(data);

    if (!result) {
      return new NotFoundException('Driver not found');
    }

    return result;
  }

  async update(data: UpdateDriverDTO): Promise<ORMDriver | NotFoundException> {
    const result = await this.repository.update(data);

    if (!result) {
      return new NotFoundException('Driver not found');
    }

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);

    return result;
  }
}
