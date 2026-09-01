````md
# Configurable Form Builder

A simple React + TypeScript form builder built as a coding assessment.

## Features

- Add text, number, and group fields
- Edit labels and required state
- Configure min/max for number fields
- Nest groups recursively
- Delete and reorder fields
- Live form preview with validation
- Import/export form configuration as JSON
- No form or state management libraries

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- ESLint + Prettier

## Run Locally

```bash
pnpm install
pnpm dev
````

## Build

```bash
pnpm build
```

## Notes

The form configuration is stored as a recursive data structure, where groups contain their child fields. The same configuration is used by both the builder and the live preview.

