import { assertEquals } from "std/testing/asserts.ts";
import { save } from "./save.ts";

Deno.test("Internal IndexedDB", async (t) => {
  await t.step("createObjectStore should be work with one paramether", () => {
    save({ type: "entity", value: { name: "user", schema: "testing" } });
  });
});
