import '@testing-library/jest-dom/vitest';
import { setProjectAnnotations } from '@storybook/react-vite';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

import * as preview from './preview';

const annotations = setProjectAnnotations([preview]);

beforeAll(annotations.beforeAll);

afterEach(() => cleanup());
