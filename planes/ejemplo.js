// Plan de ejemplo. Puedes reemplazarlo cargando tu propio JSON desde la app
// (botón "Cargar plan") o editando este archivo.
window.PLAN_EJEMPLO = {
  "nombre": "Ingeniería en Sistemas (ejemplo)",
  "materias": [
    { "id": "MAT1", "nombre": "Cálculo I", "semestre": 1, "creditos": 8, "prerrequisitos": [] },
    { "id": "ALG", "nombre": "Álgebra Lineal", "semestre": 1, "creditos": 6, "prerrequisitos": [] },
    { "id": "PRG1", "nombre": "Programación I", "semestre": 1, "creditos": 8, "prerrequisitos": [] },
    { "id": "FIS1", "nombre": "Física I", "semestre": 1, "creditos": 6, "prerrequisitos": [] },
    { "id": "COM", "nombre": "Comunicación Oral y Escrita", "semestre": 1, "creditos": 4, "prerrequisitos": [] },

    { "id": "MAT2", "nombre": "Cálculo II", "semestre": 2, "creditos": 8, "prerrequisitos": ["MAT1"] },
    { "id": "DIS", "nombre": "Matemáticas Discretas", "semestre": 2, "creditos": 6, "prerrequisitos": ["ALG"] },
    { "id": "PRG2", "nombre": "Programación II", "semestre": 2, "creditos": 8, "prerrequisitos": ["PRG1"] },
    { "id": "FIS2", "nombre": "Física II", "semestre": 2, "creditos": 6, "prerrequisitos": ["FIS1", "MAT1"] },
    { "id": "ARQ", "nombre": "Arquitectura de Computadoras", "semestre": 2, "creditos": 6, "prerrequisitos": ["PRG1"] },

    { "id": "MAT3", "nombre": "Ecuaciones Diferenciales", "semestre": 3, "creditos": 6, "prerrequisitos": ["MAT2"] },
    { "id": "EDD", "nombre": "Estructuras de Datos", "semestre": 3, "creditos": 8, "prerrequisitos": ["PRG2", "DIS"] },
    { "id": "POO", "nombre": "Programación Orientada a Objetos", "semestre": 3, "creditos": 8, "prerrequisitos": ["PRG2"] },
    { "id": "ELE", "nombre": "Electrónica Digital", "semestre": 3, "creditos": 6, "prerrequisitos": ["FIS2", "ARQ"] },
    { "id": "PROB", "nombre": "Probabilidad y Estadística", "semestre": 3, "creditos": 6, "prerrequisitos": ["MAT2"] },

    { "id": "ALGO", "nombre": "Análisis de Algoritmos", "semestre": 4, "creditos": 8, "prerrequisitos": ["EDD"] },
    { "id": "BD1", "nombre": "Bases de Datos", "semestre": 4, "creditos": 8, "prerrequisitos": ["EDD"] },
    { "id": "SO", "nombre": "Sistemas Operativos", "semestre": 4, "creditos": 8, "prerrequisitos": ["EDD", "ARQ"] },
    { "id": "MNUM", "nombre": "Métodos Numéricos", "semestre": 4, "creditos": 6, "prerrequisitos": ["MAT3", "PRG2"] },
    { "id": "ING1", "nombre": "Ingeniería de Software I", "semestre": 4, "creditos": 6, "prerrequisitos": ["POO"] },

    { "id": "RED", "nombre": "Redes de Computadoras", "semestre": 5, "creditos": 8, "prerrequisitos": ["SO"] },
    { "id": "BD2", "nombre": "Bases de Datos Avanzadas", "semestre": 5, "creditos": 6, "prerrequisitos": ["BD1"] },
    { "id": "AUT", "nombre": "Teoría de la Computación", "semestre": 5, "creditos": 6, "prerrequisitos": ["ALGO"] },
    { "id": "ING2", "nombre": "Ingeniería de Software II", "semestre": 5, "creditos": 6, "prerrequisitos": ["ING1", "BD1"] },
    { "id": "WEB", "nombre": "Desarrollo Web", "semestre": 5, "creditos": 6, "prerrequisitos": ["POO", "BD1"] },

    { "id": "IA", "nombre": "Inteligencia Artificial", "semestre": 6, "creditos": 8, "prerrequisitos": ["ALGO", "PROB"] },
    { "id": "SEG", "nombre": "Seguridad Informática", "semestre": 6, "creditos": 6, "prerrequisitos": ["RED"] },
    { "id": "COMP", "nombre": "Compiladores", "semestre": 6, "creditos": 8, "prerrequisitos": ["AUT"] },
    { "id": "DIST", "nombre": "Sistemas Distribuidos", "semestre": 6, "creditos": 6, "prerrequisitos": ["RED", "SO"] },
    { "id": "GP", "nombre": "Gestión de Proyectos", "semestre": 6, "creditos": 4, "prerrequisitos": ["ING2"] },

    { "id": "ML", "nombre": "Aprendizaje Automático", "semestre": 7, "creditos": 8, "prerrequisitos": ["IA", "MNUM"] },
    { "id": "NUBE", "nombre": "Computación en la Nube", "semestre": 7, "creditos": 6, "prerrequisitos": ["DIST"] },
    { "id": "OPT1", "nombre": "Optativa I", "semestre": 7, "creditos": 6, "prerrequisitos": [] },
    { "id": "ETI", "nombre": "Ética Profesional", "semestre": 7, "creditos": 4, "prerrequisitos": ["COM"] },

    { "id": "TES", "nombre": "Proyecto Terminal", "semestre": 8, "creditos": 12, "prerrequisitos": ["GP", "ING2", "ML"] },
    { "id": "OPT2", "nombre": "Optativa II", "semestre": 8, "creditos": 6, "prerrequisitos": ["OPT1"] },
    { "id": "SS", "nombre": "Servicio Social", "semestre": 8, "creditos": 10, "prerrequisitos": ["ETI"] }
  ]
};
