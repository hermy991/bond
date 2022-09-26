import { TypeInternalEntityParam } from "./entity.ts";
import { saveEntity } from "./interface-sqlite.ts";
export { databaseClose, databaseOpen, isDatabaseOpen } from "./interface-sqlite.ts";

export function save(type: "entity", entity: TypeInternalEntityParam): any {
  if (type === "entity") {
    return saveEntity(entity);
  }
}
