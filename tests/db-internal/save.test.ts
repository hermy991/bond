import { assertEquals } from "std/testing/asserts.ts";
import { save } from "../../src/db-internal/save.ts";

Deno.test({
  name: "Internal Database",
  fn: async (t) => {
    await t.step("entity", () => {
      const r = save({
        type: "entity",
        value: {
          entityName: "user1",
          columns: [
            { columnName: "customer_ID", type: "int", oritinalType: "int", autoIncrement: true, bytes: 8 },
          ],
        },
      });
      assertEquals(r?.entity_ID, 1);
      assertEquals(r?.entityName, "user1");
      assertEquals(r?.columns.length, 1);
      assertEquals(r?.columns[0].entity_ID, 1);
    });
    await t.step("entity with schema", () => {
      const r = save({
        type: "entity",
        value: {
          entityName: "user2",
          schema: "testing",
          columns: [
            { columnName: "customer_ID", type: "int", oritinalType: "int", autoIncrement: true, bytes: 8 },
          ],
        },
      });
      assertEquals(r?.entity_ID, 2);
      assertEquals(r?.entityName, "user2");
      assertEquals(r?.schema, "testing");
      assertEquals(r?.columns.length, 1);
      assertEquals(r?.columns[0].entity_ID, 2);
    });
  },
});
