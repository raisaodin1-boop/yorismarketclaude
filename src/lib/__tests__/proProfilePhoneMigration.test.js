// @vitest-environment node
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

describe("enforce_pro_profile_phone migration", () => {
  const sql = readFileSync(
    resolve(
      dirname(fileURLToPath(import.meta.url)),
      "../../../supabase/migrations/20260801120000_enforce_pro_profile_phone.sql",
    ),
    "utf8",
  );

  it("blocks professional inserts without a usable telephone", () => {
    expect(sql).toMatch(/enforce_pro_profile_phone/);
    expect(sql).toMatch(/BEFORE INSERT ON public\.profiles/);
    expect(sql).toMatch(/seller',\s*'provider',\s*'delivery'/);
    expect(sql).toMatch(/regexp_replace/);
    expect(sql).toMatch(/< 9/);
  });
});
