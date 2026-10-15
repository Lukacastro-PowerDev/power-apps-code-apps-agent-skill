// EXAMPLE ONLY - replace placeholders with real workflow states.
import React from "react";

type ApprovalState = "Draft" | "Submitted" | "Approved" | "Rejected";

export function ApprovalWorkflowTemplate() {
  const [state, setState] = React.useState<ApprovalState>("Draft");
  return (
    <section>
      <h1>Approval Workflow</h1>
      <p>Current status: {state}</p>
      <button onClick={() => setState("Submitted")}>Submit</button>
    </section>
  );
}
