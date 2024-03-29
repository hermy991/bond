import { LogginKeys, ParamLoggingOptions } from "../loggings/logging.ts";

export type DatasourceOptionsBase = {
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  entities: string | string[];
  logging?: ParamLoggingOptions | boolean | LogginKeys;
};

export type DatasourceOptionsPostgres = DatasourceOptionsBase & {
  type: "postgres";
  hostaddr?: string;
};

export type DatasourceOptions = DatasourceOptionsPostgres;
