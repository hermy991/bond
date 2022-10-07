import { assertEquals, assertExists } from "std/testing/asserts.ts";
import { query } from "../../src/internalDatabase/query.ts";
import { save } from "../../src/internalDatabase/save.ts";
import { resetDatabase } from "../utils.ts";

Deno.test({
  name: "Internal Database",
  fn: async (t) => {
    await t.step('query entity { entityName: "user1", schema: null }', () => {
      resetDatabase();
      save("entity", {
        entityName: "user1",
        columns: [{ columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 }],
      });

      const r1 = query("entity", { entityName: "user1", schema: null });
      assertEquals(r1?.entity_ID, 1);
      assertEquals(r1?.columns.length, 0);
    });
    await t.step('query entity { entityName: "user1", schema: null }, { columns: true }', () => {
      resetDatabase();
      save("entity", {
        entityName: "user1",
        columns: [{ columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 }],
      });

      const r2 = query("entity", { entityName: "user1", schema: null }, { columns: true });
      assertEquals(r2?.entity_ID, 1);
      assertEquals(r2?.columns.length, 1);
    });
    await t.step("query entity [1]", () => {
      resetDatabase();
      save("entity", {
        entityName: "user1",
        schema: "testing",
        columns: [{ columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 }],
      });

      const r1 = query("entity", 1);
      assertEquals(r1?.entity_ID, 1);
      assertEquals(r1?.columns.length, 0);
    });
    await t.step('query unique ["UQ_customer"]', () => {
      resetDatabase();
      const entity = save("entity", {
        entityName: "user1",
        columns: [{ columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 }],
      });
      if (!entity) {
        assertExists(entity);
        return;
      }
      save("unique", {
        uniqueName: "UQ_customer",
        entity_ID: entity.entity_ID,
        columns: ["customer_ID"],
      });
      const r1 = query("unique", "UQ_customer");
      assertEquals(r1?.unique_ID, 1);
      assertEquals(r1?.uniqueName, "UQ_customer");
    });
    await t.step("query unique [1]", () => {
      resetDatabase();
      const entity = save("entity", {
        entityName: "user1",
        columns: [{ columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 }],
      });
      if (!entity) {
        assertExists(entity);
        return;
      }
      save("unique", {
        uniqueName: "UQ_customer",
        entity_ID: entity.entity_ID,
        columns: ["customer_ID"],
      });
      const r2 = query("unique", 1);
      assertEquals(r2?.unique_ID, 1);
      assertEquals(r2?.uniqueName, "UQ_customer");
    });
  },
});
