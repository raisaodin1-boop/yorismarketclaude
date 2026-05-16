import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppErrorBoundary } from "./components/errors/AppErrorBoundary.jsx";
import YorixApp from "./YorixApp.jsx";
import { parseLocaleSegments, localePath, DEFAULT_SITE_LOCALE } from "./lib/seoRoutes.js";
import "./i18n/index.js";

/**
 * Redirige toute URL sans préfixe /fr | /en vers /fr/... pour SEO bilingual.
 */
function LocalePrefixBootstrap() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (parseLocaleSegments(location.pathname).hasLocalePrefix) return;
    const bare = location.pathname.replace(/\/+$/, "") || "/";
    const target =
      localePath(DEFAULT_SITE_LOCALE, bare === "/" ? "/" : bare) + location.search + location.hash;
    navigate(target, { replace: true });
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}

/**
 * Point d’entrée minimal : boundary globale + app métier.
 * Le contenu des pages lazy est protégé par RouteErrorBoundary dans YorixApp.jsx.
 */
export default function App() {
  return (
    <AppErrorBoundary>
      <LocalePrefixBootstrap />
      <YorixApp />
    </AppErrorBoundary>
  );
}
