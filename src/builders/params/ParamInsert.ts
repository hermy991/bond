import { ParamSimpleValues } from "./ParamSelect.ts";
import { ParamPartialEntity } from "./ParamPartialEntity.ts";

export type ParamInsertOptions = {
  autoInsert?: boolean;
  autoGeneratePrimaryKey?: boolean;
};

export type ParamInsertEntity =
  | { entity: string; schema?: string }
  | { entity: Function; options?: ParamInsertOptions }
  | [string, string?]
  | Function;

export type ParamInsertValue<T> =
  | ParamPartialEntity<T>
  | Record<string, ParamSimpleValues | Record<string, ParamSimpleValues>>;

export type ParamInsertReturning = { entity: string; as?: string } | [string, string?] | string;
