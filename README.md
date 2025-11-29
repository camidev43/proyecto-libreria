# PC Soluciones – React Library Lab

[![CI]()]()
[![Storybook deploy]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](#licencia)

> Repositorio para crear y validar una **librería de componentes React** de PC Soluciones en epidemiología y salud ocupacional.
> Este proyecto sirve para testear funcionalidades, procesos de build/release, documentación y calidad, mientras se prueba y define estándares.

---

## Demo & Docs

- **Storybook (docs y ejemplos):**
  https://<>.github.io/<>/

---

## Características

- ⚡ **Vite** + **pnpm** → desarrollo y builds rápidos.
- 🧩 **TypeScript** + **React 18/19** → DX moderna.
- 🧪 **Vitest** + **Testing Library** → tests unitarios y de componentes.
- 🎨 **CSS Modules**.
- 📚 **Storybook** → documentación interactiva de componentes.
- ✅ **ESLint** + **Stylelint** + **Prettier** → estilo consistente y chequeos automáticos.
- 🧰 **Husky + lint-staged** → calidad antes de cada commit.
- 🚀 **GitHub Actions** → CI (lint, tipos, tests) y deploy de Storybook (Pages).

---

## Objetivos de korekit-ui

1. Definir **estándares** de código, estilos y testing para la librería de PC.
2. Probar el **ciclo de vida completo**: scaffold → dev → test → docs → build → publish.
3. Medir y ajustar **ergonomía DX** (scripts, tareas de VS Code, hooks, etc).
4. Asegurar **tree-shaking** y empaquetado correcto para consumidores (apps web, microfronts, etc).

---

## Requisitos

- **Node 20+**
- **pnpm** (actívalo con `corepack prepare pnpm@latest --activate` si hace falta)

---

## Instalación

```bash
pnpm install
```
