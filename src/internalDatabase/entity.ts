import {
  TypeInternalBiteArray,
  TypeInternalDateAndTime,
  TypeInternalDecimal,
  TypeInternalFloat,
  TypeInternalInt,
  TypeInternalString,
  TypeInternalTimeZone,
} from "./internals.ts";

export type TypeInternalEntityColumnBaseParam = {
  columnName: string;
  oritinalType: string;
  nullable?: boolean;
  default?: string;
};

export type TypeInternalEntityColumnIntParam = TypeInternalEntityColumnBaseParam & {
  type: TypeInternalInt;
  autoIncrement?: boolean;
  unique?: boolean;
  bytes: 1 | 2 | 3 | 4 | 8;
};

export type TypeInternalEntityColumnFloatingPointNumberParam = TypeInternalEntityColumnBaseParam & {
  type: TypeInternalDecimal | TypeInternalFloat;
  autoIncrement?: boolean;
  unique?: boolean;
  bytes: 4 | 8;
  presition?: string;
  scale?: string;
};

export type TypeInternalEntityColumnStringParam = TypeInternalEntityColumnBaseParam & {
  type: TypeInternalString;
  unique?: boolean;
  size: number | "max";
};

export type TypeInternalEntityColumnDateTimeParam = TypeInternalEntityColumnBaseParam & {
  type: TypeInternalDateAndTime;
  unique?: boolean;
  presition?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  timeZone?: TypeInternalTimeZone;
};

export type TypeInternalEntityColumnBiteArrayParam = TypeInternalEntityColumnBaseParam & {
  type: TypeInternalBiteArray;
  size: number | "max";
};

export type TypeInternalEntityColumnJsonParam = TypeInternalEntityColumnBaseParam & {
  type: "json";
};

export type TypeInternalEntityColumnParam =
  | TypeInternalEntityColumnIntParam
  | TypeInternalEntityColumnFloatingPointNumberParam
  | TypeInternalEntityColumnStringParam
  | TypeInternalEntityColumnDateTimeParam
  | TypeInternalEntityColumnBiteArrayParam
  | TypeInternalEntityColumnJsonParam;

export type TypeInternalEntityParam = {
  entityName: string;
  schema?: string;
  columns: TypeInternalEntityColumnParam[];
};

export type TypeInternalEntityColumnReturn = { column_ID: number; entity_ID: number } & TypeInternalEntityColumnParam;

export type TypeInternalEntityReturn = {
  entity_ID: number;
  entityName: string;
  schema?: string;
  columns: TypeInternalEntityColumnReturn[];
};
