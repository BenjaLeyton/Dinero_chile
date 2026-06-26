'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/* ════════════════════════════════════════════════════════════
   MAPA DEL FLUJO DEL DINERO — navegable (pan + zoom + pantalla completa)
   Funciona por CAPÍTULOS: cada uno muestra pocos flujos, todos con
   su monto de ejemplo, anclados a un NPC real (Juan, $650k/mes).
   ════════════════════════════════════════════════════════════ */

const WORLD_W = 2700;
const WORLD_H = 1780;

const KIND = {
  sueldo: { color: '#16a34a', label: 'Sueldo / pago a personas' },
  consumo: { color: '#d97706', label: 'Consumo / compra de bienes y servicios' },
  prestamo: { color: '#2563eb', label: 'Préstamo / crédito' },
  interes: { color: '#dc2626', label: 'Interés / devolución' },
  marketing: { color: '#7c3aed', label: 'Marketing / publicidad' },
  recurso: { color: '#0891b2', label: 'Recursos / exportación' },
  impuesto: { color: '#9e2626', label: 'Impuestos / royalty' },
  cotizacion: { color: '#d48a0a', label: 'AFP (10% forzoso)' },
  mio: { color: '#1D9E75', label: 'Flujo hacia TI' },
} as const;
type Kind = keyof typeof KIND;

const GROUP = {
  estado: '#6366f1',
  banca: '#2563eb',
  recurso: '#0891b2',
  empresa: '#c2410c',
  marketing: '#7c3aed',
  mio: '#1D9E75',
  npc: '#6b7280',
} as const;
type Group = keyof typeof GROUP;

interface Ent {
  id: string;
  label: string;
  icon: string;
  group: Group;
  x: number;
  y: number;
  w?: number;
  desc: string;
  metrics?: [string, string][];
}

interface Flow {
  from: string;
  to: string;
  amount: string;
  kind: Kind;
  label: string;
  ch: string[];
  width?: number;
  curve?: number;
  dashed?: boolean; // relación de influencia (no es dinero directo)
}

// ──────────────── ENTITIES ────────────────
const ENTITIES: Ent[] = [
  { id: 'cobre', label: 'Cobre · Codelco', icon: '⛏️', group: 'recurso', x: 330, y: 120, desc: 'La mayor fuente de dólares de Chile. Se exporta y el Estado cobra royalty.', metrics: [['Exporta', 'US$45.000M/año']] },
  { id: 'litio', label: 'Litio · SQM', icon: '🔋', group: 'recurso', x: 640, y: 120, desc: 'Mineral de baterías. Concesionado a privados que pagan parte al Estado.', metrics: [['Exporta', 'US$7.000M/año']] },
  { id: 'export', label: 'Exportación', icon: '🚢', group: 'recurso', x: 480, y: 320, w: 150, desc: 'Convierte recursos en dólares que entran a la economía.', metrics: [['Divisas/año', 'US$95.000M']] },
  { id: 'gobierno', label: 'Gobierno', icon: '🏛️', group: 'estado', x: 1120, y: 150, w: 150, desc: 'Cobra impuestos y royalty. Gasta en bonos y sueldos públicos.', metrics: [['IVA', '19%'], ['Gasto', '~25% PIB']] },
  { id: 'central', label: 'Banco Central', icon: '🏦', group: 'estado', x: 1650, y: 130, w: 160, desc: 'Imprime y regula el dinero. Fija la tasa de interés y le presta a los bancos.', metrics: [['Tasa', '5,0%']] },
  { id: 'bancos', label: 'Bancos · Chile · Santander · BCI · Estado · Scotiabank · Itaú', icon: '💳', group: 'banca', x: 1980, y: 330, w: 210, desc: 'Banco de Chile, Santander, BCI, BancoEstado, Scotiabank, Itaú. Crean dinero como deuda, prestan a empresas y NPCs, y ganan con el interés. También ganan con las exportaciones: cambian los dólares del exportador a pesos (se quedan una comisión / spread) y prestan esos depósitos a interés.', metrics: [['Tasa consumo', '25–35%'], ['Comisión FX', 'por cada cambio'], ['Ganancia', 'récord anual']] },
  { id: 'afp', label: 'AFP', icon: '📉', group: 'banca', x: 2360, y: 210, w: 140, desc: 'Administra el 10% forzoso de cada sueldo. Lo invierte comprando acciones de las grandes empresas.', metrics: [['Forzoso', '10%']] },

  { id: 'constructora', label: 'Constructora', icon: '🏗️', group: 'empresa', x: 380, y: 650, w: 150, desc: 'Necesita grandes préstamos para operar y contrata muchos NPCs. Si el crédito se corta, despide.', metrics: [['Depende de', 'crédito']] },
  { id: 'falabella', label: 'Falabella', icon: '🛍️', group: 'empresa', x: 950, y: 650, w: 150, desc: 'Retail gigante. Pide crédito, vende a NPCs, hace marketing y tiene su tarjeta CMR.', metrics: [['Marketing/año', '~$80.000M']] },
  { id: 'cencosud', label: 'Cencosud · Jumbo', icon: '🛒', group: 'empresa', x: 1450, y: 660, w: 160, desc: 'Supermercados. Recibe el consumo obligatorio de comida de cada mes.', metrics: [['Consumo', 'recurrente']] },
  { id: 'copec', label: 'Copec', icon: '⛽', group: 'empresa', x: 1900, y: 650, w: 140, desc: 'Combustible y energía: insumo de todo. Si sube, sube toda la economía.', metrics: [] },
  { id: 'importador', label: 'Importador', icon: '📦', group: 'empresa', x: 2330, y: 600, w: 150, desc: 'Trae productos de China para venderlos a las empresas. Paga en dólares afuera.', metrics: [] },
  { id: 'exterior', label: 'Exterior · China', icon: '🌎', group: 'recurso', x: 2560, y: 380, w: 150, desc: 'Las fábricas en el extranjero. El importador les paga en dólares: ese dinero SALE de Chile y deja de circular acá. Es la fuga del sistema.', metrics: [['Recibe', 'US$ desde Chile']] },

  { id: 'agencia', label: 'Agencia Marketing', icon: '📣', group: 'marketing', x: 950, y: 940, w: 170, desc: 'Falabella le paga campañas. Ella reparte ese dinero a influencers y productoras.', metrics: [['Cobra', '$5–50M/campaña']] },
  { id: 'productora', label: 'Productora', icon: '🎬', group: 'marketing', x: 1380, y: 980, w: 150, desc: 'Graba los comerciales. Contrata NPCs (actores, editores) por proyecto.', metrics: [] },

  { id: 'tu', label: 'TÚ (dueño)', icon: '🧠', group: 'mio', x: 1880, y: 1120, w: 150, desc: 'Dueño de negocios que captan el flujo. El dinero de NPCs (apps), de empresas (consultora) y del casino (sponsorship a tu ShareBet) desemboca en ti — y el banco empieza a prestarte. Tus negocios cuelgan abajo a la derecha.', metrics: [['Techo', 'sin límite']] },
  { id: 'gymapp', label: 'Tu App · Gym', icon: '💪', group: 'mio', x: 2120, y: 1300, w: 150, desc: 'Miles de NPCs pagan suscripción a la vez sin que tú estés en cada venta. Solo cobra a NPCs. Escala.', metrics: [['Cobra a', 'NPCs'], ['Modelo', 'suscripción']] },
  { id: 'sharebet', label: 'Tu App · ShareBet', icon: '📲', group: 'mio', x: 2400, y: 1300, w: 160, desc: 'Miles de NPCs pagan por usar tu app, y el casino la patrocina (sponsorship). Todo ese flujo entra a ti.', metrics: [['Cobra a', 'NPCs'], ['Patrocina', 'el casino']] },
  { id: 'consultora', label: 'Tu Consultora', icon: '💼', group: 'mio', x: 2120, y: 1500, w: 160, desc: 'Tu empresa que le vende servicios y asesoría a las grandes empresas. Otra fuente de flujo hacia ti, esta vez B2B (te pagan las empresas, no los NPCs).', metrics: [['Cobra a', 'empresas'], ['Modelo', 'servicios']] },
  { id: 'casino', label: 'Casino', icon: '🎰', group: 'empresa', x: 2430, y: 1520, w: 150, desc: 'Casa de apuestas. Gana porque los NPCs pierden más de lo que ganan (la casa siempre gana). Con esa plata patrocina tu app ShareBet, y también paga premios e impuestos.', metrics: [['Ingreso', 'apuestas de NPCs'], ['Patrocina', 'tu ShareBet']] },

  { id: 'influencer', label: 'NPC influencer', icon: '🤳', group: 'npc', x: 560, y: 1120, w: 150, desc: 'Un NPC que escaló un poco: la agencia le paga por promocionar, y su audiencia (otros NPCs) compra lo que muestra → la plata vuelve a la empresa.', metrics: [['Cobra', '$0,5–10M/post']] },
  { id: 'juan', label: 'Juan · NPC ejemplo', icon: '🧍', group: 'npc', x: 950, y: 1500, w: 170, desc: 'Un NPC cualquiera. Gana $650.000 al mes. Trabaja, consume, cotiza y se endeuda — todo con el mismo sueldo.', metrics: [['Sueldo', '$650.000'], ['Le queda', '$90.000']] },
  { id: 'npcs', label: 'Los NPCs · millones', icon: '👥', group: 'npc', x: 1480, y: 1540, w: 180, desc: 'Todos los Juan juntos. Compran cada mes (no pueden parar). Su consumo obligatorio es la garantía real del crédito de las empresas.', metrics: [['DICOM', '4,2 millones']] },
  { id: 'endeudados', label: 'NPCs endeudados', icon: '🪤', group: 'npc', x: 1700, y: 1680, w: 160, desc: 'Piden crédito para llegar a fin de mes y pagan interés al banco. El sueldo no alcanza a subir.', metrics: [['Cuota', '$45.000/mes']] },
];

// ──────────────── CHAPTERS ────────────────
const CHAPTERS: { id: string; label: string; note: string }[] = [
  { id: 'sueldo', label: '1 · El mes de un NPC', note: 'Juan gana $650.000. Al repartirlo, casi todo sale hacia empresas, la AFP y el banco — solo le quedan $90.000.' },
  { id: 'empresa', label: '2 · De dónde sale la plata', note: 'Dos fuentes de dinero nuevo. ① El Banco Central crea dinero como deuda y se lo presta a los bancos, y los bancos a las empresas. ② Los recursos (cobre, litio) se exportan: entran dólares, una parte va al Estado (royalty) y otra a los bancos. Los bancos GANAN con la exportación: cambian esos dólares a pesos y se quedan una comisión (spread), y además prestan los depósitos a interés. Las empresas piden ese crédito, RECUPERAN con ventas u obras, y lo DEVUELVEN.' },
  { id: 'marketing', label: '3 · La cadena de marketing', note: 'Falabella paga $30M a la agencia → $3M al influencer (otro NPC) → él hace que los NPCs compren → vuelven $45M en ventas a Falabella.' },
  { id: 'mio', label: '4 · Cómo me llega a MÍ', note: 'Tus apps cobran a los NPCs ($45M + $20M/mes) y el casino patrocina tu ShareBet ($5M). Tu consultora le vende servicios a las empresas ($8M + $5M). Todo desemboca en ti — y ahí el banco te presta a ti ($200M).' },
  { id: 'todo', label: '5 · El círculo completo', note: 'TODOS los agentes conectados. Toca cualquiera para ver sus montos. El dinero entra por el banco y los recursos, las empresas lo capturan, los NPCs lo devuelven comprando, y vuelve a empezar.' },
];

// ──────────────── FLOWS (según docs/mapa-flujo-relaciones.md) ────────────────
const FLOWS: Flow[] = [
  // A — fuentes
  { from: 'central', to: 'bancos', amount: 'a 5%', kind: 'prestamo', label: 'El Banco Central presta dinero base a los bancos', ch: ['empresa', 'todo'] },
  { from: 'central', to: 'gobierno', amount: 'bonos', kind: 'prestamo', label: 'Compra bonos del gobierno', ch: ['todo'], curve: -0.3 },
  { from: 'cobre', to: 'export', amount: 'US$45.000M', kind: 'recurso', label: 'Codelco exporta cobre', ch: ['empresa', 'todo'] },
  { from: 'litio', to: 'export', amount: 'US$7.000M', kind: 'recurso', label: 'SQM exporta litio', ch: ['empresa', 'todo'] },
  { from: 'export', to: 'gobierno', amount: 'US$2.000M', kind: 'impuesto', label: 'Royalty + impuestos al Estado', ch: ['empresa', 'todo'] },
  { from: 'export', to: 'bancos', amount: 'comisión + presta', kind: 'recurso', label: 'El banco cambia los dólares del exportador a pesos (se queda la comisión / spread) y presta esos depósitos a interés. Así gana con cada exportación.', ch: ['empresa', 'todo'], curve: 0.4 },
  { from: 'cobre', to: 'npcs', amount: 'sueldos', kind: 'sueldo', label: 'La minería paga sueldos (altos)', ch: ['todo'], curve: 0.3 },

  // B — banca presta y cobra interés
  { from: 'bancos', to: 'falabella', amount: '$500M', kind: 'prestamo', label: 'Crédito para operar/expandir', ch: ['empresa', 'todo'], width: 4 },
  { from: 'bancos', to: 'cencosud', amount: '$400M', kind: 'prestamo', label: 'Línea de crédito', ch: ['todo'] },
  { from: 'bancos', to: 'constructora', amount: '$800M', kind: 'prestamo', label: 'Crédito para obras', ch: ['empresa', 'todo'], width: 3 },
  { from: 'bancos', to: 'copec', amount: '$300M', kind: 'prestamo', label: 'Crédito', ch: ['todo'] },
  { from: 'bancos', to: 'endeudados', amount: '$400k c/u', kind: 'prestamo', label: 'Crédito de consumo', ch: ['empresa', 'todo'], width: 3 },
  { from: 'bancos', to: 'tu', amount: '$200M', kind: 'prestamo', label: 'Te presta al ver el flujo entrar', ch: ['mio', 'todo'], curve: 0.5 },
  { from: 'falabella', to: 'bancos', amount: '$540M', kind: 'interes', label: 'Devuelve préstamo + interés', ch: ['empresa', 'todo'], curve: -0.5 },
  { from: 'endeudados', to: 'bancos', amount: '$45k/mes', kind: 'interes', label: 'Cuota tarjeta al 35%', ch: ['empresa', 'todo'], width: 3 },

  // C — gobierno gasta y recauda
  { from: 'gobierno', to: 'npcs', amount: 'bono $50k', kind: 'sueldo', label: 'Bonos y sueldos públicos', ch: ['empresa', 'todo'], curve: 0.4 },
  { from: 'falabella', to: 'gobierno', amount: 'IVA+renta', kind: 'impuesto', label: 'Impuestos de la empresa', ch: ['todo'], curve: 0.3 },
  { from: 'npcs', to: 'gobierno', amount: 'IVA 19%', kind: 'impuesto', label: 'IVA en cada compra', ch: ['todo'] },
  { from: 'copec', to: 'gobierno', amount: 'imp. específico', kind: 'impuesto', label: 'Impuesto al combustible', ch: ['todo'] },

  // D — AFP (10% forzoso)
  { from: 'juan', to: 'afp', amount: '$65k', kind: 'cotizacion', label: '10% del sueldo de Juan', ch: ['sueldo'], width: 3 },
  { from: 'npcs', to: 'afp', amount: '$65k c/u', kind: 'cotizacion', label: 'Cotización forzosa de todos', ch: ['todo'], width: 3 },
  { from: 'afp', to: 'falabella', amount: '$2.000M', kind: 'cotizacion', label: 'Invierte el ahorro en acciones de las grandes empresas', ch: ['todo'], curve: 0.4 },
  { from: 'afp', to: 'copec', amount: 'acciones', kind: 'cotizacion', label: 'Invierte en acciones', ch: ['todo'] },
  { from: 'afp', to: 'npcs', amount: 'pensión $280k', kind: 'sueldo', label: 'Al jubilar devuelve poco', ch: ['todo'], curve: -0.5 },

  // E — empresas pagan sueldo a NPCs
  { from: 'falabella', to: 'juan', amount: '$650k', kind: 'sueldo', label: 'Sueldo de Juan (bajo)', ch: ['sueldo', 'todo'], width: 4 },
  { from: 'falabella', to: 'npcs', amount: '$650k', kind: 'sueldo', label: 'Sueldos', ch: ['todo'] },
  { from: 'cencosud', to: 'npcs', amount: '$550k', kind: 'sueldo', label: 'Sueldos', ch: ['todo'] },
  { from: 'constructora', to: 'npcs', amount: '$700k', kind: 'sueldo', label: 'Sueldos de obra', ch: ['todo'] },
  { from: 'copec', to: 'npcs', amount: '$600k', kind: 'sueldo', label: 'Sueldos', ch: ['todo'] },
  { from: 'importador', to: 'npcs', amount: '$500k', kind: 'sueldo', label: 'Pocos empleos', ch: ['todo'] },

  // F — NPCs devuelven casi todo en consumo
  { from: 'juan', to: 'cencosud', amount: '$250k', kind: 'consumo', label: 'Comida del mes', ch: ['sueldo'], width: 3 },
  { from: 'juan', to: 'falabella', amount: '$115k', kind: 'consumo', label: 'Ropa, tele, muebles (CMR)', ch: ['sueldo'], width: 3 },
  { from: 'juan', to: 'copec', amount: '$70k', kind: 'consumo', label: 'Bencina y gas', ch: ['sueldo'] },
  { from: 'npcs', to: 'falabella', amount: '+$45M', kind: 'consumo', label: 'Compran lo promocionado → vuelve a Falabella', ch: ['marketing', 'todo'], width: 4, curve: -0.55 },
  { from: 'npcs', to: 'cencosud', amount: '$250k c/u', kind: 'consumo', label: 'Comida obligatoria', ch: ['todo'], width: 4 },
  { from: 'npcs', to: 'copec', amount: '$80k c/u', kind: 'consumo', label: 'Bencina', ch: ['todo'] },
  { from: 'endeudados', to: 'falabella', amount: 'a crédito', kind: 'consumo', label: 'Consumo con CMR', ch: ['todo'], curve: 0.3 },

  // F2 — sostenibilidad: cada empresa RECUPERA con ventas/obras y DEVUELVE el préstamo
  { from: 'gobierno', to: 'constructora', amount: 'obras $400M', kind: 'consumo', label: 'El Estado le paga obras públicas', ch: ['empresa', 'todo'], curve: 0.3 },
  { from: 'npcs', to: 'constructora', amount: 'compran depto', kind: 'consumo', label: 'La gente compra las casas/departamentos que construye', ch: ['todo'], curve: 0.3 },
  { from: 'constructora', to: 'bancos', amount: '$860M', kind: 'interes', label: 'Recupera y devuelve el préstamo + interés → puede pedir otro', ch: ['empresa', 'todo'], curve: 0.4 },
  { from: 'cencosud', to: 'bancos', amount: '+interés', kind: 'interes', label: 'Recupera con ventas y devuelve el préstamo', ch: ['todo'], curve: -0.4 },
  { from: 'copec', to: 'bancos', amount: '+interés', kind: 'interes', label: 'Recupera con ventas y devuelve el préstamo', ch: ['todo'], curve: -0.4 },

  // G — importación (fuga al exterior)
  { from: 'falabella', to: 'importador', amount: 'paga stock', kind: 'consumo', label: 'Le compra productos importados', ch: ['empresa', 'todo'] },
  { from: 'importador', to: 'exterior', amount: 'US$ salen', kind: 'consumo', label: 'Paga a las fábricas en China — el dinero sale del país', ch: ['empresa', 'todo'], curve: -0.3 },

  // H — cadena de marketing
  { from: 'falabella', to: 'agencia', amount: '$30M', kind: 'marketing', label: 'Le paga una campaña', ch: ['marketing', 'todo'], width: 3 },
  { from: 'cencosud', to: 'agencia', amount: '$15M', kind: 'marketing', label: 'Publicidad', ch: ['todo'] },
  { from: 'agencia', to: 'influencer', amount: '$3M', kind: 'marketing', label: 'Paga al influencer (NPC)', ch: ['marketing', 'todo'], width: 3 },
  { from: 'influencer', to: 'npcs', amount: 'los hace comprar', kind: 'marketing', label: 'El influencer convence a su audiencia de comprar en Falabella', ch: ['marketing', 'todo'], dashed: true, curve: 0.35 },
  { from: 'agencia', to: 'productora', amount: '$8M', kind: 'marketing', label: 'Paga la grabación', ch: ['marketing', 'todo'] },
  { from: 'productora', to: 'npcs', amount: '$1,5M', kind: 'sueldo', label: 'Contrata NPCs por proyecto', ch: ['marketing', 'todo'] },

  // I — mis apps: SOLO los NPCs me pagan → TÚ
  { from: 'juan', to: 'gymapp', amount: '$15k', kind: 'mio', label: 'Juan suscrito a tu app', ch: ['sueldo'] },
  { from: 'npcs', to: 'gymapp', amount: '$45M/mes', kind: 'mio', label: 'Suscripción de miles de NPCs', ch: ['mio', 'todo'], width: 4 },
  { from: 'npcs', to: 'sharebet', amount: '$20M/mes', kind: 'mio', label: 'NPCs pagan por usar tu app', ch: ['mio', 'todo'], width: 3 },
  { from: 'gymapp', to: 'tu', amount: '$30M/mes', kind: 'mio', label: 'El flujo de la app desemboca en ti', ch: ['mio', 'todo'], width: 4 },
  { from: 'sharebet', to: 'tu', amount: '$18M/mes', kind: 'mio', label: 'El flujo de la app desemboca en ti', ch: ['mio', 'todo'], width: 4 },

  // J — tu consultora le vende servicios a las empresas (B2B) → TÚ
  { from: 'falabella', to: 'consultora', amount: '$8M', kind: 'mio', label: 'Falabella te paga por servicios / asesoría', ch: ['mio', 'todo'], curve: 0.3 },
  { from: 'cencosud', to: 'consultora', amount: '$5M', kind: 'mio', label: 'Cencosud te paga por servicios', ch: ['mio', 'todo'], curve: 0.3 },
  { from: 'consultora', to: 'tu', amount: '$10M/mes', kind: 'mio', label: 'Tu consultora desemboca en ti', ch: ['mio', 'todo'], width: 4 },

  // K — el casino gana con los NPCs y me paga sponsorship (sostenible: la casa siempre gana)
  { from: 'npcs', to: 'casino', amount: 'apuestas $90M', kind: 'consumo', label: 'Los NPCs apuestan y pierden (la casa siempre gana)', ch: ['mio', 'todo'], width: 4 },
  { from: 'casino', to: 'npcs', amount: 'premios $60M', kind: 'sueldo', label: 'Paga algunos premios — menos de lo que recauda', ch: ['todo'], curve: 0.35 },
  { from: 'casino', to: 'gobierno', amount: 'imp. juego', kind: 'impuesto', label: 'Impuesto al juego', ch: ['todo'], curve: 0.4 },
  { from: 'casino', to: 'sharebet', amount: 'sponsorship $5M', kind: 'mio', label: 'El casino patrocina tu app ShareBet', ch: ['mio', 'todo'], width: 3 },
];

// ──────────────── POR QUÉ EL OLIGOPOLIO NUNCA QUIEBRA ────────────────
const OLIGO_STEPS: { n: number; title: string; money: string; color: string; text: string }[] = [
  { n: 1, title: 'Pide el préstamo', money: '+$500M', color: '#2563eb', text: 'El banco le presta $500M a Falabella. Es dinero creado como deuda, de la nada.' },
  { n: 2, title: 'Lo gasta — y de paso paga a otras empresas', money: '−$500M', color: '#d97706', text: '$300M en sueldos a NPCs, $30M en marketing a la agencia, $170M en combustible e insumos a Copec y al importador. El gasto de Falabella es el ingreso de las otras.' },
  { n: 3, title: 'El dinero vuelve a los NPCs', money: '→ NPCs', color: '#16a34a', text: 'Los sueldos de Falabella Y de las otras empresas llegan a los NPCs. Sumando todo el oligopolio, los NPCs reciben mucho más que lo que pagó Falabella sola.' },
  { n: 4, title: 'Los NPCs lo gastan casi todo', money: '+$400M', color: '#16a34a', text: 'No pueden parar de comprar. Esa plata vuelve a Falabella como ventas (+$400M), y el resto va a Cencosud y Copec — sus socias del club.' },
  { n: 5, title: 'Devuelve el préstamo', money: '−$540M', color: '#dc2626', text: 'Con esas ventas paga los $500M + $40M de interés. La deuda anterior queda saldada. El banco ganó su interés.' },
  { n: 6, title: 'Pide uno más grande', money: '+$700M', color: '#2563eb', text: 'Mostró ventas crecientes → el banco le presta $700M. El ciclo arranca de nuevo, más grande. Así se ve el "préstamo casi infinito".' },
];

const OLIGO_WEB: { title: string; text: string }[] = [
  { title: 'Se compran entre ellas', text: 'Falabella le compra combustible a Copec, todas le pagan marketing a la agencia, Cencosud les arrienda locales. El gasto de una es el ingreso de otra: así cada una junta para pagar su propia deuda.' },
  { title: 'Comparten el mismo bolsillo: los NPCs', text: 'Las 3 grandes inyectan juntas ~$900M en sueldos al mes. Los NPCs gastan esos $900M de vuelta, repartidos entre las 3. El dinero nunca sale del club.' },
  { title: 'La AFP las capitaliza con plata de los NPCs', text: 'Con el 10% forzoso, la AFP compra acciones de las 3 → suben de valor → mejor garantía → el banco les presta aún más. El propio trabajador infla a su jefe.' },
  { title: 'El banco gana pase lo que pase', text: 'Le cobra interés a todas. No le importa cuál crece más: mientras el dinero circule entre ellas y siempre vuelva, sus intereses están asegurados.' },
];

const OLIGO_MECHANISMS: { title: string; points: string[] }[] = [
  {
    title: 'Mecanismo 1 · Nadie paga al mismo tiempo — la deuda se renueva',
    points: [
      'Las deudas vencen en fechas distintas. En cualquier momento solo una parte está "por pagar", y la plata que circula justo ahí alcanza para cubrir ESA parte. No todas pagan a la vez.',
      'Casi ninguna deuda grande se paga de verdad: se REFINANCIA — pides un préstamo nuevo para pagar el viejo. La deuda no se extingue, se traspasa hacia adelante en el tiempo.',
      'Por eso todas SIEMPRE tienen deuda, pero el sistema nunca se traba: es una silla musical donde la música no para mientras siga entrando crédito nuevo al ritmo que vence el viejo.',
    ],
  },
  {
    title: 'Mecanismo 2 · Cuando una quiebra, su deuda se borra = dinero gratis',
    points: [
      'El préstamo creó dinero de la nada y esa plata YA se gastó: se volvió sueldos, compras, ingresos de otros. Sigue circulando en la economía.',
      'Si el deudor quiebra y desaparece, la obligación se borra — pero el dinero que creó ya quedó suelto. Fue como imprimir dinero gratis y regalárselo a quienes alcanzaron a recibirlo.',
      'El que se come la pérdida es el banco (esperaba que volviera); si son muchos, lo rescatan imprimiendo aún más. Ese "dinero gratis" que quedó circulando es parte de lo que paga el interés de los demás.',
    ],
  },
];

// ──────────────── QUÉ PUEDEN HACER LOS NPCs ────────────────
const NPC_ACTIONS: { n: number; title: string; text: string }[] = [
  {
    n: 1,
    title: 'Mover el consumo a empresas que pagan bien',
    text: 'Dejar de comprarle a las que pagan el mínimo y gastar en pymes, cooperativas o empresas que pagan sueldos dignos. El dinero —y los créditos que vienen detrás— fluye hacia quien trata bien a sus trabajadores.',
  },
  {
    n: 2,
    title: 'Cortar la deuda de consumo cara',
    text: 'No usar la tarjeta al 35%. Sin esa cuota, el NPC recupera $45k al mes y deja de financiar al banco. Si millones se desendeudan, el banco pierde su garantía: el consumo obligatorio.',
  },
  {
    n: 3,
    title: 'Comprar local y directo al productor',
    text: 'Saltarse al intermediario que se queda el margen: ferias, la amasandería del barrio, productores directos. El dinero se queda circulando cerca y paga mejores sueldos en el barrio.',
  },
  {
    n: 4,
    title: 'Organizarse — un NPC solo no mueve nada',
    text: 'Millones coordinados sí: sindicatos, cooperativas, compras colectivas. Suben el piso salarial y negocian desde la fuerza, no desde la necesidad.',
  },
  {
    n: 5,
    title: 'Pasar de NPC a dueño',
    text: 'Aunque sea chico: montar algo por donde el dinero pase hacia ti (lo del resto del módulo). Dejar de ser solo el final del flujo.',
  },
  {
    n: 6,
    title: 'Exigir que el crédito vaya a producción',
    text: 'Presionar para que los préstamos iniciales financien empresas que producen y pagan bien, no retail que solo revende lo importado y saca la plata del país.',
  },
];

const NPC_CONSEQUENCES: { good: boolean; title: string; text: string }[] = [
  {
    good: false,
    title: 'Falabella vende menos',
    text: 'Sus ventas caen. El banco ve que ya no tiene la garantía (tu consumo obligatorio) y le presta menos o más caro. Se acaba el préstamo casi infinito y tiene que achicarse.',
  },
  {
    good: true,
    title: 'Las que pagan bien se vuelven las grandes',
    text: 'Reciben el flujo, venden más, consiguen los créditos que antes iban a Falabella, contratan más gente y suben sueldos. El que paga bien ahora es el que crece.',
  },
  {
    good: true,
    title: 'El banco redirige el crédito',
    text: 'El banco siempre presta donde está el consumo. Si el consumo se mueve, el crédito lo sigue: ahora financia a las empresas con ventas crecientes (las que pagan bien).',
  },
  {
    good: true,
    title: 'La AFP termina invirtiendo en las nuevas grandes',
    text: 'Como compra acciones de las que más venden, deja de capitalizar a las extractivas y pasa a invertir en las empresas que pagan bien. Hasta tu fondo te empieza a convenir.',
  },
  {
    good: true,
    title: 'El sueldo sube sin pedirlo',
    text: 'Al competir por trabajadores y por el consumo, el piso salarial sube solo. No se logró pidiéndolo ni con un bono: se logró moviendo a dónde va cada peso.',
  },
];

// ──────────────── helpers ────────────────
function entCenter(id: string) {
  const e = ENTITIES.find((x) => x.id === id)!;
  return { x: e.x, y: e.y };
}

function flowPath(f: Flow) {
  const a = entCenter(f.from);
  const b = entCenter(f.to);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const r = (n: number) => Math.round(n * 100) / 100; // determinismo SSR↔cliente
  const x1 = r(a.x + ux * 56);
  const y1 = r(a.y + uy * 56);
  const x2 = r(b.x - ux * 64);
  const y2 = r(b.y - uy * 64);
  const bend = (f.curve ?? 0.13) * len * 0.18;
  const cx = r((x1 + x2) / 2 - uy * bend);
  const cy = r((y1 + y2) / 2 + ux * bend);
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, cx, cy };
}

// ──────────────── component ────────────────
export default function MapaFlujo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ scale: 0.5, x: 0, y: 0 });
  const [sel, setSel] = useState<string | null>(null);
  const [chapter, setChapter] = useState('sueldo');
  const [animate, setAnimate] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinch = useRef<{ dist: number; scale: number; cx: number; cy: number; vx: number; vy: number } | null>(null);
  const viewRef = useRef(view);
  const [size, setSize] = useState({ w: 1000, h: 620 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => { viewRef.current = view; }, [view]);

  const chapterEntities = useCallback((chId: string) => {
    const s = new Set<string>();
    FLOWS.filter((f) => f.ch.includes(chId)).forEach((f) => { s.add(f.from); s.add(f.to); });
    return [...s];
  }, []);

  const fitTo = useCallback((ids: string[]) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    const w = rect?.width || size.w;
    const h = rect?.height || size.h;
    const list = ids.length ? ENTITIES.filter((e) => ids.includes(e.id)) : ENTITIES;
    const pad = 200;
    const minX = Math.min(...list.map((e) => e.x)) - pad;
    const maxX = Math.max(...list.map((e) => e.x)) + pad;
    const minY = Math.min(...list.map((e) => e.y)) - pad;
    const maxY = Math.max(...list.map((e) => e.y)) + pad;
    const scale = Math.min(w / (maxX - minX), h / (maxY - minY), 1.3);
    setView({ scale, x: w / 2 - ((minX + maxX) / 2) * scale, y: h / 2 - ((minY + maxY) / 2) * scale });
  }, [size]);

  const selectChapter = (chId: string) => {
    setChapter(chId);
    setSel(null);
    setPanelOpen(false);
    fitTo(chapterEntities(chId));
  };

  // initial fit
  const fittedRef = useRef(false);
  useEffect(() => {
    if (!fittedRef.current && size.w > 100) {
      fittedRef.current = true;
      fitTo(chapterEntities('sueldo'));
    }
  }, [size, fitTo, chapterEntities]);

  // pantalla completa por CSS overlay — funciona en TODOS los dispositivos (incl. iPhone,
  // donde la Fullscreen API no sirve para divs). Adentro el pan/zoom queda 100% libre.
  const toggleFullscreen = () => setExpanded((x) => !x);
  // al expandir: bloquear el scroll del fondo y permitir salir con Esc
  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpanded(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [expanded]);
  // reajustar el encuadre al entrar/salir de pantalla completa (cambian las dimensiones)
  useEffect(() => {
    const id = requestAnimationFrame(() => fitTo(chapterEntities(chapter)));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  // pan (1 dedo) + pinch-zoom (2 dedos) + drag (mouse)
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      const rect = wrapRef.current!.getBoundingClientRect();
      const v = viewRef.current;
      pinch.current = {
        dist,
        scale: v.scale,
        cx: (pts[0].x + pts[1].x) / 2 - rect.left,
        cy: (pts[0].y + pts[1].y) / 2 - rect.top,
        vx: v.x,
        vy: v.y,
      };
      drag.current = null;
    } else {
      const v = viewRef.current;
      drag.current = { x: e.clientX, y: e.clientY, vx: v.x, vy: v.y };
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.current && pointers.current.size >= 2) {
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      const p = pinch.current;
      const scale = Math.min(2.4, Math.max(0.2, p.scale * (dist / p.dist)));
      const k = scale / p.scale;
      setView({ scale, x: p.cx - (p.cx - p.vx) * k, y: p.cy - (p.cy - p.vy) * k });
      return;
    }
    const d = drag.current;
    if (!d) return;
    setView((v) => ({ ...v, x: d.vx + (e.clientX - d.x), y: d.vy + (e.clientY - d.y) }));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 1) {
      const [pt] = [...pointers.current.values()];
      const v = viewRef.current;
      drag.current = { x: pt.x, y: pt.y, vx: v.x, vy: v.y };
    } else if (pointers.current.size === 0) {
      drag.current = null;
    }
  };
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = wrapRef.current!.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    setView((v) => {
      const scale = Math.min(2.4, Math.max(0.2, v.scale * (e.deltaY < 0 ? 1.12 : 1 / 1.12)));
      const k = scale / v.scale;
      return { scale, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k };
    });
  };
  const zoomBtn = (factor: number) =>
    setView((v) => {
      const scale = Math.min(2.4, Math.max(0.2, v.scale * factor));
      const k = scale / v.scale;
      return { scale, x: size.w / 2 - (size.w / 2 - v.x) * k, y: size.h / 2 - (size.h / 2 - v.y) * k };
    });

  // active sets
  const related = new Set<string>();
  if (sel) {
    related.add(sel);
    FLOWS.forEach((f) => { if (f.from === sel) related.add(f.to); if (f.to === sel) related.add(f.from); });
  }
  const isFlowActive = (f: Flow) => (sel ? f.from === sel || f.to === sel : f.ch.includes(chapter));
  const isEntActive = (id: string) => (sel ? related.has(id) : chapterEntities(chapter).includes(id));

  const selData = sel ? ENTITIES.find((e) => e.id === sel) : null;
  const note = CHAPTERS.find((c) => c.id === chapter)?.note;
  const activeFlows = FLOWS.filter(isFlowActive);
  // en el diagrama completo hay demasiadas flechas para mostrar todos los montos
  // a la vez → se ocultan y aparecen al tocar un agente; igual con las partículas
  const showLabels = !!sel || chapter !== 'todo';
  const showParticles = animate && activeFlows.length <= 26;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
      <h1 className="text-[22px] sm:text-[28px] font-extrabold tracking-tight text-[var(--foreground)] mb-2">
        Mapa del flujo del dinero — Chile
      </h1>
      <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed max-w-3xl">
        Sigue el dinero capítulo por capítulo. Cada flecha es plata moviéndose, con su monto de ejemplo.
        Arrastra para recorrer, haz zoom, toca un agente para ver solo sus flujos, o expande a pantalla completa.
        <span className="font-semibold text-[var(--foreground)]"> Todos los de gris son NPCs</span> — la misma persona en distintos momentos del mes.
      </p>

      {/* MAP (becomes fixed overlay when expanded) */}
      <div
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        className={`overflow-hidden border-[var(--border)] select-none ${expanded ? 'fixed top-0 left-0 z-[9999] rounded-none border-0' : 'relative rounded-2xl border h-[440px] sm:h-[620px]'}`}
        style={{ width: expanded ? '100vw' : '100%', height: expanded ? '100dvh' : undefined, background: 'radial-gradient(circle at 30% 15%, #faf9f6 0%, #f0eee8 100%)', cursor: drag.current ? 'grabbing' : 'grab', touchAction: 'none' }}
      >
        {/* top control bar: capítulos en fila deslizable (móvil) + nota */}
        <div
          className="absolute top-2 left-2 right-14 sm:top-3 sm:left-3 sm:right-16 z-30 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div
            className="flex gap-1.5 overflow-x-auto px-2 pt-2 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ touchAction: 'pan-x' }}
          >
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                onClick={() => selectChapter(c.id)}
                className="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-[11.5px] font-semibold border transition-all whitespace-nowrap"
                style={{
                  background: chapter === c.id && !sel ? 'var(--foreground)' : 'transparent',
                  color: chapter === c.id && !sel ? 'var(--background)' : 'var(--text-secondary)',
                  borderColor: chapter === c.id && !sel ? 'var(--foreground)' : 'var(--border)',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          {note && !sel && (
            <p className="px-2.5 pb-2 text-[11px] sm:text-[12.5px] leading-snug text-[var(--foreground)] line-clamp-2 sm:line-clamp-none">
              {note}
            </p>
          )}
        </div>

        {/* zoom + expand controls */}
        <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={toggleFullscreen} className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm shadow-sm hover:bg-[var(--surface)]" title={expanded ? 'Salir de pantalla completa (Esc)' : 'Pantalla completa'}>{expanded ? '✕' : '⛶'}</button>
          <button onClick={() => zoomBtn(1.25)} className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] text-lg font-bold shadow-sm hover:bg-[var(--surface)]">+</button>
          <button onClick={() => zoomBtn(0.8)} className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] text-lg font-bold shadow-sm hover:bg-[var(--surface)]">−</button>
          <button onClick={() => { setSel(null); fitTo(chapterEntities(chapter)); }} className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm shadow-sm hover:bg-[var(--surface)]" title="Centrar">⤢</button>
          <button onClick={() => setAnimate((a) => !a)} className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm shadow-sm hover:bg-[var(--surface)]" title="Animación">{animate ? '⏸' : '▶'}</button>
        </div>

        {/* world */}
        <div className="absolute top-0 left-0 origin-top-left" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`, width: WORLD_W, height: WORLD_H }}>
          <svg width={WORLD_W} height={WORLD_H} className="absolute top-0 left-0 pointer-events-none" style={{ overflow: 'visible' }}>
            <defs>
              {(Object.keys(KIND) as Kind[]).map((k) => (
                <marker key={k} id={`mk-${k}`} markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
                  <polygon points="0 0, 9 3.5, 0 7" fill={KIND[k].color} />
                </marker>
              ))}
            </defs>
            {FLOWS.map((f, i) => {
              const p = flowPath(f);
              const active = isFlowActive(f);
              const col = KIND[f.kind].color;
              const w = f.width ?? 2.5;
              return (
                <g key={i} opacity={active ? 1 : 0.07}>
                  <path d={p.d} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" strokeDasharray={f.dashed ? '8 6' : undefined} markerEnd={`url(#mk-${f.kind})`} />
                  {active && showParticles && (
                    <circle r={Math.max(4, w * 1.6)} fill={col}>
                      <animateMotion dur={`${3.4 + (i % 5) * 0.4}s`} repeatCount="indefinite" path={p.d} />
                    </circle>
                  )}
                </g>
              );
            })}
            {showLabels && activeFlows.map((f, i) => {
              const p = flowPath(f);
              const col = KIND[f.kind].color;
              const wpx = Math.max(54, f.amount.length * 8.5 + 16);
              return (
                <g key={`l${i}`}>
                  <rect x={p.cx - wpx / 2} y={p.cy - 13} width={wpx} height={24} rx={6} fill="#ffffff" stroke={col} strokeWidth={1.5} />
                  <text x={p.cx} y={p.cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={800} fill={col}>{f.amount}</text>
                </g>
              );
            })}
          </svg>

          {ENTITIES.map((e) => {
            const active = isEntActive(e.id);
            const ring = GROUP[e.group];
            const w = e.w ?? 130;
            const isSel = sel === e.id;
            return (
              <button
                key={e.id}
                onClick={(ev) => {
                  ev.stopPropagation();
                  if (sel !== e.id) { setSel(e.id); setPanelOpen(true); }
                  else if (!panelOpen) { setPanelOpen(true); }
                  else { setSel(null); setPanelOpen(false); }
                }}
                className="absolute rounded-2xl px-3 py-2 text-center transition-all"
                style={{
                  left: e.x - w / 2,
                  top: e.y - 34,
                  width: w,
                  background: '#ffffff',
                  border: `2px solid ${ring}`,
                  boxShadow: isSel ? `0 0 0 5px ${ring}33, 0 6px 20px rgba(0,0,0,0.12)` : '0 2px 8px rgba(0,0,0,0.08)',
                  opacity: active ? 1 : 0.16,
                  zIndex: isSel ? 20 : 10,
                  cursor: 'pointer',
                }}
              >
                <div className="text-2xl leading-none mb-0.5">{e.icon}</div>
                <div className="text-[12px] font-bold leading-tight" style={{ color: ring }}>{e.label}</div>
              </button>
            );
          })}
        </div>

        {/* detail panel */}
        {selData && panelOpen && (
          <div className="absolute bottom-3 left-3 z-30 w-[300px] max-w-[calc(100%-24px)] bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-xl" onPointerDown={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-2xl">{selData.icon}</span>
              <span className="font-bold text-[15px]" style={{ color: GROUP[selData.group] }}>{selData.label}</span>
              <button onClick={() => setPanelOpen(false)} className="ml-auto text-[var(--text-secondary)] hover:text-[var(--foreground)] text-sm">✕</button>
            </div>
            <p className="text-[12.5px] text-[var(--text-secondary)] leading-relaxed mb-2.5">{selData.desc}</p>
            {selData.metrics && selData.metrics.length > 0 && (
              <div className="space-y-1 mb-2.5">
                {selData.metrics.map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[12px]">
                    <span className="text-[var(--text-secondary)]">{k}</span>
                    <span className="font-mono font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="text-[11px] text-[var(--text-secondary)] border-t border-[var(--border)] pt-2">La ✕ cierra esta ficha pero deja el agente seleccionado (sus flujos siguen aislados). Tócalo de nuevo para soltarlo.</div>
          </div>
        )}

        {/* legend inside map (bottom-right) */}
        <div className="absolute bottom-3 right-3 z-20 hidden sm:flex flex-col gap-1 bg-[var(--card)] border border-[var(--border)] rounded-lg p-2.5 max-w-[230px]">
          {(Object.keys(KIND) as Kind[]).map((k) => (
            <div key={k} className="flex items-center gap-2 text-[10.5px] text-[var(--text-secondary)]">
              <span className="w-5 h-0.5 rounded shrink-0" style={{ background: KIND[k].color }} />
              {KIND[k].label}
            </div>
          ))}
        </div>
      </div>

      {/* takeaway */}
      <div className="mt-6 rounded-xl p-5" style={{ background: 'var(--keypoint-bg)', border: '1px solid var(--keypoint-border)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--keypoint-text)' }}>
          <strong>Lee el mapa así:</strong> el dinero nace del crédito del banco y de los recursos, las grandes
          empresas lo capturan y lo hacen circular pagando poco sueldo y mucho marketing, los NPCs lo devuelven con
          cada compra obligatoria, y vuelve a las empresas y al banco. Tú cambias el juego cuando dejas de ser solo
          el final del flujo (un NPC más) y montas algo —como una app— por donde ese mismo dinero pasa hacia ti.
        </p>
      </div>

      {/* ─── POR QUÉ EL OLIGOPOLIO NUNCA QUIEBRA ─── */}
      <section className="mt-14 pt-8 border-t border-[var(--border)]">
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-2">
          La deuda que se pagan entre ellos
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--foreground)] mb-2">
          ¿Por qué el oligopolio nunca quiebra?
        </h2>
        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-7 max-w-3xl">
          Cada empresa pide préstamos gigantes una y otra vez. ¿Cómo los devuelven y piden otro mayor, sin caer
          jamás? El truco: <strong className="text-[var(--foreground)]">el gasto de una empresa es el ingreso de
          otra</strong>, y al final todo vuelve por el consumo obligatorio de los NPCs. Sigámoslo con números.
        </p>

        {/* ciclo de una empresa */}
        <h3 className="text-base font-bold text-[var(--foreground)] mb-3">El ciclo de UNA empresa (Falabella)</h3>
        <div className="space-y-2.5 mb-9">
          {OLIGO_STEPS.map((s) => (
            <div key={s.n} className="flex gap-3 items-start p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <span className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-extrabold" style={{ background: s.color }}>
                {s.n}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-0.5 flex-wrap">
                  <h4 className="text-sm font-bold text-[var(--foreground)]">{s.title}</h4>
                  <span className="text-sm font-extrabold px-2 py-0.5 rounded-md text-white whitespace-nowrap" style={{ background: s.color }}>
                    {s.money}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* la paradoja del interés */}
        <div className="rounded-xl p-5 mb-9" style={{ background: '#FCEBEB', border: '1.5px solid #9e2626' }}>
          <h3 className="text-base font-extrabold mb-1.5" style={{ color: '#420e0e' }}>
            Espera — eso no cierra: ¿de dónde sale el interés?
          </h3>
          <p className="text-[13.5px] leading-relaxed mb-3" style={{ color: '#8c2020' }}>
            Buena observación, y es <strong>EL</strong> punto. Si Falabella pidió $500M, Cencosud $600M y Copec $700M,
            el banco creó <strong>$1.800M</strong>. Pero todas deben devolver con interés: juntas deben <strong>~$1.950M</strong>.
            Faltan <strong>$150M que nunca se imprimieron</strong>. ¿Cómo pagan algo que no existe?
          </p>
          <div className="rounded-lg p-3.5 mb-3 bg-white/60" style={{ border: '1px solid #9e262633' }}>
            <div className="space-y-1.5 text-[13px]" style={{ color: '#420e0e' }}>
              <div className="flex justify-between gap-3"><span>Dinero que el banco creó (los 3 préstamos)</span><span className="font-bold font-mono">$1.800M</span></div>
              <div className="flex justify-between gap-3"><span>Lo que deben devolver (con ~8% interés)</span><span className="font-bold font-mono">$1.950M</span></div>
              <div className="flex justify-between gap-3 pt-1.5 border-t" style={{ borderColor: '#9e262633' }}><span className="font-bold">El interés que NO existe en el sistema</span><span className="font-extrabold font-mono" style={{ color: '#9e2626' }}>−$150M</span></div>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#8c2020' }}>
            La trampa no es que cada ronda alguien tenga que perder. Son <strong>dos mecanismos</strong> que hacen que
            el sistema nunca se trabe aunque las cuentas no cierren:
          </p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {OLIGO_MECHANISMS.map((m, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/60" style={{ border: '1px solid #9e262633' }}>
                <h4 className="text-[13px] font-bold mb-1.5" style={{ color: '#420e0e' }}>{m.title}</h4>
                <ul className="space-y-1.5">
                  {m.points.map((p, j) => (
                    <li key={j} className="text-[12.5px] leading-relaxed flex gap-1.5" style={{ color: '#8c2020' }}>
                      <span style={{ color: '#9e2626' }}>•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[13px] leading-relaxed mt-3 font-semibold" style={{ color: '#420e0e' }}>
            Conclusión: el sistema se sostiene por las dos cosas a la vez — la deuda se renueva eternamente (nunca se
            paga, se traspasa) y los que quiebran inyectan dinero gratis al borrar su deuda. El oligopolio está primero
            en la fila del crédito nuevo, así que renueva sin problema; los de abajo (pymes, NPCs en DICOM) son los que
            quiebran y, sin saberlo, le regalan al sistema el dinero que faltaba. Crecer en deuda para siempre + un
            goteo constante de quiebras abajo = la fórmula. No está roto: está diseñado así.
          </p>
        </div>

        {/* la telaraña entre todas */}
        <h3 className="text-base font-bold text-[var(--foreground)] mb-1.5">Cómo se sostienen TODAS juntas</h3>
        <p className="text-[13.5px] text-[var(--text-secondary)] leading-relaxed mb-4 max-w-3xl">
          Ninguna sobrevive sola. Son clientas y proveedoras unas de otras, así que la misma plata circula entre
          ellas y paga la deuda de todas:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-9">
          {OLIGO_WEB.map((w, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: '#f7f3ff', border: '1px solid #7F77DD' }}>
              <h4 className="text-sm font-bold mb-0.5" style={{ color: '#26215C' }}>{w.title}</h4>
              <p className="text-[13px] leading-relaxed" style={{ color: '#3C3489' }}>{w.text}</p>
            </div>
          ))}
        </div>

        {/* cuentas del club */}
        <div className="rounded-xl p-5 mb-3" style={{ background: '#EAF3DE', border: '1px solid #3B6D11' }}>
          <h4 className="text-sm font-bold mb-2" style={{ color: '#0d2002' }}>Las cuentas del club, en un mes</h4>
          <div className="space-y-1.5 text-[13px]" style={{ color: '#173404' }}>
            <div className="flex justify-between gap-3"><span>Sueldos que inyectan las 3 grandes</span><span className="font-bold font-mono">$900M</span></div>
            <div className="flex justify-between gap-3"><span>Los NPCs lo gastan de vuelta entre las 3</span><span className="font-bold font-mono">$900M</span></div>
            <div className="flex justify-between gap-3"><span>Lo que se compran entre ellas (combustible, insumos, marketing, arriendos)</span><span className="font-bold font-mono">+$450M</span></div>
            <div className="flex justify-between gap-3 pt-1.5 border-t" style={{ borderColor: '#3B6D1133' }}><span className="font-bold">Total que circula y vuelve al club</span><span className="font-extrabold font-mono">$1.350M</span></div>
          </div>
          <p className="text-[12.5px] mt-2 leading-relaxed" style={{ color: '#173404' }}>
            Suficiente para que cada una devuelva su préstamo, le pague el interés al banco, y muestre números para
            pedir uno mayor. La deuda no se "extingue": se <strong>refinancia</strong> sin parar con dinero nuevo
            (crédito + recursos) mientras la rueda gire.
          </p>
        </div>

        {/* clave */}
        <div className="rounded-xl p-5" style={{ background: 'var(--keypoint-bg)', border: '1px solid var(--keypoint-border)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--keypoint-text)' }}>
            <strong>Por eso nunca quiebran:</strong> mientras los NPCs sigan comprando, el dinero siempre vuelve.
            Cada deuda se paga con el gasto de las otras + el consumo obligatorio de la gente. Es un club cerrado
            donde la plata circula entre las mismas manos y siempre termina en el banco como interés. El único punto
            donde la rueda se puede frenar es el consumo de los NPCs — que es justo de lo que trata lo que sigue. 👇
          </p>
        </div>
      </section>

      {/* ─── QUÉ PUEDEN HACER LOS NPCs ─── */}
      <section className="mt-14 pt-8 border-t border-[var(--border)]">
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-2">
          El poder oculto del NPC
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--foreground)] mb-2">
          ¿Y qué pueden hacer los NPCs para vivir mejor?
        </h2>
        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-7 max-w-3xl">
          El mapa muestra algo que no es obvio: el poder real de los NPCs no está en su sueldo, está en su{' '}
          <strong className="text-[var(--foreground)]">consumo</strong>. Cada peso que gastan decide qué empresa
          crece, consigue créditos y se hace más grande. Las empresas existen porque alguien les compra — así que
          si millones cambian a dónde va ese peso, el mapa entero se reordena.
        </p>

        {/* acciones */}
        <h3 className="text-base font-bold text-[var(--foreground)] mb-3">Lo que pueden hacer</h3>
        <div className="grid sm:grid-cols-2 gap-3 mb-9">
          {NPC_ACTIONS.map((a) => (
            <div key={a.n} className="flex gap-3 items-start p-4 rounded-xl" style={{ background: '#EAF3DE', border: '1px solid #3B6D11' }}>
              <span className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-extrabold" style={{ background: '#3B6D11' }}>
                {a.n}
              </span>
              <div>
                <h4 className="text-sm font-bold mb-0.5" style={{ color: '#0d2002' }}>{a.title}</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: '#173404' }}>{a.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* consecuencias */}
        <h3 className="text-base font-bold text-[var(--foreground)] mb-1.5">
          ¿Qué le pasaría a Falabella y a las empresas que pagan poco?
        </h3>
        <p className="text-[13.5px] text-[var(--text-secondary)] leading-relaxed mb-4 max-w-3xl">
          El sistema no se rompe — se reordena. Si los NPCs mueven su consumo, se gatilla esta reacción en cadena:
        </p>
        <div className="space-y-2.5 mb-9">
          {NPC_CONSEQUENCES.map((c, i) => (
            <div
              key={i}
              className="flex gap-3 items-start p-4 rounded-xl"
              style={{ background: c.good ? '#EAF3DE' : '#FCEBEB', border: `1px solid ${c.good ? '#3B6D11' : '#9e2626'}` }}
            >
              <span className="text-lg leading-none mt-0.5" style={{ color: c.good ? '#3B6D11' : '#9e2626' }}>
                {c.good ? '↗' : '↘'}
              </span>
              <div>
                <h4 className="text-sm font-bold mb-0.5" style={{ color: c.good ? '#0d2002' : '#420e0e' }}>{c.title}</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: c.good ? '#173404' : '#8c2020' }}>{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* clave */}
        <div className="rounded-xl p-5" style={{ background: 'var(--keypoint-bg)', border: '1px solid var(--keypoint-border)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--keypoint-text)' }}>
            <strong>La clave:</strong> el sueldo no se sube pidiéndolo — se sube moviendo a dónde va el consumo. Quien
            decide a quién comprarle, decide quién crece y quién consigue el crédito. El poder del NPC no está en su
            pega, está en su billetera. Pero solo funciona <strong>coordinado con millones</strong>: un carrito no
            cambia nada, un país eligiendo distinto cambia todo.
          </p>
        </div>

        {/* realismo */}
        <div className="mt-3 rounded-xl p-4" style={{ background: '#FEF3DA', border: '1px solid #d48a0a' }}>
          <p className="text-[13px] leading-relaxed" style={{ color: '#6e3e08' }}>
            <strong>Siendo realistas:</strong> no es mágico ni instantáneo. Requiere que existan alternativas reales,
            que el NPC tenga algo de margen para elegir (el que vive al día compra lo más barato, no lo más justo) y,
            sobre todo, coordinación masiva. Por eso en la historia esto funcionó con sindicatos fuertes + un Estado
            que garantizó alternativas en salud, educación y vivienda — como en Escandinavia, Alemania o Corea del Sur.
          </p>
        </div>
      </section>
    </div>
  );
}
