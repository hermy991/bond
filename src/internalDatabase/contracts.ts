/**
 * Functionalities
 */

import {
  TypeInternalEntityColumnParam,
  TypeInternalEntityColumnReturn,
  TypeInternalEntityParam,
  TypeInternalEntityReturn,
} from "./entity.ts";

export type TypeSaveColumns = (
  entity_ID: number,
  columns: TypeInternalEntityColumnParam[],
) => TypeInternalEntityColumnReturn[] | undefined;
