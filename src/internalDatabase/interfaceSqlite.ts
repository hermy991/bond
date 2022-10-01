import { Database } from "sqlite3";
import { toEntityNameAndSchema } from "../utilities/string.ts";
import {
  TypeInternalEntityColumnParam,
  TypeInternalEntityColumnReturn,
  TypeInternalEntityParam,
  TypeInternalEntityReturn,
} from "./entity.ts";
import c from "./sql.ts";
import { TypeInternalUniqueParam, TypeInternalUniqueReturn } from "./unique.ts";

export let db = new Database(":memory:");

export function isDatabaseOpen() {
  return db.open;
}

export function databaseOpen() {
  if (!isDatabaseOpen()) {
    db = new Database(":memory:");
  }
}

export function databaseClose() {
  if (isDatabaseOpen()) {
    db.close();
  }
}

const entityTransformer = (x: Record<string, string | number | boolean | null>) => ({
  entity_ID: x[c.names.TABLE_ENTITY__ID],
  entityName: x[c.names.TABLE_ENTITY__ENTITY_NAME],
  schema: x[c.names.TABLE_ENTITY__SCHEMA],
} as TypeInternalEntityReturn);

const uniqueTransformer = (x: Record<string, string | number | boolean | null>) => ({
  unique_ID: x[c.names.TABLE_UNIQUE__ID],
  entity_ID: x[c.names.TABLE_ENTITY__ID],
  uniqueName: x[c.names.TABLE_UNIQUE__UNIQUE_NAME],
  columnIds: (x[c.names.TABLE_UNIQUE__COLUMN_IDS] as string).split(",").map((x) => Number(x)),
  columnNames: (x[c.names.TABLE_UNIQUE__COLUMN_NAMES] as string).split(","),
} as TypeInternalUniqueReturn);

const columnTransformer = (x: Record<string, string | number | boolean | null>) => ({
  column_ID: x[c.names.TABLE_COLUMN__ID],
  entity_ID: x[c.names.TABLE_ENTITY__ID],
  columnName: x[c.names.TABLE_COLUMN__COLUMN_NAME],
  type: x[c.names.TABLE_COLUMN__TYPE],
  oritinalType: x[c.names.TABLE_COLUMN__ORIGINAL_TYPE],
  autoIncrement: !!x[c.names.TABLE_COLUMN__AUTO_INCREMENT],
  unique: !!x[c.names.TABLE_COLUMN__UNIQUE],
  bytes: x[c.names.TABLE_COLUMN__BYTES],
  size: x[c.names.TABLE_COLUMN__SIZE],
  nullable: x[c.names.TABLE_COLUMN__NULLEABLE] !== null ? !!x[c.names.TABLE_COLUMN__NULLEABLE] : null,
  presition: x[c.names.TABLE_COLUMN__PRESITION],
  scale: x[c.names.TABLE_COLUMN__SCALE],
  timeZone: x[c.names.TABLE_COLUMN__TIME_ZONE],
  default: x[c.names.TABLE_COLUMN__DEFAULT],
} as TypeInternalEntityColumnReturn);

export function saveEntity(entity: TypeInternalEntityParam): TypeInternalEntityReturn | undefined {
  const { entityName, schema, columns } = entity;
  db.run(c.queries.CREATE_ENTITY);
  const values = {
    [c.names.TABLE_ENTITY__ENTITY_NAME]: entityName,
    [c.names.TABLE_ENTITY__SCHEMA]: schema || null,
  };
  db.exec(c.queries.INSERT_ENTITY, values);
  const rows = db.prepare(c.queries.SELECT_ENTITY_LAST_INSERT).all();
  if (rows.length === 1) {
    const tempColumns = saveColumns(rows[0][c.names.TABLE_ENTITY__ID], columns);
    const tempEntity = { ...entityTransformer(rows[0]), columns: tempColumns } as TypeInternalEntityReturn;
    return tempEntity;
  }
}

export function saveUnique(unique: TypeInternalUniqueParam): TypeInternalUniqueReturn | undefined {
  const { uniqueName, entity_ID, columns } = unique;
  const tempColumns = queryColumns(entity_ID)
    .filter((x: TypeInternalEntityColumnReturn) =>
      columns.indexOf(x.column_ID) >= 0 ||
      columns.indexOf(x.columnName) >= 0
    );
  const columnIds: number[] = tempColumns.map((x: TypeInternalEntityColumnReturn) => x.column_ID);
  const columnNames: string[] = tempColumns.map((x: TypeInternalEntityColumnReturn) => x.columnName);
  db.run(c.queries.CREATE_UNIQUE);
  const values = {
    [c.names.TABLE_ENTITY__ID]: entity_ID,
    [c.names.TABLE_UNIQUE__UNIQUE_NAME]: uniqueName,
    [c.names.TABLE_UNIQUE__COLUMN_IDS]: columnIds.join(","),
    [c.names.TABLE_UNIQUE__COLUMN_NAMES]: columnNames.join(","),
  };
  db.exec(c.queries.INSERT_UNIQUE, values);
  const rows = db.prepare(c.queries.SELECT_UNIQUE_LAST_INSERT).all();
  if (rows.length === 1) {
    const tempUnique = uniqueTransformer(rows[0]);
    return tempUnique;
  }
}

export function queryEntity(
  entity: { entityName: string; schema: string | null },
  options: { columns?: boolean },
): TypeInternalEntityReturn | undefined;
export function queryEntity(
  fullEntityName: string,
  options: { columns?: boolean },
): TypeInternalEntityReturn | undefined;
export function queryEntity(entity_ID: number, options: { columns?: boolean }): TypeInternalEntityReturn | undefined;
export function queryEntity(
  entityOrFullEntityNameOrEntity_ID: { entityName: string; schema: string | null } | string | number,
  options: { columns?: boolean } = {},
): TypeInternalEntityReturn | undefined {
  db.run(c.queries.CREATE_ENTITY);
  let rows: Record<string, string | number | boolean | null>[] = [];
  if (typeof entityOrFullEntityNameOrEntity_ID === "object") {
    const { entityName, schema } = entityOrFullEntityNameOrEntity_ID;
    const sql = `${c.queries.SELECT_ENTITY}WHERE ${c.names.TABLE_ENTITY__ENTITY_NAME} = '${entityName}'
  AND ${c.names.TABLE_ENTITY__SCHEMA} ${schema ? `= '${schema}'` : "IS NULL"}
`;
    rows = db.prepare(sql).all();
  } else if (typeof entityOrFullEntityNameOrEntity_ID === "string") {
    const fullEntityName = entityOrFullEntityNameOrEntity_ID;
    const { entityName, schema } = toEntityNameAndSchema(fullEntityName);
    const sql = `${c.queries.SELECT_ENTITY}WHERE ${c.names.TABLE_ENTITY__ENTITY_NAME} = '${entityName}'
  AND ${c.names.TABLE_ENTITY__SCHEMA} ${schema ? `= '${schema}'` : "IS NULL"}
`;
    rows = db.prepare(sql).all();
  } else if (typeof entityOrFullEntityNameOrEntity_ID === "number") {
    const entity_ID = entityOrFullEntityNameOrEntity_ID;
    const sql = `${c.queries.SELECT_ENTITY}WHERE ${c.names.TABLE_ENTITY__ID} = ${entity_ID}
`;
    rows = db.prepare(sql).all();
  }
  if (rows.length === 1) {
    let tempColumns: TypeInternalEntityColumnReturn[] = [];
    if (options.columns) {
      tempColumns = queryColumns(rows[0][c.names.TABLE_ENTITY__ID] as number);
    }
    const tempEntity = { ...entityTransformer(rows[0]), columns: tempColumns } as TypeInternalEntityReturn;
    return tempEntity;
  }
}

export function saveColumns(
  entity_ID: number,
  columns: [TypeInternalEntityColumnParam, ...TypeInternalEntityColumnParam[]],
): TypeInternalEntityColumnReturn[] | undefined {
  if (columns.length) {
    db.run(c.queries.CREATE_COLUMN);
    const data: TypeInternalEntityColumnReturn[] = [];
    for (const column of columns) {
      const { columnName, type, oritinalType, nullable, default: defaultx } = column;
      let values: Record<string, boolean | string | number | null> = {
        [c.names.TABLE_ENTITY__ID]: entity_ID,
        [c.names.TABLE_COLUMN__COLUMN_NAME]: columnName,
        [c.names.TABLE_COLUMN__TYPE]: type,
        [c.names.TABLE_COLUMN__ORIGINAL_TYPE]: oritinalType,
        [c.names.TABLE_COLUMN__NULLEABLE]: nullable || null,
        [c.names.TABLE_COLUMN__DEFAULT]: defaultx || null,
      };
      if (type === "int") {
        const { autoIncrement, unique, bytes } = column;
        values = {
          ...values,
          [c.names.TABLE_COLUMN__AUTO_INCREMENT]: autoIncrement || null,
          [c.names.TABLE_COLUMN__UNIQUE]: unique || null,
          [c.names.TABLE_COLUMN__BYTES]: bytes || null,
        };
      } else if (type === "decimal" || type === "float") {
        const { autoIncrement, unique, bytes, presition, scale } = column;
        values = {
          ...values,
          [c.names.TABLE_COLUMN__AUTO_INCREMENT]: autoIncrement || null,
          [c.names.TABLE_COLUMN__UNIQUE]: unique || null,
          [c.names.TABLE_COLUMN__BYTES]: bytes || null,
          [c.names.TABLE_COLUMN__PRESITION]: presition || null,
          [c.names.TABLE_COLUMN__SCALE]: scale || null,
        };
      } else if (type === "character" || type === "varchar") {
        const { unique, size } = column;
        values = {
          ...values,
          [c.names.TABLE_COLUMN__UNIQUE]: unique || null,
          [c.names.TABLE_COLUMN__SIZE]: size || null,
        };
      } else if (type === "binary" || type === "varbinary") {
        const { size } = column;
        values = {
          ...values,
          [c.names.TABLE_COLUMN__SIZE]: size || null,
        };
      }
      db.exec(c.queries.INSERT_COLUMN, values);
      const rows = db.prepare(c.queries.SELECT_COLUMN_LAST_INSERT).all();
      if (rows.length === 1) {
        const tempColumn = columnTransformer(rows[0]);
        data.push(tempColumn);
      }
    }
    return data;
  }
}

export function queryColumns(fullEntityName: string): TypeInternalEntityColumnReturn[];
export function queryColumns(entity_ID: number): TypeInternalEntityColumnReturn[];
export function queryColumns(fullEntityNameOrEntity_ID: string | number): TypeInternalEntityColumnReturn[] {
  db.run(c.queries.CREATE_COLUMN);
  let data: TypeInternalEntityColumnReturn[] = [];
  if (fullEntityNameOrEntity_ID === "string") {
    const fullEntityName = fullEntityNameOrEntity_ID;
    const { entityName, schema } = toEntityNameAndSchema(fullEntityName);
    const sql = `${c.queries.SELECT_COLUMN}WHERE ${c.names.TABLE_ENTITY__ID} = (
    SELECT ${c.names.TABLE_ENTITY__ID} 
    FROM ${c.names.TABLE_ENTITY}
    WHERE ${c.names.TABLE_ENTITY__ENTITY_NAME} = '${entityName}'
      ${c.names.TABLE_ENTITY__SCHEMA} ${schema ? `= '${schema}'` : "IS NULL"}
  )`;
    const rows = db.prepare(sql).all();
    data = rows.map(columnTransformer);
  } else if (typeof fullEntityNameOrEntity_ID === "number") {
    const entity_ID = fullEntityNameOrEntity_ID;
    const sql = `${c.queries.SELECT_COLUMN}WHERE ${c.names.TABLE_ENTITY__ID} = ${entity_ID}`;
    const rows = db.prepare(sql).all();
    data = rows.map(columnTransformer);
  }
  return data;
}
