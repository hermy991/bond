/**
 * Functionalities
 */

import {
  TypeInternalEntityColumnParam,
  TypeInternalEntityColumnReturn,
  TypeInternalEntityParam,
  TypeInternalEntityReturn,
} from "./entity.ts";

export type TypeSaveEntity = (entity: TypeInternalEntityParam) => TypeInternalEntityReturn | undefined;

export type TypeSaveColumns = (
  entity_ID: number,
  columns: [TypeInternalEntityColumnParam, ...TypeInternalEntityColumnParam[]],
) => TypeInternalEntityColumnReturn[] | undefined;
