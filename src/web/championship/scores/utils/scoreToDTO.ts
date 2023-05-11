import { ScoreDTO } from 'DTO';
import { Score } from '../../../../championship/domain/entities';

export function scoreToDTO(score: Score): ScoreDTO {
  const scoreDTO: ScoreDTO = {
    id: score.id,
    points: score.points,
    createdAt: score.createAt,
    updatedAt: score.updatedAt,
    deletedAt: score.deletedAt,
  };

  return scoreDTO;
}
