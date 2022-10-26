import { ParamNext } from "./ParamNext.ts";
import { ParamAfter } from "./ParamAfter.ts";
import { ParamInsertOptions } from "./ParamInsert.ts";

export type ParamCreateOptions =
  & { createByEntity?: boolean }
  & ParamInsertOptions;

export type ParamCreateEntity =
  | { entity: string; schema?: string; options?: ParamCreateOptions }
  | { entity: Function; options?: ParamCreateOptions }
  | { schema: string; check?: boolean }
  | Function;

export type ParamCreateData = {
  [x: string]: string | number | boolean | Date | Function | null | undefined;
};

export type ParamCreateNext = ParamNext;

export type ParamCreateAfter = ParamAfter;
