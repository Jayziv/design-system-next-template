# Themes

This directory holds your active theme and theme examples sourced from the design system.

## How themes work

The design system ships CSS custom properties for all semantic tokens. You override them in `active.css` to apply your brand palette. **Only one palette is shipped to the client** — the one defined in `active.css`. No unused themes are bundled.

`ThemeProvider` with `persistScope="colorMode"` only toggles light/dark at runtime. The palette is baked at build time.

## Applying a theme

**Option A — Use the pre-populated default (already done)**

The template ships with the DS default palette in `active.css`. It works out of the box.

**Option B — Switch palette**

1. Copy a file from `examples/` into `active.css`
2. Replace the `[data-color-theme="..."]` selector with `:root`
3. Replace the `.dark [data-color-theme="..."]` selector with `.dark`

**Option C — Full brand override**

1. Copy `examples/brand-override.css` into `active.css`
2. Edit the HSL values to match your brand

## Files

| File | Purpose |
|------|---------|
| `active.css` | **Your active theme** — one palette, baked at build time |
| `examples/ocean.css` | Ocean color palette (reference) |
| `examples/forest.css` | Forest color palette (reference) |
| `examples/sunset.css` | Sunset color palette (reference) |
| `examples/default.css` | Default (DS baseline) palette (reference) |
| `examples/brand-override.css` | Blank brand override template |

## Token format

All values are bare HSL — no `hsl()` wrapper:

```css
--primary: 215 70% 40%;    ✅ correct
--primary: hsl(215, 70%, 40%);  ❌ wrong
```

## Dark mode

Dark mode is controlled by the `dark` class on `<html>` (toggled by ThemeProvider).
Your `active.css` must include both `:root` (light) and `.dark` (dark) blocks.
