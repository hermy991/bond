import { assertEquals } from "std/testing/asserts.ts";
import { save } from "./save.ts";

Deno.test({
  name: "Internal IndexedDB",
  fn: async (t) => {
    await t.step("createObjectStore should be work with one paramether", () => {
      save({ type: "entity", value: { name: "user", schema: "testing" } });
    });
    console.table(Deno.resources());
  },
});
