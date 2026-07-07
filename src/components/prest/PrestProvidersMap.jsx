import { MapPin } from "lucide-react";

const CITY_COORDS = {
  Douala: { lat: 4.0511, lng: 9.7679 },
  Yaoundé: { lat: 3.848, lng: 11.5021 },
  Kribi: { lat: 2.9406, lng: 9.9102 },
  Bafoussam: { lat: 5.4781, lng: 10.4178 },
};

function hashSeed(str) {
  return String(str || "")
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);
}

/**
 * Carte simplifiée (OpenStreetMap) + repères prestataires autour du client.
 */
export function PrestProvidersMap({ providers = [], ville, locale = "fr", onSelect }) {
  const isEn = locale === "en";
  const center = CITY_COORDS[ville] || CITY_COORDS.Douala;
  const bbox = `${center.lng - 0.08},${center.lat - 0.06},${center.lng + 0.08},${center.lat + 0.06}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${center.lat}%2C${center.lng}`;

  const pins = providers.slice(0, 15).map((p, i) => {
    const seed = hashSeed(p.id) + i * 7;
    return {
      id: p.id,
      name: p.name,
      left: 12 + (seed % 72),
      top: 14 + ((seed * 3) % 68),
    };
  });

  return (
    <aside className="prest-map-panel" aria-label={isEn ? "Providers map" : "Carte des prestataires"}>
      <div className="prest-map-panel__head">
        <MapPin size={14} aria-hidden />
        {isEn ? `${providers.length} pros nearby` : `${providers.length} pros autour de vous`}
      </div>
      <div className="prest-map-panel__frame">
        <iframe
          title={isEn ? "OpenStreetMap" : "Carte OpenStreetMap"}
          src={mapSrc}
          loading="lazy"
          className="prest-map-panel__iframe"
        />
        <div className="prest-map-panel__pins" aria-hidden>
          {pins.map((pin) => (
            <button
              key={pin.id}
              type="button"
              className="prest-map-pin"
              style={{ left: `${pin.left}%`, top: `${pin.top}%` }}
              title={pin.name}
              onClick={() => onSelect?.(providers.find((p) => p.id === pin.id))}
            />
          ))}
        </div>
      </div>
      <p className="prest-map-panel__hint">
        {isEn
          ? "Tap a pin or card to compare verified professionals."
          : "Touchez un repère ou une carte pour comparer les pros vérifiés."}
      </p>
    </aside>
  );
}
