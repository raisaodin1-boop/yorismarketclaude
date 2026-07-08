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

  it("checklist passes import business with address only (no shop plan)", () => {
    const { complete } = kycChecklist({
      seller_category: "import_business",
      company_name: "Import SARL",
      rccm: "RC/CN/2024/1",
      business_country_code: "CN",
      city: "Douala",
      quartier: "Akwa",
      address: "Rue 1",
      doc_url: "http://cni",
      selfie_url: "http://selfie",
      extra_docs: [
        { type: "rccm", url: "http://rccm" },
        { type: "import_proof", url: "http://p1" },
        { type: "import_proof", url: "http://p2" },
        { type: "import_proof", url: "http://p3" },
      ],
    });
    expect(complete).toBe(true);
  });

  it("collects legacy and extra docs", () => {
    const docs = collectKycDocuments({
      doc_url: "http://a",
      extra_docs: [{ type: "import_proof", url: "http://b", label: "BL" }],
    });
    expect(docs).toHaveLength(2);
  });
});
