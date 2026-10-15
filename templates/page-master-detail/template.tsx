// EXAMPLE ONLY - replace placeholders using observed schema.
import React from "react";

export function MasterDetailTemplate() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  return (
    <div>
      <aside>{/* master list */}</aside>
      <main>{selectedId ? "detail panel" : "select a record"}</main>
    </div>
  );
}
