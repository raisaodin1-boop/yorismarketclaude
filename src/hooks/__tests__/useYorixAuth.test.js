import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const getSession = vi.fn();
const onAuthStateChange = vi.fn();
const signUp = vi.fn();
const from = vi.fn();
const getUserProfile = vi.fn();
const onProfileLoaded = vi.fn();

vi.mock("../../lib/supabase.js", () => ({
  supabase: {
    auth: {
      getSession,
      onAuthStateChange,
      signUp,
    },
    from,
  },
}));

vi.mock("../../utils/helpers.js", () => ({
  getUserProfile,
  getUserRole: (profile) => profile?.role || "buyer",
  sendEmail: vi.fn(() => Promise.resolve()),
  emailBienvenue: vi.fn(() => "<p>Bienvenue</p>"),
}));

function Harness({ latest }) {
  const { useYorixAuth } = React.useMemo(() => latest.imports, [latest]);
  const auth = useYorixAuth({
    goPage: vi.fn(),
    setDashTab: vi.fn(),
    setDemandeLivraisonOpen: vi.fn(),
    setNotifs: vi.fn(),
    onProfileLoaded,
  });

  useEffect(() => {
    latest.current = auth;
  }, [auth, latest]);

  return null;
}

describe("useYorixAuth", () => {
  let root;
  let container;

  beforeEach(() => {
    vi.clearAllMocks();
    getSession.mockResolvedValue({ data: { session: null }, error: null });
    onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    signUp.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });
    from.mockImplementation(() => ({
      upsert: vi.fn().mockResolvedValue({ error: null }),
      insert: vi.fn().mockResolvedValue({ error: null }),
    }));
    getUserProfile.mockResolvedValue({ id: "user-1", role: "seller" });
    onProfileLoaded.mockResolvedValue();
    container = document.createElement("div");
    root = createRoot(container);
  });

  afterEach(() => {
    if (root) {
      act(() => root.unmount());
    }
    container?.remove();
  });

  it("completes professional registration after a single contract acceptance", async () => {
    const latest = {
      current: null,
      imports: await import("../useYorixAuth.js"),
    };

    await act(async () => {
      root.render(React.createElement(Harness, { latest }));
    });

    await act(async () => {
      latest.current.setSelectedRole("seller");
      latest.current.setAuthForm({
        nom: "Alice Seller",
        email: "alice@example.com",
        tel: "690000000",
        password: "strong-password",
      });
    });

    await act(async () => {
      await latest.current.doRegister();
    });

    expect(signUp).not.toHaveBeenCalled();
    expect(latest.current.contractOpen).toBe(true);
    expect(latest.current.pendingRegistration).toMatchObject({
      email: "alice@example.com",
      role: "seller",
    });

    await act(async () => {
      await latest.current.handleContractAccepted({});
    });

    expect(signUp).toHaveBeenCalledTimes(1);
    expect(signUp).toHaveBeenCalledWith(expect.objectContaining({
      email: "alice@example.com",
      password: "strong-password",
      options: expect.objectContaining({
        data: expect.objectContaining({
          role: "seller",
          telephone: "690000000",
        }),
      }),
    }));
    expect(latest.current.contractOpen).toBe(false);
    expect(latest.current.pendingRegistration).toBe(null);
  });
});
