export abstract class BaseEntity<Props> {
  protected readonly _id: string;
  protected readonly props: Props;

  constructor(props: Props, id?: string) {
    this._id = id || crypto.randomUUID();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }
}
