#!/usr/bin/env python3
"""Genera planes/catalogo.js a partir de los planes en planes/*.json.

La página no puede leer archivos JSON cuando se abre directamente desde el
disco (file://), así que todos los planes se empaquetan en un solo .js que
define window.CARRERAS. Ejecuta este script cada vez que edites o agregues
un plan:

    python3 herramientas/generar_catalogo.py
"""
import json
import pathlib
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PLANES = RAIZ / "planes"
CAMPOS = ("id", "carrera", "nombre", "materias")

def main():
    carreras = []
    for archivo in sorted(PLANES.glob("*.json")):
        plan = json.loads(archivo.read_text(encoding="utf-8"))
        faltan = [c for c in CAMPOS if not plan.get(c)]
        if faltan:
            sys.exit(f"{archivo.name}: faltan los campos {', '.join(faltan)}")
        carreras.append(plan)
    ids = [p["id"] for p in carreras]
    if len(ids) != len(set(ids)):
        sys.exit("Hay planes con el mismo \"id\".")
    carreras.sort(key=lambda p: p["carrera"])
    salida = PLANES / "catalogo.js"
    salida.write_text(
        "// Generado por herramientas/generar_catalogo.py a partir de planes/*.json. No editar a mano.\n"
        "window.CARRERAS = " + json.dumps(carreras, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"{salida.relative_to(RAIZ)}: {len(carreras)} carrera(s): {', '.join(ids)}")

if __name__ == "__main__":
    main()
