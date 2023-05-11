import { EntityBase, EntityBasePros } from './utils/EntityBase';

export interface RunnerProps extends EntityBasePros {
  name?: string;
}

export class Runner extends EntityBase {
  constructor(protected props: RunnerProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }
}
