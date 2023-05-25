import { Result } from '../../../../kernel/Result/Result';
import { AbstractApplicationService } from '../../../../kernel/application/service/AbstactApplicationService';
import { isUUID } from '../../../../kernel/isUUID/isUUID';
import { DriverDTO } from '../../DTO/DriverDTO';
import { ScoreDTO, ScoreDTOPrimitive } from '../../DTO/ScoreDTO';
import { ScoreDomainService } from '../../domain/domainService/ScoreDomainService';
import { Driver } from '../../domain/entities/Driver';
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

  async findTable(id: string): Promise<Result<Score[]>> {
    const result = await this.manager.filter({
      championship: { id: id },
    });

    if (result.isFailure()) {
      return Result.fail(
        new Error(`Não foi possível resgatar "${this.getModelLabel()}s".`),
      );
    }

    const table = result.data.sort((a, b) => b.score - a.score);

    return Result.ok(table);
  }

  async getStatistics(): Promise<Result<object[]>> {
    const allDrivers = await this.driverAppService.all();
    if (allDrivers.isFailure()) {
      return Result.fail(new Error(`Não foi possível resgatar "drivers".`));
    }

    const dataDrivers: {
      name: string;
      championships: number;
      points: number;
      wons: number;
      losts: number;
    }[] = [];
    for (const driver of allDrivers.data) {
      const scores = await this.manager.filter({
        driver: { id: driver.id },
      });
      if (scores.isFailure()) {
        return Result.fail(new Error(`Não foi possível resgatar "scores".`));
      }

      const points = scores.data.reduce((value, score) => {
        return value + score.score;
      }, 0);

      const data = {
        name: driver.name,
        championships: scores.data.length,
        points: points,
        wons: driver.won,
        losts: driver.lost,
      };

      dataDrivers.push(data);
    }

    const table = dataDrivers.sort((a, b) => b.points - a.points);

    return Result.ok(table);
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

    if (entity.isFailure()) {
      return Result.fail(entity.error);
    }

    if (data.championshipId) {
      championship = await this.championshipAppService.getById(
        data.championshipId,
      );

      if (championship.isFailure()) {
        return Result.fail(championship.error);
      }
    }

    if (data.driverId) {
      championship = await this.driverAppService.getById(data.driverId);

      if (driver.isFailure()) {
        return Result.fail(driver.error);
      }
    }

    const scoreData = entity.data.toDTO();
    const scoreDTO: ScoreDTO = {
      ...scoreData,
      championship: data.championshipId ? championship : scoreData.championship,
      driver: data.driverId ? driver : scoreData.driver,
      score: data.score || data.score === 0 ? data.score : scoreData.score,
    };

    const result = await this.manager.update(scoreDTO);

    if (result.isFailure()) {
      return Result.fail(result.error);
    }

    return result;
  }

  async all(options?: ScoreFilter): Promise<Result<Score[]>> {
    return this.filter(options as any);
  }

  async get(where: object): Promise<Result<Score>> {
    const fetched = await this.manager.getOne(where);

    if (fetched.isFailure()) {
      return Result.fail(
        new Error(`Não foi possível resgatar "${this.getModelLabel()}".`),
      );
    }

    return Result.ok<Score>(fetched.data);
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

  async createMany(data: string[]): Promise<Result<Score[]>> {
    const championshipId = data.shift();

    const scores: Score[] = [];
    for (const runner of data) {
      let driver: Result<Driver>;
      const existDriver = await this.driverAppService.get({
        name: runner,
      });

      if (existDriver.isSuccess()) {
        driver = existDriver;

        const existScore = await this.get({
          championship: { id: championshipId },
          driver: { id: driver.data.id },
        });

        if (existScore.isFailure()) {
          const scoreData = {
            championshipId: championshipId,
            driverId: driver.data.id,
            score: 0,
          };

          const createdScore = await this.create(scoreData);

          if (createdScore.isFailure()) {
            return Result.fail(
              new Error(`Não foi possível criar "${this.getModelLabel()}".`),
            );
          }
        }

        scores.push(existScore.data);
      }

      if (existDriver.isFailure()) {
        const createData = {
          name: runner,
          won: 0,
          lost: 0,
        };

        driver = await this.driverAppService.create(createData);

        if (driver.isFailure()) {
          return Result.fail(
            new Error(`Não foi possível criar "${this.getModelLabel()}".`),
          );
        }

        const scoreData = {
          championshipId: championshipId,
          driverId: driver.data.id,
          score: 0,
        };

        const createdScore = await this.create(scoreData);

        if (createdScore.isFailure()) {
          return Result.fail(
            new Error(`Não foi possível criar "${this.getModelLabel()}".`),
          );
        }

        scores.push(createdScore.data);
      }
    }

    const allDriversOnChampionship = await this.manager.filter({
      championship: { id: championshipId },
    });

    const excludeThis = allDriversOnChampionship.data.filter(
      (item) => !data.some((scoreItem) => scoreItem === item?.driver.name),
    );

    for (const score of excludeThis) {
      if (score) {
        const exclude = await this.manager.remove(score);

        if (exclude.isFailure()) {
          return Result.fail(exclude.error);
        }
      }
    }

    const allDriversOnChampionshipUpdated = await this.manager.filter({
      championship: { id: championshipId },
    });

    return Result.ok(allDriversOnChampionshipUpdated.data);
  }

  async addScore(
    championshipId: string,
    data: DriverDTO[],
  ): Promise<Result<boolean>> {
    for (let i = 0; i < data.length; i++) {
      const driver = data[i];

      const score = await this.manager.filter({
        championship: { id: championshipId },
        driver: { id: driver.id },
      });

      const points = score.data[0].score;

      const driverData = {
        score: this.calculateScore(i, points),
      };

      const addPoints = await this.updateScore(score.data[0].id, driverData);

      if (addPoints.isFailure()) {
        return Result.fail(new Error('Não foi possivel adicionar score'));
      }
    }

    const championship = await this.championshipAppService.getById(
      championshipId,
    );

    if (championship.isFailure()) {
      return Result.fail(new Error('Not Found Championship'));
    }

    const championshipDataUpdate = {
      ...championship.data.toDTO(),
      stage: championship.data.stage + 1,
    };

    const championshipUpdate = await this.championshipAppService.update(
      championshipDataUpdate,
    );

    if (championshipUpdate.isFailure()) {
      return Result.fail(new Error('Error when updating stage'));
    }

    return Result.ok(true);
  }

  async resetScores(data: ScoreDTO[]): Promise<Result<boolean>> {
    for (let i = 0; i < data.length; i++) {
      const driverId = data[i].id;

      const driverData = {
        score: 0,
      };

      const resetPoints = await this.updateScore(driverId, driverData);

      if (resetPoints.isFailure()) {
        return Result.fail(new Error('Unable to reset score'));
      }
    }

    const championship = data[0].championship;

    const championshipDataUpdate = {
      ...championship,
      stage: 0,
    };

    const championshipUpdate = await this.championshipAppService.update(
      championshipDataUpdate,
    );

    if (championshipUpdate.isFailure()) {
      return Result.fail(new Error('Error when updating stage'));
    }

    return Result.ok(true);
  }

  getModelLabel(): string {
    return Score.LABEL;
  }

  calculateScore = (position: number, score: number) => {
    switch (position) {
      case 0:
        return score + 10;
      case 1:
        return score + 8;
      case 2:
        return score + 6;
      case 3:
        return score + 5;
      case 4:
        return score + 4;
      case 5:
        return score + 3;
      case 6:
        return score + 2;
      case 7:
        return score + 1;
      default:
        return score + 0;
    }
  };
}
