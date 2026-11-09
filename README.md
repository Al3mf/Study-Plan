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

Opcionalmente el archivo puede incluir `"progreso": { "CAL1": "aprobada" }` para
precargar estados. El último plan cargado se recuerda; el plan de ejemplo vive en
`planes/ejemplo.js`.

## Archivos

- `index.html` – estructura de la página.
- `styles.css` – estilos (claro/oscuro, responsive).
- `app.js` – lógica: validación del plan, layout del grafo, estados, pan/zoom, guardado.
- `planes/ejemplo.js` – plan de ejemplo (Ingeniería en Sistemas, 8 semestres).
