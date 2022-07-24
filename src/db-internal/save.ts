import { indexedDB } from "indexeddb";
import { ErrorInternalConnection } from "./erros.ts";
import { TypeIndexedEntity } from "./types.ts";

let db;

export const save = (props: TypeIndexedEntity) => {
  const request = indexedDB.open("bond");
  request.onerror = (event) => {
    console.log(event);
    throw ErrorInternalConnection;
  };
  request.onsuccess = (event: any) => {
    if (event?.target?.result) {
      db = event.target.result;
      console.log({ db });
      const { type, value } = props;
    }
  };
};
