# Guía para contribución

## Front-end

1. Instala node.js versión (...) y npm versión (...)
2. Instala las dependencias
   ```bash
   npm install
   ```
3. Ejecutar
   ```bash
   npm run dev
   ```

# Storybook

Sirve para ver los componentes, testearlos individualmente o ver documentación sobre ellos

```bash
npm run storybook
```

# Estilos (Front-end)

Para una chequeada corta vean el archivo index.css. Es el archivo principal para declarar estilos CSS con tailwind y PostCSS

- Colores:
  - brand-primary: Es el color azul principal de la web
- Tipografía:
  - text-display-large -> text-label-small: Tamaños según figma
  - font-inter,roboto-condensed,roboto,lalezar: Tipos de letras que usamos en Figma
  - use-display-large -> use-label-small: Clases con los estilos aplicados para las letras
