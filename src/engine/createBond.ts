import { TypeInternalEntityParam } from "../internalDatabase/entity.ts";
import { save } from "../internalDatabase/save.ts";
import { queryBond, TBondInitializer, TBondQueryParam, TBondQueryReturn } from "./queryBond.ts";
import { TBondEntityValue } from "./types/bondEntity.ts";
import { TBondType } from "./types/bondType.ts";
import { TBondValue } from "./types/bondValue.ts";
import { buildInternalEntity } from "../internalDatabase/builds.ts";

export type TBondCreateReturn = (init: TBondInitializer) => (param: TBondQueryParam) => TBondQueryReturn;

export function createBond(type: "entity", value: TBondEntityValue): TBondCreateReturn;
export function createBond(type: TBondType, value: TBondValue): any {
  switch (type) {
    case "entity": {
      const entity = buildInternalEntity(value as TBondEntityValue);
      save(type, entity);
      break;
    }
  }
  return queryBond({ type, value });
}
