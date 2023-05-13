import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../../../infra/database/entities/ORMDriver';
import {
  CreateDriverInput,
  UpdateDriverInput,
} from '../../../entities/Driver/driver.input';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private repository: Repository<Driver>,
  ) {}

  async findAll(): Promise<Driver[]> {
    const result = await this.repository.find();

    if (!result) {
      throw new InternalServerErrorException('Error fetching all Driver');
    }

    return result;
  }

  async findById(id: string): Promise<Driver> {
    const result = await this.repository.findOne({
      where: { id: id },
    });

    if (!result) {
      throw new InternalServerErrorException(
        `Error fetching id Driver: ${id}.`,
      );
    }

    return result;
  }

  async createAndSave(data: CreateDriverInput): Promise<Driver> {
    const created = this.repository.create(data);
    const saved = await this.repository.save(created);

    if (!saved) {
      throw new InternalServerErrorException('Error creating Driver.');
    }

    return saved;
  }

  async updateAndSave(id: string, data: UpdateDriverInput): Promise<Driver> {
    const championship = await this.findById(id);

    if (!championship) {
      throw new InternalServerErrorException(
        'It was not possible to make the update, Driver not found.',
      );
    }

    await this.repository.update(championship, { ...data });
    const created = this.repository.create({
      ...championship,
      ...data,
    });
    const saved = this.repository.save(created);

    if (!saved) {
      throw new InternalServerErrorException('Error updating Driver.');
    }

    return saved;
  }

  async delete(id: string): Promise<boolean> {
    const championship = await this.findById(id);

    if (!championship) {
      throw new InternalServerErrorException(
        `Error fetching id Driver: ${id}.`,
      );
    }

    const deleted = await this.repository.softDelete(id);

    if (deleted) {
      return true;
    }

    return false;
  }
}
