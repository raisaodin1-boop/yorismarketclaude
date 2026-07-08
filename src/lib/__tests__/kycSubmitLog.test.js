import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  clearKycSubmitLogBuffer,
  getKycSubmitLogBuffer,
  logKycError,
  logKycEvent,
} from "../kycSubmitLog.js";

describe("kycSubmitLog", () => {
  beforeEach(() => {
    clearKycSubmitLogBuffer();
    vi.stubGlobal("sessionStorage", {
      _data: {},
      getItem(k) {
        return this._data[k] ?? null;
      },
      setItem(k, v) {
        this._data[k] = v;
      },
      removeItem(k) {
        delete this._data[k];
      },
    });
  });

  it("stores events in session buffer", () => {
    logKycEvent("submit.start", { user_id: "abc12345-uuid", seller_category: "online" });
    const buf = getKycSubmitLogBuffer();
    expect(buf).toHaveLength(1);
    expect(buf[0].phase).toBe("submit.start");
  });

  it("logKycError records error level", () => {
    logKycError("upload.fail", new Error("timeout"), { slot: "cni_recto" });
    const buf = getKycSubmitLogBuffer();
    expect(buf[0].level).toBe("error");
    expect(buf[0].phase).toBe("upload.fail");
    expect(buf[0].message).toMatch(/timeout/i);
  });
});
