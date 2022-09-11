import {
  TypeInternalColumn,
  TypeInternalColumnBiteArray,
  TypeInternalColumnDecimal,
  TypeInternalColumnFloat,
  TypeInternalColumnInt,
  TypeInternalColumnString,
} from "./internals.ts";
/**
 * Column Params
 */

export type TypeInternalColumnBaseParam = {
  tableName: string;
  schema?: string;
  name: string;
  nullable: boolean;
  default?: string;
};

export type TypeInternalColumnIntParam = TypeInternalColumnBaseParam & {
  type: TypeInternalColumnInt;
  oritinalType: string;
  autoIncrement: boolean;
  unique: boolean;
  bytes: 1 | 2 | 3 | 4 | 8;
};

export type TypeInternalColumnFloatingPointNumberParam = TypeInternalColumnBaseParam & {
  type: TypeInternalColumnDecimal | TypeInternalColumnFloat;
  oritinalType: string;
  autoIncrement: boolean;
  unique: boolean;
  bytes: 4 | 8;
  presition?: string;
  scale?: string;
};

export type TypeInternalColumnStringParam = TypeInternalColumnBaseParam & {
  type: TypeInternalColumnString;
  oritinalType: string;
  unique: boolean;
  size: number | "max";
};

export type TypeInternalColumnBiteArrayParam = TypeInternalColumnBaseParam & {
  tableName: string;
  schema?: string;
  name: string;
  type: TypeInternalColumnBiteArray;
  oritinalType: string;
  size: number | "max";
};

export type TypeInternalColumnJsonParam = TypeInternalColumnBaseParam & {
  type: "json";
  oritinalType: string;
};

export type TypeInternalColumnParam =
  | TypeInternalColumnIntParam
  | TypeInternalColumnFloatingPointNumberParam
  | TypeInternalColumnStringParam
  | TypeInternalColumnBiteArrayParam
  | TypeInternalColumnJsonParam;

/**
 * Table Params
 */

export type TypeInternalTableParam = {
  name: string;
  schema?: string;
  columns: [TypeInternalColumnParam, ...TypeInternalColumnParam[]];
};
