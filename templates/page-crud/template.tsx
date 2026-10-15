// EXAMPLE ONLY - replace placeholders using observed schema.
import React from "react";

type EntityViewModel = {
  id: string;
  // TODO: replace with observed fields
  title: string;
};

export function CrudPageTemplate() {
  const [rows, setRows] = React.useState<EntityViewModel[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      // TODO: call generated service adapter (no direct fetch/axios)
      setRows([]);
    } catch (e) {
      setError("Failed to load records");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => void load(), []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!rows.length) return <p>No records found.</p>;

  return <div>{/* TODO: render table + form */}</div>;
}
