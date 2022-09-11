import { ErrorInternalConnection } from "./erros.ts";
import { saveTable } from "./interface-sqlite3.ts";
import { TypeIndexedEntity } from "./types.ts";
export const save = (props: TypeIndexedEntity) => {
  saveTable({
    name: "customer",
    columns: [
      {
        tableName: "customer",
        name: "customer_ID",
        type: "int",
        oritinalType: "int",
        autoIncrement: true,
        unique: true,
        bytes: 4,
        nullable: false,
      },
    ],
  });
};
