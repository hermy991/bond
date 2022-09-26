import { databaseClose, databaseOpen } from "../src/db-internal/save.ts";

export function resetDatabase() {
  databaseClose();
  databaseOpen();
}
