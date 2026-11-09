(() => {
  "use strict";

  // ---------- Configuración del diagrama ----------
  const NODO_W = 190;
  const NODO_H = 64;
  const COL_W = 250;     // separación horizontal entre semestres
  const FILA_H = 86;     // separación vertical entre materias
  const CABECERA_H = 72; // espacio para el título del semestre
  const MARGEN = 30;

  const CLAVE_PLAN = "tracker-plan:actual";
  const CICLO = { pendiente: "cursando", cursando: "aprobada", aprobada: "pendiente" };

  const SVG_NS = "http://www.w3.org/2000/svg";
  const $ = (sel) => document.querySelector(sel);

  const svg = $("#lienzo");
  const viewport = $("#viewport");
  const capaCols = $("#capa-columnas");
  const capaAristas = $("#capa-aristas");
  const capaNodos = $("#capa-nodos");

  // ---------- Estado ----------
  let plan = null;          // { nombre, materias: [...] }
  let porId = new Map();    // id -> materia
  let hijos = new Map();    // id -> [ids que la requieren]
  let progreso = {};        // id -> "pendiente" | "cursando" | "aprobada"
  let pos = new Map();      // id -> {x, y}
  let elNodos = new Map();  // id -> <g>
  let elAristas = [];       // [{de, a, el}]
  let seleccion = null;
  let hoverId = null;
  let vista = { x: 0, y: 0, k: 1 };
  let mostrarExtras = true; // columnas con nombre (p. ej. áreas de énfasis)

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

  function claveProgreso() {
    return "tracker-progreso:" + (plan?.nombre || "plan");
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
  function partirTexto(texto, maxChars = 21, maxLineas = 2) {
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
        metas: Array.isArray(datos.metas) ? datos.metas.filter((x) => x && x.nombre && x.creditos > 0) : [],
        notas: Array.isArray(datos.notas) ? datos.notas.map(String) : [],
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

  // Estado visual: aprobada / cursando / disponible / bloqueada
  function estadoVisual(m) {
    const e = estadoGuardado(m.id);
    if (e !== "pendiente") return e;
    return motivosBloqueo(m).length ? "bloqueada" : "disponible";
  }

  function fijarEstado(id, estado) {
    if (estado === "pendiente") delete progreso[id];
    else progreso[id] = estado;
    escribirStorage(claveProgreso(), progreso);
    actualizar();
  }

  function ciclarEstado(id) {
    const m = porId.get(id);
    const actual = estadoGuardado(id);
    if (actual === "pendiente") {
      const f = motivosBloqueo(m);
      if (f.length) {
        toast(`Aún te falta: ${f.join("; ")}. ` +
              `Usa los botones del panel si quieres marcarla de todos modos.`);
        return;
      }
    }
    fijarEstado(id, CICLO[actual]);
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
      el("rect", { class: "caja", width: NODO_W, height: NODO_H, rx: 10 }, g);
      el("rect", { class: "franja", width: 6, height: NODO_H - 16, x: 6, y: 8, rx: 3 }, g);
      const lineas = partirTexto(m.nombre + (m.optativa ? " *" : ""));
      const y0 = lineas.length === 1 ? 26 : 20;
      lineas.forEach((l, i) => (el("text", { class: "nombre", x: 20, y: y0 + i * 15 }, g).textContent = l));
      el("text", { class: "meta", x: 20, y: NODO_H - 10 }, g).textContent =
        [m.id, m.creditos ? m.creditos + " cr" : "", m.clasificacion, m.optativa ? "optativa" : ""]
          .filter(Boolean).join(" · ");
      el("text", { class: "icono", x: NODO_W - 12, y: 20, "text-anchor": "end" }, g);
      const titulo = el("title", {}, g);
      g._titulo = titulo;
      elNodos.set(m.id, g);
    }

    $("#plan-nombre").textContent = plan.nombre;
    document.title = `${plan.nombre} · Tracker`;
  }

  const ICONOS = { aprobada: "✓", cursando: "●", disponible: "", bloqueada: "🔒" };
  const ETIQUETAS = { aprobada: "Aprobada", cursando: "Cursando", disponible: "Disponible", bloqueada: "Bloqueada" };

  function actualizar() {
    const conteo = { aprobada: 0, cursando: 0, disponible: 0, bloqueada: 0 };
    let credTot = 0, credOk = 0;

    for (const m of plan.materias) {
      const e = estadoVisual(m);
      conteo[e]++;
      credTot += m.creditos;
      if (e === "aprobada") credOk += m.creditos;
      const g = elNodos.get(m.id);
      if (!g) continue;
      g.setAttribute("class", `nodo ${e}${seleccion === m.id ? " seleccionado" : ""}`);
      const icono = g.querySelector(".icono");
      icono.textContent = ICONOS[e];
      icono.setAttribute("fill", `var(--${e})`);
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
    pintarMetas();

    pintarDetalle();
    aplicarFoco();
  }

  // ---------- Metas del plan ----------
  const FILTROS_META = {
    obligatorias: (m) => !m.optativa && !m.electiva,
    optativas: (m) => m.optativa,
    electivas: (m) => m.electiva,
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
    $("#sec-notas").hidden = plan.notas.length === 0;
    for (const n of plan.notas) {
      const li = document.createElement("li");
      li.textContent = n;
      ul.appendChild(li);
    }
  }

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
      li.textContent = (r.nota ? "ℹ " : r.ok ? "✓ " : "✗ ") + r.texto;
      li.className = r.nota ? "" : r.ok ? "ok" : "falta";
      extra.appendChild(li);
    }
    extra.hidden = reqs.length === 0;
    for (const b of document.querySelectorAll(".estados button")) {
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
    }

    svg.classList.toggle("enfocado", !!nodosFoco);
    for (const [id, g] of elNodos) g.classList.toggle("foco", !!nodosFoco && nodosFoco.has(id));
    for (const a of elAristas) a.el.classList.toggle("foco", !!aristasFoco && aristasFoco(a));
  }

  // ---------- Pan & zoom ----------
  function aplicarVista() {
    viewport.setAttribute("transform", `translate(${vista.x},${vista.y}) scale(${vista.k})`);
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

  svg.addEventListener("click", (e) => {
    if (seMovio) return; // fue un arrastre, no un clic
    const g = nodoDe(e);
    if (!g) { seleccion = null; actualizar(); return; }
    seleccion = g.dataset.id;
    ciclarEstado(seleccion);
    actualizar();
  });
  svg.addEventListener("keydown", (e) => {
    const g = nodoDe(e);
    if (g && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      seleccion = g.dataset.id;
      ciclarEstado(seleccion);
      actualizar();
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

  for (const b of document.querySelectorAll(".estados button")) {
    b.onclick = () => seleccion && fijarEstado(seleccion, b.dataset.estado);
  }

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
  function cargarPlan(datos, { guardar = true, progresoInicial } = {}) {
    const { plan: nuevo, avisos } = normalizarPlan(datos);
    plan = nuevo;
    porId = new Map(plan.materias.map((m) => [m.id, m]));
    hijos = new Map();
    for (const m of plan.materias) for (const p of m.prerrequisitos) {
      if (!hijos.has(p)) hijos.set(p, []);
      hijos.get(p).push(m.id);
    }
    progreso = progresoInicial || leerStorage(claveProgreso()) || {};
    for (const id of Object.keys(progreso)) if (!porId.has(id)) delete progreso[id];
    if (progresoInicial) escribirStorage(claveProgreso(), progreso);
    if (guardar) escribirStorage(CLAVE_PLAN, datos);
    seleccion = null;
    hoverId = null;
    const hayExtras = plan.materias.some((m) => typeof m.semestre !== "number");
    $("#toggle-extras").hidden = !hayExtras;
    mostrarExtras = !hayExtras || leerStorage("tracker-mostrar-extras") !== false;
    $("#chk-extras").checked = mostrarExtras;
    dibujar();
    pintarNotas();
    actualizar();
    ajustar();
    if (avisos.length) toast(`Plan cargado con ${avisos.length} aviso(s): ${avisos.slice(0, 2).join("; ")}`);
  }

  $("#input-plan").addEventListener("change", (e) => leerArchivoJSON(e.target, (datos) => {
    try {
      // Un archivo de plan puede traer también un bloque "progreso".
      const prog = datos.progreso && typeof datos.progreso === "object" ? datos.progreso : undefined;
      cargarPlan(datos, { progresoInicial: prog });
      toast(`Plan "${plan.nombre}" cargado (${plan.materias.length} materias).`);
    } catch (err) { toast("No se pudo cargar el plan: " + err.message); }
  }));

  $("#btn-exportar").onclick = () => {
    const nombre = plan.nombre.replace(/[^\w\-]+/g, "_").toLowerCase();
    descargar(`progreso_${nombre}.json`, { plan: plan.nombre, fecha: new Date().toISOString(), progreso });
  };

  $("#input-progreso").addEventListener("change", (e) => leerArchivoJSON(e.target, (datos) => {
    const prog = datos.progreso;
    if (!prog || typeof prog !== "object") return toast('El archivo no tiene un bloque "progreso".');
    const validos = {};
    for (const [id, est] of Object.entries(prog)) {
      if (porId.has(id) && (est === "cursando" || est === "aprobada")) validos[id] = est;
    }
    progreso = validos;
    escribirStorage(claveProgreso(), progreso);
    actualizar();
    toast(`Progreso importado: ${Object.keys(validos).length} materia(s) marcadas.`);
  }));

  $("#btn-reiniciar").onclick = () => {
    if (!confirm("¿Borrar todo tu progreso en este plan?")) return;
    progreso = {};
    escribirStorage(claveProgreso(), progreso);
    actualizar();
  };

  function redibujar() {
    dibujar();
    actualizar();
    ajustar();
  }

  $("#chk-extras").addEventListener("change", (e) => {
    mostrarExtras = e.target.checked;
    escribirStorage("tracker-mostrar-extras", mostrarExtras);
    redibujar();
  });

  window.addEventListener("resize", () => layout && ajustar());

  // ---------- Inicio ----------
  try {
    cargarPlan(leerStorage(CLAVE_PLAN) || window.PLAN_PREDETERMINADO, { guardar: false });
  } catch (err) {
    toast("El plan guardado no es válido, se cargó el ejemplo. (" + err.message + ")");
    cargarPlan(window.PLAN_PREDETERMINADO, { guardar: false });
  }
})();
