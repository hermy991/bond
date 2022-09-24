import { Database } from "sqlite3";
import { TypeSaveColumns, TypeSaveEntity } from "./contracts.ts";
import {
  TypeInternalEntityColumnParam,
  TypeInternalEntityColumnReturn,
  TypeInternalEntityParam,
  TypeInternalEntityReturn,
} from "./entity.ts";
import c from "./queries.ts";

const db = new Database(":memory:");

export const saveEntity: TypeSaveEntity = (entity: TypeInternalEntityParam) => {
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
    const tempEntity = {
      entity_ID: rows[0][c.names.TABLE_ENTITY__ID],
      entityName: rows[0][c.names.TABLE_ENTITY__ENTITY_NAME],
      schema: rows[0][c.names.TABLE_ENTITY__SCHEMA],
      columns: tempColumns,
    } as TypeInternalEntityReturn;
    return tempEntity;
  }
};

export const saveColumns: TypeSaveColumns = (
  entity_ID: number,
  columns: [TypeInternalEntityColumnParam, ...TypeInternalEntityColumnParam[]],
) => {
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
        const tempColumn = {
          column_ID: rows[0][c.names.TABLE_COLUMN__ID],
          entity_ID,
          columnName: rows[0][c.names.TABLE_COLUMN__COLUMN_NAME],
          type: rows[0][c.names.TABLE_COLUMN__TYPE],
          oritinalType: rows[0][c.names.TABLE_COLUMN__ORIGINAL_TYPE],
          autoIncrement: !!rows[0][c.names.TABLE_COLUMN__AUTO_INCREMENT],
          unique: !!rows[0][c.names.TABLE_COLUMN__UNIQUE],
          bytes: rows[0][c.names.TABLE_COLUMN__BYTES],
          size: rows[0][c.names.TABLE_COLUMN__SIZE],
          nullable: rows[0][c.names.TABLE_COLUMN__NULLEABLE] !== null
            ? !!rows[0][c.names.TABLE_COLUMN__NULLEABLE]
            : null,
          presition: rows[0][c.names.TABLE_COLUMN__PRESITION],
          scale: rows[0][c.names.TABLE_COLUMN__SCALE],
          timeZone: rows[0][c.names.TABLE_COLUMN__TIME_ZONE],
          default: rows[0][c.names.TABLE_COLUMN__DEFAULT],
        } as TypeInternalEntityColumnReturn;
        data.push(tempColumn);
      }
    }
    return data;
  }
};
