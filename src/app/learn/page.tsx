import Link from 'next/link';

const topics = [
  {
    id: 'origin',
    title: 'Origen del Dinero',
    description: 'Del trueque a las monedas digitales: 12,000 años de evolución.',
    icon: '📜',
    era: '10,000 AC — Hoy',
  },
  {
    id: 'gold-standard',
    title: 'El Patrón Oro',
    description: 'El gran debate: estabilidad vs. flexibilidad, y por qué se abandonó.',
    icon: '🥇',
    era: '1870s — 1971',
  },
  {
    id: 'creation',
    title: 'Creación del Dinero',
    description: 'Cómo los bancos crean dinero de la nada con la reserva fraccionaria.',
    icon: '🖨️',
    era: 'Sistema bancario moderno',
  },
  {
    id: 'debt-system',
    title: 'El Sistema de Deuda',
    description: 'Por qué siempre hay deuda, la paradoja del interés y quién paga.',
    icon: '⛓️',
    era: 'Sistema monetario actual',
  },
  {
    id: 'money-flow',
    title: 'El Flujo del Dinero',
    description: 'Cómo circula el dinero entre personas, empresas, bancos y gobierno.',
    icon: '🔄',
    era: 'Circuito económico',
  },
  {
    id: 'power-abuse',
    title: 'El Abuso del Poder Monetario',
    description: 'Cómo gobiernos y bancos manipulan el sistema a costa de la gente.',
    icon: '⚠️',
    era: 'Pensamiento crítico',
  },
  {
    id: 'central-banking',
    title: 'Banca Central',
    description: 'Tasas de interés, política monetaria y el rol del banco central.',
    icon: '🏛️',
    era: 'Desde 1694',
  },
  {
    id: 'inflation',
    title: 'Inflación y Deflación',
    description: 'Por qué los precios suben, qué pasa cuando bajan, y casos extremos.',
    icon: '📈',
    era: 'Concepto fundamental',
  },
  {
    id: 'fiscal',
    title: 'Política Fiscal',
    description: 'Impuestos, gasto público, deuda nacional y sus efectos.',
    icon: '🏛️',
    era: 'Economía pública',
  },
  {
    id: 'markets',
    title: 'Mercados y Comercio',
    description: 'Oferta y demanda, formación de precios, monopolios.',
    icon: '🏪',
    era: 'Microeconomía',
  },
  {
    id: 'crisis-2008',
    title: 'La Crisis del 2008',
    description: 'Qué pasó, por qué, y cómo afectó a la gente — explicado con números.',
    icon: '🏚️',
    era: 'Crisis financiera global',
  },
  {
    id: 'circuito-chile',
    title: 'Circuito Económico: Chile',
    description: 'Cómo debería circular el dinero vs. cómo circula realmente — AFP, deuda, válvulas y la explosión.',
    icon: '🇨🇱',
    era: 'Análisis aplicado',
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] mb-6 block">
          ← Inicio
        </Link>

        <h1 className="text-3xl font-bold mb-2">Aprender</h1>
        <p className="text-[var(--text-secondary)] mb-10">
          Explora cada concepto antes de saltar a la simulación.
        </p>

        <div className="space-y-4">
          {topics.map(topic => (
            <Link
              key={topic.id}
              href={`/learn/${topic.id}`}
              className="block p-5 rounded-xl border border-[var(--border)] hover:border-[var(--text-secondary)] transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{topic.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{topic.description}</p>
                  <span className="text-xs text-[var(--text-secondary)] mt-2 block">{topic.era}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
