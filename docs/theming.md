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

The `blue-chill-*` palette is defined via `@theme`:

```css
@theme {
  --color-blue-chill-50: #f2f9f9;
  --color-blue-chill-100: #ddeff0;
  --color-blue-chill-200: #bfe0e2;
  --color-blue-chill-300: #92cace;
  --color-blue-chill-400: #5faab1;
  --color-blue-chill-500: #438e96;
  --color-blue-chill-600: #3b757f;
  --color-blue-chill-700: #356169;
  --color-blue-chill-800: #325158;
  --color-blue-chill-900: #2d464c;
  --color-blue-chill-950: #1a2c32;

  --color-dark-100: #18181b;
  --color-dark-200: #0e0e11;
}
```

## Custom Utilities

Reusable utility classes defined with `@utility` in `src/index.css`:

| Utility | Purpose |
| ------- | ------- |
| `bg__color` | Page/panel background: `bg-blue-chill-600` / `dark:bg-zinc-950` |
| `bg__color-hover` | Hover background for interactive elements |
| `bg__gradient` | Gradient background for cards |
| `btn__primary` | Primary button style |
| `btn__add` | Add/create button style |
| `btn__cancel` | Cancel/destructive button with red hover |
| `input__standard` | Text input with focus states |
| `input__primary` | Large heading-style input |
| `title__primary` | Page title style |
| `edit__title` | Inline-editable title style |
| `card__primary` | Card with gradient background |
| `modal__form` | Form container inside modals |

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
