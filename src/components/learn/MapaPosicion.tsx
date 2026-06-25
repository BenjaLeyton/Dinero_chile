'use client';

import { useState } from 'react';

// ──────────────── PALETTE ────────────────
const C = {
  teal: { bg: '#E1F5EE', border: '#1D9E75', h3: '#054030', p: '#0a5c42' },
  coral: { bg: '#FAECE7', border: '#c94a1e', h3: '#5e1a07', p: '#8b3415' },
  red: { bg: '#FCEBEB', border: '#9e2626', h3: '#420e0e', p: '#8c2020' },
  amber: { bg: '#FEF3DA', border: '#d48a0a', h3: '#4a2800', p: '#6e3e08' },
  purple: { bg: '#f7f3ff', border: '#7F77DD', h3: '#26215C', p: '#3C3489' },
  green: { bg: '#EAF3DE', border: '#3B6D11', h3: '#0d2002', p: '#173404' },
  gray: { bg: 'var(--surface)', border: 'var(--border)', h3: 'var(--foreground)', p: 'var(--text-secondary)' },
};

const clp = (n: number) => '$' + n.toLocaleString('es-CL');

// ──────────────── ROLES ────────────────
type RoleId = 'npc' | 'pyme' | 'flujo';

interface Role {
  id: RoleId;
  emoji: string;
  label: string;
  sub: string;
  // monthly cash flow
  entra: number;
  sale: number;
  // narrative
  resumen: string;
  color: keyof typeof C;
}

const ROLES: Record<RoleId, Role> = {
  npc: {
    id: 'npc',
    emoji: '🧍',
    label: 'NPC · Trabajador',
    sub: 'Donde empieza casi todo el mundo',
    entra: 650_000,
    sale: 560_000,
    resumen:
      'Recibes un sueldo fijo. Tu plata entra una vez y sale entera hacia las empresas: arriendo, supermercado, apps, deudas. El dinero te usa como un pasillo — pasa por ti, pero no se queda contigo.',
    color: 'red',
  },
  pyme: {
    id: 'pyme',
    emoji: '🧑‍🍳',
    label: 'Dueño de un negocio',
    sub: 'Vendes algo, pero a poca gente',
    entra: 1_400_000,
    sale: 1_150_000,
    resumen:
      'Montaste un negocio (un local, un servicio). Ahora hay gente que te paga a TI. El flujo cambia de dirección, pero todavía depende de cuántas manos físicas alcanzas a atender en un día.',
    color: 'amber',
  },
  flujo: {
    id: 'flujo',
    emoji: '🏗️',
    label: 'Dueño en el flujo',
    sub: 'Te paras donde el río ya pasa',
    entra: 6_000_000,
    sale: 2_400_000,
    resumen:
      'Tu negocio (una app, una marca, algo que escala) cobra a miles de NPCs a la vez sin que tú estés presente. El mismo dinero que antes salía de ti, ahora desemboca en ti. Y el banco te presta porque ve que el flujo entra.',
    color: 'green',
  },
};

// ──────────────── SMALL UI ────────────────
function Card({
  variant,
  dashed = false,
  className = '',
  children,
}: {
  variant: keyof typeof C;
  dashed?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const s = C[variant];
  return (
    <div
      className={`rounded-xl p-4 ${className}`}
      style={{
        background: dashed ? 'transparent' : s.bg,
        border: dashed ? `1.5px dashed ${s.border}` : `1px solid ${s.border}`,
      }}
    >
      {children}
    </div>
  );
}

function Arrow({ color, label, dir = 'down' }: { color: string; label?: string; dir?: 'down' | 'up' }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1 select-none">
      {dir === 'up' && (
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: `7px solid ${color}`,
          }}
        />
      )}
      <div className="w-0.5 h-4" style={{ background: color, opacity: 0.85 }} />
      {dir === 'down' && (
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: `7px solid ${color}`,
          }}
        />
      )}
      {label && (
        <span className="text-[10.5px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap" style={{ color }}>
          {label}
        </span>
      )}
    </div>
  );
}

// ──────────────── INFINITE LOAN STEPPER ────────────────
const LOAN_STEPS = [
  {
    title: 'El banco le presta a la empresa',
    money: '+$500M',
    color: 'purple' as const,
    text: 'El banco no saca esa plata de una bóveda: la crea como deuda en una pantalla. Le presta a Falabella, Cencosud, una constructora. ¿Por qué confía? Porque sabe que millones de NPCs van a seguir comprando ahí.',
  },
  {
    title: 'La empresa sube precios',
    money: '+12% precios',
    color: 'amber' as const,
    text: 'Con más dinero en circulación, todo el sistema sube de precio para mantener la proporción. La empresa traslada el costo del crédito directo a la góndola. Tú lo pagas sin firmar ningún papel.',
  },
  {
    title: 'Los NPCs siguen comprando',
    money: '$650k → góndola',
    color: 'red' as const,
    text: 'Acá está el truco. El NPC necesita comer, vestirse, pagar el plan del celular. No puede dejar de comprar. Esa compra obligatoria es la garantía real del préstamo — no una hipoteca, sino TU consumo de todos los meses.',
  },
  {
    title: 'La empresa devuelve y pide más',
    money: '+$700M nuevo',
    color: 'green' as const,
    text: 'La empresa paga el crédito con lo que le compraste, muestra ventas crecientes, y el banco le presta aún más. El ciclo no tiene techo mientras los NPCs no dejen de comprar. Por eso parece "préstamo infinito".',
  },
];

function LoanStepper() {
  const [step, setStep] = useState(0);
  const s = LOAN_STEPS[step];
  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {LOAN_STEPS.map((ls, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: i === step ? C[ls.color].bg : 'var(--surface)',
              border: `1px solid ${i === step ? C[ls.color].border : 'var(--border)'}`,
              color: i === step ? C[ls.color].h3 : 'var(--text-secondary)',
              opacity: i === step ? 1 : 0.7,
            }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
              style={{ background: C[ls.color].border }}
            >
              {i + 1}
            </span>
            <span className="hidden sm:inline">{ls.title}</span>
          </button>
        ))}
      </div>

      <Card variant={s.color}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className="text-base font-bold" style={{ color: C[s.color].h3 }}>
            Paso {step + 1} · {s.title}
          </h4>
          <span
            className="text-sm font-extrabold px-2.5 py-1 rounded-lg whitespace-nowrap"
            style={{ background: C[s.color].border, color: '#fff' }}
          >
            {s.money}
          </span>
        </div>
        <p className="text-[13.5px] leading-relaxed" style={{ color: C[s.color].p }}>
          {s.text}
        </p>
      </Card>

      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => setStep((step - 1 + LOAN_STEPS.length) % LOAN_STEPS.length)}
          className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] px-3 py-1.5 rounded-lg border border-[var(--border)]"
        >
          ← Anterior
        </button>
        <span className="text-[11px] text-[var(--text-secondary)]">
          {step === LOAN_STEPS.length - 1 ? 'El ciclo vuelve al paso 1 — sin techo' : 'Sigue el flujo del crédito'}
        </span>
        <button
          onClick={() => setStep((step + 1) % LOAN_STEPS.length)}
          className="text-xs font-medium text-[var(--foreground)] px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)]"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ──────────────── ROLE FLOW MAP ────────────────
function FlowMap({ role }: { role: Role }) {
  const isNpc = role.id === 'npc';
  const queda = role.entra - role.sale;
  const pct = Math.round((queda / role.entra) * 100);

  // Direction of money relative to "you"
  const youGains = role.id !== 'npc';

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[#faf9f6] dark:bg-[var(--surface)] p-5 sm:p-8">
      {/* BANK */}
      <div className="flex flex-col items-center">
        <Card variant="purple" className="w-full max-w-xs text-center">
          <div className="text-2xl mb-1">🏦</div>
          <h3 className="text-sm font-bold" style={{ color: C.purple.h3 }}>
            Banco · imprime / presta
          </h3>
          <p className="text-[12px] mt-1" style={{ color: C.purple.p }}>
            Crea dinero como deuda. El sistema sube precios para mantener la proporción.
          </p>
        </Card>
        <Arrow color={C.purple.border} label="presta $$$" />

        {/* COMPANIES */}
        <Card variant="amber" className="w-full max-w-md text-center">
          <div className="text-2xl mb-1">🏢</div>
          <h3 className="text-sm font-bold" style={{ color: C.amber.h3 }}>
            Empresas grandes
          </h3>
          <p className="text-[12px] mt-1" style={{ color: C.amber.p }}>
            Falabella · Cencosud · apps · bancos. Reciben el crédito, suben precios, pagan poco sueldo.
          </p>
        </Card>
      </div>

      {/* The bidirectional zone: companies <-> you <-> npcs */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center mt-2">
        {/* left: what flows */}
        <div className="flex flex-col items-center order-2 sm:order-1">
          <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Sale de ti
          </span>
          <Card variant="red" className="w-full text-center">
            <p className="text-[12.5px]" style={{ color: C.red.p }}>
              Arriendo, súper, plan, apps, cuotas
            </p>
            <p className="text-lg font-extrabold mt-1" style={{ color: C.red.border }}>
              −{clp(role.sale)}
            </p>
          </Card>
        </div>

        {/* center: YOU */}
        <div className="flex flex-col items-center order-1 sm:order-2 my-2">
          <div
            className="rounded-2xl px-5 py-4 text-center min-w-[150px]"
            style={{
              background: C[role.color].bg,
              border: `2px solid ${C[role.color].border}`,
              boxShadow: `0 0 0 4px ${C[role.color].border}22`,
            }}
          >
            <div className="text-3xl mb-1">{role.emoji}</div>
            <h3 className="text-sm font-extrabold" style={{ color: C[role.color].h3 }}>
              TÚ
            </h3>
            <p className="text-[11px] font-semibold" style={{ color: C[role.color].p }}>
              {role.label}
            </p>
          </div>
        </div>

        {/* right: what comes in */}
        <div className="flex flex-col items-center order-3">
          <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--text-secondary)] mb-1">
            Entra a ti
          </span>
          <Card variant={youGains ? 'green' : 'amber'} className="w-full text-center">
            <p className="text-[12.5px]" style={{ color: youGains ? C.green.p : C.amber.p }}>
              {isNpc ? 'Sueldo fijo (1 sola vez al mes)' : 'Pagos de muchos NPCs que te compran'}
            </p>
            <p className="text-lg font-extrabold mt-1" style={{ color: youGains ? C.green.border : C.amber.border }}>
              +{clp(role.entra)}
            </p>
          </Card>
        </div>
      </div>

      {/* NPCs base */}
      <div className="flex flex-col items-center mt-2">
        <Arrow color={youGains ? C.green.border : C.red.border} label={youGains ? 'te compran' : 'mismo grupo que tú'} dir={youGains ? 'up' : 'down'} />
        <Card variant="gray" className="w-full max-w-md text-center">
          <div className="text-xl mb-1">🧍🧍🧍🧍🧍</div>
          <h3 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
            Los NPCs · todos los demás
          </h3>
          <p className="text-[12px] mt-1 text-[var(--text-secondary)]">
            Millones de personas con sueldo fijo que compran todos los meses. Su consumo es lo que sostiene todo el sistema.
          </p>
        </Card>
      </div>

      {/* Balance bar */}
      <div className="mt-6 pt-5 border-t border-[var(--border)]">
        <div className="flex items-end justify-between mb-1.5">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">¿Cuánto se queda contigo al mes?</span>
          <span className="text-lg font-extrabold" style={{ color: queda > 0 ? C.green.border : C.red.border }}>
            {clp(queda)} <span className="text-xs font-medium text-[var(--text-secondary)]">({pct}%)</span>
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden bg-[var(--border)]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.max(4, pct)}%`,
              background: queda > 0 ? C.green.border : C.red.border,
            }}
          />
        </div>
        <p className="text-[12px] text-[var(--text-secondary)] mt-2 leading-relaxed">{role.resumen}</p>
      </div>
    </div>
  );
}

// ──────────────── MAIN ────────────────
export default function MapaPosicion() {
  const [roleId, setRoleId] = useState<RoleId>('npc');
  const role = ROLES[roleId];

  return (
    <div className="max-w-3xl mx-auto" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
      <h1 className="text-[28px] font-extrabold tracking-tight text-[var(--foreground)] mb-2">
        El mapa del dinero — ¿dónde estás tú?
      </h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
        El dinero no desaparece: circula. La única pregunta que importa es por dónde pasa y hacia dónde
        desemboca. Cambia tu posición abajo y observa cómo el mismo sistema te trata distinto. Números reales de Chile.
      </p>

      {/* ─── ROLE SELECTOR ─── */}
      <section className="mb-8">
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-3">
          Elige tu posición
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.values(ROLES)).map((r) => {
            const active = r.id === roleId;
            return (
              <button
                key={r.id}
                onClick={() => setRoleId(r.id)}
                className="text-left rounded-xl p-4 transition-all"
                style={{
                  background: active ? C[r.color].bg : 'var(--surface)',
                  border: `1.5px solid ${active ? C[r.color].border : 'var(--border)'}`,
                  transform: active ? 'translateY(-2px)' : 'none',
                  boxShadow: active ? `0 0 0 4px ${C[r.color].border}1f` : 'none',
                }}
              >
                <div className="text-2xl mb-1.5">{r.emoji}</div>
                <h3 className="text-sm font-bold" style={{ color: active ? C[r.color].h3 : 'var(--foreground)' }}>
                  {r.label}
                </h3>
                <p className="text-[11.5px] mt-0.5" style={{ color: active ? C[r.color].p : 'var(--text-secondary)' }}>
                  {r.sub}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── FLOW MAP ─── */}
      <section className="mb-12">
        <FlowMap role={role} />
      </section>

      {/* ─── THE SHIFT ─── */}
      <section className="mt-12 pt-8 border-t border-[var(--border)]">
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-2">
          La idea central
        </div>
        <h2 className="text-xl font-bold mb-1.5 text-[var(--foreground)] tracking-tight">
          No se trata de ganar más — se trata de mover dónde estás parado
        </h2>
        <p className="text-[13.5px] text-[var(--text-secondary)] mb-6 leading-relaxed">
          El NPC y el dueño viven en el mismo sistema, con los mismos precios y el mismo banco imprimiendo.
          La diferencia no es cuánto trabajan: es que en una posición el dinero sale de ti, y en la otra
          desemboca en ti. Pasar de una a otra es el único movimiento que cambia el juego.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card variant="red">
            <h3 className="text-sm font-bold mb-1" style={{ color: C.red.h3 }}>1 · Te paga UNA fuente</h3>
            <p className="text-[12.5px]" style={{ color: C.red.p }}>
              Como NPC dependes de un solo sueldo. Si falla, se corta todo. Tu ingreso tiene un techo: las horas del día.
            </p>
          </Card>
          <Card variant="amber">
            <h3 className="text-sm font-bold mb-1" style={{ color: C.amber.h3 }}>2 · Te pagan MUCHAS manos</h3>
            <p className="text-[12.5px]" style={{ color: C.amber.p }}>
              Con un negocio, muchos NPCs te pagan un poco. Ya no dependes de uno. Pero sigues limitado a quienes alcanzas.
            </p>
          </Card>
          <Card variant="green">
            <h3 className="text-sm font-bold mb-1" style={{ color: C.green.h3 }}>3 · Te pagan SIN estar tú</h3>
            <p className="text-[12.5px]" style={{ color: C.green.p }}>
              Una app, una marca, un producto que escala cobra mientras duermes. El flujo entra solo. Ahí el banco te presta a ti.
            </p>
          </Card>
        </div>
      </section>

      {/* ─── INFINITE LOAN ─── */}
      <section className="mt-12 pt-8 border-t border-[var(--border)]">
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-2">
          El motor oculto
        </div>
        <h2 className="text-xl font-bold mb-1.5 text-[var(--foreground)] tracking-tight">
          ¿Por qué las empresas piden préstamos casi infinitos?
        </h2>
        <p className="text-[13.5px] text-[var(--text-secondary)] mb-6 leading-relaxed">
          La respuesta no está en la empresa — está en ti. El banco le presta sin parar a Falabella o
          Cencosud porque sabe algo: los NPCs no pueden dejar de comprar. Tu consumo obligatorio de cada
          mes es la garantía silenciosa del crédito. Recorre el ciclo:
        </p>
        <LoanStepper />
      </section>

      {/* ─── HOW TO SHIFT ─── */}
      <section className="mt-12 pt-8 border-t border-[var(--border)]">
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-secondary)] mb-2">
          Cómo empieza a pasar más dinero por ti
        </div>
        <h2 className="text-xl font-bold mb-1.5 text-[var(--foreground)] tracking-tight">
          Movimientos concretos para cambiar de carril
        </h2>
        <p className="text-[13.5px] text-[var(--text-secondary)] mb-6 leading-relaxed">
          No hay magia ni atajo. Pero sí hay una dirección: dejar de ser solo el final del flujo y empezar
          a ser un punto por donde el dinero pasa hacia ti.
        </p>
        <div className="space-y-3">
          {[
            {
              n: 1,
              t: 'Tapa la fuga primero',
              d: 'Identifica a qué empresas les pagas todos los meses sin pensar (apps, suscripciones, cuotas, delivery). Ese es dinero que sale de ti hacia el flujo. Recuperarlo es el primer "ingreso" sin trabajar más.',
              v: 'green' as const,
            },
            {
              n: 2,
              t: 'Convierte una habilidad en algo que otros te paguen',
              d: 'Pasa de "me pagan por mi tiempo" a "me pagan por algo que hice". Un servicio, un producto, una asesoría. Es el salto de NPC a dueño de negocio — aunque sea chico al principio.',
              v: 'amber' as const,
            },
            {
              n: 3,
              t: 'Busca algo que escale sin tu presencia',
              d: 'Una app, contenido, una marca, un producto digital: algo que mil personas puedan pagar a la vez sin que tú estés en cada venta. Ahí el ingreso deja de tener techo y el banco empieza a verte como sujeto de crédito.',
              v: 'green' as const,
            },
            {
              n: 4,
              t: 'Posiciónate donde el río YA pasa',
              d: 'No inventes un río nuevo: párate donde el dinero ya circula con fuerza (necesidades, hábitos, consumo recurrente). El mejor negocio no es el más original — es el que capta un flujo que ya existe.',
              v: 'purple' as const,
            },
          ].map((step) => (
            <div
              key={step.n}
              className="flex gap-3 items-start p-4 rounded-xl"
              style={{ background: C[step.v].bg, border: `1px solid ${C[step.v].border}` }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                style={{ background: C[step.v].border }}
              >
                {step.n}
              </span>
              <div>
                <h3 className="text-sm font-bold mb-0.5" style={{ color: C[step.v].h3 }}>
                  {step.t}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: C[step.v].p }}>
                  {step.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── KEYPOINT ─── */}
      <section className="mt-10">
        <div
          className="rounded-xl p-5"
          style={{ background: 'var(--keypoint-bg)', border: '1px solid var(--keypoint-border)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--keypoint-text)' }}>
            <strong>La foto completa:</strong> el banco imprime dinero como deuda, las empresas lo capturan y
            suben los precios, y los NPCs lo devuelven con cada compra obligatoria. El sistema no está roto —
            está diseñado para que el dinero fluya desde quienes solo consumen hacia quienes son dueños del flujo.
            Entender en qué punto estás parado es el primer paso para moverte.
          </p>
        </div>
      </section>
    </div>
  );
}
