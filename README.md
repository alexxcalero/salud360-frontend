# Salud 360 - Proyecto del curso de Ingeniería de Software

Repositorio del proyecto desarrollado a lo largo del curso de Ingeniería de Software de la Pontificia Universidad Católica del Perú durante el ciclo 2025-1.

> Leer la CONTRIBUTING.md

## Testing

Siempre verificar que se encuentra en la carpeta de `Frontend/Salud360`

```bash
cd Frontend/Salud360
```

Luego, asegurarse que tenga instalado correctamente tood

```bash
npm i --legacy-peer-deps
```

Instalar chromium
```bash
npx playwright install
```

Y por último, playwright evalúa sobre la aplicación en funcionamiento, así que debes ejecutarlo antes de los tests

```bash
npm run dev
```

Ahora si se pueden realizar tests

### Comandos para testear

- Evaluar todo: Salida por consola. Evalúa todo, y si hay error en alguno, cancela toda la ejecución
  ```bash
  npx playwright test
  ```
- Evaluar un archivo:
  ```bash
  npx playwright test tests/todo-page.spec.ts
  ```
- Evaluar por UI: Redirige a un navegador chromium. Permite testear individualmente o todo. Además cada vez que se puede mantener encendido mientras se editan los archivos
  ```bash
  npx playwright test --ui
  ```
- Obtener reportes: Obtiene toda la información resumida del último test
  ```bash
  npx playwright show-report
  ```
- Obtener screenshot:
  ```bash
  npx playwright screenshot [url] [path del archivo a crear]
  ```
- Grabar macros:
  ```bash
  npx playwright codegen [url]
  ```

> Más información en: https://playwright.dev/docs/test-cli
