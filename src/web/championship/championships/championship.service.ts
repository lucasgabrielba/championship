import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateChampionshipInput,
  UpdateChampionshipInput,
} from '../../DTO/Championship/championship.input';
import { ChampionshipApplicationService } from '../../../championship/aplication/service';
import { ChampionshipDTO } from '../../DTO';
import { championshipToDTO } from './utils/toDTO';

@Injectable()
export class ChampionshipService {
  constructor(private applicationService: ChampionshipApplicationService) {}

  async findAll(): Promise<ChampionshipDTO[]> {
    const result = await this.applicationService.getAll();

    if (!result) {
      throw new InternalServerErrorException('Error fetching all championship');
    }

    const championshipArray = result.map((item) => championshipToDTO(item));

    return championshipArray;
  }

  async findById(id: string): Promise<ChampionshipDTO> {
    const result = await this.applicationService.getOne(id);

    if (!result) {
      throw new InternalServerErrorException(
        `Error fetching id Championship: ${id}.`,
      );
    }

    const championship = championshipToDTO(result);

    return championship;
  }

  async create(data: CreateChampionshipInput): Promise<ChampionshipDTO> {
    const result = await this.applicationService.create(data);

    if (!result) {
      throw new InternalServerErrorException('Error creating championship.');
    }

    const championship = championshipToDTO(result);

    return championship;
  }

  async update(
    id: string,
    data: UpdateChampionshipInput,
  ): Promise<ChampionshipDTO> {
    const result = await this.applicationService.update(id, data);

    if (!result) {
      throw new InternalServerErrorException('Error updating championship.');
    }

    const championship = championshipToDTO(result);

    return championship;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.applicationService.delete(id);

    if (result) {
      return true;
    }

    return false;
  }
}
