export type TBondNaturalType = "int" | "int2" | "int4" | "int8";

export type TBondRealType = "decimal" | "numeric";

export type TBondNumberType = TBondNaturalType | TBondRealType;

export type TBondStringType = "varchar" | "char" | "text";

export type TBondBinaryArrayType = "varbinary";

export type TBondDateTimeType = "date" | "time" | "datetime";

export type TBondBooleanType = "bit";

export type TBondUniqueIdentifierType = "uuid";

export type TBondJsonType = "json";

export type TBondColumnType =
  | TBondNumberType
  | TBondStringType
  | TBondBinaryArrayType
  | TBondDateTimeType
  | TBondBooleanType;

export type TBondPartialColumn = {
  columnName: string;
  type: TBondColumnType;
};
