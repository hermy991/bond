import { TBondEntityValue } from "../engine/types/bondEntity.ts";
import { TypeInternalEntityParam } from "./entity.ts";

export function buildInternalEntity(value: TBondEntityValue): TypeInternalEntityParam {
  // TODO: adding columns to store in the internal database
  const tempReturn: TypeInternalEntityParam = {
    entityName: value.entityName,
    schema: value.schema,
    columns: [],
  };
  return tempReturn;
}
