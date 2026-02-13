# Theming

## Overview

The app supports light and dark themes using Tailwind CSS v4 with a class-based `.dark` strategy. Theme preference is stored in `localStorage` and toggled via a context provider.

## Tailwind CSS v4 Setup

Source: `src/index.css`

### Dark Mode Variant

```css
@custom-variant dark (&:where(.dark, .dark *));
```

This enables `dark:` utility variants whenever the `.dark` class is present on `<html>`.

### Custom Color Palette

Two palettes are defined via `@theme`:

```css
@theme {
  /* Primary palette (light) */
  --color-primary-50: #f2f9f9;
  --color-primary-100: #ddeff0;
  --color-primary-200: #bfe0e2;
  --color-primary-300: #92cace;
  --color-primary-400: #5faab1;
  --color-primary-500: #438e96;
  --color-primary-600: #3b757f;
  --color-primary-700: #356169;
  --color-primary-800: #325158;
  --color-primary-900: #2d464c;
  --color-primary-950: #1a2c32;

  /* Neutral palette (dark) */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f4f4f5;
  --color-neutral-300: #d4d4d8;
  --color-neutral-400: #a1a1aa;
  --color-neutral-500: #71717a;
  --color-neutral-600: #52525b;
  --color-neutral-700: #3f3f46;
  --color-neutral-800: #27272a;
  --color-neutral-900: #18181b;
  --color-neutral-950: #09090b;

  --color-dark-100: #18181b;
  --color-dark-200: #0e0e11;
}
```

Usage convention: `primary-*` classes for light mode, `dark:neutral-*` for dark mode.

## Reusable UI Components

Instead of custom CSS `@utility` classes, the project extracts shared styles into React components in `src/shared/components/`. Each component uses Tailwind classes inline and exposes variants via props.

| Component | File | Variants |
| --------- | ---- | -------- |
| `Button` | `Button.tsx` | `primary`, `add`, `cancel`, `danger` |
| `Input` | `Input.tsx` | `standard`, `title`, `auth`, `modal`, `form` |
| `TextArea` | `Input.tsx` | `standard`, `modal`, `form` |
| `ModalContent` | `ModalContent.tsx` | — |
| `PageTitle` | `PageTitle.tsx` | — |
| `Card` | `Card.tsx` | — |

All components accept a `className` prop for case-specific overrides and spread native HTML attributes.

### Example Usage

```tsx
<Button variant="cancel" onClick={onClose}>Cancel</Button>
<Input variant="auth" type="email" placeholder="Your Email" />
<ModalContent className="max-h-full">...</ModalContent>
<PageTitle>Dashboard</PageTitle>
<Card className="p-6 max-w-md">...</Card>
```

## Theme Context

Source: `src/app/contexts/theme.context.tsx`

The `ThemeProviderWrapper` manages dark mode state:

- Reads initial theme from `localStorage.getItem("theme")`
- Toggles by adding/removing the `.dark` class on `document.documentElement`
- Persists preference to `localStorage`
- Exposes `darkMode` (boolean) and `toggleThemeHandler` via `useThemeContext()`

## Theme Toggle Button

Source: `src/shared/components/ThemeToggleButton.tsx`

Renders a sun/moon icon (`Brightness7Icon` / `DarkModeIcon` from MUI) that calls `toggleThemeHandler` on click.
