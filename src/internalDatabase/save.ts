import { saveEntity, saveUnique } from "./interfaceSqlite.ts";
import { TypeInternalEntityParam, TypeInternalEntityReturn } from "./entity.ts";
import { TypeInternalUniqueParam, TypeInternalUniqueReturn } from "./unique.ts";
export { databaseClose, databaseOpen, isDatabaseOpen } from "./interfaceSqlite.ts";

export type TypeInternalSaveParam = TypeInternalEntityParam | TypeInternalUniqueParam;
export type TypeInternalSaveReturn = TypeInternalEntityReturn | TypeInternalUniqueReturn;

export function save(type: "entity", entity: TypeInternalEntityParam): TypeInternalEntityReturn | undefined;
export function save(type: "unique", unique: TypeInternalUniqueParam): TypeInternalUniqueReturn | undefined;
export function save(
  type: "entity" | "unique",
  entityOrUnique: TypeInternalSaveParam,
): TypeInternalSaveReturn | undefined {
  if (type === "entity") {
    const entity = entityOrUnique as TypeInternalEntityParam;
    return saveEntity(entity) as TypeInternalEntityReturn;
  } else if (type === "unique") {
    const unique = entityOrUnique as TypeInternalUniqueParam;
    return saveUnique(unique) as TypeInternalUniqueReturn;
  }
}
