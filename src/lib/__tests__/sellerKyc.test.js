import { describe, expect, it } from "vitest";
import { collectKycDocuments, kycChecklist, requiredDocTypes } from "../sellerKyc.js";

describe("sellerKyc", () => {
  it("requires import proofs x3", () => {
    expect(requiredDocTypes("import_business").filter((t) => t === "import_proof")).toHaveLength(3);
  });

  it("checklist fails when legal docs missing for local business", () => {
    const { complete } = kycChecklist({
      seller_category: "local_business",
      company_name: "SARL Test",
      rccm: "RC/DLA/2024/B/1",
      city: "Douala",
      quartier: "Akwa",
      address: "Rue 1",
      doc_url: "http://cni",
      selfie_url: "http://selfie",
      extra_docs: [{ type: "rccm", url: "http://rccm" }],
    });
    expect(complete).toBe(false);
  });

  it("collects legacy and extra docs", () => {
    const docs = collectKycDocuments({
      doc_url: "http://a",
      extra_docs: [{ type: "import_proof", url: "http://b", label: "BL" }],
    });
    expect(docs).toHaveLength(2);
  });
});
