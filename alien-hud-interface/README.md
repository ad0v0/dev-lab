# Alien HUD Interface

Minimal Vite + React + TypeScript lab for industrial, retro-futuristic CSS and
SVG storytelling studies.

## Scope

This folder is self-contained and intended for:
- `lab`: motion, texture, and interface experiments
- `design-system`: visual language, tokens, and primitives
- `scene`: a single cinematic interface composition

## Stack

- Vite
- React
- TypeScript
- npm
- Plain CSS

## Structure

```text
src/
  content/
  modules/
  primitives/
  scene/
  styles/
  svg/
  utils/
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run typecheck`

## Manual next steps

```bash
nvm use
npm install
npm run dev
```

After dependencies are installed, you can also run:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Notes

- Dependencies are intentionally local to this folder.
- No Tailwind, Storybook, backend, or cross-project tooling has been added.
- The project is organized as a showcase lab, not a production app shell.
- Modes are internal presentation states, not pages or routes.
