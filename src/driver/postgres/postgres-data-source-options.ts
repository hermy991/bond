import { BaseDataSourceOptions } from "../../data-source/base-data-source-options.ts";
import { PostgresDataSourceCredentialsOptions } from "./postgres-data-source-credentials-options.ts";

export type PostgresDataSourceOptions = BaseDataSourceOptions & PostgresDataSourceCredentialsOptions & {
  readonly type: "postgres";
};
