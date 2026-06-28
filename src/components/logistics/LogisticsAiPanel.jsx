import { useMemo, useState } from "react";
import { Truck, MapPin } from "lucide-react";
import { CITIES } from "../../lib/constants";
import { explainDeliveryEta } from "../../lib/logisticsAi";
import "../ai/yorixAiPanels.css";

const CITY_OPTIONS = CITIES.filter((c) => !/^toutes/i.test(c));

/**
 * Panneau Logistics AI — explique ETA, coûts et facteurs.
 */
export function LogisticsAiPanel({ locale = "fr", orderAmount = 0 }) {
  const isEn = locale === "en";
  const [origin, setOrigin] = useState("Douala");
  const [dest, setDest] = useState("Douala");

  const result = useMemo(
    () =>
      explainDeliveryEta({
        originCity: origin,
        destCity: dest,
        orderAmount,
        couriersNearby: dest === "Douala" || dest === "Yaoundé" ? 4 : 2,
      }),
    [origin, dest, orderAmount],
  );

  return (
    <section className="yai-panel yai-panel--logistics" aria-label="Yorix Logistics AI">
      <header className="yai-panel__head">
        <Truck size={18} aria-hidden className="yai-panel__ico" />
        <div>
          <div className="yai-panel__brand">Yorix Logistics AI</div>
          <div className="yai-panel__sub">
            {isEn ? "ETA & cost estimate explained" : "Estimation délai et coût expliquée"}
          </div>
        </div>
      </header>

      <div className="yai-panel__row">
        <label className="yai-panel__field">
          {isEn ? "From" : "Départ"}
          <select className="yai-panel__select" value={origin} onChange={(e) => setOrigin(e.target.value)}>
            {CITY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="yai-panel__field">
          {isEn ? "To" : "Arrivée"}
          <select className="yai-panel__select" value={dest} onChange={(e) => setDest(e.target.value)}>
            {CITY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="yai-panel__summary">{isEn ? result.summaryEn : result.summaryFr}</p>

      <div className="yai-panel__stats">
        <div>
          <span className="yai-panel__stat-lbl">ETA</span>
          <span className="yai-panel__stat-val">{isEn ? result.eta.labelEn : result.eta.labelFr}</span>
        </div>
        <div>
          <span className="yai-panel__stat-lbl">{isEn ? "Cost" : "Coût"}</span>
          <span className="yai-panel__stat-val">
            {result.costs.min.toLocaleString(isEn ? "en-CM" : "fr-FR")}–
            {result.costs.max.toLocaleString(isEn ? "en-CM" : "fr-FR")} F
          </span>
        </div>
        <div>
          <span className="yai-panel__stat-lbl">{isEn ? "Distance" : "Distance"}</span>
          <span className="yai-panel__stat-val">
            <MapPin size={12} aria-hidden /> ~{result.distanceKm} km
          </span>
        </div>
      </div>

      <ul className="yai-panel__factors">
        {result.factors.map((f) => (
          <li key={f.key} className={`yai-factor yai-factor--${f.impact}`}>
            {isEn ? f.labelEn : f.labelFr}
          </li>
        ))}
      </ul>
    </section>
  );
}
