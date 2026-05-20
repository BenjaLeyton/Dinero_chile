import Link from 'next/link';

const scenarios = [
  {
    id: 'hyperinflation',
    name: 'Hiperinflación',
    description: 'El gobierno imprime dinero sin control. ¿Puedes estabilizar la economía antes de que colapse?',
    difficulty: 'Difícil',
    basis: 'Venezuela 2016 / Zimbabwe 2008 / Weimar 1923',
    icon: '🔥',
  },
  {
    id: 'monopoly',
    name: 'Monopolio',
    description: 'Un agente con mucho capital llega a comprar todo. ¿Dejas que suceda o intervienes?',
    difficulty: 'Media',
    basis: 'Concentración de riqueza',
    icon: '👑',
  },
  {
    id: 'bubble-crash',
    name: 'Burbuja y Crash',
    description: 'Los precios de activos se disparan por especulación. ¿Cuándo pinchas la burbuja?',
    difficulty: 'Difícil',
    basis: 'Crisis 2008 / Dot-com 2000',
    icon: '💥',
  },
  {
    id: 'deflation',
    name: 'Espiral Deflacionaria',
    description: 'Los precios caen, nadie compra, la economía se paraliza. ¿Cómo la reactivas?',
    difficulty: 'Extrema',
    basis: 'Japón 1990s / Gran Depresión',
    icon: '❄️',
  },
  {
    id: 'currency-war',
    name: 'Guerra de Divisas',
    description: 'Dos países compiten devaluando su moneda. ¿Quién gana la carrera al fondo?',
    difficulty: 'Difícil',
    basis: 'Guerras comerciales',
    icon: '⚔️',
  },
  {
    id: 'sandbox',
    name: 'Sandbox',
    description: 'Modo libre. Todos los controles, sin objetivos. Experimenta a tu gusto.',
    difficulty: 'Libre',
    basis: 'Modo creativo',
    icon: '🧪',
  },
];

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] mb-6 block">
          ← Inicio
        </Link>

        <h1 className="text-3xl font-bold mb-2">Escenarios</h1>
        <p className="text-[var(--text-secondary)] mb-10">
          Enfrenta situaciones económicas reales y aprende de la historia.
        </p>

        <div className="space-y-4">
          {scenarios.map(s => (
            <Link
              key={s.id}
              href={`/scenarios/${s.id}`}
              className="block p-5 rounded-xl border border-[var(--border)] hover:border-[var(--text-secondary)] transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{s.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface)] text-[var(--text-secondary)]">
                      {s.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{s.description}</p>
                  <span className="text-xs text-[var(--text-secondary)] mt-2 block italic">{s.basis}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
