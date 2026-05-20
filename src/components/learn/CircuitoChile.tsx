'use client';

function ArrowDown({ label, color = 'var(--success)' }: { label: string; color?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1.5">
      <div className="w-0.5 h-5" style={{ background: color, opacity: 0.85 }} />
      <div
        className="w-0 h-0"
        style={{
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `7px solid ${color}`,
          opacity: 0.9,
        }}
      />
      <span
        className="text-[11px] font-semibold px-2 py-0.5 rounded whitespace-nowrap bg-[var(--background)]"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}

function Card({
  children,
  variant = 'teal',
  dashed = false,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'teal' | 'coral' | 'red' | 'amber' | 'neutral' | 'purple' | 'green';
  dashed?: boolean;
  className?: string;
}) {
  const styles: Record<string, { bg: string; border: string; h3: string; p: string }> = {
    teal: { bg: '#E1F5EE', border: '#1D9E75', h3: '#054030', p: '#0a5c42' },
    coral: { bg: '#FAECE7', border: '#c94a1e', h3: '#5e1a07', p: '#8b3415' },
    red: { bg: '#FCEBEB', border: '#9e2626', h3: '#420e0e', p: '#8c2020' },
    amber: { bg: '#FEF3DA', border: '#d48a0a', h3: '#4a2800', p: '#6e3e08' },
    neutral: { bg: 'var(--surface)', border: 'var(--border)', h3: 'var(--foreground)', p: 'var(--text-secondary)' },
    purple: { bg: '#f7f3ff', border: '#7F77DD', h3: '#26215C', p: '#3C3489' },
    green: { bg: '#EAF3DE', border: '#3B6D11', h3: '#0d2002', p: '#173404' },
  };

  const s = styles[variant];

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 ${className}`}
      style={{
        background: dashed ? 'transparent' : s.bg,
        border: dashed ? `1.5px dashed ${s.border}` : `1px solid ${s.border}`,
        '--card-h3': dashed ? s.p : s.h3,
        '--card-p': s.p,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--card-h3)' }}>
      {children}
    </h3>
  );
}

function CardText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[13px] leading-relaxed ${className}`} style={{ color: 'var(--card-p)' }}>
      {children}
    </p>
  );
}

function SectionBlock({
  tag,
  title,
  lede,
  children,
}: {
  tag: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 pt-8 border-t border-[var(--border)] first:border-t-0 first:mt-8 first:pt-0">
      <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-2">
        {tag}
      </div>
      <h2 className="text-xl font-bold mb-1.5 text-[var(--foreground)] tracking-tight">{title}</h2>
      <p className="text-[13.5px] text-[var(--text-secondary)] mb-8 max-w-2xl leading-relaxed">{lede}</p>
      {children}
    </section>
  );
}

function StepCard({
  num,
  title,
  children,
  variant = 'red',
  fullWidth = false,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
  variant?: 'red' | 'orange' | 'amber' | 'green' | 'gray';
  fullWidth?: boolean;
}) {
  const colors: Record<string, { bg: string; num: string; text: string; strong: string }> = {
    red: { bg: '#FCEBEB', num: '#9e2626', text: '#5a1414', strong: '#3e0d0d' },
    orange: { bg: '#FEF0E6', num: '#c94a1e', text: '#5e2a0a', strong: '#3e1a05' },
    amber: { bg: '#FEF3DA', num: '#d48a0a', text: '#4a2800', strong: '#2e1800' },
    green: { bg: '#EAF3DE', num: '#3B6D11', text: '#173404', strong: '#0d2002' },
    gray: { bg: 'var(--surface)', num: '#5F5E5A', text: '#2C2C2A', strong: '#1a1a18' },
  };

  const c = colors[variant];

  return (
    <div
      className={`flex gap-3 items-start p-4 rounded-xl ${fullWidth ? 'col-span-full' : ''}`}
      style={{ background: c.bg }}
    >
      <div
        className="text-[13px] font-extrabold w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white"
        style={{ background: c.num }}
      >
        {num}
      </div>
      <div className="flex-1 text-[13px] leading-relaxed" style={{ color: c.text }}>
        <strong className="block mb-1 text-[13.5px]" style={{ color: c.strong }}>
          {title}
        </strong>
        {children}
      </div>
    </div>
  );
}

export default function CircuitoChile() {
  return (
    <div className="max-w-[1320px] mx-auto">
      <h1 className="text-[28px] font-extrabold tracking-tight text-[var(--foreground)] mb-1.5">
        Cómo debería circular el dinero — y cómo circula en Chile
      </h1>
      <p className="text-sm text-[var(--text-secondary)] mb-12 max-w-2xl leading-relaxed">
        Cada recuadro es un actor. El diagrama está dividido en seis secciones que se leen de
        arriba hacia abajo: el flujo del sueldo, la paradoja AFP, las válvulas de supervivencia, el
        balance de deuda, qué pasa cuando explota y por qué el sistema se queda exactamente donde está.
      </p>

      {/* ══════════ SECCIÓN 01 — Flujo del sueldo ══════════ */}
      <SectionBlock
        tag="Sección 01 · Flujo del sueldo"
        title="Cómo viaja un sueldo desde la empresa hasta el resto de la economía"
        lede="A la izquierda, el flujo cuando el sueldo alcanza para vivir y ahorrar. A la derecha, el flujo real en Chile cuando no alcanza."
      >
        {/* Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center py-3 rounded-xl text-[15px] font-bold" style={{ background: '#9FE1CB', color: '#054030', border: '1.5px solid #1D9E75' }}>
            Circuito sano
          </div>
          <div className="text-center py-3 rounded-xl text-[15px] font-bold" style={{ background: '#F5C4B3', color: '#5e1a07', border: '1.5px solid #c94a1e' }}>
            Circuito actual — Chile
          </div>
        </div>

        {/* Row 1: Empresa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-0">
            <Card variant="teal" className="w-full">
              <CardTitle>Empresa</CardTitle>
              <CardText>Paga sueldo justo: <strong>$1.200k / mes</strong>.</CardText>
            </Card>
            <ArrowDown label="paga $1.200k" color="#1D9E75" />
            <Card variant="teal" className="w-full">
              <CardTitle>Juan</CardTitle>
              <CardText>Le sobran <strong>$200k / mes</strong>. Puede ahorrar.</CardText>
            </Card>
            <ArrowDown label="gasta $800k en consumo" color="#1D9E75" />
            <Card variant="teal" className="w-full">
              <CardTitle>Otros negocios</CardTitle>
              <CardText>Reciben <strong>$800k</strong> del consumo de Juan. La economía se expande de forma orgánica.</CardText>
            </Card>
            <ArrowDown label="contratan más gente" color="#1D9E75" />
            <Card variant="teal" className="w-full">
              <CardTitle>Más empleo</CardTitle>
              <CardText>Los negocios que reciben dinero de Juan contratan más gente. La demanda crece sin necesidad de deuda.</CardText>
            </Card>
            <ArrowDown label="deuda productiva" color="#1D9E75" />
            <Card variant="teal" className="w-full">
              <CardTitle>Deuda productiva — la buena</CardTitle>
              <CardText>Pedro pide $900 → su fábrica genera <strong>$1.400</strong> en valor real. La deuda se paga sola con el ingreso nuevo que ella misma genera.</CardText>
            </Card>
            <ArrowDown label="escalera sube" color="#1D9E75" />
            <Card variant="teal" className="w-full">
              <CardTitle>Escalera mecánica sana</CardTitle>
              <CardText>Deuda nueva {'>'} capital destruido. El dinero en circulación crece junto con el valor real de la economía. Todos suben cuando la escalera sube.</CardText>
            </Card>
          </div>

          <div className="flex flex-col items-center gap-0">
            <Card variant="coral" className="w-full">
              <CardTitle>Falabella · BCI · Copec</CardTitle>
              <CardText>Ganancias récord. Sueldo de Juan: <strong>$650k</strong>. Pensión tras 40 años: <strong>$280k</strong> (menos que el sueldo mínimo).</CardText>
            </Card>
            <ArrowDown label="paga $650k" color="#9e2626" />
            <Card variant="neutral" className="w-full">
              <CardTitle>Juan</CardTitle>
              <CardText>Solo le quedan <strong>$90k libres / mes</strong>. Sin ahorro posible.</CardText>
            </Card>
            <ArrowDown label="pide $400k a CMR 35%" color="#9e2626" />
            <Card variant="red" className="w-full">
              <CardTitle>CMR Falabella · 35%</CardTitle>
              <CardText>Juan pide <strong>$400k</strong> prestado. Cuota: $45k/mes que sale del mismo sueldo.</CardText>
            </Card>
            <ArrowDown label="cuota mensual" color="#9e2626" />
            <Card variant="red" className="w-full">
              <CardTitle>Deuda de consumo</CardTitle>
              <CardText>TV, auto, ropa, imprevistos. No genera ningún ingreso nuevo: sale del mismo sueldo de siempre.</CardText>
            </Card>
            <ArrowDown label="se acumula" color="#9e2626" />
            <Card variant="red" className="w-full">
              <CardTitle>DICOM</CardTitle>
              <CardText><strong>4.2 millones</strong> de chilenos no pueden pagar sus deudas. Casi 1 de cada 2 trabajadores tiene deuda impagada.</CardText>
            </Card>
            <ArrowDown label="el sistema falla" color="#9e2626" />
            <Card variant="red" className="w-full">
              <CardTitle>El sistema se rompe</CardTitle>
              <CardText>Juan no puede pagar. La explosión empieza (ver sección 05). Antes, el sistema usa válvulas de supervivencia para aguantar (ver sección 03).</CardText>
            </Card>
          </div>
        </div>
      </SectionBlock>

      {/* ══════════ SECCIÓN 02 — Paradoja AFP ══════════ */}
      <SectionBlock
        tag="Sección 02 · La paradoja"
        title="Juan financia a sus propios jefes"
        lede="El 10% obligatorio que Juan aporta a la AFP no vuelve a Juan: vuelve, vía mercado, a las mismas empresas que le pagan poco."
      >
        <div className="rounded-2xl p-6 sm:p-7" style={{ background: '#fffbf0', border: '2px solid #d48a0a' }}>
          <div className="text-[15px] font-bold mb-1" style={{ color: '#4a2800' }}>
            ⚠ Paradoja AFP — un ciclo cerrado de seis pasos
          </div>
          <p className="text-[13px] mb-6 leading-relaxed" style={{ color: '#6e3e08' }}>
            El dinero entra al sistema por Juan y sale del sistema por las mismas empresas que lo emplean — sin tocar nunca el sueldo.
          </p>

          {/* Steps row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            {[
              { step: 1, title: 'Juan aporta', sub: '$65k / mes obligatorios', accent: false },
              { step: 2, title: 'AFP recibe', sub: 'capital forzoso a invertir', accent: false },
              { step: 3, title: 'Compra acciones', sub: 'Falabella · BCI · Copec', accent: false },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-xl p-3 text-center flex flex-col gap-1"
                style={{ background: '#fff', border: '1px solid #d48a0a' }}
              >
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#d48a0a' }}>
                  Paso {s.step}
                </div>
                <div className="text-[13px] font-bold" style={{ color: '#4a2800' }}>{s.title}</div>
                <div className="text-[11.5px]" style={{ color: '#6e3e08' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Steps row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: 4, title: 'Empresas se capitalizan', sub: 'con el dinero de Juan', kicker: false },
              { step: 5, title: 'Accionistas ganan más', sub: 'dividendos récord', kicker: false },
              { step: 6, title: 'Sueldo NO sube', sub: 'Pensión final: $280k', kicker: true },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-xl p-3 text-center flex flex-col gap-1"
                style={{
                  background: s.kicker ? '#FCEBEB' : '#fff',
                  border: `1px solid ${s.kicker ? '#9e2626' : '#d48a0a'}`,
                }}
              >
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: s.kicker ? '#9e2626' : '#d48a0a' }}>
                  Paso {s.step}
                </div>
                <div className="text-[13px] font-bold" style={{ color: s.kicker ? '#420e0e' : '#4a2800' }}>
                  {s.title}
                </div>
                <div className="text-[11.5px]" style={{ color: s.kicker ? '#8c2020' : '#6e3e08' }}>
                  <strong>{s.sub}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Loop */}
          <div className="mt-5 pt-5 relative" style={{ borderTop: '2px dashed #d48a0a' }}>
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-4 text-lg font-bold px-2.5"
              style={{ background: '#fffbf0', color: '#d48a0a' }}
            >
              ↻
            </div>
            <p className="text-center text-[13px] leading-relaxed" style={{ color: '#6e3e08' }}>
              El dinero que sale del bolsillo de Juan vuelve a la empresa que le paga poco —{' '}
              <strong style={{ color: '#4a2800' }}>nunca al sueldo de Juan</strong>. El ciclo se
              repite cada mes durante 40 años.
            </p>
          </div>
        </div>
      </SectionBlock>

      {/* ══════════ SECCIÓN 03 — Válvulas de supervivencia ══════════ */}
      <SectionBlock
        tag="Sección 03 · Válvulas de supervivencia"
        title="Cómo aguanta el sistema antes de explotar"
        lede="Cuando Juan no puede pagar, no explota inmediatamente: el sistema activa tres válvulas que absorben el costo fuera de los libros de las empresas."
      >
        <div className="flex flex-col items-center gap-0">
          {/* DICOM origin */}
          <Card variant="red" className="w-full max-w-xl text-center">
            <CardTitle>Punto de quiebre · DICOM</CardTitle>
            <CardText className="text-center">
              4.2 M de chilenos no pueden pagar. El sistema bancario los expulsa del crédito. ¿Cómo sigue funcionando la economía?
            </CardText>
          </Card>

          {/* Fan arrows */}
          <div className="relative w-full max-w-xl h-10">
            <div className="absolute left-1/2 top-0 w-0.5 h-4 -translate-x-1/2" style={{ background: 'var(--text-secondary)', opacity: 0.7 }} />
            <div className="absolute left-1/4 right-1/4 top-4 h-0.5" style={{ background: 'var(--text-secondary)', opacity: 0.7 }} />
            <div className="absolute left-1/4 top-4 w-0.5 h-4" style={{ background: 'var(--text-secondary)', opacity: 0.7 }} />
            <div className="absolute right-1/4 top-4 w-0.5 h-4" style={{ background: 'var(--text-secondary)', opacity: 0.7 }} />
            <div className="absolute left-1/4 bottom-0 -translate-x-[4px]" style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid var(--text-secondary)' }} />
            <div className="absolute right-1/4 bottom-0 -translate-x-[4px]" style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid var(--text-secondary)' }} />
          </div>

          {/* Two valves */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <Card variant="neutral" className="w-full">
              <CardTitle>Válvula 1 · Informalidad</CardTitle>
              <CardText>Trabajo sin contrato. Economía fuera del sistema. El PIB no la registra, pero alimenta a la familia. El costo lo absorbe el trabajador con menos derechos.</CardText>
            </Card>
            <Card variant="neutral" className="w-full">
              <CardTitle>Válvula 2 · Red familiar</CardTitle>
              <CardText>Papás y hermanos ayudan. El costo real lo absorbe la familia — no el sistema financiero, no la empresa. Subsidio invisible al sueldo bajo.</CardText>
            </Card>
          </div>

          {/* Converge arrow */}
          <div className="py-3">
            <ArrowDown label="" color="#d48a0a" />
          </div>

          {/* Estado */}
          <Card variant="amber" className="w-full max-w-2xl text-center">
            <CardTitle>Válvula 3 · Estado interviene (financiado por el cobre)</CardTitle>
            <CardText className="text-center">
              Bonos IFE + retiros AFP = <strong>$47 trillones</strong> inyectados al sistema (2020–2022).
              Cuando el cobre baja de precio → el Estado no puede intervenir → la crisis se profundiza.
            </CardText>
          </Card>

          <ArrowDown label="vuelve a Juan como subsidio temporal" color="#d48a0a" />

          {/* La trampa */}
          <Card variant="red" dashed className="w-full max-w-2xl text-center">
            <CardTitle>La trampa</CardTitle>
            <CardText className="text-center">
              Las tres válvulas alivian a Juan — pero <strong>ninguna sube su sueldo</strong>.
              El sistema gana tiempo, no resuelve la causa. Cuando las válvulas se saturan, llega la explosión.
            </CardText>
          </Card>
        </div>
      </SectionBlock>

      {/* ══════════ SECCIÓN 04 — Balance de deuda ══════════ */}
      <SectionBlock
        tag="Sección 04 · Balance de deuda"
        title="Por qué la deuda mata en un caso y crece sano en el otro"
        lede="Misma palabra, dos comportamientos opuestos. La diferencia es si la deuda genera el ingreso que la paga, o si sale del sueldo que ya no alcanza."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card variant="teal" dashed>
            <CardTitle>Balance sano</CardTitle>
            <CardText>
              Deuda crece → pero genera ingreso nuevo que la paga.<br />
              Ratio deuda / ingreso: <strong>estable o baja</strong> con el tiempo.<br /><br />
              <strong>La escalera sube sin destruir a nadie.</strong>
            </CardText>
          </Card>
          <Card variant="red" dashed>
            <CardTitle>Balance actual — Chile</CardTitle>
            <CardText>
              Deuda crece → pero sin ingreso nuevo que la pague.<br />
              Ratio deuda / ingreso: sube <strong>7 veces más rápido</strong> que los sueldos.<br /><br />
              La escalera sube hasta que Juan no puede más.
            </CardText>
          </Card>
        </div>
      </SectionBlock>

      {/* ══════════ SECCIÓN 05 — La explosión ══════════ */}
      <SectionBlock
        tag="Sección 05 · Cuando las válvulas se saturan"
        title="La explosión — qué pasa cuando Juan no puede pagar"
        lede="Ocho movimientos en secuencia, del default individual al reset del sistema. Léelos en orden."
      >
        <div className="rounded-2xl p-6 sm:p-7" style={{ background: '#fff8f0', border: '2px solid #c94a1e' }}>
          <div className="mb-5">
            <h3 className="text-[17px] font-bold mb-1" style={{ color: '#5e1a07' }}>
              De Juan al banco al Estado — y vuelta a empezar
            </h3>
            <p className="text-[13px]" style={{ color: '#8b3415' }}>
              El ciclo completo. Cada paso se desencadena del anterior, no son independientes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StepCard num={1} title="Juan defaultea" variant="red">
              El banco ejecuta sus garantías. Su casa se remata al 40–60% de su valor real. Juan pierde sus activos físicos. Queda con la deuda pero sin el bien que la respaldaba.
            </StepCard>

            <StepCard num={2} title="El banco pierde capital" variant="red">
              Recuperó $200k de una deuda de $400k. Registra pérdida de $200k. El crédito se cierra para todos, no solo para Juan.
            </StepCard>

            <StepCard num={3} title="Deflación — el dinero desaparece" variant="orange">
              Menos crédito nuevo → menos dinero en circulación → todos venden menos. La velocidad del dinero colapsa. Las deudas en pesos fijos pesan más en términos reales.
            </StepCard>

            <StepCard num={4} title="El Estado y el Banco Central intervienen" variant="orange">
              El BC baja tasas. Si no alcanza, hace QE. El Estado gasta con déficit: bonos, subsidios. En Chile: retiros AFP + bonos IFE = $47 trillones inyectados (2020–2022).
            </StepCard>

            <StepCard num={5} title="Inflación — el antídoto y el precio" variant="amber">
              Más dinero + misma cantidad de bienes = precios suben. Chile 2022: inflación llegó a 14.1%. La inflación licúa las deudas en pesos fijos. Quien tenía activos reales ganó. Quien tenía solo pesos: perdió.
            </StepCard>

            <StepCard num={6} title="El ciclo se reinicia — pero peor" variant="red">
              Las empresas siguen pagando sueldos bajos. La plata de los retiros AFP ya no existe: Juan quemó su jubilación. La deuda total parte desde un piso más alto que antes.
            </StepCard>

            <StepCard num={7} title="La recuperación mínima estratégica" variant="green" fullWidth>
              Las empresas suben el sueldo mínimo justo lo necesario: suficiente para que Juan consuma de nuevo, no tanto para que pueda ahorrar. El sueldo nominal sube, pero la inflación acumulada ya lo licuó. Juan &quot;recuperó&quot; su sueldo → en realidad volvió al mismo punto real de siempre. El crédito vuelve a fluir. Juan vuelve a la CMR. El sistema se &quot;normaliza&quot;.
            </StepCard>

            <StepCard num={8} title="¿Hay resets históricos más profundos?" variant="gray" fullWidth>
              <span>Cuando la acumulación de deuda no encuentra salida gradual, la historia registra tres mecanismos de reset:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold mb-2" style={{ background: '#FCEBEB', color: '#501313' }}>
                    Guerras
                  </span>
                  <p className="text-[12px] leading-relaxed">
                    Destruyen capital y deuda acumulada. La Segunda Guerra Mundial limpió la deuda de los años 20–30 y generó el boom de los 50–60.
                  </p>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold mb-2" style={{ background: '#FEF0E6', color: '#5e2a0a' }}>
                    Pandemias
                  </span>
                  <p className="text-[12px] leading-relaxed">
                    COVID generó la &quot;Gran Renuncia&quot; de 2021. Los sueldos subieron temporalmente. Duró 2 años; la automatización y la inflación lo revirtieron.
                  </p>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold mb-2" style={{ background: 'var(--surface)', color: '#2C2C2A' }}>
                    Crisis sin reset real
                  </span>
                  <p className="text-[12px] leading-relaxed">
                    Grecia 2010–2015: suicidios +35%, natalidad -20%, PIB -27%. No fue reset: fue destrucción sin recuperación.
                  </p>
                </div>
              </div>
            </StepCard>
          </div>
        </div>
      </SectionBlock>

      {/* ══════════ SECCIÓN 06 — Umbral deliberado ══════════ */}
      <SectionBlock
        tag="Sección 06 · El umbral deliberado"
        title="Justos pero no felices — por qué nadie mueve el equilibrio"
        lede="El sueldo de Juan no es bajo por error: es bajo porque es el punto exacto donde el sistema se sostiene sin colapsar y sin entregar poder."
      >
        <div className="rounded-2xl p-6 sm:p-7" style={{ background: '#f7f3ff', border: '2px solid #7F77DD' }}>
          <div className="mb-5">
            <h3 className="text-[17px] font-bold mb-1" style={{ color: '#26215C' }}>
              Homeostasis del capital — el rango óptimo del sueldo
            </h3>
            <p className="text-[13px]" style={{ color: '#3C3489' }}>
              Si Juan gana muy poco, no consume. Si gana mucho, negocia. El sistema busca el punto exacto entre ambos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
            <div className="p-4 rounded-xl" style={{ background: '#FCEBEB' }}>
              <div className="text-[13.5px] font-bold mb-2" style={{ color: '#501313' }}>
                Si Juan gana demasiado poco
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#6a1818' }}>
                No puede consumir → las empresas no venden → el sistema colapsa.
                <br /><strong>Malo para el capital.</strong>
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#FCEBEB' }}>
              <div className="text-[13.5px] font-bold mb-2" style={{ color: '#501313' }}>
                Si Juan gana demasiado
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#6a1818' }}>
                Puede ahorrar → puede negociar desde fuerza → puede organizarse políticamente.
                <br /><strong>También malo para el capital.</strong>
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#FAEEDA' }}>
              <div className="text-[13.5px] font-bold mb-2" style={{ color: '#4a2800' }}>
                El punto óptimo para el capital
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#5c3410' }}>
                Juan gana exactamente lo necesario para reproducir su fuerza de trabajo: comer,
                dormir, llegar al trabajo mañana. Y nada más. Marx lo llamó <em>salario de
                reproducción</em>. No era insulto. Era descripción técnica.
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#EEEDFE' }}>
              <div className="text-[13.5px] font-bold mb-2" style={{ color: '#26215C' }}>
                Por qué nadie lo cambia
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#3C3489' }}>
                No es conspiración. Es que el umbral es el equilibrio del sistema: ningún actor
                individual tiene incentivo de moverlo. Las empresas necesitan que Juan consuma.
                Las empresas necesitan que Juan trabaje por necesidad, no por elección.
              </p>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ background: '#EEEDFE' }}>
            <p className="text-[13px] leading-relaxed" style={{ color: '#3C3489' }}>
              <strong style={{ color: '#26215C' }}>¿Hubo países que rompieron el ciclo sin catástrofe?</strong>{' '}
              Sí. Escandinavia 1950–1980, Alemania Occidental 1950–1990, Corea del Sur 1970–2000.
              Fórmula: sindicatos fuertes que capturaron el crecimiento en años buenos + Estado que
              redistribuyó vía salud, educación y vivienda + regulación que impidió que el crédito de
              consumo fuera el principal motor de demanda. No fue ideología. Fue coordinación de incentivos.
            </p>
          </div>
        </div>
      </SectionBlock>

      {/* ══════════ LEGEND ══════════ */}
      <div className="mt-14 pt-7 border-t border-[var(--border)] flex flex-wrap gap-7">
        {[
          { color: '#1D9E75', label: 'Flujo sano', dashed: false },
          { color: '#1D9E75', label: 'Ciclo virtuoso', dashed: true },
          { color: '#9e2626', label: 'Flujo problemático', dashed: false },
          { color: '#d48a0a', label: 'Paradoja AFP · Intervención del Estado', dashed: false },
          { color: '#9e2626', label: 'Ciclo de retorno', dashed: true },
          { color: '#8a8880', label: 'Válvulas de supervivencia', dashed: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-[12px] text-[var(--text-secondary)]">
            <div
              className="w-8 h-0"
              style={{
                borderTopWidth: '2.5px',
                borderTopStyle: item.dashed ? 'dashed' : 'solid',
                borderTopColor: item.color,
              }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
