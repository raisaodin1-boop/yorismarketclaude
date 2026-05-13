import { AppErrorBoundary } from "./components/errors/AppErrorBoundary.jsx";
import YorixApp from "./YorixApp.jsx";

/**
 * Point d’entrée minimal : boundary globale + app métier.
 * Le contenu des pages lazy est protégé par RouteErrorBoundary dans YorixApp.jsx.
 */
export default function App() {
  return (
    <AppErrorBoundary>
      <YorixApp />
    </AppErrorBoundary>
  );
}
