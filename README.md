# DevDecision AI

Simulación académica de un sistema de apoyo a decisiones para equipos de desarrollo de software.

## Descripción

DevDecision AI es una landing page interactiva que muestra cómo un sistema basado en reglas
de scoring —inspirado en cómo funcionaría un sistema inteligente de priorización— puede ayudar
a un equipo de desarrollo a decidir qué bug, incidente o solicitud atender primero.

El usuario ingresa los datos de una situación real o hipotética y el sistema calcula una
prioridad, un score de 0 a 100 y una recomendación explicada, a partir de los factores que
más pesaron en el resultado.

## Problema

Los equipos de software reciben simultáneamente bugs, incidentes de infraestructura, nuevas
funcionalidades y mejoras. Decidir el orden de atención solo por intuición suele producir
retrasos, incidentes en producción sin resolver a tiempo, mala asignación de recursos y
prioridades inconsistentes entre distintas personas del equipo.

## Solución

Un formulario recoge siete variables de la situación (tipo de solicitud, severidad, impacto,
usuarios afectados, urgencia, tiempo estimado de solución y dependencias). Un motor de análisis
separado (`src/utils/decisionEngine.ts`) convierte cada variable en un valor numérico, calcula
un score ponderado y traduce ese score en una prioridad y una recomendación en lenguaje natural
que cambia según los datos ingresados.

**Importante:** no hay un modelo de machine learning entrenado ni una API de IA externa. Es una
simulación transparente construida con lógica de scoring y reglas de decisión, pensada para
demostrar el concepto de apoyo a la decisión basado en datos, no para reemplazar un sistema de
IA real.

## Tecnologías

- React 18 + TypeScript
- Vite
- CSS moderno con variables (sin frameworks de UI)
- lucide-react (iconografía)

Sin backend, sin base de datos, sin llamadas a APIs externas: la aplicación corre por completo
en el navegador.

## Funcionamiento

1. El usuario completa el formulario en la sección **Simulador** (o carga uno de los dos
   ejemplos predefinidos: un incidente crítico y una mejora de baja prioridad).
2. Al enviar, se valida la información (usuarios ≥ 0, tiempo estimado > 0, descripción con
   contenido mínimo).
3. El motor de análisis calcula el score y genera la recomendación.
4. La página hace scroll automático hacia el resultado, que muestra el score, la prioridad,
   la recomendación, los factores determinantes (con su peso) y una explicación textual.

## Algoritmo de decisión

El score final es una suma ponderada de seis factores, cada uno normalizado de 0 a 100:

| Factor              | Peso | Fuente                                                        |
| ------------------- | ---- | --------------------------------------------------------------- |
| Severidad           | 25%  | Selección directa (baja/media/alta/crítica)                     |
| Impacto             | 25%  | Selección directa (bajo/medio/alto/crítico)                     |
| Usuarios afectados  | 20%  | Escala por umbrales (0, ≤10, ≤50, ≤200, ≤1000, >1000)           |
| Urgencia            | 15%  | Selección directa (puede esperar/normal/urgente/inmediata)      |
| Dependencias        | 10%  | Selección directa (ninguna/baja/media/alta)                     |
| Tiempo estimado     | 5%   | Escala inversa: resolver rápido puntúa más alto (quick win)     |

```
score = Σ (valor_factor × peso_factor)
```

El score se traduce en prioridad con umbrales fijos:

- 0–30 → Prioridad baja
- 31–55 → Prioridad media
- 56–75 → Prioridad alta
- 76–100 → Prioridad crítica

La lógica es completamente determinística: los mismos datos de entrada siempre producen el
mismo resultado, y cambiar cualquier variable cambia el score y la recomendación de forma
consistente con el peso de esa variable.

## Limitaciones

- Es una simulación académica; no reemplaza un sistema de priorización real.
- La calidad del resultado depende de la calidad de los datos ingresados por el usuario.
- Los pesos de cada factor son fijos y justificados conceptualmente, no calibrados con datos
  históricos reales.
- Un sistema de IA real requeriría validación continua y datos históricos de incidentes.
- La herramienta está diseñada para apoyar el criterio profesional, no para sustituirlo.

## Ejecución local

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

Para generar la build de producción:

```bash
npm run build
npm run preview
```

## Deploy

### GitHub Pages

El repositorio incluye un workflow (`.github/workflows/deploy.yml`) que compila y publica
automáticamente en GitHub Pages en cada push a `main`:

1. Sube este proyecto a un repositorio de GitHub.
2. En **Settings → Pages**, selecciona la fuente **GitHub Actions**.
3. Haz push a `main`; el workflow construye el proyecto y lo publica.

`vite.config.ts` usa `base: './'` (ruta relativa), por lo que funciona tanto en la raíz de un
dominio como en un subdirectorio (`usuario.github.io/repositorio/`) sin necesitar ajustes
adicionales.

### Netlify

El repositorio incluye `netlify.toml` con la configuración de build (`npm run build`,
carpeta `dist`). Basta con conectar el repositorio en Netlify y desplegar; no se requiere
configuración manual.

## Estructura del proyecto

```
src/
  components/     Componentes de UI (Navbar, Hero, DecisionForm, AnalysisResult, ...)
  data/           Casos de ejemplo para el botón "Cargar ejemplo"
  types/          Tipos TypeScript del dominio (IncidentInput, AnalysisResult, ...)
  utils/          Motor de análisis (decisionEngine.ts) y validación
  App.tsx         Composición de secciones
  main.tsx        Punto de entrada de React
  index.css       Design tokens y estilos globales
```
