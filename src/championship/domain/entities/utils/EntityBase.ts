export interface EntityBasePros {
  id: string;
  createAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class EntityBase {
  constructor(protected props: EntityBasePros) {}

  get id(): string {
    return this.props.id;
  }

  get createAt(): Date {
    return this.props.createAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get deletedAt(): Date {
    return this.props.deletedAt;
  }
}
