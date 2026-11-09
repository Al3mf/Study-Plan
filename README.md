# Study-Plan · Tracker del plan de estudios

Aplicación web que convierte tu plan de estudios en un **diagrama de nodos interactivo**
para seguir tu avance en la carrera.

- Cada **materia** es un nodo, organizado en columnas por **semestre**.
- Las **flechas** muestran los prerrequisitos.
- **Clic** en una materia: pendiente → cursando → aprobada. Si te faltan prerrequisitos,
  la app te avisa cuáles son. (Desde el panel lateral puedes forzar cualquier estado.)
- **Pasa el cursor** sobre una materia para resaltar toda su cadena: lo que necesitas
  antes y lo que desbloquea después.
- El panel muestra tu **% de avance** (por créditos), materias aprobadas, cursando,
  disponibles y bloqueadas, y el avance por semestre.
- El progreso se **guarda automáticamente** en el navegador (localStorage). También
  puedes exportarlo/importarlo como JSON para respaldarlo o pasarlo a otro equipo.
- Búsqueda de materias, zoom con la rueda, arrastrar para moverte, modo oscuro automático.

Viene cargado con el plan de **Ingeniería en Sistemas Inteligentes — UASLP (Agosto 2024)**
(`planes/isi-uaslp-2024.json`): 79 materias, incluidas las 4 áreas de énfasis
(se pueden ocultar con el interruptor «Áreas de énfasis»), las reglas por créditos
(p. ej. 200 créditos del Núcleo Básico para Administración de Proyectos I y las
electivas) y las metas de egreso (405 créditos, 313 obligatorios, 64 de electivas).
Los prerrequisitos se tomaron de las líneas del mapa curricular en PDF; si alguno no
coincide con lo que marca tu facultad, corrígelo en el JSON y regenera el `.js`
(ver abajo).

## Uso

No necesita instalación ni servidor: abre `index.html` en el navegador.

Si prefieres servirlo:

```bash
python3 -m http.server 8000
```

y entra a <http://localhost:8000>.

## Cargar tu propio plan

Crea un archivo `.json` con este formato y cárgalo con el botón **Cargar plan**:

```json
{
  "nombre": "Licenciatura en Matemáticas",
  "materias": [
    { "id": "CAL1", "nombre": "Cálculo I",  "semestre": 1, "creditos": 8, "prerrequisitos": [] },
    { "id": "CAL2", "nombre": "Cálculo II", "semestre": 2, "creditos": 8, "prerrequisitos": ["CAL1"] }
  ]
}
```

| Campo            | Obligatorio | Descripción                                             |
|------------------|-------------|---------------------------------------------------------|
| `id`             | sí          | Clave única de la materia.                              |
| `nombre`         | sí          | Nombre que se muestra en el nodo.                       |
| `semestre`       | sí          | Número de semestre (1, 2, 3…). Define la columna.       |
| `creditos`       | no          | Si ningún curso tiene créditos, el % se calcula por materias. |
| `prerrequisitos` | no          | Lista de `id` que hay que aprobar antes.                |
| `optativa`       | no          | `true` para materias optativas (se marcan con `*`).     |
| `electiva`       | no          | `true` para electivas (cuentan en la meta de tipo `electivas`). |
| `clasificacion`  | no          | Texto corto que se muestra en el nodo (p. ej. `CB`, `IA`). |
| `grupo`          | no          | Grupo al que pertenece (p. ej. `nucleo`).               |
| `creditosMinimos`| no          | Créditos aprobados (en total) necesarios para cursarla. |
| `creditosMinimosGrupo` | no    | `{ "grupo": "nucleo", "creditos": 200 }`: créditos de un grupo. |
| `grupoCompleto`  | no          | Exige todas las obligatorias del grupo indicado.        |
| `nota`           | no          | Texto libre que aparece en el panel de detalle.         |

`semestre` también puede ser un texto (por ejemplo `"Énfasis: Ciberseguridad"`):
esas materias se dibujan en columnas aparte, a la derecha de los semestres.

Campos opcionales del plan:

- `creditosParaEgresar`: meta de créditos para el % de avance (si no está, se usa la suma de todas las materias).
- `grupos`: nombres legibles de los grupos, p. ej. `{ "nucleo": "Núcleo Básico" }`.
- `metas`: barras de avance extra, p. ej.
  `{ "nombre": "Electivas", "creditos": 64, "tipo": "electivas" }`
  (`tipo` puede ser `obligatorias`, `optativas` o `electivas`; o usa `"grupo": "..."`).
- `notas`: lista de reglas del plan que se muestran en el panel.

Opcionalmente el archivo puede incluir `"progreso": { "CAL1": "aprobada" }` para
precargar estados. El último plan cargado se recuerda.

El plan predeterminado está en `planes/isi-uaslp-2024.json`. Como los navegadores no
dejan leer archivos JSON locales al abrir `index.html` directamente, la página usa la
copia `planes/isi-uaslp-2024.js`. Si editas el JSON, regenera esa copia:

```bash
(echo "// Generado a partir de planes/isi-uaslp-2024.json"; printf "window.PLAN_PREDETERMINADO = "; cat planes/isi-uaslp-2024.json | sed '$ s/$/;/') > planes/isi-uaslp-2024.js
```

## Archivos

- `index.html` – estructura de la página.
- `styles.css` – estilos (claro/oscuro, responsive).
- `app.js` – lógica: validación del plan, layout del grafo, estados, pan/zoom, guardado.
- `planes/isi-uaslp-2024.json` – plan de Ingeniería en Sistemas Inteligentes (UASLP).
- `planes/isi-uaslp-2024.js` – la misma información, cargada por `index.html`.
