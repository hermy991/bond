import { Database } from "sqlite3";
import { TypeSaveTable } from "./functionalities.ts";
import { TypeInternalTableParam } from "./params.ts";

export const saveTable: TypeSaveTable = (table: TypeInternalTableParam) => {
  const db = new Database(":memory:");
  const [version] = db.prepare("select sqlite_version()").get<[string]>()!;
  console.log(version);
  db.close();
};
