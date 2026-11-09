# Study-Plan · Degree Progress Tracker

A web app that turns a university study plan into an **interactive node graph** so you
can track your progress through your degree.

**Live demo:** <https://al3mf.github.io/Study-Plan/>

- Each **course** is a node, laid out in columns by **semester**.
- **Arrows** show prerequisites.
- **Register semesters** (see below): the diagram is read-only and only changes when you
  save a semester with the courses you actually took and their result: in progress,
  passed, failed (*reprobada*), retaking (*recursando*) or last chance (*materia única*).
  The failed statuses use increasingly intense reds.
- **Click** a course to see its status and its history by semester.
- **Hover** over a course to highlight its whole chain: what you need before it and
  what it unlocks afterwards.
- The side panel shows your **% progress** (by credits), how many courses are passed,
  in progress, available, locked and failed, the progress of each semester, and the
  **classifications** (CACEI and faculty department) with credits per classification;
  click one to highlight its courses.
- The **Reglas** and **Cómo usar** menus in the header show the plan rules and a quick
  guide. Click the **title** to rename it (saved in the browser).
- Progress is **saved automatically** in the browser (localStorage), per session. You
  can also export/import it as JSON to back it up or move it to another device.
- Course search, mouse-wheel zoom, drag to pan, and automatic dark mode.

> The user interface is in Spanish, and so are the field names of the plan format.

## Sessions

Progress is organized in **sessions**. The start menu (also available from the
**Sesiones** button in the header) lists every degree, each with a **Nueva sesión**
button:

- A degree card does nothing until it has at least one session. Once it does, clicking
  it expands a dropdown with its sessions.
- Each session keeps its own progress and title, so you can try different paths for the
  same plan (for example, an "ideal" plan and your real one). Up to **3 sessions per
  plan**.
- From the dropdown you can open, rename or delete a session (deleting asks for
  confirmation). Each row shows its progress, passed courses, credits and last update.
- The open session's name appears next to the title. Export, import and reset act on the
  open session only.

Progress saved by earlier versions (one per degree) is migrated automatically into
«Sesión 1» of that degree.

## Registering semesters

The plan shows *ideal* semesters, but every student enrolls in their own combination of
courses. So progress is recorded **semester by semester**, much like branches in git:

- The diagram works like `main`: it cannot be edited directly.
- **Registrar semestre** opens a semester in edit mode (like a branch). The header shows
  «Editando semestre N»; click each course you took and choose its result. The diagram
  previews the changes, with the semester's courses outlined in blue.
- **Guardar semestre** merges it: the diagram and progress are updated. **Descartar**
  throws the draft away. A draft is kept if you reload the page.
- If a course appears in several semesters, the most recent one wins (e.g. failed in
  semester 1 and passed in semester 2 → passed).
- The **Semestres registrados** panel on the right lists every semester with its courses,
  credits and results. Expand one to see and highlight its courses in the diagram, or
  edit or delete it.

Progress recorded before semesters existed becomes «Semestre 1 · Progreso anterior».
Export/import now include the semesters (older progress files are imported as one
semester).

## Available degrees

| Degree | Plan | Courses | Credits to graduate |
|--------|------|---------|---------------------|
| Ingeniería en Computación — UASLP | June 2024 | 85 (incl. 4 emphasis areas) | 450 (371 mandatory) |
| Ingeniería en Mecatrónica — UASLP | June 2023 | 86 (incl. optional courses by branch) | 450 (413 mandatory) |
| Ingeniería en Sistemas Inteligentes — UASLP | August 2024 | 79 (incl. 4 emphasis areas) | 405 (313 mandatory) |

Each plan includes its credit-based rules (e.g. a share of the Núcleo Básico for the
electives, minimum credits for internships or mobility), its CACEI and faculty
classifications, and its graduation goals. Emphasis areas and optional branches are
drawn in extra columns that can be hidden with the toggle in the header. The
prerequisites were taken from the lines on each PDF curriculum map; if any of them does
not match what your faculty requires, fix it in the JSON (see below).

## Usage

No installation or server required: open `index.html` in your browser.

If you prefer to serve it:

```bash
python3 -m http.server 8000
```

then go to <http://localhost:8000>.

## Adding or editing a degree

Plans live in `planes/*.json`. To add a degree, create a new `.json` file with this
format and regenerate the catalog (see below):

```json
{
  "id": "matematicas-uaslp-2025",
  "carrera": "Licenciatura en Matemáticas",
  "institucion": "UASLP",
  "version": "Enero 2025",
  "nombre": "Licenciatura en Matemáticas — UASLP (Enero 2025)",
  "materias": [
    { "id": "CAL1", "nombre": "Cálculo I",  "semestre": 1, "creditos": 8, "prerrequisitos": [] },
    { "id": "CAL2", "nombre": "Cálculo II", "semestre": 2, "creditos": 8, "prerrequisitos": ["CAL1"] }
  ]
}
```

Fields of each course (`materias`):

| Field                  | Required | Description                                                     |
|------------------------|----------|-----------------------------------------------------------------|
| `id`                   | yes      | Unique course code.                                             |
| `nombre`               | yes      | Name shown on the node.                                         |
| `semestre`             | yes      | Semester number (1, 2, 3…). Defines the column.                 |
| `creditos`             | no       | Credits. If no course has credits, % is computed by course count. |
| `prerrequisitos`       | no       | List of `id`s that must be passed first.                        |
| `optativa`             | no       | `true` for optional courses (marked with `*`).                  |
| `electiva`             | no       | `true` for electives (counted by goals of type `electivas`).    |
| `clasificacion`        | no       | Classification badge shown on the node (e.g. `CB`, `IA`).       |
| `departamento`         | no       | Key of a `departamentos` entry; sets the node's border style.    |
| `grupo`                | no       | Group the course belongs to (e.g. `nucleo`).                    |
| `creditosMinimos`      | no       | Total passed credits required to take the course.               |
| `creditosMinimosGrupo` | no       | `{ "grupo": "nucleo", "creditos": 200 }`: credits required from a group. |
| `grupoCompleto`        | no       | Requires every mandatory course of the given group.             |
| `nota`                 | no       | Free text shown in the detail panel.                            |

`semestre` can also be a string (for example `"Énfasis: Ciberseguridad"`): those
courses are drawn in separate columns to the right of the semesters.

Plan-level fields: `id` (unique, used to remember the chosen degree), `carrera`
(shown on the degree picker) and `nombre` (default title; progress is saved under this
name, so avoid renaming it once people use the plan) are required. Optional:

- `institucion`, `version`: shown on the degree picker.
- `etiquetaExtras`: label of the toggle for the named columns (default «Áreas de énfasis»).
- `creditosParaEgresar`: credit target used for the % progress (defaults to the sum of all courses).
- `grupos`: readable group names, e.g. `{ "nucleo": "Núcleo Básico" }`.
- `clasificaciones`: name and badge colors per classification, e.g.
  `{ "IA": { "nombre": "Ingeniería Aplicada", "color": "#e3261b", "texto": "#ffe94d" } }`.
- `departamentos`: name and border style per department, e.g.
  `{ "ingles": { "nombre": "Depto. Universitario de Inglés", "estilo": "redondeado" } }`
  (`estilo` can be `grueso`, `delgado`, `doble`, `redondeado`, `redondeado-simple` or `punteado`).
- `metas`: extra progress bars, e.g.
  `{ "nombre": "Electivas", "creditos": 64, "tipo": "electivas" }`
  (`tipo` can be `obligatorias`, `optativas`, `electivas` or `noObligatorias`; or use `"grupo": "..."`).
- `notas`: list of plan rules shown in the side panel.

Course statuses saved in progress files are `cursando` (in progress), `aprobada`
(passed), `reprobada` (failed), `recursando` (retaking) and `unica` (last chance).

Since browsers do not allow reading local JSON files when `index.html` is opened
directly, the page loads every plan from the generated `planes/catalogo.js`. After
editing or adding a plan, regenerate it (it also checks required fields and duplicate
ids):

```bash
python3 herramientas/generar_catalogo.py
```

## Files

- `index.html` – page structure.
- `styles.css` – styles (light/dark, responsive).
- `app.js` – logic: plan validation, graph layout, statuses, pan/zoom, persistence.
- `planes/*.json` – one plan per degree (source of truth).
- `planes/catalogo.js` – all plans bundled for the page (generated, do not edit).
- `herramientas/generar_catalogo.py` – regenerates `planes/catalogo.js`.

## License

This project is licensed under the [MIT License](LICENSE).
