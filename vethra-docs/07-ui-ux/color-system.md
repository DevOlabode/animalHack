# Color System

Define in CSS variables (adapt to existing styles if already set):

```css
:root {
  --color-bg: /* page background — avoid flat pure white only; subtle gradient/texture OK */;
  --color-surface: /* panels */;
  --color-text: /* primary text */;
  --color-muted: /* secondary */;
  --color-border: /* hairlines */;
  --color-primary: /* brand action */;
  --color-primary-contrast: /* text on primary */;
  --color-danger: /* destructive */;
  --color-warning: /* pending */;
  --color-success: /* confirmed/completed */;
}
```

## Rules

- Do not default to purple-on-white AI cliché if brand already differs
- Maintain WCAG AA contrast for text and buttons
- Dark mode: Phase 2 (see roadmap) — not MVP required
