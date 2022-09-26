import { TypeInternalEntityParam } from "./entity.ts";

export type TypeSaveEntity = {
  type: "entity";
  value: TypeInternalEntityParam;
};

export type TypeSave = TypeSaveEntity;

export type TypeQueryOptions = { columns?: boolean };
