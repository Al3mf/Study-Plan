(() => {
  "use strict";

  // ---------- Configuración del diagrama ----------
  const NODO_W = 190;
  const NODO_H = 64;
  const COL_W = 250;     // separación horizontal entre semestres
  const FILA_H = 86;     // separación vertical entre materias
  const CABECERA_H = 72; // espacio para el título del semestre
  const MARGEN = 30;

  // Sesiones: cada una pertenece a un plan y guarda su propio progreso y título.
  const CLAVE_SESIONES = "tracker-sesiones";
  const CLAVE_SESION_ACTUAL = "tracker-sesion-actual";
  const MAX_SESIONES = 3; // por plan
  // Claves de la versión anterior (una carrera a la vez); se migran a sesiones.
  const CLAVE_CARRERA_ANTIGUA = "tracker-carrera";
  // Clave antigua: cuando se podía cargar un plan desde archivo. Se borra al iniciar.
  const CLAVE_PLAN_ANTIGUA = "tracker-plan:actual";
  const CARRERAS = Array.isArray(window.CARRERAS) ? window.CARRERAS : [];
  const CLAVE_EXTRAS = "tracker-mostrar-extras";

  // Estados que el usuario puede elegir. "pendiente" se muestra como
  // disponible o bloqueada según los requisitos.
  const ESTADOS = [
    { id: "pendiente", nombre: "Pendiente" },
    { id: "cursando", nombre: "Cursando" },
    { id: "aprobada", nombre: "Aprobada" },
    { id: "reprobada", nombre: "Reprobada" },
    { id: "recursando", nombre: "Recursando" },
    { id: "unica", nombre: "Materia única" },
  ];
  const ESTADOS_VALIDOS = new Set(ESTADOS.map((e) => e.id));
  // Estados que significan "la reprobaste al menos una vez".
  const REPROBADAS = new Set(["reprobada", "recursando", "unica"]);

  const SVG_NS = "http://www.w3.org/2000/svg";
  const $ = (sel) => document.querySelector(sel);

  const svg = $("#lienzo");
  const viewport = $("#viewport");
  const capaCols = $("#capa-columnas");
  const capaAristas = $("#capa-aristas");
  const capaNodos = $("#capa-nodos");

  // ---------- Estado ----------
  let plan = null;          // { nombre, materias: [...] }
  let sesion = null;        // { id, carrera, nombre, creada, actualizada }
  let porId = new Map();    // id -> materia
  let hijos = new Map();    // id -> [ids que la requieren]
  let progreso = {};        // id -> uno de ESTADOS (salvo "pendiente", que no se guarda)
  let pos = new Map();      // id -> {x, y}
  let elNodos = new Map();  // id -> <g>
  let elAristas = [];       // [{de, a, el}]
  let seleccion = null;
  let hoverId = null;
  let vista = { x: 0, y: 0, k: 1 };
  let mostrarExtras = true; // columnas con nombre (p. ej. áreas de énfasis)
  let filtroClasif = null;  // { tipo: "clasificacion" | "departamento", valor } para resaltar

  const esVisible = (m) => mostrarExtras || typeof m.semestre === "number";

  // ---------- Utilidades ----------
  function el(tag, attrs = {}, padre) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (padre) padre.appendChild(e);
    return e;
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), 3200);
  }

  const claveProgresoDe = (idSesion) => "tracker-progreso-sesion:" + idSesion;
  const claveTituloDe = (idSesion) => "tracker-titulo-sesion:" + idSesion;
  function claveProgreso() {
    return claveProgresoDe(sesion?.id || "ninguna");
  }
  function claveTitulo() {
    return claveTituloDe(sesion?.id || "ninguna");
  }

  function leerStorage(clave) {
    try { return JSON.parse(localStorage.getItem(clave)); } catch { return null; }
  }
  function escribirStorage(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch { /* sin almacenamiento */ }
  }

  function descargar(nombreArchivo, datos) {
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombreArchivo;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function leerArchivoJSON(input, alCargar) {
    const archivo = input.files?.[0];
    if (!archivo) return;
    const lector = new FileReader();
    lector.onload = () => {
      try { alCargar(JSON.parse(lector.result)); }
      catch (e) { toast("El archivo no es un JSON válido: " + e.message); }
      input.value = "";
    };
    lector.readAsText(archivo);
  }

  // Parte un texto en como máximo `maxLineas` líneas de ~`maxChars` caracteres.
  function partirTexto(texto, maxChars = 20, maxLineas = 2) {
    const palabras = texto.split(/\s+/);
    const lineas = [];
    let actual = "";
    for (const p of palabras) {
      if ((actual + " " + p).trim().length <= maxChars) actual = (actual + " " + p).trim();
      else { if (actual) lineas.push(actual); actual = p; }
    }
    if (actual) lineas.push(actual);
    if (lineas.length > maxLineas) {
      lineas.length = maxLineas;
      lineas[maxLineas - 1] = lineas[maxLineas - 1].slice(0, maxChars - 1) + "…";
    }
    return lineas;
  }

  // ---------- Validación del plan ----------
  function normalizarPlan(datos) {
    if (!datos || !Array.isArray(datos.materias) || datos.materias.length === 0) {
      throw new Error('el plan debe tener una lista "materias" no vacía');
    }
    const avisos = [];
    const ids = new Set();
    const materias = datos.materias.map((m, i) => {
      if (!m || m.id == null || !m.nombre) throw new Error(`la materia #${i + 1} necesita "id" y "nombre"`);
      const id = String(m.id);
      if (ids.has(id)) throw new Error(`id repetido: "${id}"`);
      ids.add(id);
      // "semestre" puede ser un número (columna de semestre) o un texto
      // (columna extra, p. ej. "Énfasis: Ciberseguridad").
      let semestre;
      if (typeof m.semestre === "string" && isNaN(Number(m.semestre))) semestre = m.semestre.trim();
      else {
        semestre = Math.floor(Number(m.semestre));
        if (!Number.isFinite(semestre) || semestre < 1) throw new Error(`"${m.nombre}" necesita un "semestre" ≥ 1 o una etiqueta de columna`);
      }
      const grupoMin = m.creditosMinimosGrupo;
      return {
        id,
        nombre: String(m.nombre),
        semestre,
        creditos: Number(m.creditos) || 0,
        prerrequisitos: (m.prerrequisitos || []).map(String),
        clasificacion: m.clasificacion ? String(m.clasificacion) : "",
        grupo: m.grupo ? String(m.grupo) : "",
        departamento: m.departamento ? String(m.departamento) : "",
        optativa: !!m.optativa,
        electiva: !!m.electiva,
        creditosMinimos: Number(m.creditosMinimos) || 0,
        creditosMinimosGrupo: grupoMin && grupoMin.grupo
          ? { grupo: String(grupoMin.grupo), creditos: Number(grupoMin.creditos) || 0 } : null,
        grupoCompleto: m.grupoCompleto ? String(m.grupoCompleto) : "",
        nota: m.nota ? String(m.nota) : "",
      };
    });
    for (const m of materias) {
      m.prerrequisitos = m.prerrequisitos.filter((p) => {
        if (!ids.has(p)) { avisos.push(`"${m.nombre}" requiere "${p}", que no existe`); return false; }
        return true;
      });
    }
    return {
      plan: {
        nombre: String(datos.nombre || "Mi plan de estudios"),
        creditosParaEgresar: Number(datos.creditosParaEgresar) || 0,
        grupos: datos.grupos && typeof datos.grupos === "object" ? datos.grupos : {},
        clasificaciones: datos.clasificaciones && typeof datos.clasificaciones === "object" ? datos.clasificaciones : {},
        departamentos: datos.departamentos && typeof datos.departamentos === "object" ? datos.departamentos : {},
        metas: Array.isArray(datos.metas) ? datos.metas.filter((x) => x && x.nombre && x.creditos > 0) : [],
        notas: Array.isArray(datos.notas) ? datos.notas.map(String) : [],
        id: String(datos.id || ""),
        etiquetaExtras: String(datos.etiquetaExtras || "Áreas de énfasis"),
        materias,
      },
      avisos,
    };
  }

  // ---------- Lógica de estados ----------
  function estadoGuardado(id) {
    return progreso[id] || "pendiente";
  }

  function faltantes(m) {
    return m.prerrequisitos.filter((p) => estadoGuardado(p) !== "aprobada");
  }

  function creditosAprobados(filtro = () => true) {
    let t = 0;
    for (const m of plan.materias) if (estadoGuardado(m.id) === "aprobada" && filtro(m)) t += m.creditos;
    return t;
  }

  function nombreGrupo(g) {
    return plan.grupos[g] || g;
  }

  // Requisitos que no son materias: créditos mínimos, créditos de un grupo,
  // o tener aprobadas todas las obligatorias de un grupo.
  function requisitosExtra(m) {
    const r = [];
    if (m.creditosMinimos) {
      const t = creditosAprobados();
      r.push({ texto: `${m.creditosMinimos} créditos aprobados (llevas ${t})`, ok: t >= m.creditosMinimos });
    }
    if (m.creditosMinimosGrupo) {
      const { grupo, creditos } = m.creditosMinimosGrupo;
      const t = creditosAprobados((x) => x.grupo === grupo);
      r.push({ texto: `${creditos} créditos de ${nombreGrupo(grupo)} (llevas ${t})`, ok: t >= creditos });
    }
    if (m.grupoCompleto) {
      const pend = plan.materias.filter((x) => x.grupo === m.grupoCompleto && !x.optativa && estadoGuardado(x.id) !== "aprobada");
      r.push({ texto: `Todas las obligatorias de ${nombreGrupo(m.grupoCompleto)}` +
                      (pend.length ? ` (faltan ${pend.length})` : ""), ok: pend.length === 0 });
    }
    return r;
  }

  // Lista legible de todo lo que falta para poder cursar `m`.
  function motivosBloqueo(m) {
    return [
      ...faltantes(m).map((p) => porId.get(p).nombre),
      ...requisitosExtra(m).filter((r) => !r.ok).map((r) => r.texto),
    ];
  }

  // Estado visual: el guardado, o disponible / bloqueada si está pendiente.
  function estadoVisual(m) {
    const e = estadoGuardado(m.id);
    if (e !== "pendiente") return e;
    return motivosBloqueo(m).length ? "bloqueada" : "disponible";
  }

  function fijarEstado(id, estado) {
    if (!ESTADOS_VALIDOS.has(estado)) return;
    const m = porId.get(id);
    // Si la marcas como cursando o aprobada sin cumplir requisitos, se aplica
    // igual (tú decides) pero se avisa.
    if ((estado === "cursando" || estado === "aprobada") && estadoGuardado(id) !== estado) {
      const f = motivosBloqueo(m);
      if (f.length) toast(`Ojo: a "${m.nombre}" le falta ${f.join("; ")}.`);
    }
    if (estado === "pendiente") delete progreso[id];
    else progreso[id] = estado;
    guardarProgreso();
    actualizar();
  }

  function ancestros(id, acc = new Set()) {
    for (const p of porId.get(id).prerrequisitos) if (!acc.has(p)) { acc.add(p); ancestros(p, acc); }
    return acc;
  }
  function descendientes(id, acc = new Set()) {
    for (const h of hijos.get(id) || []) if (!acc.has(h)) { acc.add(h); descendientes(h, acc); }
    return acc;
  }

  // ---------- Layout ----------
  function calcularLayout() {
    const porSem = new Map();
    for (const m of plan.materias.filter(esVisible)) {
      if (!porSem.has(m.semestre)) porSem.set(m.semestre, []);
      porSem.get(m.semestre).push(m);
    }
    // Primero las columnas numéricas (semestres) en orden; después las
    // columnas con nombre (p. ej. áreas de énfasis) en el orden del archivo.
    const claves = [...porSem.keys()];
    const semestres = [
      ...claves.filter((k) => typeof k === "number").sort((a, b) => a - b),
      ...claves.filter((k) => typeof k !== "number"),
    ];
    const colDe = new Map(semestres.map((s, i) => [s, i]));
    const filaDe = new Map();

    // Orden inicial: el del archivo. Luego reordenamos cada columna según la
    // posición media de sus prerrequisitos (heurística de baricentro) para
    // reducir cruces de flechas.
    for (const s of semestres) porSem.get(s).forEach((m, i) => filaDe.set(m.id, i));
    for (let pasada = 0; pasada < 3; pasada++) {
      for (const s of semestres) {
        if (typeof s !== "number") continue; // columnas con nombre: se respeta el orden del archivo
        const col = porSem.get(s);
        const peso = (m) => {
          const vecinos = m.prerrequisitos.filter((p) => colDe.get(porId.get(p).semestre) < colDe.get(s));
          if (!vecinos.length) return filaDe.get(m.id);
          return vecinos.reduce((t, p) => t + filaDe.get(p), 0) / vecinos.length;
        };
        const pesos = new Map(col.map((m) => [m.id, peso(m)]));
        col.sort((a, b) => pesos.get(a.id) - pesos.get(b.id) || filaDe.get(a.id) - filaDe.get(b.id));
        col.forEach((m, i) => filaDe.set(m.id, i));
      }
    }

    pos = new Map();
    const maxFilas = Math.max(...semestres.map((s) => porSem.get(s).length));
    semestres.forEach((s, ci) => {
      const col = porSem.get(s);
      const offset = ((maxFilas - col.length) * FILA_H) / 2; // centrar verticalmente
      col.forEach((m, fi) => pos.set(m.id, { x: MARGEN + ci * COL_W, y: MARGEN + CABECERA_H + offset + fi * FILA_H }));
    });

    return { semestres, porSem, ancho: MARGEN * 2 + (semestres.length - 1) * COL_W + NODO_W,
             alto: MARGEN * 2 + CABECERA_H + maxFilas * FILA_H };
  }

  // ---------- Dibujo ----------
  let layout;
  let elCols = [];

  function dibujar() {
    capaCols.replaceChildren();
    capaAristas.replaceChildren();
    capaNodos.replaceChildren();
    elNodos = new Map();
    elAristas = [];
    elCols = [];

    layout = calcularLayout();

    layout.semestres.forEach((s, ci) => {
      const x = MARGEN + ci * COL_W - 15;
      const g = el("g", {}, capaCols);
      const esSemestre = typeof s === "number";
      if (!esSemestre) g.setAttribute("class", "col-extra");
      el("rect", { x, y: MARGEN - 10, width: NODO_W + 30, height: layout.alto - MARGEN, rx: 14, class: "col-fondo" }, g);
      const lineas = esSemestre ? [`Semestre ${s}`] : partirTexto(s, 28, 2);
      lineas.forEach((l, i) =>
        (el("text", { x: x + 15, y: MARGEN + 14 + i * 16, class: "col-titulo" + (esSemestre ? "" : " chico") }, g).textContent = l));
      const sub = el("text", { x: x + 15, y: MARGEN + 18 + lineas.length * 16, class: "col-sub" }, g);
      elCols.push({ s, sub });
    });

    for (const m of plan.materias) {
      const b = pos.get(m.id);
      if (!b) continue;
      for (const p of m.prerrequisitos) {
        const a = pos.get(p);
        if (!a) continue;
        let d;
        if (a.x === b.x) {
          // Misma columna: arco por el costado derecho.
          const x = a.x + NODO_W, y1 = a.y + NODO_H / 2, y2 = b.y + NODO_H / 2;
          const sal = 18 + Math.abs(y2 - y1) / FILA_H * 8;
          d = `M${x},${y1} C${x + sal},${y1} ${x + sal},${y2} ${x + 2},${y2}`;
        } else {
          const x1 = a.x + NODO_W, y1 = a.y + NODO_H / 2;
          const x2 = b.x - 2, y2 = b.y + NODO_H / 2;
          const dx = Math.max(40, (x2 - x1) / 2);
          d = `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
        }
        const path = el("path", { d, class: "arista", "marker-end": "url(#flecha)" }, capaAristas);
        elAristas.push({ de: p, a: m.id, el: path });
      }
    }

    for (const m of plan.materias) {
      if (!pos.has(m.id)) continue;
      const { x, y } = pos.get(m.id);
      const g = el("g", { class: "nodo", transform: `translate(${x},${y})`, tabindex: 0, "data-id": m.id }, capaNodos);
      // Estilo del recuadro según la clasificación de la facultad (como en el PDF).
      const estilo = plan.departamentos[m.departamento]?.estilo || "";
      const rx = estilo === "redondeado" || estilo === "redondeado-simple" ? 20 : 10;
      g._estilo = estilo ? " depto-" + estilo : "";
      el("rect", { class: "caja", width: NODO_W, height: NODO_H, rx }, g);
      if (estilo === "doble" || estilo === "redondeado") {
        el("rect", { class: "caja-interna", x: 4, y: 4, width: NODO_W - 8, height: NODO_H - 8, rx: rx - 3 }, g);
      }
      el("rect", { class: "franja", width: 6, height: NODO_H - 16, x: 9, y: 8, rx: 3 }, g);
      const lineas = partirTexto(m.nombre + (m.optativa ? " *" : ""));
      const y0 = lineas.length === 1 ? 26 : 20;
      lineas.forEach((l, i) => (el("text", { class: "nombre", x: 22, y: y0 + i * 15 }, g).textContent = l));
      el("text", { class: "meta", x: 22, y: NODO_H - 11 }, g).textContent =
        [m.id, m.creditos ? m.creditos + " cr" : "", m.optativa ? "optativa" : ""]
          .filter(Boolean).join(" · ");
      if (m.clasificacion) {
        // Insignia de clasificación (p. ej. CACEI), con los colores del plan.
        const c = plan.clasificaciones[m.clasificacion] || {};
        const ins = el("g", { class: "insignia" + (c.color ? "" : " sin-color"), transform: `translate(${NODO_W - 36},${NODO_H - 24})` }, g);
        el("rect", { width: 28, height: 16, rx: 4, ...(c.color ? { fill: c.color } : {}) }, ins);
        el("text", { x: 14, y: 12, "text-anchor": "middle", ...(c.texto ? { fill: c.texto } : {}) }, ins).textContent = m.clasificacion;
      }
      el("use", { class: "icono", x: NODO_W - 24, y: 8, width: 14, height: 14 }, g);
      const titulo = el("title", {}, g);
      g._titulo = titulo;
      elNodos.set(m.id, g);
    }

    pintarTitulo();
  }

  // ---------- Título editable ----------
  function tituloActual() {
    const t = leerStorage(claveTitulo());
    return typeof t === "string" && t.trim() ? t : plan.nombre;
  }

  function pintarTitulo() {
    const t = tituloActual();
    $("#plan-nombre").textContent = t;
    $("#sesion-nombre").textContent = sesion ? sesion.nombre : "";
    document.title = `${t}${sesion ? " · " + sesion.nombre : ""} · Tracker`;
  }

  const h1 = $("#plan-nombre");
  h1.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); h1.blur(); }
    if (e.key === "Escape") { h1.textContent = tituloActual(); h1.blur(); }
  });
  h1.addEventListener("blur", () => {
    if (!plan) return;
    const t = h1.textContent.replace(/\s+/g, " ").trim();
    if (!t || t === plan.nombre) {
      try { localStorage.removeItem(claveTitulo()); } catch { /* sin almacenamiento */ }
    } else escribirStorage(claveTitulo(), t);
    pintarTitulo();
  });
  $("#btn-titulo").onclick = () => {
    h1.focus();
    const r = document.createRange();
    r.selectNodeContents(h1);
    const sel = getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
  };

  // Ícono (del sprite de index.html) para cada estado visual.
  const ICONOS = { aprobada: "check", cursando: "reloj", disponible: "", bloqueada: "candado",
                   reprobada: "x", recursando: "repetir", unica: "alerta" };

  // Ícono en línea para HTML, del mismo sprite.
  function iconoHTML(nombre) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "ico");
    svg.setAttribute("aria-hidden", "true");
    el("use", { href: "#i-" + nombre }, svg);
    return svg;
  }
  const ETIQUETAS = { aprobada: "Aprobada", cursando: "Cursando", disponible: "Disponible", bloqueada: "Bloqueada",
                      reprobada: "Reprobada", recursando: "Recursando", unica: "Materia única" };

  function actualizar() {
    const conteo = { aprobada: 0, cursando: 0, disponible: 0, bloqueada: 0, reprobada: 0, recursando: 0, unica: 0 };
    let credTot = 0, credOk = 0;

    for (const m of plan.materias) {
      const e = estadoVisual(m);
      conteo[e]++;
      credTot += m.creditos;
      if (e === "aprobada") credOk += m.creditos;
      const g = elNodos.get(m.id);
      if (!g) continue;
      g.setAttribute("class", `nodo ${e}${g._estilo}${seleccion === m.id ? " seleccionado" : ""}`);
      const icono = g.querySelector(".icono");
      if (ICONOS[e]) icono.setAttribute("href", "#i-" + ICONOS[e]);
      else icono.removeAttribute("href");
      g._titulo.textContent = `${m.nombre} (${m.id}) — ${ETIQUETAS[e]}`;
    }

    for (const a of elAristas) a.el.classList.toggle("cumplida", estadoGuardado(a.de) === "aprobada");

    for (const { s, sub } of elCols) {
      const col = layout.porSem.get(s);
      const ok = col.filter((m) => estadoGuardado(m.id) === "aprobada");
      const crOk = ok.reduce((t, m) => t + m.creditos, 0);
      const crTot = col.reduce((t, m) => t + m.creditos, 0);
      sub.textContent = `${ok.length}/${col.length} aprobadas` + (crTot ? ` · ${crOk}/${crTot} cr` : "");
    }

    // Si el plan no define créditos, el progreso se mide por número de materias.
    // Si el plan define "creditosParaEgresar", el avance se mide contra esa meta.
    const usarCreditos = credTot > 0;
    if (plan.creditosParaEgresar) credTot = plan.creditosParaEgresar;
    const pct = Math.min(1, usarCreditos ? credOk / credTot : conteo.aprobada / plan.materias.length);
    $("#barra-relleno").style.width = (pct * 100).toFixed(1) + "%";
    $("#txt-porcentaje").textContent = Math.round(pct * 100) + "%";
    $("#txt-creditos").textContent = usarCreditos
      ? `${credOk} / ${credTot} créditos · ${conteo.aprobada} de ${plan.materias.length} materias`
      : `${conteo.aprobada} de ${plan.materias.length} materias`;
    for (const k of Object.keys(conteo)) $("#n-" + k).textContent = conteo[k];
    // "Reprobadas" cuenta todas las que reprobaste alguna vez y aún no apruebas.
    $("#n-reprobadas-total").textContent = conteo.reprobada + conteo.recursando + conteo.unica;
    pintarMetas();
    pintarClasificaciones();
    pintarSelector();

    pintarDetalle();
    aplicarFoco();
  }

  // ---------- Metas del plan ----------
  const FILTROS_META = {
    obligatorias: (m) => !m.optativa && !m.electiva,
    optativas: (m) => m.optativa,
    electivas: (m) => m.electiva,
    noObligatorias: (m) => m.optativa || m.electiva,
  };

  function pintarMetas() {
    const cont = $("#metas");
    cont.replaceChildren();
    $("#sec-metas").hidden = plan.metas.length === 0;
    for (const meta of plan.metas) {
      let filtro = FILTROS_META[meta.tipo] || (() => true);
      if (meta.grupo) filtro = (m) => m.grupo === meta.grupo;
      const t = creditosAprobados(filtro);
      const pct = Math.min(1, t / meta.creditos);
      const div = document.createElement("div");
      div.className = "meta" + (pct >= 1 ? " cumplida" : "");
      div.innerHTML = `<div class="meta-fila"><span></span><b></b></div><div class="barra fina"><div class="barra-relleno"></div></div>`;
      div.querySelector("span").textContent = meta.nombre;
      div.querySelector("b").textContent = `${t}/${meta.creditos}`;
      div.querySelector(".barra-relleno").style.width = (pct * 100).toFixed(1) + "%";
      cont.appendChild(div);
    }
  }

  function pintarNotas() {
    const ul = $("#notas");
    ul.replaceChildren();
    $("#menu-reglas").hidden = plan.notas.length === 0;
    for (const n of plan.notas) {
      const li = document.createElement("li");
      li.textContent = n;
      ul.appendChild(li);
    }
  }

  // ---------- Clasificaciones ----------
  function pintarClasificaciones() {
    const sec = $("#sec-clasif");
    // Valores usados por las materias, en el orden en que el plan los define.
    const usadas = (campo, defs) => {
      const set = new Set(plan.materias.map((m) => m[campo]).filter(Boolean));
      return [...Object.keys(defs).filter((k) => set.has(k)), ...[...set].filter((k) => !(k in defs))];
    };
    const clasifs = usadas("clasificacion", plan.clasificaciones);
    const deptos = usadas("departamento", plan.departamentos);
    sec.hidden = clasifs.length === 0 && deptos.length === 0;
    if (sec.hidden) return;

    const fila = (tipo, valor, muestra, nombre) => {
      const delGrupo = plan.materias.filter((m) => m[tipo] === valor);
      const tot = delGrupo.reduce((t, m) => t + m.creditos, 0);
      const ok = creditosAprobados((m) => m[tipo] === valor);
      const li = document.createElement("li");
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      const activo = filtroClasif && filtroClasif.tipo === tipo && filtroClasif.valor === valor;
      li.className = activo ? "activo" : "";
      li.title = "Resaltar estas materias";
      li.append(muestra);
      const span = document.createElement("span");
      span.textContent = nombre;
      const b = document.createElement("b");
      b.textContent = tot ? `${ok}/${tot}` : `${delGrupo.length}`;
      li.append(span, b);
      const alternar = () => {
        filtroClasif = activo ? null : { tipo, valor };
        pintarClasificaciones();
        aplicarFoco();
      };
      li.onclick = alternar;
      li.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); alternar(); } };
      return li;
    };

    const ulC = $("#lista-clasif");
    ulC.replaceChildren();
    $("#titulo-clasif").hidden = ulC.hidden = clasifs.length === 0;
    for (const c of clasifs) {
      const def = plan.clasificaciones[c] || {};
      const muestra = document.createElement("span");
      muestra.className = "insignia-html" + (def.color ? "" : " sin-color");
      muestra.textContent = c;
      if (def.color) muestra.style.background = def.color;
      if (def.texto) muestra.style.color = def.texto;
      ulC.appendChild(fila("clasificacion", c, muestra, def.nombre || c));
    }

    const ulD = $("#lista-deptos");
    ulD.replaceChildren();
    $("#titulo-deptos").hidden = ulD.hidden = deptos.length === 0;
    for (const d of deptos) {
      const def = plan.departamentos[d] || {};
      const muestra = document.createElement("span");
      muestra.className = "muestra-depto " + (def.estilo || "");
      ulD.appendChild(fila("departamento", d, muestra, def.nombre || d));
    }
  }

  // ---------- Selector de estado ----------
  function crearBotonesEstado(cont, alElegir) {
    cont.replaceChildren();
    for (const est of ESTADOS) {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.estado = est.id;
      b.innerHTML = `<span class="punto ${est.id}"></span>`;
      b.append(est.nombre);
      b.onclick = () => alElegir(est.id);
      cont.appendChild(b);
    }
  }

  let selectorId = null;

  function abrirSelector(id) {
    selectorId = id;
    seleccion = id;
    actualizar();
    const pop = $("#selector");
    pop.hidden = false;
    posicionarSelector();
    pop.querySelector(`button[data-estado="${estadoGuardado(id)}"]`)?.focus();
  }

  function cerrarSelector(devolverFoco = false) {
    if (!selectorId) return;
    const id = selectorId;
    selectorId = null;
    $("#selector").hidden = true;
    if (devolverFoco) elNodos.get(id)?.focus();
  }

  function posicionarSelector() {
    if (!selectorId) return;
    const g = elNodos.get(selectorId);
    if (!g) return cerrarSelector();
    const pop = $("#selector");
    const wrap = svg.parentElement.getBoundingClientRect();
    const r = g.getBoundingClientRect();
    const w = pop.offsetWidth, h = pop.offsetHeight;
    let x = r.right - wrap.left + 8;
    if (x + w > wrap.width - 8) x = r.left - wrap.left - w - 8;   // no cabe a la derecha
    x = Math.max(8, Math.min(x, wrap.width - w - 8));
    let y = r.top - wrap.top;
    y = Math.max(8, Math.min(y, wrap.height - h - 8));
    pop.style.left = x + "px";
    pop.style.top = y + "px";
  }

  function pintarSelector() {
    if (!selectorId) return;
    const m = porId.get(selectorId);
    $("#sel-nombre").textContent = m.nombre;
    const f = motivosBloqueo(m);
    const aviso = $("#sel-aviso");
    aviso.hidden = f.length === 0 || estadoGuardado(m.id) === "aprobada";
    aviso.textContent = "Te falta: " + f.join("; ");
    for (const b of $("#sel-estados").children) b.classList.toggle("activo", b.dataset.estado === estadoGuardado(m.id));
    posicionarSelector();
  }

  crearBotonesEstado($("#sel-estados"), (est) => {
    const id = selectorId;
    fijarEstado(id, est);
    cerrarSelector(true);
  });
  crearBotonesEstado($("#det-estados"), (est) => seleccion && fijarEstado(seleccion, est));
  $("#sel-cerrar").onclick = () => cerrarSelector(true);

  document.addEventListener("pointerdown", (e) => {
    if (selectorId && !e.target.closest("#selector") && !e.target.closest(".nodo")) cerrarSelector();
  });

  // ---------- Panel de detalle ----------
  function pintarDetalle() {
    const panel = $("#detalle");
    if (!seleccion || !porId.has(seleccion)) { panel.hidden = true; return; }
    const m = porId.get(seleccion);
    panel.hidden = false;
    $("#det-nombre").textContent = m.nombre;
    $("#det-meta").textContent =
      [m.id, typeof m.semestre === "number" ? `Semestre ${m.semestre}` : m.semestre,
       m.creditos ? m.creditos + " créditos" : "", m.clasificacion,
       m.optativa ? "Optativa" : "", m.electiva ? "Electiva" : "", ETIQUETAS[estadoVisual(m)]]
        .filter(Boolean).join(" · ");
    const extra = $("#det-extra");
    extra.replaceChildren();
    const reqs = requisitosExtra(m);
    if (m.nota) reqs.push({ texto: m.nota, nota: true });
    for (const r of reqs) {
      const li = document.createElement("li");
      li.append(iconoHTML(r.nota ? "info" : r.ok ? "check" : "x"), r.texto);
      li.className = r.nota ? "" : r.ok ? "ok" : "falta";
      extra.appendChild(li);
    }
    extra.hidden = reqs.length === 0;
    for (const b of $("#det-estados").children) {
      b.classList.toggle("activo", b.dataset.estado === estadoGuardado(m.id));
    }
    const chips = (ul, ids) => {
      ul.replaceChildren();
      if (!ids.length) {
        const li = document.createElement("li");
        li.className = "vacio";
        li.textContent = "Ninguna";
        ul.appendChild(li);
        return;
      }
      for (const id of ids) {
        const li = document.createElement("li");
        li.textContent = porId.get(id).nombre;
        if (estadoGuardado(id) === "aprobada") li.className = "ok";
        else if (REPROBADAS.has(estadoGuardado(id))) li.className = "mal";
        li.onclick = () => {
          if (!pos.has(id)) { mostrarExtras = true; $("#chk-extras").checked = true; redibujar(); }
          seleccion = id; actualizar(); centrarEn(id);
        };
        ul.appendChild(li);
      }
    };
    chips($("#det-req"), m.prerrequisitos);
    chips($("#det-desb"), hijos.get(m.id) || []);
  }

  // ---------- Resaltado (hover / búsqueda) ----------
  function aplicarFoco() {
    const q = $("#buscar").value.trim().toLowerCase();
    let nodosFoco = null, aristasFoco = null;

    if (hoverId) {
      const A = ancestros(hoverId); A.add(hoverId);
      const D = descendientes(hoverId); D.add(hoverId);
      nodosFoco = new Set([...A, ...D]);
      aristasFoco = (a) => (A.has(a.de) && A.has(a.a)) || (D.has(a.de) && D.has(a.a));
    } else if (q) {
      nodosFoco = new Set(plan.materias
        .filter((m) => m.nombre.toLowerCase().includes(q) || m.id.toLowerCase().includes(q))
        .map((m) => m.id));
      aristasFoco = () => false;
    } else if (filtroClasif) {
      nodosFoco = new Set(plan.materias.filter((m) => m[filtroClasif.tipo] === filtroClasif.valor).map((m) => m.id));
      aristasFoco = () => false;
    }

    svg.classList.toggle("enfocado", !!nodosFoco);
    for (const [id, g] of elNodos) g.classList.toggle("foco", !!nodosFoco && nodosFoco.has(id));
    for (const a of elAristas) a.el.classList.toggle("foco", !!aristasFoco && aristasFoco(a));
  }

  // ---------- Pan & zoom ----------
  function aplicarVista() {
    viewport.setAttribute("transform", `translate(${vista.x},${vista.y}) scale(${vista.k})`);
    posicionarSelector();
  }

  function ajustar() {
    const r = svg.getBoundingClientRect();
    const k = Math.min(r.width / layout.ancho, r.height / layout.alto, 1.2);
    vista = { k, x: (r.width - layout.ancho * k) / 2, y: (r.height - layout.alto * k) / 2 };
    aplicarVista();
  }

  function zoomEn(factor, cx, cy) {
    const k = Math.min(3, Math.max(0.2, vista.k * factor));
    const f = k / vista.k;
    vista.x = cx - (cx - vista.x) * f;
    vista.y = cy - (cy - vista.y) * f;
    vista.k = k;
    aplicarVista();
  }

  function centrarEn(id) {
    const r = svg.getBoundingClientRect();
    const p = pos.get(id);
    vista.x = r.width / 2 - (p.x + NODO_W / 2) * vista.k;
    vista.y = r.height / 2 - (p.y + NODO_H / 2) * vista.k;
    aplicarVista();
  }

  let arrastre = null;
  let seMovio = false;

  svg.addEventListener("pointerdown", (e) => {
    arrastre = { x: e.clientX, y: e.clientY, vx: vista.x, vy: vista.y, id: e.pointerId };
    seMovio = false;
  });
  svg.addEventListener("pointermove", (e) => {
    if (!arrastre || e.pointerId !== arrastre.id) return;
    const dx = e.clientX - arrastre.x, dy = e.clientY - arrastre.y;
    if (!seMovio && Math.hypot(dx, dy) < 5) return;
    if (!seMovio) { seMovio = true; svg.setPointerCapture(e.pointerId); svg.classList.add("arrastrando"); }
    vista.x = arrastre.vx + dx;
    vista.y = arrastre.vy + dy;
    aplicarVista();
  });
  const finArrastre = () => { arrastre = null; svg.classList.remove("arrastrando"); };
  svg.addEventListener("pointerup", finArrastre);
  svg.addEventListener("pointercancel", finArrastre);

  svg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const r = svg.getBoundingClientRect();
    zoomEn(Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });

  const centroSvg = () => { const r = svg.getBoundingClientRect(); return [r.width / 2, r.height / 2]; };
  $("#zoom-mas").onclick = () => zoomEn(1.25, ...centroSvg());
  $("#zoom-menos").onclick = () => zoomEn(0.8, ...centroSvg());
  $("#zoom-ajustar").onclick = ajustar;

  // ---------- Interacción con nodos ----------
  const nodoDe = (e) => e.target.closest?.(".nodo");

  // Un clic selecciona la materia y abre el selector de estado; el estado
  // solo cambia cuando el usuario elige uno.
  svg.addEventListener("click", (e) => {
    if (seMovio) return; // fue un arrastre, no un clic
    const g = nodoDe(e);
    if (!g) { cerrarSelector(); seleccion = null; actualizar(); return; }
    if (selectorId === g.dataset.id) return cerrarSelector();
    abrirSelector(g.dataset.id);
  });
  svg.addEventListener("keydown", (e) => {
    const g = nodoDe(e);
    if (g && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      abrirSelector(g.dataset.id);
    }
  });
  svg.addEventListener("pointerover", (e) => {
    if (arrastre && seMovio) return;
    const g = nodoDe(e);
    const id = g ? g.dataset.id : null;
    if (id !== hoverId) { hoverId = id; aplicarFoco(); }
  });
  svg.addEventListener("pointerleave", () => { hoverId = null; aplicarFoco(); });
  svg.addEventListener("focusin", (e) => { const g = nodoDe(e); if (g) { hoverId = g.dataset.id; aplicarFoco(); } });
  svg.addEventListener("focusout", () => { hoverId = null; aplicarFoco(); });

  // ---------- Menús del encabezado ----------
  function cerrarMenus(excepto) {
    for (const m of document.querySelectorAll(".menu")) {
      if (m === excepto) continue;
      m.querySelector(".menu-panel").hidden = true;
      m.querySelector(".menu-boton").setAttribute("aria-expanded", "false");
    }
  }
  for (const menu of document.querySelectorAll(".menu")) {
    const boton = menu.querySelector(".menu-boton");
    const panel = menu.querySelector(".menu-panel");
    boton.onclick = () => {
      const abrir = panel.hidden;
      cerrarMenus(menu);
      panel.hidden = !abrir;
      boton.setAttribute("aria-expanded", String(abrir));
    };
  }
  document.addEventListener("click", (e) => { if (!e.target.closest(".menu")) cerrarMenus(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const abierto = document.querySelector(".menu-panel:not([hidden])");
    if (abierto) { cerrarMenus(); abierto.parentElement.querySelector(".menu-boton").focus(); }
    else if (selectorId) cerrarSelector(true);
  });

  // ---------- Búsqueda ----------
  $("#buscar").addEventListener("input", aplicarFoco);
  $("#buscar").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const q = e.target.value.trim().toLowerCase();
    const m = plan.materias.find((m) => m.nombre.toLowerCase().includes(q) || m.id.toLowerCase().includes(q));
    if (m) {
      if (!pos.has(m.id)) { mostrarExtras = true; $("#chk-extras").checked = true; redibujar(); }
      seleccion = m.id; actualizar(); centrarEn(m.id);
    }
  });

  // ---------- Cargar / exportar ----------
  function cargarPlan(datos) {
    const { plan: nuevo, avisos } = normalizarPlan(datos);
    plan = nuevo;
    porId = new Map(plan.materias.map((m) => [m.id, m]));
    hijos = new Map();
    for (const m of plan.materias) for (const p of m.prerrequisitos) {
      if (!hijos.has(p)) hijos.set(p, []);
      hijos.get(p).push(m.id);
    }
    progreso = leerStorage(claveProgreso()) || {};
    if (typeof progreso !== "object" || Array.isArray(progreso)) progreso = {};
    for (const [id, est] of Object.entries(progreso)) {
      if (!porId.has(id) || est === "pendiente" || !ESTADOS_VALIDOS.has(est)) delete progreso[id];
    }
    cerrarSelector();
    seleccion = null;
    hoverId = null;
    filtroClasif = null;
    const hayExtras = plan.materias.some((m) => typeof m.semestre !== "number");
    $("#toggle-extras").hidden = !hayExtras;
    $("#txt-extras").textContent = plan.etiquetaExtras;
    mostrarExtras = !hayExtras || leerStorage(CLAVE_EXTRAS) !== false;
    $("#chk-extras").checked = mostrarExtras;
    dibujar();
    pintarNotas();
    actualizar();
    ajustar();
    if (avisos.length) console.warn("Avisos del plan:", avisos);
  }

  // ---------- Sesiones ----------
  function leerSesiones() {
    const l = leerStorage(CLAVE_SESIONES);
    return Array.isArray(l) ? l.filter((x) => x && x.id && CARRERAS.some((c) => c.id === x.carrera)) : [];
  }
  function guardarSesiones(lista) {
    escribirStorage(CLAVE_SESIONES, lista);
  }
  const sesionesDe = (idCarrera) => leerSesiones().filter((x) => x.carrera === idCarrera);

  function guardarProgreso() {
    escribirStorage(claveProgreso(), progreso);
    if (!sesion) return;
    sesion.actualizada = Date.now();
    guardarSesiones(leerSesiones().map((x) => (x.id === sesion.id ? { ...x, actualizada: sesion.actualizada } : x)));
  }

  function nuevoId() {
    return "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  // Nombre libre más bajo: "Sesión 1", "Sesión 2"...
  function nombreLibre(idCarrera) {
    const usados = new Set(sesionesDe(idCarrera).map((x) => x.nombre));
    let n = 1;
    while (usados.has(`Sesión ${n}`)) n++;
    return `Sesión ${n}`;
  }

  function crearSesion(idCarrera, progresoInicial = {}, titulo = null) {
    if (sesionesDe(idCarrera).length >= MAX_SESIONES) return null;
    const x = { id: nuevoId(), carrera: idCarrera, nombre: nombreLibre(idCarrera), creada: Date.now(), actualizada: Date.now() };
    guardarSesiones([...leerSesiones(), x]);
    escribirStorage(claveProgresoDe(x.id), progresoInicial);
    if (titulo) escribirStorage(claveTituloDe(x.id), titulo);
    return x;
  }

  function renombrarSesion(id, nombre) {
    nombre = nombre.replace(/\s+/g, " ").trim().slice(0, 40);
    if (!nombre) return;
    guardarSesiones(leerSesiones().map((x) => (x.id === id ? { ...x, nombre } : x)));
    if (sesion && sesion.id === id) { sesion.nombre = nombre; pintarTitulo(); }
  }

  function eliminarSesion(id) {
    guardarSesiones(leerSesiones().filter((x) => x.id !== id));
    try {
      localStorage.removeItem(claveProgresoDe(id));
      localStorage.removeItem(claveTituloDe(id));
    } catch { /* sin almacenamiento */ }
    if (sesion && sesion.id === id) {
      // La sesión abierta ya no existe: no queda nada que mostrar detrás del menú.
      sesion = null;
      plan = null;
      try { localStorage.removeItem(CLAVE_SESION_ACTUAL); } catch { /* sin almacenamiento */ }
    }
  }

  // Resumen de una sesión para el menú: materias y créditos aprobados.
  function resumenSesion(x, carrera) {
    const prog = leerStorage(claveProgresoDe(x.id)) || {};
    const cred = new Map(carrera.materias.map((m) => [String(m.id), Number(m.creditos) || 0]));
    let aprobadas = 0, creditos = 0;
    for (const [id, est] of Object.entries(prog)) {
      if (est === "aprobada" && cred.has(id)) { aprobadas++; creditos += cred.get(id); }
    }
    const meta = carrera.creditosParaEgresar || [...cred.values()].reduce((a, b) => a + b, 0);
    return { aprobadas, creditos, pct: meta ? Math.min(100, Math.round((creditos / meta) * 100)) : 0 };
  }

  function fechaCorta(ms) {
    try {
      return new Date(ms).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
    } catch { return ""; }
  }

  const abiertas = new Set(); // carreras con el desplegable abierto en el menú
  let resaltar = null;        // sesión recién creada, para destacarla
  let confirmando = null;     // sesión con la confirmación de borrado visible
  let renombrando = null;     // sesión en edición de nombre

  function crearElemento(tag, clase, texto) {
    const e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto != null) e.textContent = texto;
    return e;
  }

  function botonIcono(icono, etiqueta, clase = "") {
    const b = crearElemento("button", "icono-boton " + clase);
    b.type = "button";
    b.setAttribute("aria-label", etiqueta);
    b.title = etiqueta;
    b.append(iconoHTML(icono));
    return b;
  }

  function filaSesion(x, c) {
    const fila = crearElemento("li", "sesion" + (sesion && sesion.id === x.id ? " actual" : "") + (resaltar === x.id ? " nueva" : ""));
    const r = resumenSesion(x, c);

    if (confirmando === x.id) {
      fila.classList.add("confirmando");
      fila.append(crearElemento("span", "sesion-confirmar", `¿Eliminar «${x.nombre}» y su progreso?`));
      const no = crearElemento("button", "boton chico", "Cancelar");
      const si = crearElemento("button", "boton chico peligro", "Eliminar");
      no.type = si.type = "button";
      no.onclick = () => { confirmando = null; pintarInicio(); };
      si.onclick = () => { confirmando = null; eliminarSesion(x.id); pintarInicio(); };
      fila.append(no, si);
      return fila;
    }

    if (renombrando === x.id) {
      const input = crearElemento("input", "sesion-input");
      input.value = x.nombre;
      input.maxLength = 40;
      input.setAttribute("aria-label", "Nombre de la sesión");
      const terminar = (guardar) => {
        if (renombrando !== x.id) return;
        renombrando = null;
        if (guardar) renombrarSesion(x.id, input.value);
        pintarInicio();
      };
      input.onkeydown = (e) => {
        if (e.key === "Enter") { e.preventDefault(); terminar(true); }
        if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); terminar(false); }
      };
      input.onblur = () => terminar(true);
      fila.append(input);
      queueMicrotask(() => { input.focus(); input.select(); });
      return fila;
    }

    const abrir = crearElemento("button", "sesion-abrir");
    abrir.type = "button";
    const nombre = crearElemento("span", "sesion-nombre", x.nombre);
    if (sesion && sesion.id === x.id) nombre.append(crearElemento("span", "etiqueta", "Abierta"));
    else if (resaltar === x.id) nombre.append(crearElemento("span", "etiqueta nueva", "Nueva"));
    const barra = crearElemento("span", "barra fina");
    const relleno = crearElemento("span", "barra-relleno");
    relleno.style.width = r.pct + "%";
    barra.append(relleno);
    const meta = crearElemento("span", "sesion-meta",
      `${r.pct}% · ${r.aprobadas} aprobadas · ${r.creditos} cr · ${fechaCorta(x.actualizada || x.creada)}`);
    abrir.append(nombre, barra, meta);
    abrir.onclick = () => abrirSesion(x.id);

    const ren = botonIcono("lapiz", `Renombrar «${x.nombre}»`);
    ren.onclick = () => { renombrando = x.id; confirmando = null; pintarInicio(); };
    const del = botonIcono("papelera", `Eliminar «${x.nombre}»`, "peligro");
    del.onclick = () => { confirmando = x.id; renombrando = null; pintarInicio(); };
    fila.append(abrir, ren, del);
    return fila;
  }

  function pintarInicio() {
    const lista = $("#lista-carreras");
    const foco = document.activeElement?.dataset?.foco; // conservar el foco al repintar
    lista.replaceChildren();
    for (const c of CARRERAS) {
      const ses = sesionesDe(c.id);
      const tiene = ses.length > 0;
      if (!tiene) abiertas.delete(c.id);
      const abierta = abiertas.has(c.id);

      const tarjeta = crearElemento("div", "carrera" + (tiene ? " con-sesiones" : "") + (abierta ? " abierta" : "")
        + (plan && plan.id === c.id ? " actual" : ""));

      // Cabecera: solo es interactiva cuando el plan tiene sesiones.
      const cab = crearElemento("div", "carrera-cabecera");
      const info = crearElemento("div", "carrera-info");
      info.append(
        crearElemento("span", "carrera-nombre", c.carrera),
        crearElemento("span", "carrera-meta",
          [c.institucion, c.version && `Plan ${c.version}`, `${c.materias.length} materias`,
           c.creditosParaEgresar && `${c.creditosParaEgresar} créditos`].filter(Boolean).join(" · ")));
      cab.append(info);
      if (tiene) {
        cab.tabIndex = 0;
        cab.setAttribute("role", "button");
        cab.setAttribute("aria-expanded", String(abierta));
        cab.dataset.foco = "cab-" + c.id;
        const cuenta = crearElemento("span", "carrera-cuenta", `${ses.length} ${ses.length === 1 ? "sesión" : "sesiones"}`);
        const chevron = iconoHTML("chevron");
        chevron.classList.add("carrera-chevron");
        cab.append(cuenta, chevron);
        const alternar = () => {
          if (abiertas.has(c.id)) abiertas.delete(c.id); else abiertas.add(c.id);
          confirmando = renombrando = null;
          pintarInicio();
        };
        cab.onclick = alternar;
        cab.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); alternar(); } };
      } else {
        cab.setAttribute("aria-disabled", "true");
      }

      const nueva = crearElemento("button", "boton nueva-sesion");
      nueva.type = "button";
      nueva.dataset.foco = "nueva-" + c.id;
      const lleno = ses.length >= MAX_SESIONES;
      nueva.disabled = lleno;
      nueva.title = lleno ? `Máximo ${MAX_SESIONES} sesiones por plan` : `Nueva sesión de ${c.carrera}`;
      nueva.append(iconoHTML("mas"), lleno ? `Máximo ${MAX_SESIONES}` : "Nueva sesión");
      nueva.onclick = () => {
        const x = crearSesion(c.id);
        if (!x) return;
        resaltar = x.id;
        abiertas.add(c.id);
        confirmando = renombrando = null;
        pintarInicio();
      };

      const fila = crearElemento("div", "carrera-fila");
      fila.append(cab, nueva);
      tarjeta.append(fila);

      // Desplegable de sesiones (se anima al abrir).
      const cont = crearElemento("div", "sesiones");
      cont.setAttribute("aria-hidden", String(!abierta));
      const interior = crearElemento("div", "sesiones-interior");
      const ul = crearElemento("ul", "sesiones-lista");
      for (const x of ses) ul.append(filaSesion(x, c));
      interior.append(ul, crearElemento("p", "sesiones-limite", `${ses.length} de ${MAX_SESIONES} sesiones`));
      cont.append(interior);
      if (!abierta) cont.inert = true;
      tarjeta.append(cont);
      lista.append(tarjeta);
    }
    $("#inicio-cerrar").hidden = !plan;
    if (foco) lista.querySelector(`[data-foco="${foco}"]`)?.focus();
  }

  function abrirInicio() {
    cerrarMenus();
    cerrarSelector();
    confirmando = renombrando = resaltar = null;
    // Abre el desplegable del plan de la sesión actual.
    if (plan) abiertas.add(plan.id);
    pintarInicio();
    $("#inicio").hidden = false;
    $("#lista-carreras [data-foco]")?.focus();
  }

  function cerrarInicio() {
    if (!plan) return; // sin sesión abierta no hay nada que mostrar detrás
    $("#inicio").hidden = true;
  }

  function abrirSesion(id) {
    const x = leerSesiones().find((s) => s.id === id);
    const c = x && CARRERAS.find((k) => k.id === x.carrera);
    if (!c) return false;
    const anterior = sesion;
    sesion = x;
    try {
      cargarPlan(c);
    } catch (err) {
      // Solo pasaría si un plan del catálogo está mal escrito.
      console.error(err);
      sesion = anterior;
      toast(`No se pudo abrir «${c.carrera}»: ${err.message}`);
      return false;
    }
    escribirStorage(CLAVE_SESION_ACTUAL, id);
    resaltar = null;
    $("#inicio").hidden = true;
    return true;
  }

  // Versión anterior: el progreso se guardaba por carrera. Lo convertimos en
  // la primera sesión de cada carrera para no perder nada.
  function migrarProgresoAntiguo() {
    if (leerStorage(CLAVE_SESIONES)) return null;
    guardarSesiones([]);
    let abrir = null;
    const ultima = leerStorage(CLAVE_CARRERA_ANTIGUA);
    for (const c of CARRERAS) {
      const prog = leerStorage("tracker-progreso:" + c.nombre);
      const titulo = leerStorage("tracker-titulo:" + c.nombre);
      if ((prog && typeof prog === "object" && Object.keys(prog).length) || titulo) {
        const x = crearSesion(c.id, prog && typeof prog === "object" ? prog : {}, typeof titulo === "string" ? titulo : null);
        if (x && c.id === ultima) abrir = x.id;
      }
      try {
        localStorage.removeItem("tracker-progreso:" + c.nombre);
        localStorage.removeItem("tracker-titulo:" + c.nombre);
      } catch { /* sin almacenamiento */ }
    }
    try { localStorage.removeItem(CLAVE_CARRERA_ANTIGUA); } catch { /* sin almacenamiento */ }
    return abrir;
  }

  $("#btn-carrera").onclick = abrirInicio;
  $("#inicio-cerrar").onclick = cerrarInicio;
  $("#inicio").addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarInicio(); });

  // ---------- Exportar / importar progreso ----------
  $("#btn-exportar").onclick = () => {
    const nombre = (plan.id || plan.nombre).replace(/[^\w\-]+/g, "_").toLowerCase();
    const ses = sesion.nombre.replace(/[^\w\-]+/g, "_").toLowerCase();
    descargar(`progreso_${nombre}_${ses}.json`,
      { carrera: plan.id, plan: plan.nombre, sesion: sesion.nombre, fecha: new Date().toISOString(), progreso });
  };

  $("#input-progreso").addEventListener("change", (e) => leerArchivoJSON(e.target, (datos) => {
    const prog = datos.progreso;
    if (!prog || typeof prog !== "object") return toast('El archivo no tiene un bloque "progreso".');
    const deOtra = datos.carrera ? datos.carrera !== plan.id : datos.plan && datos.plan !== plan.nombre;
    if (deOtra) {
      const otra = CARRERAS.find((c) => c.id === datos.carrera || c.nombre === datos.plan);
      return toast(`Ese progreso es de ${otra ? otra.carrera : "otra carrera"}. Abre una sesión de esa carrera para importarlo.`);
    }
    const validos = {};
    for (const [id, est] of Object.entries(prog)) {
      if (porId.has(id) && est !== "pendiente" && ESTADOS_VALIDOS.has(est)) validos[id] = est;
    }
    progreso = validos;
    guardarProgreso();
    actualizar();
    toast(`Progreso importado a «${sesion.nombre}»: ${Object.keys(validos).length} materia(s) marcadas.`);
  }));

  $("#btn-reiniciar").onclick = () => {
    if (!confirm(`¿Borrar todo el progreso de «${sesion.nombre}»?`)) return;
    progreso = {};
    guardarProgreso();
    actualizar();
  };

  function redibujar() {
    dibujar();
    actualizar();
    ajustar();
  }

  $("#chk-extras").addEventListener("change", (e) => {
    mostrarExtras = e.target.checked;
    escribirStorage(CLAVE_EXTRAS, mostrarExtras);
    redibujar();
  });

  window.addEventListener("resize", () => layout && ajustar());

  // ---------- Inicio ----------
  try { localStorage.removeItem(CLAVE_PLAN_ANTIGUA); } catch { /* sin almacenamiento */ }
  const migrada = migrarProgresoAntiguo();
  const guardada = migrada || leerStorage(CLAVE_SESION_ACTUAL);
  if (!(guardada && abrirSesion(guardada))) abrirInicio();
})();
