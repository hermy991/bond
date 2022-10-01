import { queryEntity } from "./interfaceSqlite.ts";
import { TypeInternalEntityReturn } from "./entity.ts";
export { databaseClose, databaseOpen, isDatabaseOpen } from "./interfaceSqlite.ts";

export type TypeQueryOptions = { columns?: boolean };
export type TypeInternalQueryParam = { entityName: string; schema: string | null } | string | number;
export type TypeInternalQueryReturn = TypeInternalEntityReturn;

export function query(
  type: "entity",
  entity: { entityName: string; schema: string | null },
  options?: TypeQueryOptions,
): TypeInternalEntityReturn | undefined;
export function query(
  type: "entity",
  fullEntityName: string,
  options?: TypeQueryOptions,
): TypeInternalEntityReturn | undefined;
export function query(
  type: "entity",
  entity_ID: number,
  options?: TypeQueryOptions,
): TypeInternalEntityReturn | undefined;
export function query(
  type: "entity",
  entityOrFullEntityNameOrEntity_ID: TypeInternalQueryParam,
  options?: TypeQueryOptions,
): TypeInternalEntityReturn | undefined {
  if (type === "entity") {
    switch (typeof entityOrFullEntityNameOrEntity_ID) {
      case "object": {
        const entity = entityOrFullEntityNameOrEntity_ID as { entityName: string; schema: string | null };
        return queryEntity(entity, options || {}) as TypeInternalEntityReturn;
      }
      case "string": {
        const fullEntityName = entityOrFullEntityNameOrEntity_ID as string;
        return queryEntity(fullEntityName, options || {}) as TypeInternalEntityReturn;
      }
      case "number": {
        const entity_ID = entityOrFullEntityNameOrEntity_ID as number;
        return queryEntity(entity_ID, options || {}) as TypeInternalEntityReturn;
      }
    }
  }
}
