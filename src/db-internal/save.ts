import { indexedDB } from "indexeddb";
import { ErrorInternalConnection } from "./erros.ts";

let db;
const request = indexedDB.open("bond");
request.onerror = (event) => {
  console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = (event: any) => {
  if (event?.target?.result) {
    db = event.target.result;
  }
};

if (!db) {
  throw ErrorInternalConnection;
}
