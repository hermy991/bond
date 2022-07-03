export type BaseDataSourceOptions = {
  readonly name?: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;

  /**
   * Database password.
   */
  readonly password?: string | (() => string) | (() => Promise<string>);
  readonly database: string;
  readonly synchronize: boolean;
  readonly entities: string | string[];
};
