export type TypeInternalTimeZone =
  | "-12"
  | "-11"
  | "-10"
  | "-9:30"
  | "-9"
  | "-8"
  | "-7"
  | "-6"
  | "-5"
  | "-4"
  | "-3"
  | "-2:30"
  | "-2"
  | "-1"
  | "+0"
  | "+1"
  | "+2"
  | "+3"
  | "+4:30"
  | "+5"
  | "+5:30"
  | "+5:45"
  | "+6"
  | "+6:30"
  | "+7"
  | "+8"
  | "+8:45"
  | "+9"
  | "+9:30"
  | "+10"
  | "+10:30"
  | "+11"
  | "+12"
  | "+12:45"
  | "+13"
  | "+14";

// int1: TINYINT = A very small integer. The signed range is -128 to 127. The unsigned range is 0 to 255.
// int2: SMALLINT = A small integer. The signed range is -32768 to 32767. The unsigned range is 0 to 65535.
// int3: MEDIUMINT = A medium-sized integer. The signed range is -8388608 to 8388607. The unsigned range is 0 to 16777215.
// int4: INTEGER | INT = A normal-size integer. The signed range is -2147483648 to 2147483647. The unsigned range is 0 to 4294967295.
// int8: BIGINT = A large integer. The signed range is -9223372036854775808 to 9223372036854775807. The unsigned range is 0 to 18446744073709551615.
// bit:  BIT = Fixed-length bit string.
export type TypeInternalInt = "int";

export type TypeInternalDecimal = "decimal";

export type TypeInternalFloat = "float";

export type TypeInternalNumber =
  | TypeInternalInt
  | TypeInternalDecimal
  | TypeInternalFloat;

export type TypeInternalCharacter = "character";

export type TypeInternalVarchar = "varchar";

export type TypeInternalString = TypeInternalCharacter | TypeInternalVarchar;

export type TypeInternalBinary = "binary";

export type TypeInternalVarbinary = "varbinary";

export type TypeInternalBiteArray = TypeInternalBinary | TypeInternalVarbinary;

export type TypeInternalTime = "time";

export type TypeInternalTimestamp = "timestamp";

export type TypeInternalDateAndTime = TypeInternalTime | TypeInternalTimestamp;

export type TypeInternalType =
  | TypeInternalNumber
  | TypeInternalString
  | TypeInternalBiteArray
  | TypeInternalDateAndTime
  | "json";

// export type TypeInternalColumnProp = {
//   name: string;
//   type: TypeInternalColumn;
//   oritinalType: string;
//   autoIncrement: boolean;
//   unique: boolean;
//   bytes?: number | "max";
//   size?: number | "max";
//   nullable: boolean;
//   presition?: string;
//   scale?: string;
//   timeZone?: TypeInternalTimeZone;
//   default?: string;
// };
