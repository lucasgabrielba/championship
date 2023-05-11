import { EntityBase, EntityBasePros } from './utils/EntityBase';

export interface ChampionshipProps extends EntityBasePros {
  name?: string;
  rounds?: number;
  stage?: number;
}

export class Championship extends EntityBase {
  constructor(protected props: ChampionshipProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get rounds(): number {
    return this.props.rounds;
  }

  get stage(): number {
    return this.props.stage;
  }
}
