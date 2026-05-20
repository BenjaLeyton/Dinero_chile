'use client';

const NODE_STYLES: Record<string, { bg: string; border: string; h3: string; p: string }> = {
  teal: { bg: '#E1F5EE', border: '#1D9E75', h3: '#054030', p: '#0a5c42' },
  coral: { bg: '#FAECE7', border: '#c94a1e', h3: '#5e1a07', p: '#8b3415' },
  red: { bg: '#FCEBEB', border: '#9e2626', h3: '#420e0e', p: '#8c2020' },
  amber: { bg: '#FEF3DA', border: '#d48a0a', h3: '#4a2800', p: '#6e3e08' },
  neutral: { bg: 'var(--surface)', border: 'var(--border)', h3: 'var(--foreground)', p: 'var(--text-secondary)' },
  purple: { bg: '#f7f3ff', border: '#7F77DD', h3: '#26215C', p: '#3C3489' },
  green: { bg: '#EAF3DE', border: '#3B6D11', h3: '#0d2002', p: '#173404' },
  'dashed-teal': { bg: 'transparent', border: '#1D9E75', h3: '#0a5c42', p: '#0a5c42' },
  'dashed-red': { bg: 'transparent', border: '#9e2626', h3: '#8c2020', p: '#8c2020' },
};

const NUM_COLORS: Record<string, string> = {
  r: '#9e2626', c: '#c94a1e', a: '#d48a0a', g: '#3B6D11', n: '#5F5E5A',
};

interface NodeDef {
  id: string;
  variant: string;
  x: number;
  y: number;
  w: number;
  title: string;
  body: string;
  hub?: boolean;
  dashed?: boolean;
  num?: number;
  numColor?: string;
}

interface ArrowDef {
  path: string;
  color: string;
  width?: number;
  opacity?: number;
  dashed?: boolean;
  marker: string;
}

interface LabelDef {
  x: number;
  y: number;
  w: number;
  text: string;
  color: string;
}

function Node({ node }: { node: NodeDef }) {
  const s = NODE_STYLES[node.variant] || NODE_STYLES.neutral;
  const isDashed = node.variant.startsWith('dashed-');

  return (
    <div
      className="absolute rounded-xl"
      style={{
        left: node.x,
        top: node.y,
        width: node.w,
        padding: node.num ? '13px 16px 13px 48px' : '13px 16px',
        background: s.bg,
        border: isDashed ? `1.5px dashed ${s.border}` : `1px solid ${s.border}`,
        boxShadow: node.hub
          ? node.variant === 'coral'
            ? '0 0 0 4px rgba(245,196,179,0.45)'
            : '0 0 0 4px rgba(159,225,203,0.35)'
          : undefined,
        zIndex: 2,
      }}
    >
      {node.num !== undefined && (
        <div
          className="absolute top-3 left-3.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-extrabold"
          style={{ background: NUM_COLORS[node.numColor || 'n'] }}
        >
          {node.num}
        </div>
      )}
      <h3
        className="text-[13.5px] font-bold mb-1 leading-tight"
        style={{ color: s.h3 }}
        dangerouslySetInnerHTML={{ __html: node.title }}
      />
      <p
        className="text-[12.2px] leading-[1.5]"
        style={{ color: s.p }}
        dangerouslySetInnerHTML={{ __html: node.body }}
      />
    </div>
  );
}

function ArrowLabel({ label, panelFill }: { label: LabelDef; panelFill: string }) {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ left: label.x, top: label.y, width: label.w, height: 18, overflow: 'visible', zIndex: 4 }}
      viewBox={`0 0 ${label.w} 18`}
    >
      <rect x="0" y="0" width={label.w} height={18} rx={3} fill={panelFill} stroke={label.color} strokeOpacity={0.25} strokeWidth={1} />
      <text
        x={label.w / 2}
        y={10}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={label.color}
        style={{ fontSize: '11.5px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
      >
        {label.text}
      </text>
    </svg>
  );
}

// ──────────────── GOOD DIAGRAM DATA ────────────────
const goodNodes: NodeDef[] = [
  { id: 'g1', variant: 'teal', x: 380, y: 40, w: 320, title: 'Empresa', body: 'Paga sueldo justo: <strong>$1.200k / mes</strong>.' },
  { id: 'g2', variant: 'teal', x: 380, y: 220, w: 320, title: 'Juan', body: 'Recibe el sueldo. Cubre todos sus gastos y le sobran $200k libres cada mes.', hub: true },
  { id: 'g3', variant: 'dashed-teal', x: 880, y: 230, w: 300, title: 'Ahorro real', body: 'Juan guarda <strong>$200k/mes</strong>. Puede invertir, emprender o aguantar imprevistos sin pedir prestado.' },
  { id: 'g4', variant: 'teal', x: 40, y: 400, w: 300, title: 'Más empleo', body: 'Los negocios que reciben el dinero de Juan contratan más gente. La demanda crece de forma orgánica, sin deuda.' },
  { id: 'g5', variant: 'teal', x: 380, y: 400, w: 320, title: 'Otros negocios', body: 'Reciben <strong>$800k</strong> del consumo de Juan. La economía se expande.' },
  { id: 'g6', variant: 'teal', x: 880, y: 400, w: 300, title: 'Pedro · Deuda productiva', body: 'Pide <strong>$900</strong> para montar una fábrica. Es <strong>la buena</strong>: no destruye el sistema, lo hace crecer.' },
  { id: 'g7', variant: 'teal', x: 880, y: 600, w: 300, title: 'Fábrica genera valor real', body: 'La inversión produce <strong>$1.400</strong> en valor nuevo. La deuda se paga sola con el ingreso que ella misma genera.' },
  { id: 'g8', variant: 'teal', x: 220, y: 780, w: 740, title: 'Escalera mecánica sana', body: 'Deuda nueva &gt; capital destruido. El dinero en circulación crece junto con el valor real de la economía. <strong>Todos suben cuando la escalera sube.</strong>' },
  { id: 'g9', variant: 'dashed-teal', x: 220, y: 940, w: 740, title: 'Balance de deuda sano', body: 'Deuda crece → genera ingreso nuevo que la paga. Ratio deuda/ingreso: estable o baja con el tiempo. <strong>La escalera sube sin destruir a nadie.</strong>' },
];

const goodArrows: ArrowDef[] = [
  { path: 'M 12 12 V 142', color: '#1D9E75', width: 2.4, opacity: 0.85, marker: 'gT' },
  { path: 'M 12 12 H 242', color: '#1D9E75', width: 2.4, opacity: 0.85, marker: 'gT' },
  { path: 'M 12 12 V 132', color: '#1D9E75', width: 2.4, opacity: 0.85, marker: 'gT' },
  { path: 'M 102 12 H 12', color: '#1D9E75', width: 2, opacity: 0.85, marker: 'gT' },
  { path: 'M 82 447 H 12 V 12 H 532 V 32', color: '#1D9E75', width: 2, opacity: 0.7, dashed: true, marker: 'gT' },
  { path: 'M 12 12 H 242', color: '#1D9E75', width: 2, opacity: 0.85, marker: 'gT' },
  { path: 'M 12 12 V 132', color: '#1D9E75', width: 2.4, opacity: 0.85, marker: 'gT' },
  { path: 'M 12 12 V 312 H 102 V 332', color: '#1D9E75', width: 1.8, opacity: 0.85, marker: 'gT' },
  { path: 'M 142 12 V 112 H 12 V 132', color: '#1D9E75', width: 1.8, opacity: 0.85, marker: 'gT' },
  { path: 'M 12 12 V 112', color: '#1D9E75', width: 2.4, opacity: 0.85, marker: 'gT' },
];

const goodArrowPositions = [
  { x: 528, y: 78, w: 24, h: 154 },
  { x: 638, y: 263, w: 254, h: 24 },
  { x: 528, y: 268, w: 24, h: 144 },
  { x: 328, y: 443, w: 114, h: 24 },
  { x: 8, y: 8, w: 544, h: 459 },
  { x: 638, y: 443, w: 254, h: 24 },
  { x: 1018, y: 468, w: 24, h: 144 },
  { x: 178, y: 448, w: 114, h: 344 },
  { x: 888, y: 648, w: 154, h: 144 },
  { x: 578, y: 828, w: 24, h: 124 },
];

const goodLabels: LabelDef[] = [
  { x: 495, y: 170, w: 90, text: 'paga $1.200k', color: '#1D9E75' },
  { x: 724, y: 265, w: 132, text: '$200k sobran al mes', color: '#1D9E75' },
  { x: 462, y: 355, w: 157, text: 'gasta $800k en consumo', color: '#1D9E75' },
  { x: 333, y: 425, w: 54, text: 'empleo', color: '#1D9E75' },
  { x: 201, y: 10, w: 158, text: 'demanda crece sin deuda', color: '#1D9E75' },
  { x: 752, y: 425, w: 77, text: 'producción', color: '#1D9E75' },
  { x: 982, y: 555, w: 97, text: '$900 invertido', color: '#1D9E75' },
  { x: 137, y: 630, w: 107, text: 'empleo orgánico', color: '#1D9E75' },
  { x: 976, y: 725, w: 108, text: '$1.400 valor real', color: '#1D9E75' },
  { x: 506, y: 905, w: 168, text: 'ratio deuda/ingreso estable', color: '#1D9E75' },
];

// ──────────────── BAD DIAGRAM DATA ────────────────
const badNodes: NodeDef[] = [
  { id: 'b1', variant: 'coral', x: 440, y: 40, w: 400, title: 'Falabella · BCI · Copec', body: 'Ganancias récord. Sueldo de Juan: <strong>$650k</strong>. Pensión tras 40 años: <strong>$280k</strong> — menos que el sueldo mínimo.' },
  { id: 'b2', variant: 'amber', x: 60, y: 40, w: 320, title: 'Acciones de Falabella · BCI · Copec', body: 'La AFP usa el dinero de Juan para comprarlas. Quien las posee se capitaliza con el aporte forzoso del trabajador.' },
  { id: 'b3', variant: 'amber', x: 60, y: 240, w: 320, title: 'AFP', body: '<strong>$65k/mes</strong> obligatorio. <strong>Invierte en las mismas empresas que pagan poco.</strong>' },
  { id: 'b4', variant: 'red', x: 60, y: 460, w: 320, title: 'Pensión final', body: 'Después de 40 años aportando: <strong>$280k</strong>. Lo que vuelve a Juan al jubilar.' },
  { id: 'b5', variant: 'neutral', x: 440, y: 240, w: 400, title: 'Juan', body: 'Recibe $650k. Tras gastos: <strong>$90k libres / mes</strong>. Sin ahorro posible. Centro de todos los loops.', hub: true },
  { id: 'b6', variant: 'red', x: 900, y: 240, w: 320, title: 'CMR Falabella · 35%', body: 'Juan pide <strong>$400k</strong> prestado para sobrevivir. Cuota: <strong>$45k/mes</strong>.' },
  { id: 'b7', variant: 'red', x: 900, y: 460, w: 320, title: 'Deuda de consumo', body: 'TV, auto, ropa, imprevistos. No genera ingreso nuevo. Sale del mismo sueldo de siempre.' },
  { id: 'b8', variant: 'red', x: 440, y: 760, w: 400, title: 'DICOM', body: '<strong>4.2 millones</strong> de chilenos no pueden pagar sus deudas. Casi 1 de cada 2 trabajadores tiene deuda impagada.' },
  { id: 'b9', variant: 'neutral', x: 40, y: 940, w: 360, title: 'Válvula 1 · Informalidad', body: 'Trabajo sin contrato. Economía fuera del sistema. El PIB no la registra. El costo lo absorbe el trabajador con menos derechos.' },
  { id: 'b10', variant: 'neutral', x: 460, y: 940, w: 360, title: 'Válvula 2 · Red familiar', body: 'Papás y hermanos ayudan. El costo real lo absorbe la familia — no el sistema financiero, no la empresa.' },
  { id: 'b11', variant: 'amber', x: 880, y: 940, w: 360, title: 'Válvula 3 · Estado interviene', body: 'Financiado por el cobre. Bonos IFE + retiros AFP = <strong>$47 trillones</strong> inyectados (2020–2022). Si el cobre baja → no puede intervenir.' },
  { id: 'b12', variant: 'dashed-red', x: 40, y: 1140, w: 1200, title: 'Balance de deuda — la trampa', body: 'La deuda crece sin ingreso nuevo que la pague. Ratio deuda/ingreso sube <strong>7 veces más rápido que los sueldos</strong>. Las tres válvulas alivian a Juan pero <strong>ninguna sube su sueldo</strong>. Cuando se saturan, llega la explosión.' },
];

const badStepNodes: NodeDef[] = [
  { id: 's1', variant: 'red', x: 60, y: 1320, w: 560, title: 'Juan defaultea', body: 'El banco ejecuta sus garantías. Su casa se remata al 40–60% de su valor real. Juan pierde sus activos físicos pero queda con la deuda.', num: 1, numColor: 'r' },
  { id: 's2', variant: 'red', x: 680, y: 1320, w: 560, title: 'El banco pierde capital', body: 'Recuperó $200k de una deuda de $400k. Registra pérdida de $200k. El crédito se cierra para todos, no solo para Juan.', num: 2, numColor: 'r' },
  { id: 's3', variant: 'coral', x: 60, y: 1500, w: 560, title: 'Deflación — el dinero desaparece', body: 'Menos crédito → menos dinero en circulación → todos venden menos. La velocidad del dinero colapsa. Las deudas en pesos fijos pesan más en términos reales.', num: 3, numColor: 'c' },
  { id: 's4', variant: 'coral', x: 680, y: 1500, w: 560, title: 'Estado y Banco Central intervienen', body: 'BC baja tasas. Si no alcanza: QE. El Estado gasta con déficit. En Chile: retiros AFP + IFE = $47 trillones (2020–22). Dinero nuevo que entra sin que nadie lo pida prestado.', num: 4, numColor: 'c' },
  { id: 's5', variant: 'amber', x: 60, y: 1700, w: 560, title: 'Inflación — el antídoto y el precio', body: 'Más dinero + misma cantidad de bienes = precios suben. Chile 2022: <strong>14.1%</strong>. Licúa las deudas en pesos fijos. Quien tenía activos reales ganó. Quien tenía solo pesos: perdió.', num: 5, numColor: 'a' },
  { id: 's6', variant: 'red', x: 680, y: 1700, w: 560, title: 'El ciclo se reinicia — pero peor', body: 'Sueldos siguen bajos. Juan sigue sin ahorro. Quemó su jubilación en los retiros. El crédito se reactiva → Juan vuelve a pedir prestado. La deuda total parte desde un piso más alto.', num: 6, numColor: 'r' },
  { id: 's7', variant: 'green', x: 60, y: 1900, w: 1180, title: 'La recuperación mínima estratégica', body: 'Las empresas suben el sueldo mínimo justo lo necesario: suficiente para que Juan consuma, no tanto para que pueda ahorrar. El sueldo nominal sube; la inflación acumulada ya lo licuó. Juan "recuperó" su sueldo → volvió al mismo punto real de siempre.', num: 7, numColor: 'g' },
];

const badZone4Nodes: NodeDef[] = [
  { id: 'z4a', variant: 'purple', x: 40, y: 2400, w: 1200, title: '⚖️ El umbral deliberado — por qué nadie mueve el equilibrio', body: 'El sueldo de Juan no es bajo por error: es el punto exacto donde el sistema se sostiene sin colapsar y sin entregar poder.' },
  { id: 'z4b', variant: 'red', x: 40, y: 2570, w: 580, title: 'Si Juan gana demasiado poco', body: 'No puede consumir → las empresas no venden → el sistema colapsa. <strong>Malo para el capital.</strong>' },
  { id: 'z4c', variant: 'red', x: 660, y: 2570, w: 580, title: 'Si Juan gana demasiado', body: 'Puede ahorrar → puede negociar desde fuerza → puede organizarse políticamente. <strong>También malo para el capital.</strong>' },
  { id: 'z4d', variant: 'amber', x: 40, y: 2720, w: 580, title: 'El punto óptimo para el capital', body: 'Juan gana exactamente lo necesario para reproducir su fuerza de trabajo: comer, dormir, llegar al trabajo mañana. Y nada más. Marx lo llamó <em>salario de reproducción</em>.' },
  { id: 'z4e', variant: 'purple', x: 660, y: 2720, w: 580, title: 'Por qué nadie lo cambia', body: 'No es conspiración. Es que el umbral es el equilibrio del sistema: ningún actor individual tiene incentivo de moverlo.' },
  { id: 'z4f', variant: 'purple', x: 40, y: 2880, w: 1200, title: '¿Hubo países que rompieron el ciclo sin catástrofe?', body: 'Sí. Escandinavia 1950–1980, Alemania Occidental 1950–1990, Corea del Sur 1970–2000. Fórmula: sindicatos fuertes + Estado que redistribuyó vía salud, educación y vivienda + regulación que impidió que el crédito de consumo fuera el principal motor de demanda.' },
];

const badLabels: LabelDef[] = [
  { x: 600, y: 185, w: 80, text: 'paga $650k', color: '#9e2626' },
  { x: 445, y: 385, w: 150, text: '10% forzoso · $65k/mes', color: '#d48a0a' },
  { x: 166, y: 185, w: 109, text: 'compra acciones', color: '#d48a0a' },
  { x: 430, y: 10, w: 190, text: 'paradoja AFP · capitaliza al jefe', color: '#d48a0a' },
  { x: 160, y: 405, w: 120, text: '40 años aportando', color: '#d48a0a' },
  { x: 700, y: 385, w: 120, text: 'pide $400k al 35%', color: '#9e2626' },
  { x: 1022, y: 405, w: 76, text: 'se acumula', color: '#9e2626' },
  { x: 803, y: 320, w: 104, text: 'cuota $45k/mes', color: '#9e2626' },
  { x: 1212, y: 135, w: 97, text: 'venta + interés', color: '#9e2626' },
  { x: 539, y: 555, w: 203, text: 'cuando Juan no puede pagar más', color: '#9e2626' },
  { x: 340, y: 900, w: 80, text: 'sin contrato', color: '#888780' },
  { x: 594, y: 900, w: 92, text: 'ayuda familiar', color: '#888780' },
  { x: 842, y: 900, w: 116, text: 'subsidio del cobre', color: '#888780' },
  { x: 1200, y: 590, w: 131, text: 'interviene con bonos', color: '#d48a0a' },
  { x: 530, y: 1235, w: 220, text: 'las válvulas se saturan · explosión', color: '#c94a1e' },
  { x: 591, y: 1368, w: 118, text: 'el crédito se cierra', color: '#9e2626' },
  { x: 585, y: 1480, w: 131, text: 'menos crédito nuevo', color: '#9e2626' },
  { x: 588, y: 1548, w: 123, text: 'BC + Estado actúan', color: '#c94a1e' },
  { x: 566, y: 1680, w: 168, text: 'dinero nuevo en circulación', color: '#c94a1e' },
  { x: 598, y: 1748, w: 104, text: 'deudas licuadas', color: '#d48a0a' },
  { x: 887, y: 1880, w: 146, text: 'piso más alto que antes', color: '#9e2626' },
  { x: 1253, y: 1490, w: 113, text: 'ciclo reinicia peor', color: '#c94a1e' },
  { x: 569, y: 2350, w: 142, text: '¿por qué se queda así?', color: '#7F77DD' },
];

// SVG raw arrow paths for the bad diagram
const badArrowsSVG = `
<marker id="b-mk-T" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#1D9E75" stroke-width="1.4" stroke-linecap="round"/></marker>
<marker id="b-mk-R" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#9e2626" stroke-width="1.4" stroke-linecap="round"/></marker>
<marker id="b-mk-C" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#c94a1e" stroke-width="1.4" stroke-linecap="round"/></marker>
<marker id="b-mk-A" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#d48a0a" stroke-width="1.4" stroke-linecap="round"/></marker>
<marker id="b-mk-N" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#888780" stroke-width="1.4" stroke-linecap="round"/></marker>
<marker id="b-mk-P" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#7F77DD" stroke-width="1.4" stroke-linecap="round"/></marker>
`;

interface RawArrow { x: number; y: number; w: number; h: number; d: string; stroke: string; sw: number; op: number; dash?: boolean; marker: string }

const badRawArrows: RawArrow[] = [
  { x:628, y:88, w:24, h:164, d:'M 12 12 V 152', stroke:'#9e2626', sw:2.4, op:0.85, marker:'b-mk-R' },
  { x:368, y:288, w:284, h:119, d:'M 272 22 V 107 H 37 V 12 H 12', stroke:'#d48a0a', sw:2.2, op:0.85, marker:'b-mk-A' },
  { x:208, y:138, w:24, h:164, d:'M 12 152 V 12', stroke:'#d48a0a', sw:2.2, op:0.85, marker:'b-mk-A' },
  { x:318, y:8, w:334, h:99, d:'M 12 87 H 92 V 12 H 322 V 32', stroke:'#d48a0a', sw:3, op:0.85, marker:'b-mk-A' },
  { x:208, y:308, w:24, h:164, d:'M 12 12 V 152', stroke:'#d48a0a', sw:2, op:0.85, marker:'b-mk-A' },
  { x:828, y:288, w:84, h:119, d:'M 12 22 V 107 H 47 V 12 H 72', stroke:'#9e2626', sw:2.2, op:0.85, marker:'b-mk-R' },
  { x:1048, y:308, w:24, h:164, d:'M 12 12 V 152', stroke:'#9e2626', sw:2, op:0.85, marker:'b-mk-R' },
  { x:828, y:338, w:134, h:199, d:'M 122 187 H 42 V 12 H 12', stroke:'#9e2626', sw:1.8, op:0.85, dash:true, marker:'b-mk-R' },
  { x:748, y:83, w:524, h:219, d:'M 12 207 V 117 H 512 V 12 H 92', stroke:'#9e2626', sw:1.6, op:0.65, dash:true, marker:'b-mk-R' },
  { x:628, y:308, w:24, h:464, d:'M 12 12 V 452', stroke:'#9e2626', sw:2.4, op:0.85, marker:'b-mk-R' },
  { x:208, y:818, w:344, h:134, d:'M 332 12 V 92 H 12 V 122', stroke:'#888780', sw:1.8, op:0.85, marker:'b-mk-N' },
  { x:628, y:818, w:24, h:134, d:'M 12 12 V 122', stroke:'#888780', sw:1.8, op:0.85, marker:'b-mk-N' },
  { x:728, y:818, w:344, h:134, d:'M 12 12 V 92 H 332 V 122', stroke:'#888780', sw:1.8, op:0.85, marker:'b-mk-N' },
  { x:628, y:183, w:649, h:829, d:'M 562 817 H 637 V 12 H 12 V 57', stroke:'#d48a0a', sw:1.8, op:0.75, dash:true, marker:'b-mk-A' },
  { x:628, y:1158, w:24, h:174, d:'M 12 12 V 162', stroke:'#c94a1e', sw:2.4, op:0.85, marker:'b-mk-C' },
  { x:558, y:1388, w:134, h:24, d:'M 12 12 H 122', stroke:'#9e2626', sw:2, op:0.85, marker:'b-mk-R' },
  { x:328, y:1418, w:644, h:94, d:'M 632 12 V 72 H 12 V 82', stroke:'#9e2626', sw:2, op:0.85, marker:'b-mk-R' },
  { x:558, y:1568, w:134, h:24, d:'M 12 12 H 122', stroke:'#c94a1e', sw:2, op:0.85, marker:'b-mk-C' },
  { x:328, y:1618, w:644, h:94, d:'M 632 12 V 72 H 12 V 82', stroke:'#c94a1e', sw:2, op:0.85, marker:'b-mk-C' },
  { x:558, y:1768, w:134, h:24, d:'M 12 12 H 122', stroke:'#d48a0a', sw:2, op:0.85, marker:'b-mk-A' },
  { x:948, y:1818, w:24, h:94, d:'M 12 12 V 82', stroke:'#9e2626', sw:2, op:0.85, marker:'b-mk-R' },
  { x:828, y:83, w:554, h:1999, d:'M 362 1987 H 542 V 12 H 12', stroke:'#c94a1e', sw:2.2, op:0.7, dash:true, marker:'b-mk-C' },
  { x:628, y:2258, w:24, h:154, d:'M 12 12 V 142', stroke:'#7F77DD', sw:2.4, op:0.85, marker:'b-mk-P' },
  { x:188, y:2498, w:24, h:84, d:'M 12 12 V 72', stroke:'#7F77DD', sw:1.4, op:0.85, marker:'b-mk-P' },
  { x:808, y:2498, w:24, h:84, d:'M 12 12 V 72', stroke:'#7F77DD', sw:1.4, op:0.85, marker:'b-mk-P' },
  { x:188, y:2638, w:24, h:94, d:'M 12 12 V 82', stroke:'#7F77DD', sw:1.4, op:0.85, marker:'b-mk-P' },
  { x:808, y:2638, w:24, h:94, d:'M 12 12 V 82', stroke:'#7F77DD', sw:1.4, op:0.85, marker:'b-mk-P' },
  { x:318, y:2798, w:24, h:94, d:'M 12 12 V 82', stroke:'#7F77DD', sw:2, op:0.85, marker:'b-mk-P' },
  { x:938, y:2798, w:24, h:94, d:'M 12 12 V 82', stroke:'#7F77DD', sw:2, op:0.85, marker:'b-mk-P' },
];

function ResetCards() {
  return (
    <div className="absolute" style={{ left: 60, top: 2080, width: 1180, zIndex: 2 }}>
      <div
        className="rounded-xl"
        style={{
          padding: '13px 16px 13px 48px',
          background: NODE_STYLES.neutral.bg,
          border: `1px solid ${NODE_STYLES.neutral.border}`,
          position: 'relative',
        }}
      >
        <div className="absolute top-3 left-3.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-extrabold" style={{ background: '#5F5E5A' }}>8</div>
        <h3 className="text-[13.5px] font-bold mb-1 leading-tight" style={{ color: NODE_STYLES.neutral.h3 }}>
          ¿Hay resets históricos más profundos?
        </h3>
        <p className="text-[12.2px] leading-[1.5] mb-3" style={{ color: NODE_STYLES.neutral.p }}>
          Cuando la acumulación de deuda no encuentra salida gradual, la historia registra tres mecanismos de reset:
        </p>
        <div className="grid grid-cols-3 gap-3.5">
          <div className="rounded-lg p-3 text-[11.8px] leading-[1.5]" style={{ background: '#FCEBEB' }}>
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold mb-1.5" style={{ background: '#FCEBEB', color: '#501313' }}>Guerras</span><br />
            Destruyen capital y deuda. La WWII limpió la deuda de los 20–30 y generó el boom de los 50–60.
          </div>
          <div className="rounded-lg p-3 text-[11.8px] leading-[1.5]" style={{ background: '#FEF0E6' }}>
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold mb-1.5" style={{ background: '#FEF0E6', color: '#5e2a0a' }}>Pandemias</span><br />
            COVID generó la &quot;Gran Renuncia&quot; de 2021. Sueldos subieron temporalmente. Duró 2 años.
          </div>
          <div className="rounded-lg p-3 text-[11.8px] leading-[1.5]" style={{ background: '#F1EFE8' }}>
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold mb-1.5" style={{ background: '#F1EFE8', color: '#2C2C2A' }}>Crisis sin reset</span><br />
            Grecia 2010–2015: suicidios +35%, natalidad -20%, PIB -27%. No fue reset: fue destrucción sin recuperación.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiagramasEconomia() {
  const panelFill = '#faf9f6';

  return (
    <div className="max-w-[1320px] mx-auto">
      <h1 className="text-[28px] font-extrabold tracking-tight text-[var(--foreground)] mb-1.5">
        El circuito económico — diagrama bueno vs diagrama malo
      </h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
        Cada caja es un actor. Cada flecha vive en su propio carril vacío entre las cajas — nada se tapa.
        El diagrama bueno muestra el circuito sano y todos sus conceptos. El diagrama malo muestra el de Chile
        actual con todos los loops cerrados entrelazados en un solo grafo.
      </p>

      {/* Legend */}
      <div className="flex gap-6 flex-wrap mb-8 p-3.5 px-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        {[
          { color: '#1D9E75', label: 'Flujo sano', dashed: false },
          { color: '#9e2626', label: 'Flujo problemático / extracción', dashed: false },
          { color: '#d48a0a', label: 'Paradoja AFP · Intervención', dashed: false },
          { color: '#8a8880', label: 'Válvulas de supervivencia', dashed: false },
          { color: '#c94a1e', label: 'Explosión y reset', dashed: false },
          { color: '#9e2626', label: 'Loop de retorno', dashed: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-[12px] text-[var(--text-secondary)]">
            <div className="w-8 h-0" style={{ borderTopWidth: '2.5px', borderTopStyle: item.dashed ? 'dashed' : 'solid', borderTopColor: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ═══════ DIAGRAMA BUENO ═══════ */}
      <section className="mb-16">
        <div className="mb-4">
          <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-1.5">
            Diagrama 01 · Circuito sano
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] mb-1">
            Cómo debería circular el dinero
          </h2>
          <p className="text-[13.5px] text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            El sueldo de Juan le alcanza para vivir y ahorrar. Lo que gasta vuelve a otros negocios, que contratan
            más gente. En paralelo, la deuda productiva genera valor real que paga sola la deuda. Todo converge en
            una escalera sana.
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[#faf9f6]">
          <div className="relative mx-auto" style={{ width: 1200, height: 1080 }}>
            {/* Marker defs */}
            <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
              <defs>
                <marker id="g-mk-T" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={8} markerHeight={8} orient="auto-start-reverse">
                  <path d="M2 1.5L8 5L2 8.5" fill="none" stroke="#1D9E75" strokeWidth={1.4} strokeLinecap="round" />
                </marker>
              </defs>
            </svg>

            {/* Arrows */}
            {goodArrows.map((a, i) => {
              const pos = goodArrowPositions[i];
              return (
                <svg
                  key={i}
                  className="absolute pointer-events-none"
                  style={{ left: pos.x, top: pos.y, width: pos.w, height: pos.h, overflow: 'visible' }}
                  viewBox={`0 0 ${pos.w} ${pos.h}`}
                >
                  <path
                    d={a.path}
                    fill="none"
                    stroke={a.color}
                    strokeWidth={a.width}
                    opacity={a.opacity}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={a.dashed ? '6 4' : undefined}
                    markerEnd="url(#g-mk-T)"
                  />
                </svg>
              );
            })}

            {/* Labels */}
            {goodLabels.map((l, i) => (
              <ArrowLabel key={i} label={l} panelFill={panelFill} />
            ))}

            {/* Nodes */}
            {goodNodes.map((n) => (
              <Node key={n.id} node={n} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DIAGRAMA MALO ═══════ */}
      <section className="mb-16">
        <div className="mb-4">
          <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-1.5">
            Diagrama 02 · Circuito actual — Chile
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] mb-1">
            Cómo circula realmente — todos los conceptos en un solo grafo
          </h2>
          <p className="text-[13.5px] text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Juan es el nodo central. Arriba: el loop cerrado de extracción (Falabella → Juan → AFP → Acciones → Falabella).
            A los lados: el loop de la deuda CMR. Abajo: DICOM se ramifica en las tres válvulas.
            Cuando las válvulas se saturan: la explosión de 8 pasos en cadena. Al final: la homeostasis del capital.
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[#faf9f6]">
          <div className="relative mx-auto" style={{ width: 1450, height: 3080 }}>
            {/* Marker defs */}
            <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
              <defs dangerouslySetInnerHTML={{ __html: badArrowsSVG }} />
            </svg>

            {/* Zone labels & dividers */}
            {[
              { label: 'Zona 1 · El loop de extracción', y: 8 },
              { label: 'Zona 2 · Cuando Juan falla · DICOM y las 3 válvulas', y: 728, dividerY: 720 },
              { label: 'Zona 3 · Las válvulas se saturan · 8 pasos de la explosión', y: 1288, dividerY: 1280 },
              { label: 'Zona 4 · Por qué se queda así · homeostasis del capital', y: 2378, dividerY: 2370 },
            ].map((z) => (
              <div key={z.label}>
                {z.dividerY !== undefined && (
                  <div className="absolute left-4 right-4" style={{ top: z.dividerY, height: 0, borderTop: '1px dashed var(--border)', zIndex: 1 }} />
                )}
                <div
                  className="absolute text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] px-2.5 py-1 rounded border border-dashed border-[var(--border)] bg-[#faf9f6]"
                  style={{ left: 20, top: z.y, zIndex: 1 }}
                >
                  {z.label}
                </div>
              </div>
            ))}

            {/* Arrows */}
            {badRawArrows.map((a, i) => (
              <svg
                key={i}
                className="absolute pointer-events-none"
                style={{ left: a.x, top: a.y, width: a.w, height: a.h, overflow: 'visible' }}
                viewBox={`0 0 ${a.w} ${a.h}`}
              >
                <path
                  d={a.d}
                  fill="none"
                  stroke={a.stroke}
                  strokeWidth={a.sw}
                  opacity={a.op}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={a.dash ? '6 4' : undefined}
                  markerEnd={`url(#${a.marker})`}
                />
              </svg>
            ))}

            {/* Labels */}
            {badLabels.map((l, i) => (
              <ArrowLabel key={i} label={l} panelFill={panelFill} />
            ))}

            {/* Nodes zones 1-2 */}
            {badNodes.map((n) => (
              <Node key={n.id} node={n} />
            ))}

            {/* Step nodes zone 3 */}
            {badStepNodes.map((n) => (
              <Node key={n.id} node={n} />
            ))}

            {/* Step 8 with reset cards */}
            <ResetCards />

            {/* Zone 4 nodes */}
            {badZone4Nodes.map((n) => (
              <Node key={n.id} node={n} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
