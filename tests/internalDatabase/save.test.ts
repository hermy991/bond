import { assertEquals } from "std/testing/asserts.ts";
import { save } from "../../src/internalDatabase/save.ts";
import { resetDatabase } from "../utils.ts";

Deno.test({
  name: "Internal Database",
  fn: async (t) => {
    await t.step("save entity", () => {
      resetDatabase();
      const r = save("entity", {
        entityName: "user1",
        columns: [
          { columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 },
        ],
      });
      assertEquals(r?.entity_ID, 1);
      assertEquals(r?.entityName, "user1");
      assertEquals(r?.columns.length, 1);
      assertEquals(r?.columns[0].entity_ID, 1);
    });
    await t.step("save entity with schema", () => {
      resetDatabase();
      const r = save("entity", {
        entityName: "user1",
        schema: "testing",
        columns: [{ columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 }],
      });
      assertEquals(r?.entity_ID, 1);
      assertEquals(r?.entityName, "user1");
      assertEquals(r?.schema, "testing");
      assertEquals(r?.columns.length, 1);
      assertEquals(r?.columns[0].entity_ID, 1);
    });
    await t.step('save unique ["customer_ID"]', () => {
      resetDatabase();
      save("entity", {
        entityName: "user1",
        schema: "testing",
        columns: [{ columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 }],
      });
      const r = save("unique", {
        entity_ID: 1,
        uniqueName: "UQ_unique",
        columns: ["customer_ID"],
      });
      assertEquals(r?.entity_ID, 1);
      assertEquals(r?.columnIds.length, 1);
      assertEquals(r?.columnIds, [1]);
      assertEquals(r?.columnNames?.length, 1);
      assertEquals(r?.columnNames, ["customer_ID"]);
    });
    await t.step("save unique [1]", () => {
      resetDatabase();
      save("entity", {
        entityName: "user1",
        schema: "testing",
        columns: [{ columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 }],
      });
      const r = save("unique", {
        entity_ID: 1,
        uniqueName: "UQ_unique",
        columns: [1],
      });
      assertEquals(r?.entity_ID, 1);
      assertEquals(r?.columnIds.length, 1);
      assertEquals(r?.columnIds, [1]);
      assertEquals(r?.columnNames?.length, 1);
      assertEquals(r?.columnNames, ["customer_ID"]);
    });
    await t.step("save unique [1, 2, 3]", () => {
      resetDatabase();
      save("entity", {
        entityName: "user1",
        schema: "testing",
        columns: [
          { columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 },
          { columnName: "customerDisplay", type: "varchar", oritinalType: "varchar", size: 100 },
          { columnName: "age", type: "int", oritinalType: "int", bytes: 8 },
        ],
      });
      const r = save("unique", {
        entity_ID: 1,
        uniqueName: "UQ_unique",
        columns: [1, 2, 3],
      });
      assertEquals(r?.entity_ID, 1);
      assertEquals(r?.columnIds.length, 3);
      assertEquals(r?.columnIds, [1, 2, 3]);
      assertEquals(r?.columnNames?.length, 3);
      assertEquals(r?.columnNames, ["customer_ID", "customerDisplay", "age"]);
    });
    await t.step('save unique ["customer_ID", "customerDisplay", "age"]', () => {
      resetDatabase();
      save("entity", {
        entityName: "user1",
        schema: "testing",
        columns: [
          { columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 },
          { columnName: "customerDisplay", type: "varchar", oritinalType: "varchar", size: 100 },
          { columnName: "age", type: "int", oritinalType: "int", bytes: 8 },
        ],
      });
      const r = save("unique", {
        entity_ID: 1,
        uniqueName: "UQ_unique",
        columns: ["customer_ID", "customerDisplay", "age"],
      });
      assertEquals(r?.entity_ID, 1);
      assertEquals(r?.columnIds.length, 3);
      assertEquals(r?.columnIds, [1, 2, 3]);
      assertEquals(r?.columnNames?.length, 3);
      assertEquals(r?.columnNames, ["customer_ID", "customerDisplay", "age"]);
    });
  },
});
