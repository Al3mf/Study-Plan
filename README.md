# Study-Plan · Degree Progress Tracker

A web app that turns a university study plan into an **interactive node graph** so you
can track your progress through your degree.

**Live demo:** <https://al3mf.github.io/Study-Plan/>

- Each **course** is a node, laid out in columns by **semester**.
- **Arrows** show prerequisites.
- **Click** a course to open a status picker and choose: pending, in progress, passed,
  failed (*reprobada*), retaking (*recursando*) or last chance (*materia única*). The
  failed statuses use increasingly intense reds. If you are missing prerequisites, the
  picker tells you which ones.
- **Hover** over a course to highlight its whole chain: what you need before it and
  what it unlocks afterwards.
- The side panel shows your **% progress** (by credits), how many courses are passed,
  in progress, available, locked and failed, the progress of each semester, and the
  **classifications** (CACEI and faculty department) with credits per classification;
  click one to highlight its courses.
- The **Reglas** and **Cómo usar** menus in the header show the plan rules and a quick
  guide. Click the **title** to rename it (saved in the browser).
- Progress is **saved automatically** in the browser (localStorage). You can also
  export/import it as JSON to back it up or move it to another device.
- Course search, mouse-wheel zoom, drag to pan, and automatic dark mode.

> The user interface is in Spanish, and so are the field names of the plan format.

It comes preloaded with the **Ingeniería en Sistemas Inteligentes — UASLP (August 2024)**
plan (`planes/isi-uaslp-2024.json`): 79 courses, including the 4 emphasis areas (which
can be hidden with the «Áreas de énfasis» toggle), the credit-based rules (e.g. 200
Núcleo Básico credits for Administración de Proyectos I and the electives) and the
graduation goals (405 credits, 313 mandatory, 64 elective). The prerequisites were
taken from the lines on the PDF curriculum map; if any of them does not match what
your faculty requires, fix it in the JSON and regenerate the `.js` file (see below).

## Usage

No installation or server required: open `index.html` in your browser.

If you prefer to serve it:

```bash
python3 -m http.server 8000
```

then go to <http://localhost:8000>.

## Loading your own plan

Create a `.json` file with this format and load it with the **Cargar plan** button:

```json
{
  "nombre": "Licenciatura en Matemáticas",
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

Optional plan-level fields:

- `creditosParaEgresar`: credit target used for the % progress (defaults to the sum of all courses).
- `grupos`: readable group names, e.g. `{ "nucleo": "Núcleo Básico" }`.
- `clasificaciones`: name and badge colors per classification, e.g.
  `{ "IA": { "nombre": "Ingeniería Aplicada", "color": "#e3261b", "texto": "#ffe94d" } }`.
- `departamentos`: name and border style per department, e.g.
  `{ "ingles": { "nombre": "Depto. Universitario de Inglés", "estilo": "redondeado" } }`
  (`estilo` can be `grueso`, `delgado`, `doble` or `redondeado`).
- `metas`: extra progress bars, e.g.
  `{ "nombre": "Electivas", "creditos": 64, "tipo": "electivas" }`
  (`tipo` can be `obligatorias`, `optativas` or `electivas`; or use `"grupo": "..."`).
- `notas`: list of plan rules shown in the side panel.

The file may also include `"progreso": { "CAL1": "aprobada" }` to preload statuses
(`cursando` = in progress, `aprobada` = passed, `reprobada` = failed,
`recursando` = retaking, `unica` = last chance). The last loaded plan is remembered.

The default plan lives in `planes/isi-uaslp-2024.json`. Since browsers do not allow
reading local JSON files when `index.html` is opened directly, the page loads the copy
`planes/isi-uaslp-2024.js`. If you edit the JSON, regenerate that copy:

```bash
(echo "// Generado a partir de planes/isi-uaslp-2024.json"; printf "window.PLAN_PREDETERMINADO = "; cat planes/isi-uaslp-2024.json | sed '$ s/$/;/') > planes/isi-uaslp-2024.js
```

## Files

- `index.html` – page structure.
- `styles.css` – styles (light/dark, responsive).
- `app.js` – logic: plan validation, graph layout, statuses, pan/zoom, persistence.
- `planes/isi-uaslp-2024.json` – Ingeniería en Sistemas Inteligentes (UASLP) plan.
- `planes/isi-uaslp-2024.js` – the same data, loaded by `index.html`.

## License

This project is licensed under the [MIT License](LICENSE).
