import { Result } from '../../../../kernel/Result/Result';
import { AbstractApplicationService } from '../../../../kernel/application/service/AbstactApplicationService';
import { isUUID } from '../../../../kernel/isUUID/isUUID';
import { ScoreDTO, ScoreDTOPrimitive } from '../../DTO/ScoreDTO';
import { ScoreDomainService } from '../../domain/domainService/ScoreDomainService';
import {
  Score,
  CreateScorePropsPrimitive,
  CreateScoreProps,
  UpdateScorePropsPrimitive,
} from '../../domain/entities/Score';
import { ScoreFilter } from '../../filters/ScoreFilter';
import { ChampionshipApplicationService } from './ChampionshipApplicationService';
import { DriverApplicationService } from './DriverApplicationService';

export class ScoreApplicationService extends AbstractApplicationService<
  Score,
  ScoreDTOPrimitive,
  CreateScorePropsPrimitive,
  ScoreFilter,
  ScoreDomainService
> {
  constructor(
    readonly manager: ScoreDomainService,
    protected championshipAppService: ChampionshipApplicationService,
    protected driverAppService: DriverApplicationService,
  ) {
    super(manager);
  }

  async getById(id: string): Promise<Result<Score>> {
    const isValid = isUUID(id);

    if (!isValid) {
      return Result.fail(new Error('O id fornecido não é válido.'));
    }

    const retrieved = await this.manager.get(id);
    if (retrieved.isFailure()) {
      return Result.fail(
        new Error(`Não foi possível resgatar "${this.getModelLabel()}".`),
      );
    }

    return Result.ok<Score>(retrieved.data);
  }

  async create(data: CreateScorePropsPrimitive): Promise<Result<Score>> {
    const championship = await this.championshipAppService.getById(
      data.championshipId,
    );

    if (championship.isFailure()) {
      return Result.fail(championship.error);
    }

    const driver = await this.driverAppService.getById(data.driverId);

    if (driver.isFailure()) {
      return Result.fail(driver.error);
    }

    const createData: CreateScoreProps = {
      championship: championship.data,
      driver: driver.data,
      score: 0,
    };

    const result = await this.manager.createAndSave(createData);

    if (result.isFailure()) {
      return Result.fail(result.error);
    }

    return result;
  }

  async updateScore(
    id: string,
    data: UpdateScorePropsPrimitive,
  ): Promise<Result<Score>> {
    const entity = await this.getById(id);
    let championship;
    let driver;
    console.log(85);
    if (entity.isFailure()) {
      return Result.fail(entity.error);
    }
    console.log(89);
    if (data.championshipId) {
      championship = await this.championshipAppService.getById(
        data.championshipId,
      );
      console.log(94);
      if (championship.isFailure()) {
        return Result.fail(championship.error);
      }
    }
    console.log(99);
    if (data.driverId) {
      championship = await this.driverAppService.getById(data.driverId);

      if (driver.isFailure()) {
        return Result.fail(driver.error);
      }
    }
    console.log(107);
    const scoreData = entity.data.toDTO();
    const scoreDTO: ScoreDTO = {
      ...scoreData,
      championship: data.championshipId ? championship : scoreData.championship,
      driver: data.driverId ? driver : scoreData.driver,
      score: data.score ? data.score : scoreData.score,
    };
    console.log(scoreDTO);
    const result = await this.manager.update(scoreDTO);

    if (result.isFailure()) {
      return Result.fail(result.error);
    }

    return result;
  }

  async all(options?: ScoreFilter): Promise<Result<Score[]>> {
    return this.filter(options as any);
  }

  async filter(options: ScoreFilter): Promise<Result<Score[]>> {
    const fetched = await this.manager.filter(options);

    if (fetched.isFailure()) {
      return Result.fail(
        new Error(
          `Não foi possível resgatar registros de "${this.getModelLabel()}".`,
        ),
      );
    }

    return Result.ok<Score[]>(fetched.data);
  }

  getModelLabel(): string {
    return Score.LABEL;
  }
}
