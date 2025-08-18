# PC Soluciones – React Library Lab

[![CI](https://github.com/<camidev43>/<proyecto-libreria>/actions/workflows/merge-jobs.yml/badge.svg)](https://github.com/<camidev43>/<proyecto-libreria>/actions/workflows/merge-jobs.yml)
[![Storybook deploy](https://github.com/<camidev43>/<proyecto-libreria>/actions/workflows/pages.yml/badge.svg)](https://github.com/<camidev43>/<proyecto-libreria>/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](#licencia)

> Laboratorio para crear y validar una **librería de componentes React** de PC Soluciones en epidemiología y salud ocupacional.
> Este proyecto sirve como **introducción** para testear funcionalidades, procesos de build/release, documentación y calidad, mientras aprendemos y definimos estándares.

---

## Demo & Docs

- **Storybook (docs y ejemplos):**
  https://<camidev43>.github.io/<proyecto-libreria>/

---

## Características

- ⚡ **Vite** + **pnpm** → desarrollo y builds rápidos.
- 🧩 **TypeScript** + **React 18/19** → DX moderna.
- 🧪 **Vitest** + **Testing Library** → tests unitarios y de componentes.
- 🎨 **CSS Modules** (y opción de Tailwind si se requiere más adelante).
- 📚 **Storybook** → documentación interactiva de componentes.
- ✅ **ESLint** + **Stylelint** + **Prettier** → estilo consistente y chequeos automáticos.
- 🧰 **Husky + lint-staged** → calidad antes de cada commit.
- 🚀 **GitHub Actions** → CI (lint, tipos, tests) y deploy de Storybook (Pages).

---

## Objetivos del laboratorio

1. Definir **estándares** de código, estilos y testing para la futura librería de la empresa.
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
