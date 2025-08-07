# React Library Template - Copilot Instructions

## Project Overview
This is a React component library template built with Vite, TypeScript, and Storybook. It's designed for building reusable UI components with comprehensive tooling for development, testing, and documentation.

## Key Architecture Patterns

### Component Structure
Each component follows a consistent pattern in `src/lib/[ComponentName]/`:
```
ComponentName/
├── ComponentName.tsx          # Main component with forwardRef pattern
├── ComponentName.module.css   # CSS Modules for styling
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.mdx         # Component documentation
├── useLogic.ts              # Custom hook for component logic
├── useLogic.spec.ts         # Hook unit tests
└── index.ts                 # Barrel export
```

### Component Generation
Use `pnpm generate:component` to scaffold new components. This uses the `generate-react-cli` with custom templates in `templates/Component/`.

### Testing Strategy
- **Hook Logic**: Test custom hooks in isolation using `@testing-library/react` renderHook
- **Component Tests**: Optional component tests using React Testing Library
- **Snapshots**: Used for hook return values to catch unexpected changes
- Test files follow pattern: `*.spec.ts` for hooks, `*.spec.tsx` for components

### Styling Conventions
- **CSS Modules**: All styles use CSS Modules with camelCase conversion
- **PostCSS**: Uses `postcss-preset-env` for modern CSS features
- **Class naming**: Use descriptive camelCase names that match the component structure

## Development Workflows

### Building & Running
- `pnpm dev` - Development server for testing components
- `pnpm start:docs` - Start Storybook on port 6006
- `pnpm build` - Build library for distribution
- `pnpm test` - Run Jest tests

### Code Quality
- **Linting**: ESLint with TypeScript, React, and Prettier rules
- **Styling**: Stylelint for CSS validation
- **Pre-commit**: Husky runs lint-staged for automated checks
- **Scripts**: Use `pnpm fix:code` and `pnpm fix:style` for auto-fixing

### Library Distribution
- **Entry point**: `src/lib/index.ts` - only export public components here
- **Build output**: UMD and ES modules with TypeScript declarations
- **Tree shaking**: Optimized for modern bundlers
- **Peer deps**: React >= 18.2.0

## Critical Integration Points

### Storybook Integration
- Stories automatically discovered from `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- MDX documentation files provide rich component docs
- Storybook build deployed via GitHub Actions to GitHub Pages

### Vite Configuration
- Uses `alias-hq` for consistent path aliases across tools
- External dependencies handled by `@yelo/rollup-node-external`
- CSS Modules with camelCase locals convention
- DTS plugin generates TypeScript declarations

### TypeScript Setup
- Separate configs: `tsconfig.json` (build), `tsconfig.linter.json` (linting)
- Strict mode enabled with comprehensive type checking
- React 19 types with modern JSX transform

## Component Design Patterns

### forwardRef Pattern
All interactive components use `forwardRef` for ref forwarding:
```tsx
const Component = forwardRef<HTMLElement, Props>((props, ref) => {
  // Implementation
});
```

### Logic Separation
Business logic extracted to custom hooks (`useLogic.ts`) for:
- Better testability
- Separation of concerns
- Reusability across components

### Props Interface
Define comprehensive TypeScript interfaces with:
- Optional props with sensible defaults
- Union types for variants/sizes
- Extension of HTML element attributes where appropriate

## Dependencies & Tools
- **Runtime**: clsx for conditional classes, @uidotdev/usehooks for utilities, lodash for helpers
- **Build**: Vite + Rollup for bundling, vite-plugin-dts for types
- **Testing**: Jest + @testing-library/react in jsdom environment
- **Docs**: Storybook with MDX support and react-docgen-typescript

When adding new components, always follow the established patterns and use the component generator for consistency.
