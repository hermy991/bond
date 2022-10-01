import { DataSourceOptions } from "./data-source-options.ts";

export class DataSource {
}

// export type DataSourceOptions = {
//   name?: string;
//   host: string;
//   port: number;
//   username: string;
//   password: string;
//   database: string;
//   synchronize: boolean;
//   entities: string | string[];
// };

// /**
//  * When connection options were not specified, then it will try to create connection automatically,
//  * based on content of spinosaurus (env/js/ts/json/yml/xml) file or environment variables.
//  * Only one connection from spinosaurus.[format] config will be created (name "default" or connection without name).
//  */
//  export async function createConnection(): Promise<DataSource>;

//  /**
//   * When connection name is specified it will try to create connection automatically, based on name attribute of
//   * spinosaurus (env/js/ts/json/yml/xml) file or environment variables.
//   */
//  export async function createConnection(name: string): Promise<Connection>;

//  /**
//   * Creates a connection based in connection options.
//   */
//  export const createConnection = async (options: DataSourceOptions): Promise<Connection>;

//  /**
//   * Base createConnection function
//   */π

export const createConnection = async (nameOrPathOrOption?: DataSourceOptions): Promise<DataSource> => {
  return new DataSource();
};
