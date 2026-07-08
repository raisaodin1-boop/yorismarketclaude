import { PDF_BRANDING } from "./pdfBrandingAssets";

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function openPrintablePdf({ title, filename, bodyHtml }) {
  if (typeof window === "undefined") return false;
  const win = window.open("", "_blank", "noopener,noreferrer,width=980,height=820");
  if (!win) return false;

  const stamp = `${window.location.origin}${PDF_BRANDING.stampUrl}`;
  const letterhead = `${window.location.origin}${PDF_BRANDING.letterheadUrl}`;
  const safeTitle = esc(title);
  const safeFilename = esc(filename || "document-yorix");

  win.document.open();
  win.document.write(`<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>${safeFilename}</title>
  <style>
    @page { margin: 20mm 14mm 20mm 14mm; }
    body {
      margin: 0;
      font-family: Inter, "Segoe UI", Arial, sans-serif;
      color: #0d1f14;
      background: #fff;
    }
    .doc-wrap { position: relative; min-height: 100vh; }
    .letterhead {
      width: 100%;
      border-radius: 10px;
      border: 1px solid #e8e1d2;
      margin-bottom: 16px;
    }
    .title {
      font-weight: 800;
      font-size: 22px;
      letter-spacing: -0.3px;
      margin: 0 0 10px;
      color: #1a6b3a;
    }
    .meta { margin-bottom: 16px; color: #385045; font-size: 13px; }
    .card {
      border: 1px solid #e4ddd0;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 10px;
      background: #fff;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .label { color: #5d6e67; font-size: 12px; margin-bottom: 4px; }
    .value { font-size: 14px; font-weight: 600; }
    .stamp {
      position: fixed;
      right: 16mm;
      bottom: 16mm;
      width: 120px;
      opacity: .2;
      pointer-events: none;
    }
    .watermark {
      position: fixed;
      right: 18mm;
      bottom: 20mm;
      font-size: 10px;
      color: #36584a;
      opacity: .7;
    }
    .footer {
      margin-top: 16px;
      font-size: 12px;
      color: #566660;
      border-top: 1px solid #ebe4d8;
      padding-top: 10px;
    }
    @media print {
      .no-print { display: none !important; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="doc-wrap">
    <img class="letterhead" src="${letterhead}" alt="En-tête Yorix" />
    <h1 class="title">${safeTitle}</h1>
    ${bodyHtml}
    <div class="footer">
      ${esc(PDF_BRANDING.companyName)} · ${esc(PDF_BRANDING.city)} · Généré automatiquement
    </div>
    <img class="stamp" src="${stamp}" alt="Cachet Yorix" />
    <div class="watermark">Cachet officiel Yorix</div>
  </div>
  <script>
    window.onload = () => setTimeout(() => window.print(), 220);
  </script>
</body>
</html>`);
  win.document.close();
  return true;
}

function kvGrid(rows) {
  return `
    <div class="card grid">
      ${rows
        .map(
          (r) => `
            <div>
              <div class="label">${esc(r.label)}</div>
              <div class="value">${esc(r.value)}</div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

export function generateInvoicePdf(payload) {
  return openPrintablePdf({
    title: "Facture Yorix",
    filename: `facture-${payload.orderRef || "yorix"}`,
    bodyHtml: `
      <div class="meta">Réf. ${esc(payload.orderRef)} · Date ${esc(payload.dateLabel)}</div>
      ${kvGrid([
        { label: "Client", value: payload.clientName || "—" },
        { label: "Téléphone", value: payload.phone || "—" },
        { label: "Adresse", value: payload.address || "—" },
        { label: "Mode", value: payload.paymentMethod || "—" },
        { label: "Sous-total", value: payload.subtotalLabel || "—" },
        { label: "Livraison", value: payload.deliveryLabel || "—" },
        { label: "Total", value: payload.totalLabel || "—" },
        { label: "Référence checkout", value: payload.intentId || "—" },
      ])}
    `,
  });
}

export function generateDeliveryNotePdf(payload) {
  return openPrintablePdf({
    title: "Bon de livraison",
    filename: `bon-livraison-${payload.orderRef || "yorix"}`,
    bodyHtml: `
      <div class="meta">Réf. ${esc(payload.orderRef)} · Date ${esc(payload.dateLabel)}</div>
      ${kvGrid([
        { label: "Destinataire", value: payload.clientName || "—" },
        { label: "Contact", value: payload.phone || "—" },
        { label: "Adresse livraison", value: payload.address || "—" },
        { label: "Code suivi", value: payload.trackingCode || "En attente" },
        { label: "Ville", value: payload.city || "—" },
        { label: "Transport", value: payload.carrier || "Yorix Delivery" },
        { label: "Commande", value: payload.orderRef || "—" },
        { label: "Statut", value: payload.status || "Confirmée" },
      ])}
    `,
  });
}

export function generateAttestationPdf(payload) {
  return openPrintablePdf({
    title: "Attestation de transaction",
    filename: `attestation-${payload.orderRef || "yorix"}`,
    bodyHtml: `
      <div class="meta">Émise le ${esc(payload.dateLabel)}</div>
      <div class="card">
        <p style="margin:0 0 10px;line-height:1.6">
          La société <strong>${esc(PDF_BRANDING.companyName)}</strong> atteste que la transaction
          <strong> ${esc(payload.orderRef)}</strong> a bien été enregistrée sur la plateforme Yorix.
        </p>
        <p style="margin:0;line-height:1.6">
          Montant constaté : <strong>${esc(payload.totalLabel || "—")}</strong> ·
          Client : <strong>${esc(payload.clientName || "—")}</strong> ·
          Réf. checkout : <strong>${esc(payload.intentId || "—")}</strong>.
        </p>
      </div>
      ${kvGrid([
        { label: "Numéro de commande", value: payload.orderRef || "—" },
        { label: "Date", value: payload.dateLabel || "—" },
        { label: "Client", value: payload.clientName || "—" },
        { label: "Téléphone", value: payload.phone || "—" },
      ])}
    `,
  });
}

