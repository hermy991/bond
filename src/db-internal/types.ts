import { TypeInternalEntityParam } from "./entity.ts";

export type TypeInternalEntity = {
  type: "entity";
  value: TypeInternalEntityParam;
};

export type TypeSaveProps = TypeInternalEntity;
