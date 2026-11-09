// Generado por herramientas/generar_catalogo.py a partir de planes/*.json. No editar a mano.
window.CARRERAS = [
  {
    "id": "computacion-uaslp-2024",
    "carrera": "Ingeniería en Computación",
    "institucion": "UASLP",
    "version": "Junio 2024",
    "nombre": "Ingeniería en Computación — UASLP (Junio 2024)",
    "creditosParaEgresar": 450,
    "etiquetaExtras": "Áreas de énfasis",
    "clasificaciones": {
      "CB": {
        "nombre": "Ciencias Básicas y Matemáticas",
        "color": "#a99bc9",
        "texto": "#ffffff"
      },
      "CI": {
        "nombre": "Ciencias de la Ingeniería",
        "color": "#2f6fe4",
        "texto": "#ffffff"
      },
      "IA": {
        "nombre": "Ingeniería Aplicada",
        "color": "#e3261b",
        "texto": "#ffe94d"
      },
      "CS": {
        "nombre": "Ciencias Sociales y Humanidades",
        "color": "#f5e400",
        "texto": "#d42020"
      },
      "CE": {
        "nombre": "Ciencias Económico-Administrativas",
        "color": "#f07a1a",
        "texto": "#ffffff"
      },
      "CC": {
        "nombre": "Otros cursos",
        "color": "",
        "texto": ""
      }
    },
    "departamentos": {
      "carrera": {
        "nombre": "Carrera",
        "estilo": "grueso"
      },
      "fisicomat": {
        "nombre": "Depto. Físico Matemáticas",
        "estilo": "delgado"
      },
      "comunes": {
        "nombre": "Comunes",
        "estilo": "doble"
      },
      "ingles": {
        "nombre": "Depto. Universitario de Inglés",
        "estilo": "redondeado"
      }
    },
    "grupos": {
      "nucleo": "Núcleo Básico",
      "iot": "Internet de las Cosas",
      "nube": "Cómputo en la Nube",
      "web": "Desarrollo Web y Multiplataforma",
      "geo": "Sistemas Geoespaciales"
    },
    "metas": [
      {
        "nombre": "Créditos para pasante",
        "creditos": 450
      },
      {
        "nombre": "Materias obligatorias",
        "creditos": 371,
        "tipo": "obligatorias"
      },
      {
        "nombre": "Electivas de área y/u optativas",
        "creditos": 79,
        "tipo": "noObligatorias"
      },
      {
        "nombre": "Servicio Social (habilitado)",
        "creditos": 315
      }
    ],
    "notas": [
      "Administración de Proyectos I, Seminario de Medio Término y las Electivas de Área de Énfasis requieren el 90% del Núcleo Básico (220 créditos).",
      "Cada Área de Énfasis requiere: Internet de las Cosas → Microcontroladores; Cómputo en la Nube → Diseño e Impl. de Redes; Web y Multiplataforma → Interfaces Gráficas; Sistemas Geoespaciales → Interfaces Gráficas.",
      "Computación y Sociedad requiere 390 créditos.",
      "Proyectos Computacionales I requiere el 100% de las obligatorias del Núcleo Básico y Administración de Proyectos I.",
      "Interfaces Digitales de Comunicación requiere el 90% del Núcleo Básico, Microcontroladores y Procesamiento de Señales.",
      "Fundamentos de Software de Sistemas requiere 340 créditos.",
      "Actividades de Aprendizaje I–V (180 cr), Movilidad I–V (225 cr) y Prácticas Profesionales COMP (315 cr, 240 horas) son optativas.",
      "Para ser pasante se requieren 450 créditos: todas las obligatorias (371) y 79 de electivas de área y/u optativas (*).",
      "El Servicio Social se puede realizar al tener 315 créditos (70%)."
    ],
    "materias": [
      {
        "id": "0071",
        "nombre": "Química A",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "2151",
        "nombre": "Matemáticas Discretas I",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2229",
        "nombre": "Pensamiento Algorítmico",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2150",
        "nombre": "Temas Selectos de Matemáticas",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2805",
        "nombre": "Herramientas de Software",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "1005",
        "nombre": "Metodología de la Investigación",
        "semestre": 1,
        "creditos": 4,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "comunes"
      },
      {
        "id": "2002",
        "nombre": "Seminario de Orientación en Computación",
        "semestre": 1,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "carrera"
      },
      {
        "id": "0051",
        "nombre": "Cálculo A",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "2152",
        "nombre": "Matemáticas Discretas II",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "2151"
        ],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2231",
        "nombre": "Estructuras de Datos I",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "2229"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "0042",
        "nombre": "Álgebra B",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "2150"
        ],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "2978",
        "nombre": "Fundamentos de Circuitos Eléctricos",
        "semestre": 2,
        "creditos": 10,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "1936",
        "nombre": "Inglés 1",
        "semestre": 2,
        "creditos": 5,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "0052",
        "nombre": "Cálculo B",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [
          "0051"
        ],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "2304",
        "nombre": "Ingeniería de Software",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [
          "2231"
        ],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2232",
        "nombre": "Estructuras de Datos II",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [
          "2231"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2233",
        "nombre": "Lenguajes de Programación",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [
          "2231"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2979",
        "nombre": "Dispositivos Semiconductores",
        "semestre": 3,
        "creditos": 10,
        "prerrequisitos": [
          "2978"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "1008",
        "nombre": "Tendencias Sociales",
        "semestre": 3,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "comunes"
      },
      {
        "id": "0054",
        "nombre": "Cálculo D",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "0051"
        ],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "2234",
        "nombre": "Tecnología Orientada a Objetos",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "2304",
          "2232"
        ],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2235",
        "nombre": "Algoritmos y Complejidad",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "2232"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2314",
        "nombre": "Bases de Datos",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "2233"
        ],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2977",
        "nombre": "Fundamentos de Diseño Digital",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "2979"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "1009",
        "nombre": "Gestión y Desarrollo Social",
        "semestre": 4,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "comunes"
      },
      {
        "id": "1937",
        "nombre": "Inglés 2",
        "semestre": 4,
        "creditos": 5,
        "prerrequisitos": [
          "1936"
        ],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "2111",
        "nombre": "Análisis Numérico",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [
          "0054"
        ],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2236",
        "nombre": "Interfaces Gráficas con Aplicaciones",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [
          "2234"
        ],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2840",
        "nombre": "Gestión de Servidores y Seguridad",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [
          "2231"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "0061",
        "nombre": "Física A",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "2980",
        "nombre": "Diseño Digital",
        "semestre": 5,
        "creditos": 10,
        "prerrequisitos": [
          "2977"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "1014",
        "nombre": "Actividades Artísticas, Deportivas o de Divulgación",
        "semestre": 5,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "comunes",
        "optativa": true
      },
      {
        "id": "1938",
        "nombre": "Inglés 3",
        "semestre": 5,
        "creditos": 5,
        "prerrequisitos": [
          "1937"
        ],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "2112",
        "nombre": "Probabilidad y Estadística",
        "semestre": 6,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2206",
        "nombre": "Estructuras de Datos Avanzadas",
        "semestre": 6,
        "creditos": 8,
        "prerrequisitos": [
          "2234"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2823",
        "nombre": "Diseño e Implementación de Redes",
        "semestre": 6,
        "creditos": 8,
        "prerrequisitos": [
          "2840"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2252",
        "nombre": "Sistemas Operativos",
        "semestre": 6,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2981",
        "nombre": "Diseño de Microcomputadoras",
        "semestre": 6,
        "creditos": 8,
        "prerrequisitos": [
          "2980"
        ],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "1012",
        "nombre": "Arte, Cultura y Humanidades I",
        "semestre": 6,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "comunes"
      },
      {
        "id": "1939",
        "nombre": "Inglés 4",
        "semestre": 6,
        "creditos": 5,
        "prerrequisitos": [
          "1938"
        ],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "2008",
        "nombre": "Seminario de Medio Término",
        "semestre": 7,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "carrera",
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2053",
        "nombre": "Administración de Proyectos I",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CE",
        "departamento": "carrera",
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2408",
        "nombre": "Fundamentos de Compiladores",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [
          "2206"
        ],
        "clasificacion": "CI",
        "departamento": "carrera"
      },
      {
        "id": "2982",
        "nombre": "Microcontroladores",
        "semestre": 7,
        "creditos": 10,
        "prerrequisitos": [
          "2981"
        ],
        "clasificacion": "IA",
        "departamento": "carrera"
      },
      {
        "id": "1006",
        "nombre": "Técnicas de Comunicación Oral y Escrita",
        "semestre": 7,
        "creditos": 5,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "comunes"
      },
      {
        "id": "1940",
        "nombre": "Inglés 5",
        "semestre": 7,
        "creditos": 5,
        "prerrequisitos": [
          "1939"
        ],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "2050",
        "nombre": "Proyectos Computacionales I",
        "semestre": 8,
        "creditos": 8,
        "prerrequisitos": [
          "2053"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupoCompleto": "nucleo"
      },
      {
        "id": "2054",
        "nombre": "Administración de Proyectos II",
        "semestre": 8,
        "creditos": 8,
        "prerrequisitos": [
          "2053"
        ],
        "clasificacion": "CE",
        "departamento": "carrera"
      },
      {
        "id": "1916",
        "nombre": "Actividades de Aprendizaje I",
        "semestre": 8,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "comunes",
        "optativa": true,
        "creditosMinimos": 180
      },
      {
        "id": "2405",
        "nombre": "Sistemas Operativos Avanzados",
        "semestre": 8,
        "creditos": 8,
        "prerrequisitos": [
          "2252"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "optativa": true
      },
      {
        "id": "2984",
        "nombre": "Procesamiento de Señales",
        "semestre": 8,
        "creditos": 8,
        "prerrequisitos": [
          "2982"
        ],
        "clasificacion": "CI",
        "departamento": "carrera"
      },
      {
        "id": "1908",
        "nombre": "Movilidad I",
        "semestre": 8,
        "creditos": 6,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "comunes",
        "optativa": true,
        "creditosMinimos": 225
      },
      {
        "id": "1015",
        "nombre": "Liderazgo",
        "semestre": 8,
        "creditos": 1,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "comunes"
      },
      {
        "id": "2051",
        "nombre": "Proyectos Computacionales II",
        "semestre": 9,
        "creditos": 8,
        "prerrequisitos": [
          "2050"
        ],
        "clasificacion": "CE",
        "departamento": "carrera"
      },
      {
        "id": "2813",
        "nombre": "Fundamentos de Inteligencia Artificial",
        "semestre": 9,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "carrera",
        "optativa": true
      },
      {
        "id": "2409",
        "nombre": "Fundamentos de Software de Sistemas",
        "semestre": 9,
        "creditos": 10,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "departamento": "carrera",
        "creditosMinimos": 340
      },
      {
        "id": "2313",
        "nombre": "Administración de Bases de Datos",
        "semestre": 9,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "departamento": "carrera",
        "optativa": true
      },
      {
        "id": "2228",
        "nombre": "Supercómputo",
        "semestre": 9,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "carrera",
        "optativa": true
      },
      {
        "id": "2007",
        "nombre": "Prácticas Profesionales COMP",
        "semestre": 9,
        "creditos": 15,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "carrera",
        "optativa": true,
        "creditosMinimos": 315,
        "nota": "Se deben cubrir 240 horas."
      },
      {
        "id": "1016",
        "nombre": "Emprendimiento",
        "semestre": 9,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "comunes"
      },
      {
        "id": "2052",
        "nombre": "Proyectos Computacionales III",
        "semestre": 10,
        "creditos": 8,
        "prerrequisitos": [
          "2051"
        ],
        "clasificacion": "CE",
        "departamento": "carrera"
      },
      {
        "id": "1926",
        "nombre": "Seminario de Egreso",
        "semestre": 10,
        "creditos": 0,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "comunes"
      },
      {
        "id": "2085",
        "nombre": "Computación y Sociedad",
        "semestre": 10,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "carrera",
        "creditosMinimos": 390
      },
      {
        "id": "1013",
        "nombre": "Arte, Cultura y Humanidades II",
        "semestre": 10,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "comunes",
        "optativa": true
      },
      {
        "id": "2974",
        "nombre": "Robótica",
        "semestre": "Énfasis: Internet de las Cosas",
        "creditos": 8,
        "prerrequisitos": [
          "2982"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "iot",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2985",
        "nombre": "Sistemas Embebidos",
        "semestre": "Énfasis: Internet de las Cosas",
        "creditos": 10,
        "prerrequisitos": [
          "2982"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "iot",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2986",
        "nombre": "Automatización",
        "semestre": "Énfasis: Internet de las Cosas",
        "creditos": 8,
        "prerrequisitos": [
          "2982"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "iot",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2987",
        "nombre": "Control Digital",
        "semestre": "Énfasis: Internet de las Cosas",
        "creditos": 8,
        "prerrequisitos": [
          "2982"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "iot",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2988",
        "nombre": "Interfaces Digitales de Comunicación",
        "semestre": "Énfasis: Internet de las Cosas",
        "creditos": 8,
        "prerrequisitos": [
          "2982",
          "2984"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "iot",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2841",
        "nombre": "Principios de Cómputo en la Nube",
        "semestre": "Énfasis: Cómputo en la Nube",
        "creditos": 8,
        "prerrequisitos": [
          "2823"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "nube",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2842",
        "nombre": "Arquitectura de Nube",
        "semestre": "Énfasis: Cómputo en la Nube",
        "creditos": 8,
        "prerrequisitos": [
          "2841"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "nube",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2843",
        "nombre": "Servicios en la Nube",
        "semestre": "Énfasis: Cómputo en la Nube",
        "creditos": 8,
        "prerrequisitos": [
          "2842"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "nube",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2824",
        "nombre": "Administración de Redes",
        "semestre": "Énfasis: Cómputo en la Nube",
        "creditos": 8,
        "prerrequisitos": [
          "2823"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "nube",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2829",
        "nombre": "Interacción de Redes",
        "semestre": "Énfasis: Cómputo en la Nube",
        "creditos": 8,
        "prerrequisitos": [
          "2824"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "nube",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2827",
        "nombre": "Modelado y Simulación de Redes",
        "semestre": "Énfasis: Cómputo en la Nube",
        "creditos": 8,
        "prerrequisitos": [
          "2823"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "nube",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2238",
        "nombre": "Fundamentos de Desarrollo Web",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2236"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "web",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2237",
        "nombre": "Aplicaciones Web Interactivas",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2238"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "web",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2245",
        "nombre": "Aplicaciones Web Escalables",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2238"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "web",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2239",
        "nombre": "Fundamentos de Desarrollo Móvil",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2236"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "web",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2244",
        "nombre": "Diseño de Interfaces",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2236"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "web",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2850",
        "nombre": "Introducción a los Sistemas Geoespaciales",
        "semestre": "Énfasis: Sistemas Geoespaciales",
        "creditos": 8,
        "prerrequisitos": [
          "2236"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "geo",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2851",
        "nombre": "Bases de Datos Geoespaciales",
        "semestre": "Énfasis: Sistemas Geoespaciales",
        "creditos": 8,
        "prerrequisitos": [
          "2850"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "geo",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2853",
        "nombre": "Geoaplicaciones Web y Moviles",
        "semestre": "Énfasis: Sistemas Geoespaciales",
        "creditos": 8,
        "prerrequisitos": [
          "2850"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "geo",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2815",
        "nombre": "Visión Computacional",
        "semestre": "Énfasis: Sistemas Geoespaciales",
        "creditos": 8,
        "prerrequisitos": [
          "2236"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "geo",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      },
      {
        "id": "2852",
        "nombre": "Geointeligencia Artificial Aplicada a la Teledetección",
        "semestre": "Énfasis: Sistemas Geoespaciales",
        "creditos": 8,
        "prerrequisitos": [
          "2815"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupo": "geo",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 220
        }
      }
    ]
  },
  {
    "id": "mecatronica-uaslp-2023",
    "carrera": "Ingeniería en Mecatrónica",
    "institucion": "UASLP",
    "version": "Junio 2023",
    "nombre": "Ingeniería en Mecatrónica — UASLP (Junio 2023)",
    "creditosParaEgresar": 450,
    "etiquetaExtras": "Optativas",
    "clasificaciones": {
      "CB": {
        "nombre": "Ciencias Básicas",
        "color": "#a99bc9",
        "texto": "#ffffff"
      },
      "CI": {
        "nombre": "Ciencias de la Ingeniería",
        "color": "#2f6fe4",
        "texto": "#ffffff"
      },
      "IA": {
        "nombre": "Ingeniería Aplicada",
        "color": "#e3261b",
        "texto": "#ffe94d"
      },
      "DI": {
        "nombre": "Diseño en Ingeniería",
        "color": "#12937a",
        "texto": "#ffffff"
      },
      "CS": {
        "nombre": "Ciencias Sociales y Humanidades",
        "color": "#f5e400",
        "texto": "#d42020"
      },
      "CE": {
        "nombre": "Ciencias Económico-Administrativas",
        "color": "#f07a1a",
        "texto": "#ffffff"
      },
      "CC": {
        "nombre": "Cursos Complementarios",
        "color": "",
        "texto": ""
      }
    },
    "departamentos": {
      "area": {
        "nombre": "Área",
        "estilo": "grueso"
      },
      "carrera": {
        "nombre": "Carrera",
        "estilo": "redondeado-simple"
      },
      "dfm": {
        "nombre": "Depto. Físico Matemáticas",
        "estilo": "delgado"
      },
      "humanistica": {
        "nombre": "Formación Humanística",
        "estilo": "doble"
      },
      "dui": {
        "nombre": "Depto. Universitario de Inglés",
        "estilo": "redondeado"
      },
      "prerrequisito": {
        "nombre": "Pre-requisito",
        "estilo": "punteado"
      }
    },
    "grupos": {
      "niveles-1-6": "Niveles I a VI"
    },
    "metas": [
      {
        "nombre": "Créditos para pasante",
        "creditos": 450
      },
      {
        "nombre": "Materias obligatorias",
        "creditos": 413,
        "tipo": "obligatorias"
      }
    ],
    "notas": [
      "Principios de Administración requiere 90 créditos; Programación I, 135.",
      "Electroneumática e Instrumentación Industrial requieren 180 créditos; Robótica A, 225.",
      "Administración de Proyectos, Ingeniería Automotriz, Administración de Personal, Seguridad e Higiene Industrial y Diagramas Eléctricos requieren 315 créditos.",
      "Seminario, Tratamiento de Imágenes, Inteligencia Artificial Aplicada e Ingeniería Asistida por Computadora requieren 360 créditos.",
      "Prácticas Profesionales IMT requiere 315 créditos y haber acreditado los niveles I a VI; se cursa entre los niveles VII y X y no junto con Proyecto Integrador IMT.",
      "Validación de la Lengua Extranjera se acredita con 460 puntos TOEFL ITP.",
      "Seminario de Egreso se acredita al presentar por primera vez el EGEL Plus-IMECATRO y requiere 405 créditos.",
      "Actividades de Aprendizaje (I a X) y Movilidad (I a VIII) son bloques de optativas.",
      "Para la pasantía se deben aprobar todos los créditos obligatorios (413) y optativas hasta cubrir al menos 450 créditos."
    ],
    "materias": [
      {
        "id": "5688",
        "nombre": "Habilidades Socio Afectivas y Éticas",
        "semestre": 1,
        "creditos": 3,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "0041",
        "nombre": "Álgebra A",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "dfm"
      },
      {
        "id": "0000",
        "nombre": "Geometría y Trigonometría",
        "semestre": 1,
        "creditos": 0,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "prerrequisito",
        "nota": "Pre-requisito (sin créditos)."
      },
      {
        "id": "0051",
        "nombre": "Cálculo A",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "dfm"
      },
      {
        "id": "0061",
        "nombre": "Física A",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "dfm"
      },
      {
        "id": "5690",
        "nombre": "Dibujo en Ingeniería Mecánica",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "0071",
        "nombre": "Química A",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "dfm"
      },
      {
        "id": "1005",
        "nombre": "Metodología de la Investigación",
        "semestre": 1,
        "creditos": 4,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "grupo": "niveles-1-6",
        "departamento": "humanistica"
      },
      {
        "id": "5918",
        "nombre": "Seminario de Orientación IMT",
        "semestre": 1,
        "creditos": 1,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "grupo": "niveles-1-6",
        "departamento": "carrera"
      },
      {
        "id": "0042",
        "nombre": "Álgebra B",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "0041"
        ],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "dfm"
      },
      {
        "id": "0054",
        "nombre": "Cálculo D",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "0051"
        ],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "dfm"
      },
      {
        "id": "0052",
        "nombre": "Cálculo B",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "0051"
        ],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "dfm"
      },
      {
        "id": "5694",
        "nombre": "Estática",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "0061"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5689",
        "nombre": "Dibujo Asistido por Computadora",
        "semestre": 2,
        "creditos": 3,
        "prerrequisitos": [
          "5690"
        ],
        "clasificacion": "IA",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5699",
        "nombre": "Materiales para Ingeniería",
        "semestre": 2,
        "creditos": 9,
        "prerrequisitos": [
          "0071"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "1015",
        "nombre": "Liderazgo",
        "semestre": 2,
        "creditos": 1,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "grupo": "niveles-1-6",
        "departamento": "humanistica"
      },
      {
        "id": "1936",
        "nombre": "Inglés 1",
        "semestre": 2,
        "creditos": 5,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "grupo": "niveles-1-6",
        "departamento": "dui"
      },
      {
        "id": "5731",
        "nombre": "Fundamentos de Programación",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "carrera"
      },
      {
        "id": "5960",
        "nombre": "Matemáticas Aplicadas",
        "semestre": 3,
        "creditos": 6,
        "prerrequisitos": [
          "0042",
          "0054"
        ],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "1016",
        "nombre": "Emprendimiento",
        "semestre": 3,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "grupo": "niveles-1-6",
        "departamento": "humanistica"
      },
      {
        "id": "5692",
        "nombre": "Electrotécnia para Ingeniería I",
        "semestre": 3,
        "creditos": 9,
        "prerrequisitos": [
          "0051",
          "0061"
        ],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5695",
        "nombre": "Mecánica de Materiales I",
        "semestre": 3,
        "creditos": 11,
        "prerrequisitos": [
          "5694"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5930",
        "nombre": "Ingeniería y Gestión Ambiental",
        "semestre": 3,
        "creditos": 3,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "1006",
        "nombre": "Técnicas de Comunicación Oral y Escrita",
        "semestre": 3,
        "creditos": 5,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "grupo": "niveles-1-6",
        "departamento": "humanistica"
      },
      {
        "id": "1937",
        "nombre": "Inglés 2",
        "semestre": 3,
        "creditos": 5,
        "prerrequisitos": [
          "1936"
        ],
        "clasificacion": "CC",
        "grupo": "niveles-1-6",
        "departamento": "dui"
      },
      {
        "id": "5900",
        "nombre": "Principios de Administración",
        "semestre": 4,
        "creditos": 6,
        "prerrequisitos": [],
        "clasificacion": "CE",
        "grupo": "niveles-1-6",
        "departamento": "area",
        "creditosMinimos": 90
      },
      {
        "id": "5707",
        "nombre": "Programación I",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "5731"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "carrera",
        "creditosMinimos": 135
      },
      {
        "id": "5517",
        "nombre": "Circuitos Eléctricos A",
        "semestre": 4,
        "creditos": 12,
        "prerrequisitos": [
          "0054",
          "5692"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5691",
        "nombre": "Dinámica",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "5694",
          "0052"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5641",
        "nombre": "Mecánica de Materiales II",
        "semestre": 4,
        "creditos": 6,
        "prerrequisitos": [
          "5695"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "1938",
        "nombre": "Inglés 3",
        "semestre": 4,
        "creditos": 5,
        "prerrequisitos": [
          "1937"
        ],
        "clasificacion": "CC",
        "grupo": "niveles-1-6",
        "departamento": "dui"
      },
      {
        "id": "5643",
        "nombre": "Probabilidad e Inferencia Estadística",
        "semestre": 5,
        "creditos": 10,
        "prerrequisitos": [
          "0041"
        ],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5708",
        "nombre": "Programación II",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [
          "5707"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "carrera"
      },
      {
        "id": "5673",
        "nombre": "Diseño de Sistemas Digitales",
        "semestre": 5,
        "creditos": 7,
        "prerrequisitos": [
          "5517"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5703",
        "nombre": "Modelado y Simulación de Sistemas",
        "semestre": 5,
        "creditos": 7,
        "prerrequisitos": [
          "5960",
          "5517"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "carrera"
      },
      {
        "id": "5590",
        "nombre": "Electrónica I",
        "semestre": 5,
        "creditos": 12,
        "prerrequisitos": [
          "5517"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "1939",
        "nombre": "Inglés 4",
        "semestre": 5,
        "creditos": 5,
        "prerrequisitos": [
          "1938"
        ],
        "clasificacion": "CC",
        "grupo": "niveles-1-6",
        "departamento": "dui"
      },
      {
        "id": "5965",
        "nombre": "Control de Calidad",
        "semestre": 6,
        "creditos": 6,
        "prerrequisitos": [
          "5643",
          "5900"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5709",
        "nombre": "Análisis Numérico",
        "semestre": 6,
        "creditos": 6,
        "prerrequisitos": [
          "5707"
        ],
        "clasificacion": "CB",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5670",
        "nombre": "Microcontroladores",
        "semestre": 6,
        "creditos": 7,
        "prerrequisitos": [
          "5673"
        ],
        "clasificacion": "IA",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5981",
        "nombre": "Ingeniería de Control I",
        "semestre": 6,
        "creditos": 8,
        "prerrequisitos": [
          "5703",
          "5590"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5591",
        "nombre": "Electrónica II",
        "semestre": 6,
        "creditos": 8,
        "prerrequisitos": [
          "5590"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "5522",
        "nombre": "Cinemática de las Máquinas",
        "semestre": 6,
        "creditos": 10,
        "prerrequisitos": [
          "5691"
        ],
        "clasificacion": "CI",
        "grupo": "niveles-1-6",
        "departamento": "area"
      },
      {
        "id": "1940",
        "nombre": "Inglés 5",
        "semestre": 6,
        "creditos": 5,
        "prerrequisitos": [
          "1939"
        ],
        "clasificacion": "CC",
        "grupo": "niveles-1-6",
        "departamento": "dui"
      },
      {
        "id": "5982",
        "nombre": "Ingeniería de Control II",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [
          "5670",
          "5981"
        ],
        "clasificacion": "IA",
        "departamento": "area"
      },
      {
        "id": "5717",
        "nombre": "Electrónica Industrial A",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [
          "5591"
        ],
        "clasificacion": "DI",
        "departamento": "area"
      },
      {
        "id": "5702",
        "nombre": "Circuitos y Motores Eléctricos",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [
          "5517"
        ],
        "clasificacion": "CI",
        "departamento": "carrera"
      },
      {
        "id": "5714",
        "nombre": "Electroneumática",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "DI",
        "departamento": "area",
        "creditosMinimos": 180
      },
      {
        "id": "5713",
        "nombre": "Instrumentación Industrial",
        "semestre": 7,
        "creditos": 7,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "area",
        "creditosMinimos": 180
      },
      {
        "id": "5686",
        "nombre": "Diseño Mecánico A",
        "semestre": 7,
        "creditos": 11,
        "prerrequisitos": [
          "5522",
          "5641"
        ],
        "clasificacion": "IA",
        "departamento": "area"
      },
      {
        "id": "1927",
        "nombre": "Validación de la Lengua Extranjera",
        "semestre": 7,
        "creditos": 0,
        "prerrequisitos": [
          "1940"
        ],
        "clasificacion": "CC",
        "departamento": "area",
        "nota": "Se acredita con 460 puntos TOEFL ITP en el examen de dominio del inglés."
      },
      {
        "id": "5927",
        "nombre": "Investigación de Operaciones I",
        "semestre": 8,
        "creditos": 6,
        "prerrequisitos": [
          "0042",
          "5900"
        ],
        "clasificacion": "CI",
        "departamento": "area"
      },
      {
        "id": "5719",
        "nombre": "Robótica A",
        "semestre": 8,
        "creditos": 10,
        "prerrequisitos": [],
        "clasificacion": "DI",
        "departamento": "area",
        "creditosMinimos": 225
      },
      {
        "id": "5715",
        "nombre": "Interfaces HW-SW",
        "semestre": 8,
        "creditos": 8,
        "prerrequisitos": [
          "5670"
        ],
        "clasificacion": "DI",
        "departamento": "carrera"
      },
      {
        "id": "5909",
        "nombre": "Administración de Proyectos",
        "semestre": 8,
        "creditos": 6,
        "prerrequisitos": [],
        "clasificacion": "CE",
        "departamento": "area",
        "creditosMinimos": 315
      },
      {
        "id": "5716",
        "nombre": "Control Lógico Programable",
        "semestre": 8,
        "creditos": 8,
        "prerrequisitos": [
          "5714",
          "5713"
        ],
        "clasificacion": "DI",
        "departamento": "area"
      },
      {
        "id": "5503",
        "nombre": "Procesos de Manufactura I",
        "semestre": 8,
        "creditos": 10,
        "prerrequisitos": [
          "5699"
        ],
        "clasificacion": "IA",
        "departamento": "area"
      },
      {
        "id": "5725",
        "nombre": "Proyecto Integrador IMT",
        "semestre": 9,
        "creditos": 10,
        "prerrequisitos": [
          "5909"
        ],
        "clasificacion": "DI",
        "departamento": "carrera"
      },
      {
        "id": "5718",
        "nombre": "Redes Industriales",
        "semestre": 9,
        "creditos": 12,
        "prerrequisitos": [
          "5716"
        ],
        "clasificacion": "DI",
        "departamento": "area"
      },
      {
        "id": "5988",
        "nombre": "Seminario",
        "semestre": 9,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "area",
        "creditosMinimos": 360
      },
      {
        "id": "5805",
        "nombre": "Prácticas Profesionales IMT",
        "semestre": 10,
        "creditos": 15,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "carrera",
        "optativa": true,
        "creditosMinimos": 315,
        "grupoCompleto": "niveles-1-6",
        "nota": "Se puede cursar entre los niveles VII y X; no con inscripción simultánea de Proyecto Integrador IMT."
      },
      {
        "id": "1926",
        "nombre": "Seminario de Egreso",
        "semestre": 10,
        "creditos": 0,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "area",
        "creditosMinimos": 405,
        "nota": "Se acredita al presentar por primera vez el EGEL Plus-IMECATRO."
      },
      {
        "id": "5685",
        "nombre": "Metrología",
        "semestre": "Optativas: Rama Mecánica",
        "creditos": 8,
        "prerrequisitos": [
          "5643"
        ],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: V."
      },
      {
        "id": "5687",
        "nombre": "Diseño Mecánico B",
        "semestre": "Optativas: Rama Mecánica",
        "creditos": 9,
        "prerrequisitos": [
          "5686"
        ],
        "clasificacion": "DI",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: VIII."
      },
      {
        "id": "5613",
        "nombre": "Método de los Elementos Finitos",
        "semestre": "Optativas: Rama Mecánica",
        "creditos": 9,
        "prerrequisitos": [
          "5686"
        ],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: VIII."
      },
      {
        "id": "5504",
        "nombre": "Procesos de Manufactura II",
        "semestre": "Optativas: Rama Mecánica",
        "creditos": 8,
        "prerrequisitos": [
          "5503"
        ],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: IX."
      },
      {
        "id": "5631",
        "nombre": "Control Numérico Computarizado",
        "semestre": "Optativas: Rama Mecánica",
        "creditos": 8,
        "prerrequisitos": [
          "5504"
        ],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: IX."
      },
      {
        "id": "5800",
        "nombre": "Ingeniería Asistida por Computadora",
        "semestre": "Optativas: Rama Mecánica",
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: IX.",
        "creditosMinimos": 360
      },
      {
        "id": "5545",
        "nombre": "Ingeniería Automotriz",
        "semestre": "Optativas: Rama Mecánica",
        "creditos": 10,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: X.",
        "creditosMinimos": 315
      },
      {
        "id": "5723",
        "nombre": "Robótica B",
        "semestre": "Optativas: Rama de la Integración Mecatrónica",
        "creditos": 8,
        "prerrequisitos": [
          "5719"
        ],
        "clasificacion": "DI",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: IX."
      },
      {
        "id": "5704",
        "nombre": "Manufactura Integrada",
        "semestre": "Optativas: Rama de la Integración Mecatrónica",
        "creditos": 8,
        "prerrequisitos": [
          "5719"
        ],
        "clasificacion": "DI",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: IX."
      },
      {
        "id": "5721",
        "nombre": "Tratamiento de Imágenes",
        "semestre": "Optativas: Rama de la Integración Mecatrónica",
        "creditos": 12,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: X.",
        "creditosMinimos": 360
      },
      {
        "id": "5732",
        "nombre": "Inteligencia Artificial Aplicada",
        "semestre": "Optativas: Rama de la Integración Mecatrónica",
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: X.",
        "creditosMinimos": 360
      },
      {
        "id": "5902",
        "nombre": "Administración de Personal",
        "semestre": "Optativas: Rama de Administración y Calidad",
        "creditos": 6,
        "prerrequisitos": [],
        "clasificacion": "CE",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: IX.",
        "creditosMinimos": 315
      },
      {
        "id": "5975",
        "nombre": "Sist. de Gestión de Calidad y Mejora Continua",
        "semestre": "Optativas: Rama de Administración y Calidad",
        "creditos": 6,
        "prerrequisitos": [
          "5965"
        ],
        "clasificacion": "CE",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: X."
      },
      {
        "id": "1012",
        "nombre": "Arte, Cultura y Humanidades I",
        "semestre": "Optativas: Rama de Humanidades",
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "humanistica",
        "optativa": true,
        "nota": "Semestre sugerido: V."
      },
      {
        "id": "1013",
        "nombre": "Arte, Cultura y Humanidades II",
        "semestre": "Optativas: Rama de Humanidades",
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "humanistica",
        "optativa": true,
        "nota": "Semestre sugerido: VIII."
      },
      {
        "id": "1014",
        "nombre": "Actividades Artísticas, Deportivas o de Divulgación",
        "semestre": "Optativas: Rama de Humanidades",
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "humanistica",
        "optativa": true,
        "nota": "Semestre sugerido: VI."
      },
      {
        "id": "1916",
        "nombre": "Actividades de Aprendizaje",
        "semestre": "Optativas: Con contenido variable",
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "area",
        "optativa": true,
        "nota": "Bloque de 10 asignaturas (I a X, claves 1916–1925). Semestre sugerido: VI."
      },
      {
        "id": "1908",
        "nombre": "Movilidad",
        "semestre": "Optativas: Con contenido variable",
        "creditos": 6,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "area",
        "optativa": true,
        "nota": "Bloque de 8 asignaturas (I a VIII, claves 1908–1915). Semestre sugerido: VII."
      },
      {
        "id": "0064",
        "nombre": "Física D",
        "semestre": "Optativas: Otras",
        "creditos": 6,
        "prerrequisitos": [
          "0061"
        ],
        "clasificacion": "CB",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: II."
      },
      {
        "id": "5618",
        "nombre": "Termodinámica",
        "semestre": "Optativas: Otras",
        "creditos": 11,
        "prerrequisitos": [
          "0054"
        ],
        "clasificacion": "CI",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: III."
      },
      {
        "id": "5726",
        "nombre": "Procesamiento Digital de Señales",
        "semestre": "Optativas: Otras",
        "creditos": 8,
        "prerrequisitos": [
          "5673",
          "5591"
        ],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: VIII."
      },
      {
        "id": "5647",
        "nombre": "Sistemas de Producción",
        "semestre": "Optativas: Otras",
        "creditos": 8,
        "prerrequisitos": [
          "5927"
        ],
        "clasificacion": "CE",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: IX."
      },
      {
        "id": "5972",
        "nombre": "Seguridad e Higiene Industrial",
        "semestre": "Optativas: Otras",
        "creditos": 6,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: X.",
        "creditosMinimos": 315
      },
      {
        "id": "5607",
        "nombre": "Diagramas Eléctricos",
        "semestre": "Optativas: Otras",
        "creditos": 3,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "area",
        "optativa": true,
        "nota": "Semestre sugerido: X.",
        "creditosMinimos": 315
      }
    ]
  },
  {
    "id": "isi-uaslp-2024",
    "carrera": "Ingeniería en Sistemas Inteligentes",
    "institucion": "UASLP",
    "version": "Agosto 2024",
    "nombre": "Ingeniería en Sistemas Inteligentes — UASLP (Agosto 2024)",
    "creditosParaEgresar": 405,
    "clasificaciones": {
      "CB": {
        "nombre": "Ciencias Básicas y Matemáticas",
        "color": "#a99bc9",
        "texto": "#ffffff"
      },
      "CI": {
        "nombre": "Ciencias de la Ingeniería",
        "color": "#2f6fe4",
        "texto": "#ffffff"
      },
      "IA": {
        "nombre": "Ingeniería Aplicada",
        "color": "#e3261b",
        "texto": "#ffe94d"
      },
      "CS": {
        "nombre": "Ciencias Sociales y Humanidades",
        "color": "#f5e400",
        "texto": "#d42020"
      },
      "CE": {
        "nombre": "Ciencias Económico-Administrativas",
        "color": "#f07a1a",
        "texto": "#ffffff"
      },
      "CC": {
        "nombre": "Otros cursos",
        "color": "",
        "texto": ""
      }
    },
    "departamentos": {
      "carrera": {
        "nombre": "Carrera",
        "estilo": "grueso"
      },
      "fisicomat": {
        "nombre": "Depto. Físico Matemáticas",
        "estilo": "delgado"
      },
      "humanistica": {
        "nombre": "Formación Humanística",
        "estilo": "doble"
      },
      "ingles": {
        "nombre": "Depto. Universitario de Inglés",
        "estilo": "redondeado"
      }
    },
    "grupos": {
      "nucleo": "Núcleo Básico",
      "robotica": "Robótica Inteligente e IA",
      "videojuegos": "Interacción y Videojuegos",
      "ciberseguridad": "Ciberseguridad",
      "web": "Desarrollo Web y Multiplataforma"
    },
    "metas": [
      {
        "nombre": "Créditos para pasante",
        "creditos": 405
      },
      {
        "nombre": "Materias obligatorias",
        "creditos": 313,
        "tipo": "obligatorias"
      },
      {
        "nombre": "Electivas de Área de Énfasis",
        "creditos": 64,
        "tipo": "electivas"
      },
      {
        "nombre": "Servicio Social (habilitado)",
        "creditos": 284
      }
    ],
    "notas": [
      "Administración de Proyectos I, Seminario de Medio Término y las Electivas de Área de Énfasis requieren 200 créditos del Núcleo Básico (90%).",
      "Cada Área de Énfasis requiere: Robótica → Fund. de IA; Videojuegos → Graficación; Ciberseguridad → Diseño e Impl. de Redes; Web → Interfaces Gráficas.",
      "Se deben aprobar al menos 64 créditos de electivas de área y 28 créditos más de optativas (*) o electivas.",
      "Actividades de Aprendizaje I–V (90 cr), Movilidad I–V (225 cr) y Prácticas Profesionales (315 cr) son optativas.",
      "El Servicio Social se puede realizar al tener 284 créditos (70%)."
    ],
    "materias": [
      {
        "id": "2805",
        "nombre": "Herramientas de Software",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2229",
        "nombre": "Pensamiento Algorítmico",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2151",
        "nombre": "Matemáticas Discretas I",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2150",
        "nombre": "Temas Selectos de Matemáticas",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "0071",
        "nombre": "Química A",
        "semestre": 1,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "1005",
        "nombre": "Metodología de la Investigación",
        "semestre": 1,
        "creditos": 4,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "grupo": "nucleo",
        "departamento": "humanistica"
      },
      {
        "id": "2002",
        "nombre": "Seminario de Orientación en Computación",
        "semestre": 1,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "carrera"
      },
      {
        "id": "2806",
        "nombre": "Sistemas Interactivos",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2231",
        "nombre": "Estructuras de Datos I",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "2229"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2152",
        "nombre": "Matemáticas Discretas II",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "2151"
        ],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "0042",
        "nombre": "Álgebra B",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [
          "2150"
        ],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "0051",
        "nombre": "Cálculo A",
        "semestre": 2,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "1008",
        "nombre": "Tendencias Sociales",
        "semestre": 2,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "grupo": "nucleo",
        "departamento": "humanistica"
      },
      {
        "id": "1936",
        "nombre": "Inglés 1",
        "semestre": 2,
        "creditos": 5,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "2304",
        "nombre": "Ingeniería de Software",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [
          "2806"
        ],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2232",
        "nombre": "Estructuras de Datos II",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [
          "2231"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2233",
        "nombre": "Lenguajes de Programación",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [
          "2231"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "0061",
        "nombre": "Física A",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "0052",
        "nombre": "Cálculo B",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [
          "0051"
        ],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat",
        "optativa": true
      },
      {
        "id": "2532",
        "nombre": "Arquitectura de Computadoras",
        "semestre": 3,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "1937",
        "nombre": "Inglés 2",
        "semestre": 3,
        "creditos": 5,
        "prerrequisitos": [
          "1936"
        ],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "2234",
        "nombre": "Tecnología Orientada a Objetos",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "2304",
          "2232"
        ],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2235",
        "nombre": "Algoritmos y Complejidad",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "2232"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2314",
        "nombre": "Bases de Datos",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "2233"
        ],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2840",
        "nombre": "Gestión de Servidores y Seguridad",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "2231"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "0054",
        "nombre": "Cálculo D",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [
          "0051"
        ],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "fisicomat"
      },
      {
        "id": "2111",
        "nombre": "Análisis Numérico",
        "semestre": 4,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2236",
        "nombre": "Interfaces Gráficas con Aplicaciones",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [
          "2234"
        ],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2813",
        "nombre": "Fundamentos de Inteligencia Artificial",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [
          "2235"
        ],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2807",
        "nombre": "Graficación por Computadora",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2823",
        "nombre": "Diseño e Implementación de Redes",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "2252",
        "nombre": "Sistemas Operativos",
        "semestre": 5,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CI",
        "grupo": "nucleo",
        "departamento": "carrera"
      },
      {
        "id": "1009",
        "nombre": "Gestión y Desarrollo Social",
        "semestre": 5,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "grupo": "nucleo",
        "departamento": "humanistica"
      },
      {
        "id": "1938",
        "nombre": "Inglés 3",
        "semestre": 5,
        "creditos": 5,
        "prerrequisitos": [
          "1937"
        ],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "1006",
        "nombre": "Técnicas de Comunicación Oral y Escrita",
        "semestre": 6,
        "creditos": 5,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "humanistica"
      },
      {
        "id": "2053",
        "nombre": "Administración de Proyectos I",
        "semestre": 6,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CE",
        "departamento": "carrera",
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2008",
        "nombre": "Seminario de Medio Término",
        "semestre": 6,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "carrera",
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2112",
        "nombre": "Probabilidad y Estadística",
        "semestre": 6,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "departamento": "carrera"
      },
      {
        "id": "1012",
        "nombre": "Arte, Cultura y Humanidades I",
        "semestre": 6,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "humanistica"
      },
      {
        "id": "1939",
        "nombre": "Inglés 4",
        "semestre": 6,
        "creditos": 5,
        "prerrequisitos": [
          "1938"
        ],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "2050",
        "nombre": "Proyectos Computacionales I",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [
          "2053"
        ],
        "clasificacion": "IA",
        "departamento": "carrera",
        "grupoCompleto": "nucleo"
      },
      {
        "id": "2054",
        "nombre": "Administración de Proyectos II",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [
          "2053"
        ],
        "clasificacion": "CE",
        "departamento": "carrera"
      },
      {
        "id": "2228",
        "nombre": "Supercómputo",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "carrera",
        "optativa": true
      },
      {
        "id": "2113",
        "nombre": "Modelado Matemático",
        "semestre": 7,
        "creditos": 8,
        "prerrequisitos": [],
        "clasificacion": "CB",
        "departamento": "carrera"
      },
      {
        "id": "1015",
        "nombre": "Liderazgo",
        "semestre": 7,
        "creditos": 1,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "humanistica"
      },
      {
        "id": "1940",
        "nombre": "Inglés 5",
        "semestre": 7,
        "creditos": 5,
        "prerrequisitos": [
          "1939"
        ],
        "clasificacion": "CC",
        "departamento": "ingles"
      },
      {
        "id": "2051",
        "nombre": "Proyectos Computacionales II",
        "semestre": 8,
        "creditos": 8,
        "prerrequisitos": [
          "2050"
        ],
        "clasificacion": "CE",
        "departamento": "carrera"
      },
      {
        "id": "1908",
        "nombre": "Movilidad I",
        "semestre": 8,
        "creditos": 6,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "carrera",
        "optativa": true,
        "creditosMinimos": 225
      },
      {
        "id": "1013",
        "nombre": "Arte, Cultura y Humanidades II",
        "semestre": 8,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "humanistica",
        "optativa": true
      },
      {
        "id": "1016",
        "nombre": "Emprendimiento",
        "semestre": 8,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "humanistica"
      },
      {
        "id": "1916",
        "nombre": "Actividades de Aprendizaje I",
        "semestre": 8,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "humanistica",
        "optativa": true,
        "creditosMinimos": 90
      },
      {
        "id": "2052",
        "nombre": "Proyectos Computacionales III",
        "semestre": 9,
        "creditos": 8,
        "prerrequisitos": [
          "2051"
        ],
        "clasificacion": "CE",
        "departamento": "carrera"
      },
      {
        "id": "2085",
        "nombre": "Computación y Sociedad",
        "semestre": 9,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "carrera",
        "creditosMinimos": 350
      },
      {
        "id": "1926",
        "nombre": "Seminario de Egreso",
        "semestre": 9,
        "creditos": 0,
        "prerrequisitos": [],
        "clasificacion": "CC",
        "departamento": "humanistica"
      },
      {
        "id": "1014",
        "nombre": "Actividades Artísticas, Deportivas o de Divulgación",
        "semestre": 9,
        "creditos": 2,
        "prerrequisitos": [],
        "clasificacion": "CS",
        "departamento": "humanistica",
        "optativa": true
      },
      {
        "id": "2005",
        "nombre": "Prácticas Profesionales ISI",
        "semestre": 9,
        "creditos": 15,
        "prerrequisitos": [],
        "clasificacion": "IA",
        "departamento": "carrera",
        "optativa": true,
        "creditosMinimos": 315
      },
      {
        "id": "2817",
        "nombre": "Programación de Robots",
        "semestre": "Énfasis: Robótica e IA",
        "creditos": 8,
        "prerrequisitos": [
          "2813"
        ],
        "clasificacion": "IA",
        "grupo": "robotica",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2815",
        "nombre": "Visión Computacional",
        "semestre": "Énfasis: Robótica e IA",
        "creditos": 8,
        "prerrequisitos": [
          "2817"
        ],
        "clasificacion": "IA",
        "grupo": "robotica",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2818",
        "nombre": "Robótica Inteligente",
        "semestre": "Énfasis: Robótica e IA",
        "creditos": 8,
        "prerrequisitos": [
          "2817"
        ],
        "clasificacion": "IA",
        "grupo": "robotica",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2819",
        "nombre": "Representación del Conocimiento y Ontologías",
        "semestre": "Énfasis: Robótica e IA",
        "creditos": 8,
        "prerrequisitos": [
          "2813"
        ],
        "clasificacion": "IA",
        "grupo": "robotica",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2809",
        "nombre": "Cómputo Bio-Inspirado",
        "semestre": "Énfasis: Robótica e IA",
        "creditos": 8,
        "prerrequisitos": [
          "2813"
        ],
        "clasificacion": "IA",
        "grupo": "robotica",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2816",
        "nombre": "Aprendizaje Automático",
        "semestre": "Énfasis: Robótica e IA",
        "creditos": 8,
        "prerrequisitos": [
          "2813"
        ],
        "clasificacion": "IA",
        "grupo": "robotica",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2808",
        "nombre": "Ciencia de Datos",
        "semestre": "Énfasis: Robótica e IA",
        "creditos": 8,
        "prerrequisitos": [
          "2816"
        ],
        "clasificacion": "IA",
        "grupo": "robotica",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2832",
        "nombre": "Programación de Videojuegos",
        "semestre": "Énfasis: Interacción y Videojuegos",
        "creditos": 8,
        "prerrequisitos": [
          "2807"
        ],
        "clasificacion": "IA",
        "grupo": "videojuegos",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2834",
        "nombre": "Motores Gráficos",
        "semestre": "Énfasis: Interacción y Videojuegos",
        "creditos": 8,
        "prerrequisitos": [
          "2832"
        ],
        "clasificacion": "IA",
        "grupo": "videojuegos",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2835",
        "nombre": "Temas Selectos de Videojuegos",
        "semestre": "Énfasis: Interacción y Videojuegos",
        "creditos": 8,
        "prerrequisitos": [
          "2834"
        ],
        "clasificacion": "IA",
        "grupo": "videojuegos",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2833",
        "nombre": "Diseño de Juegos",
        "semestre": "Énfasis: Interacción y Videojuegos",
        "creditos": 8,
        "prerrequisitos": [
          "2807"
        ],
        "clasificacion": "IA",
        "grupo": "videojuegos",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2836",
        "nombre": "Arte Conceptual para Videojuegos",
        "semestre": "Énfasis: Interacción y Videojuegos",
        "creditos": 8,
        "prerrequisitos": [
          "2807"
        ],
        "clasificacion": "IA",
        "grupo": "videojuegos",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2824",
        "nombre": "Administración de Redes",
        "semestre": "Énfasis: Ciberseguridad",
        "creditos": 8,
        "prerrequisitos": [
          "2823"
        ],
        "clasificacion": "IA",
        "grupo": "ciberseguridad",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2829",
        "nombre": "Interacción de Redes",
        "semestre": "Énfasis: Ciberseguridad",
        "creditos": 8,
        "prerrequisitos": [
          "2824"
        ],
        "clasificacion": "IA",
        "grupo": "ciberseguridad",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2827",
        "nombre": "Modelado y Simulación de Redes",
        "semestre": "Énfasis: Ciberseguridad",
        "creditos": 8,
        "prerrequisitos": [
          "2823"
        ],
        "clasificacion": "IA",
        "grupo": "ciberseguridad",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2825",
        "nombre": "Principios de Seguridad Informática",
        "semestre": "Énfasis: Ciberseguridad",
        "creditos": 8,
        "prerrequisitos": [
          "2823"
        ],
        "clasificacion": "IA",
        "grupo": "ciberseguridad",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2826",
        "nombre": "Criptografía",
        "semestre": "Énfasis: Ciberseguridad",
        "creditos": 8,
        "prerrequisitos": [
          "2825"
        ],
        "clasificacion": "IA",
        "grupo": "ciberseguridad",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2828",
        "nombre": "Anonimato y Privacidad",
        "semestre": "Énfasis: Ciberseguridad",
        "creditos": 8,
        "prerrequisitos": [
          "2825"
        ],
        "clasificacion": "IA",
        "grupo": "ciberseguridad",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2238",
        "nombre": "Fundamentos de Desarrollo Web",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2236"
        ],
        "clasificacion": "IA",
        "grupo": "web",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2237",
        "nombre": "Aplicaciones Web Interactivas",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2238"
        ],
        "clasificacion": "IA",
        "grupo": "web",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2245",
        "nombre": "Aplicaciones Web Escalables",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2238"
        ],
        "clasificacion": "IA",
        "grupo": "web",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2239",
        "nombre": "Fundamentos de Desarrollo Móvil",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2236"
        ],
        "clasificacion": "IA",
        "grupo": "web",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      },
      {
        "id": "2244",
        "nombre": "Diseño de Interfaces",
        "semestre": "Énfasis: Desarrollo Web y Multiplataforma",
        "creditos": 8,
        "prerrequisitos": [
          "2236"
        ],
        "clasificacion": "IA",
        "grupo": "web",
        "departamento": "carrera",
        "electiva": true,
        "creditosMinimosGrupo": {
          "grupo": "nucleo",
          "creditos": 200
        }
      }
    ],
    "etiquetaExtras": "Áreas de énfasis"
  }
];
