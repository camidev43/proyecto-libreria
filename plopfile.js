export default function (plop) {
  plop.setGenerator('component', {
    description: 'Generar un nuevo componente UI Enterprise Grade',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nombre del componente (PascalCase, ej: TarjetaPerfil):',
      },
    ],
    actions: [
      // 1. Componente (.tsx) - PLANTILLA CREATE COMPONENT
      {
        type: 'add',
        path: 'src/lib/{{name}}/{{name}}.tsx',
        template: `import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './{{name}}.module.css';
import type { {{name}}Props } from './types';

const {{name}} = forwardRef<HTMLDivElement, {{name}}Props>((props, ref) => {
  const {
    children,
    className,
    variant = 'default',
    title,
    ...rest
  } = props;

  const rootClasses = clsx(
    styles.root,
    styles[variant],
    className,
  );

  return (
    <div ref={ref} className={rootClasses} {...rest}>
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
});

{{name}}.displayName = '{{name}}';

export { {{name}} };
`,
      },

      // 2. Tipos (types.ts)
      {
        type: 'add',
        path: 'src/lib/{{name}}/types.ts',
        template: `import type { HTMLAttributes, ReactNode } from 'react';

export type {{name}}Variant = 'default' | 'outlined' | 'elevated';

export type {{name}}Props = {
  /** Contenido principal de la tarjeta */
  children?: ReactNode;
  /** Título opcional de la cabecera */
  title?: string;
  /** Estilo visual */
  variant?: {{name}}Variant;
} & HTMLAttributes<HTMLDivElement>;
`,
      },

      // 3. Estilos (CSS Module) - Estilos de Tarjeta Real
      {
        type: 'add',
        path: 'src/lib/{{name}}/{{name}}.module.css',
        template: `.root {
  background-color: white;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

/* Variantes */
.default {
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.outlined {
  background-color: transparent;
  border: 2px solid #e5e7eb;
}

.elevated {
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Partes internas */
.header {
  border-bottom: 1px solid #f3f4f6;
  font-weight: 600;
  padding: 16px;
}

.body {
  color: #374151;
  padding: 16px;
}
`,
      },

      {
        type: 'add',
        path: 'src/lib/{{name}}/{{name}}.stories.tsx',
        template: `import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { {{name}} } from './{{name}}';

const meta: Meta<typeof {{name}}> = {
  title: 'Componentes/{{name}}', // 👈 AQUÍ CAMBIAMOS LA CATEGORÍA
  component: {{name}},
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof {{name}}>;

export const Default: Story = {
  args: {
    title: 'Título de la Tarjeta',
    children: 'Este es un contenido de ejemplo dentro de la tarjeta por defecto.',
    variant: 'default',
  },
};

export const Elevated: Story = {
  args: {
    title: 'Tarjeta Elevada',
    children: 'Esta tarjeta tiene una sombra más pronunciada para destacar.',
    variant: 'elevated',
  },
};

export const Interaction: Story = {
  args: {
    title: 'Test Interacción',
    children: 'Texto verificable por test.',
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByText('Texto verificable por test.');
    await expect(element).toBeInTheDocument();
  },
};
`,
      },

      // 5. Test Unitario (.test.tsx)
      {
        type: 'add',
        path: 'src/lib/{{name}}/{{name}}.test.tsx',
        template: `import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as stories from './{{name}}.stories';

const { Default } = composeStories(stories);

describe('{{name}}', () => {
  it('renders title correctly', () => {
    render(<Default />);
    expect(screen.getByText('Título de la Tarjeta')).toBeInTheDocument();
  });
});
`,
      },

      // 6. Index local
      {
        type: 'add',
        path: 'src/lib/{{name}}/index.ts',
        template: `export * from './{{name}}';
export * from './types';
`,
      },

      // 7. Index global (Append)
      {
        type: 'append',
        path: 'src/lib/index.ts',
        pattern: /$/,
        template: `export * from './{{name}}';`,
      },
    ],
  });
}
