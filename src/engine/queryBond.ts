import { TBondType } from "./types/bondType.ts";
import { TBondValue } from "./types/bondValue.ts";

export type TBondInitializer = {
  type: TBondType;
  value: TBondValue;
};

export type TBondQueryParam = { predicate: "init" | "type" | "value" };
export type TBondQueryReturn = TBondType | TBondValue | TBondInitializer;

export const queryBond = (init: TBondInitializer) => (param: TBondQueryParam): TBondQueryReturn => {
  switch (param.predicate) {
    case "init":
      return init;
    case "type":
      return init.type;
    case "value":
      return init.value;
  }
};