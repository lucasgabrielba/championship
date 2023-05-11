import { ChampionshipDTO } from 'DTO';
import { Championship } from '../../../../championship/domain/entities';

export function championshipToDTO(championship: Championship): ChampionshipDTO {
  const championshipDTO: ChampionshipDTO = {
    id: championship.id,
    name: championship.name,
    rounds: championship.rounds,
    stage: championship.stage,
    createdAt: championship.createAt,
    updatedAt: championship.updatedAt,
    deletedAt: championship.deletedAt,
  };

  return championshipDTO;
}
