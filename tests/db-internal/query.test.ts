import { assertEquals } from "std/testing/asserts.ts";
import { query } from "../../src/db-internal/query.ts";
import { save } from "../../src/db-internal/save.ts";
import { resetDatabase } from "../utils.ts";

Deno.test({
  name: "Internal Database",
  fn: async (t) => {
    await t.step("query entity", () => {
      resetDatabase();
      save("entity", {
        entityName: "user1",
        columns: [{ columnName: "customer_ID", type: "int", oritinalType: "int", bytes: 8 }],
      });

      const r1 = query("entity", { entityName: "user1", schema: null });
      assertEquals(r1?.entity_ID, 1);
      assertEquals(r1?.columns.length, 0);

      const r2 = query("entity", { entityName: "user1", schema: null }, { columns: true });
      assertEquals(r2?.columns.length, 1);
    });
  },
});
