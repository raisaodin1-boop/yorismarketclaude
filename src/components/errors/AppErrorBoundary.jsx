import { Component } from "react";

function arraysEqual(a, b) {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

/**
 * Error boundary racine (écran complet) ou section routes (carte compacte).
 * resetKeys : quand ils changent (ex. page), l’erreur est effacée pour permettre une nouvelle navigation.
 */
export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[AppErrorBoundary]", error?.message || error, errorInfo?.componentStack);
  }

  componentDidUpdate(prevProps) {
    const { resetKeys } = this.props;
    if (resetKeys && !arraysEqual(resetKeys, prevProps.resetKeys) && this.state.error) {
      this.setState({ error: null });
    }
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    const { children, variant = "full" } = this.props;
    const { error } = this.state;

    if (!error) return children;

    const isRoute = variant === "route";

    if (isRoute) {
      return (
        <section
          className="sec anim"
          style={{
            maxWidth: 560,
            margin: "32px auto",
            padding: "28px 24px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            textAlign: "center",
          }}
          role="alert"
        >
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>⚠️</div>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "var(--ink)",
              margin: "0 0 10px",
            }}
          >
            Cette page a rencontré un problème
          </h2>
          <p style={{ color: "var(--gray)", fontSize: ".88rem", lineHeight: 1.55, marginBottom: 18 }}>
            Un incident technique a interrompu l’affichage. Tu peux réessayer ou changer de rubrique.
          </p>
          {import.meta.env.DEV && error?.message && (
            <pre
              style={{
                textAlign: "left",
                fontSize: ".72rem",
                background: "var(--surface2)",
                padding: 12,
                borderRadius: 8,
                overflow: "auto",
                maxHeight: 120,
                marginBottom: 16,
                color: "var(--ink)",
              }}
            >
              {String(error.message)}
            </pre>
          )}
          <button type="button" className="form-submit" style={{ width: "auto", padding: "12px 28px" }} onClick={this.handleRetry}>
            Réessayer
          </button>
        </section>
      );
    }

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "var(--bg, #f5f1e8)",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 440,
            width: "100%",
            background: "var(--surface, #fff)",
            border: "1px solid var(--border, #e2ddd6)",
            borderRadius: 16,
            padding: "32px 28px",
            textAlign: "center",
            boxShadow: "0 12px 40px rgba(13,31,20,.08)",
          }}
          role="alert"
        >
          <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>🛠️</div>
          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "1.25rem",
              color: "var(--ink, #0d1f14)",
              margin: "0 0 12px",
            }}
          >
            Yorix rencontre une erreur
          </h1>
          <p style={{ color: "var(--gray, #6b7280)", fontSize: ".9rem", lineHeight: 1.6, marginBottom: 22 }}>
            L’application n’a pas pu s’afficher correctement. Réessaie ou recharge la page.
          </p>
          {import.meta.env.DEV && error?.message && (
            <pre
              style={{
                textAlign: "left",
                fontSize: ".75rem",
                background: "#f8faf8",
                padding: 12,
                borderRadius: 8,
                overflow: "auto",
                maxHeight: 140,
                marginBottom: 20,
                color: "#0d1f14",
              }}
            >
              {String(error.message)}
            </pre>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              className="form-submit"
              style={{ width: "auto", padding: "12px 22px" }}
              onClick={this.handleRetry}
            >
              Réessayer
            </button>
            <button
              type="button"
              style={{
                width: "auto",
                padding: "12px 22px",
                borderRadius: 10,
                border: "1.5px solid var(--border, #e2ddd6)",
                background: "var(--surface2, #faf8f5)",
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                fontSize: ".85rem",
                cursor: "pointer",
                color: "var(--ink, #0d1f14)",
              }}
              onClick={() => window.location.reload()}
            >
              Recharger la page
            </button>
          </div>
        </div>
      </div>
    );
  }
}

/** Boundary dédiée au contenu des pages (lazy routes), avec reset à la navigation. */
export function RouteErrorBoundary({ children, resetKeys }) {
  return (
    <AppErrorBoundary variant="route" resetKeys={resetKeys}>
      {children}
    </AppErrorBoundary>
  );
}
