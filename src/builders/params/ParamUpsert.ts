import { ParamInsertValue } from "./ParamInsert.ts";
import { ParamUpdateSet } from "./ParamUpdate.ts";

export type ParamUpsertEntity =
  | { entity: string; schema?: string }
  | { entity: Function; options?: { autoUpdate?: boolean; autoInsert?: boolean } }
  | [string, string?]
  | Function;

export type ParamUpsertValue<T> = ParamUpdateSet<T> | ParamInsertValue<T>;
