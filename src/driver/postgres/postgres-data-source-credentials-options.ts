/**
 * Postgres specific data source credential options.
 */
export type PostgresDataSourceCredentialsOptions = {
  /**
   * Connection url where perform connection to.
   */
  readonly url?: string;

  /**
   * Database host.
   */
  readonly host?: string;

  /**
   * Database host port.
   */
  readonly port?: number;

  /**
   * Database username.
   */
  readonly username?: string;

  /**
   * Database password.
   */
  readonly password?: string | (() => string) | (() => Promise<string>);

  /**
   * Database name to connect to.
   */
  readonly database?: string;
};
