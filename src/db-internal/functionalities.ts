import { TypeInternalColumnParam, TypeInternalTableParam } from "./params.ts";

/**
 * Functionalities
 */

export type TypeSaveTable = (table: TypeInternalTableParam) => void;

export type TypeSaveColumns = (columns: [TypeInternalColumnParam, ...TypeInternalColumnParam[]]) => void;
