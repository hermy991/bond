import { indexedDB } from "indexeddb";
import { ErrorInternalConnection } from "./erros.ts";
import { TypeIndexedEntity } from "./types.ts";

let db;

export const save = (props: TypeIndexedEntity) => {
  const request = indexedDB.open("bond", 3);
  request.onerror = (event) => {
    console.log(event);
    throw ErrorInternalConnection;
  };
  request.onupgradeneeded = (event: any) => {
    if (event?.target?.result) {
      db = event.target.result;
      // console.log({ db });
      const objectStore = db.createObjectStore("names", { autoIncrement: true });
      // const objectStore = transaction.objectStore("customers");
      objectStore.add("Hermy");
      // const transaction = db.transaction(["customers"], "readwrite");
      // const { type, value } = props;
    }
  };
};
