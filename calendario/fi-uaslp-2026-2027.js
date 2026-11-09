// Calendario escolar de la Facultad de Ingeniería (UASLP), ciclo 2026-2027.
// Fuente: «Agenda y Calendario de Actividades» de la Facultad de Ingeniería.
// Verifica las fechas en el sitio oficial antes de depender de ellas.
// Tipos: clases, examenes, inhabil, vacaciones, tramite.
window.CALENDARIO = {
  nombre: "Facultad de Ingeniería · Ciclo 2026-2027",
  fuente: "Agenda y Calendario de Actividades, Facultad de Ingeniería UASLP",
  url: "https://www.ingenieria.uaslp.mx/Facultad/agendacalendario.php",
  eventos: [
    { inicio: "2026-08-17", titulo: "Inicio de clases 2026-2027/I", tipo: "clases" },
    { inicio: "2026-11-16", titulo: "Día inhábil: Aniversario de la Revolución Mexicana", tipo: "inhabil" },
    { inicio: "2026-12-04", fin: "2026-12-08", titulo: "Exámenes ordinarios", tipo: "examenes" },
    { inicio: "2026-12-08", titulo: "Fecha límite de captura de calificaciones finales", tipo: "tramite" },
    { inicio: "2026-12-09", fin: "2026-12-10", titulo: "Exámenes extraordinarios", tipo: "examenes" },
    { inicio: "2026-12-10", fin: "2026-12-14", titulo: "Pago de exámenes a título de suficiencia", tipo: "tramite" },
    { inicio: "2026-12-12", titulo: "Día inhábil", tipo: "inhabil" },
    { inicio: "2026-12-21", fin: "2027-01-05", titulo: "Periodo vacacional", tipo: "vacaciones" },
    { inicio: "2027-01-25", titulo: "Inicio de clases 2026-2027/II", tipo: "clases" },
    { inicio: "2027-05-27", fin: "2027-06-02", titulo: "Exámenes ordinarios 2026-2027/II", tipo: "examenes" },
  ],
};
