import * as postgres from "postgres";
import { POOL_CONNECTIONS } from "../../datasource/DatasourceVariables.ts";

const POSTGRES_POOL: Array<postgres.Pool> = [];

export function initConnection(driverConf: any): postgres.Pool {
  if (!POSTGRES_POOL.length) {
    POSTGRES_POOL.push(
      new postgres.Pool(driverConf, POOL_CONNECTIONS),
    );
  }
  return POSTGRES_POOL[0];
}

export function replaceConnection(driverConf: any): postgres.Pool {
  if (!POSTGRES_POOL.length) {
    initConnection(driverConf);
  } else {
    POSTGRES_POOL[0] = new postgres.Pool(driverConf, POOL_CONNECTIONS);
  }
  return POSTGRES_POOL[0];
}
