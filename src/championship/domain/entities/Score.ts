import { EntityBase, EntityBasePros } from './utils/EntityBase';

export interface ScoreProps extends EntityBasePros {
  championshipID?: string;
  runnerID?: string;
  points?: number;
}

export class Score extends EntityBase {
  constructor(protected props: ScoreProps) {
    super(props);
  }

  get championshipID(): string {
    return this.props.championshipID;
  }

  get runnerID(): string {
    return this.props.runnerID;
  }

  get points(): number {
    return this.props.points;
  }
}
