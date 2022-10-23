import { TBondPartialColumn } from "./bondColumn.ts";

export type TBondEntityValue = {
  entityName: string;
  schema?: string;
  columns: TBondPartialColumn[];
};

export type TBondEntityRef =
  | { fullEntityName: string }
  | { entity: { entityName: string; schema: string | null } };
