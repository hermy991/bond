import { queryEntity, queryUnique } from "./interfaceSqlite.ts";
import { TypeInternalEntityReturn } from "./entity.ts";
import { TypeInternalUniqueReturn } from "./unique.ts";
export { databaseClose, databaseOpen, isDatabaseOpen } from "./interfaceSqlite.ts";

export type TypeQueryOptions = { columns?: boolean };
export type TypeInternalQueryParam = { entityName: string; schema: string | null } | string | number;
export type TypeInternalQueryReturn = TypeInternalEntityReturn | TypeInternalUniqueReturn;

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
  type: "unique",
  uniqueName: string,
): TypeInternalUniqueReturn | undefined;

export function query(
  type: "unique",
  unique_ID: number,
): TypeInternalUniqueReturn | undefined;

export function query(
  type: "entity" | "unique",
  entityOrUnique: TypeInternalQueryParam,
  options?: TypeQueryOptions,
): TypeInternalQueryReturn | undefined {
  if (type === "entity") {
    const entityOrFullEntityNameOrEntity_ID = entityOrUnique;
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
  } else if (type === "unique") {
    const uniqueNameOrUnique_ID = entityOrUnique;
    switch (typeof uniqueNameOrUnique_ID) {
      case "string": {
        const uniqueName = uniqueNameOrUnique_ID as string;
        return queryUnique(uniqueName) as TypeInternalUniqueReturn;
      }
      case "number": {
        const unique_ID = uniqueNameOrUnique_ID as number;
        return queryUnique(unique_ID) as TypeInternalUniqueReturn;
      }
    }
  }
}
