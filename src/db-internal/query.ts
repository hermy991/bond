import { queryEntity } from "./interface-sqlite.ts";
export { databaseClose, databaseOpen, isDatabaseOpen } from "./interface-sqlite.ts";

export type TypeQueryOptions = { columns?: boolean };

export function query(
  type: "entity",
  entity: { entityName: string; schema: string | null },
  options?: TypeQueryOptions,
): any;
export function query(type: "entity", fullEntityName: string, options?: TypeQueryOptions): any;
export function query(type: "entity", entity_ID: number, options?: TypeQueryOptions): any;
export function query(
  type: "entity",
  entityOrFullEntityNameOrEntity_ID: { entityName: string; schema: string | null } | string | number,
  options?: TypeQueryOptions,
): any {
  if (type === "entity") {
    switch (typeof entityOrFullEntityNameOrEntity_ID) {
      case "object":
        return queryEntity(entityOrFullEntityNameOrEntity_ID, options || {});
      case "string":
        return queryEntity(entityOrFullEntityNameOrEntity_ID, options || {});
      case "number":
        return queryEntity(entityOrFullEntityNameOrEntity_ID, options || {});
    }
  }
}
