import { defineConfig } from 'unocss'

// touch to trigger slidev restart when new layouts/components aren't picked up — 9
export default defineConfig({
  theme: {
    colors: {
      bg: 'var(--bg)',
      'bg-elevated': 'var(--bg-elevated)',
      surface: 'var(--surface)',
      'surface-hi': 'var(--surface-hi)',
      border: 'var(--border)',
      'border-hi': 'var(--border-hi)',
      fg: 'var(--fg)',
      'fg-muted': 'var(--fg-muted)',
      'fg-dim': 'var(--fg-dim)',
      accent: 'var(--accent)',
      'accent-hi': 'var(--accent-hi)',
      'accent-on': 'var(--accent-on)',
      danger: 'var(--danger)',
      success: 'var(--success)',
    },
    /* borderRadius / spacing / fontFamily intentionally NOT overridden:
       overriding these replaces the preset scales (e.g. h-0.5 resolves
       to 0, font-mono fails), breaking shortcuts and Slidev's client
       styles. Use var(--r-X) / var(--s-X) / 'JetBrains Mono' directly
       in CSS where design tokens are needed. Arbitrary values like
       p-[var(--s-5)] also work for one-offs. */
  },
  shortcuts: {
    card: 'rounded-[var(--r-lg)] border border-border bg-surface p-[var(--s-5)] backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.25)]',
    // Sizes are token-driven, not preset steps: text-xs (12px) on code-pill and
    // text-sm (14px) on chip were both under the projector readability floor.
    chip: 'inline-flex items-center gap-2 rounded-full border border-border-hi bg-surface-hi px-3 py-1 text-[length:var(--t-small)] font-semibold',
    'code-pill': 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[length:var(--t-mono)] text-fg-muted',
    mark: 'block w-10 h-[2px] bg-accent mb-[var(--s-2)]',
  },
})
