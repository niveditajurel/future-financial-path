
import React from "react";

export const CardThemeExample = () => (
  <div className="bg-card text-card-foreground rounded-xl border border-border shadow p-6 max-w-sm">
    <h3 className="text-xl font-semibold mb-2">Card Title</h3>
    <p className="text-muted-foreground mb-4">This card uses the new design tokens for consistent theming. The border and typography use the custom palette.</p>
    <button className="bg-accent text-accent-foreground font-medium px-4 py-2 rounded shadow hover:bg-cta transition">
      Primary Action
    </button>
  </div>
);

