import { saveEntity } from "./interface-sqlite.ts";
import { TypeInternalEntity } from "./types.ts";
export const save = (props: TypeInternalEntity) => {
  if (props.type === "entity") {
    return saveEntity(props.value);
  }
};
