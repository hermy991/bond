import { assertEquals } from "std/testing/asserts.ts";
import { save } from "../../src/db-internal/save.ts";
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
  },
});
