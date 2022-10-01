import { databaseClose, databaseOpen } from "../src/internalDatabase/save.ts";

export function resetDatabase() {
  databaseClose();
  databaseOpen();
}
