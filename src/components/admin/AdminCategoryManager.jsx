import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { categoryLabel, bustCategoryCache } from "../../lib/marketplaceCategories";
import "../categories/categoryUi.css";

export function AdminCategoryManager({ tree = [], flat = [], onReload }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name_fr: "", name_en: "", icon: "", sort_order: 0, active: true });
  const [msg, setMsg] = useState(null);

  const startEdit = (row) => {
    setEditing(row.id);
    setForm({
      name_fr: row.name_fr || "",
      name_en: row.name_en || "",
      icon: row.icon || "",
      sort_order: row.sort_order ?? 0,
      active: row.active !== false,
    });
  };

  const save = async () => {
    if (!editing || String(editing).startsWith("tax-")) {
      setMsg({ type: "error", text: "Catégorie locale uniquement — appliquez la migration SQL Supabase." });
      return;
    }
    const { error } = await supabase
      .from("marketplace_categories")
      .update({
        name_fr: form.name_fr,
        name_en: form.name_en,
        icon: form.icon,
        sort_order: Number(form.sort_order) || 0,
        active: form.active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editing);
    if (error) {
      setMsg({ type: "error", text: error.message });
      return;
    }
    bustCategoryCache();
    setMsg({ type: "success", text: "Catégorie mise à jour." });
    setEditing(null);
    onReload?.();
  };

  const toggleActive = async (row) => {
    if (String(row.id).startsWith("tax-")) return;
    await supabase.from("marketplace_categories").update({ active: !row.active }).eq("id", row.id);
    bustCategoryCache();
    onReload?.();
  };

  return (
    <div>
      <p style={{ fontSize: ".85rem", color: "var(--gray)", marginBottom: 12 }}>
        Gérez les 15 catégories principales et sous-catégories. Les seeds complets sont dans{" "}
        <code>supabase/migrations/20260523000100_full_category_taxonomy_subcategories.sql</code>.
      </p>
      {msg && (
        <div className={msg.type === "success" ? "success-msg" : "error-msg"} style={{ marginBottom: 12 }}>
          {msg.text}
        </div>
      )}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icône</th>
              <th>FR / EN</th>
              <th>Slug</th>
              <th>Parent</th>
              <th>Ordre</th>
              <th>Actif</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flat.map((row) => (
              <tr key={row.id}>
                <td>{row.icon || "—"}</td>
                <td>
                  {editing === row.id ? (
                    <>
                      <input
                        className="form-input"
                        value={form.name_fr}
                        onChange={(e) => setForm((f) => ({ ...f, name_fr: e.target.value }))}
                        placeholder="Nom FR"
                      />
                      <input
                        className="form-input"
                        style={{ marginTop: 4 }}
                        value={form.name_en}
                        onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))}
                        placeholder="Nom EN"
                      />
                    </>
                  ) : (
                    <>
                      <strong>{row.name_fr}</strong>
                      <br />
                      <span style={{ fontSize: ".72rem", color: "var(--gray)" }}>{row.name_en}</span>
                    </>
                  )}
                </td>
                <td style={{ fontSize: ".72rem" }}>{row.slug}</td>
                <td style={{ fontSize: ".72rem" }}>{row.parent_slug || "—"}</td>
                <td>
                  {editing === row.id ? (
                    <input
                      type="number"
                      className="form-input"
                      style={{ width: 60 }}
                      value={form.sort_order}
                      onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                    />
                  ) : (
                    row.sort_order
                  )}
                </td>
                <td>
                  <button type="button" className="admin-badge" onClick={() => toggleActive(row)}>
                    {row.active !== false ? "✅" : "⛔"}
                  </button>
                </td>
                <td>
                  {editing === row.id ? (
                    <>
                      <button type="button" className="btn-green" style={{ marginRight: 6 }} onClick={save}>
                        OK
                      </button>
                      <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>
                        Annuler
                      </button>
                    </>
                  ) : (
                    <button type="button" className="btn-ghost" onClick={() => startEdit(row)}>
                      ✏️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: ".75rem", marginTop: 12 }}>
        Racines : {tree.length} · Total lignes : {flat.length}
      </p>
    </div>
  );
}
