import Link from 'next/link';
import FloatingThemeToggle from '@/components/ui/FloatingThemeToggle';

const features = [
  {
    icon: '📜',
    title: 'Origen del Dinero',
    description: 'Del trueque al Bitcoin — recorre 12,000 años de historia monetaria.',
    href: '/learn',
  },
  {
    icon: '🏦',
    title: 'Simulación Económica',
    description: 'Controla la economía como banquero central, empresario o gobierno.',
    href: '/play',
  },
  {
    icon: '⚡',
    title: 'Escenarios Reales',
    description: 'Hiperinflación, monopolios, burbujas — vive las crisis económicas.',
    href: '/scenarios',
  },
  {
    icon: '🗺️',
    title: 'Mapa Económico',
    description: 'Visualiza cómo se relacionan todas las entidades y qué causa cada crisis.',
    href: '/diagrama',
  },
];

const scales = [
  { name: 'Pueblo', entities: '16 agentes', icon: '🏘️' },
  { name: 'Ciudad', entities: '43 agentes', icon: '🏙️' },
  { name: 'Metrópolis', entities: '72 agentes', icon: '🌆' },
  { name: 'País', entities: '142 agentes', icon: '🗺️' },
  { name: 'Mundial', entities: 'Multi-país', icon: '🌍' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <FloatingThemeToggle />
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          Dinero
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">
          Simulador Económico Interactivo
        </p>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-10">
          Aprende cómo funciona el dinero, de dónde viene, cómo fluye
          y qué pasa cuando las cosas salen mal.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Link
            href="/play"
            className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Jugar
          </Link>
          <Link
            href="/learn"
            className="px-6 py-3 border border-[var(--border)] rounded-lg font-medium hover:bg-[var(--surface)] transition-colors"
          >
            Aprender
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="p-6 rounded-xl border border-[var(--border)] hover:border-[var(--text-secondary)] transition-colors text-left"
            >
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{f.description}</p>
            </Link>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Elige tu Escala</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {scales.map((s) => (
              <div
                key={s.name}
                className="px-5 py-3 rounded-lg border border-[var(--border)] text-center"
              >
                <span className="text-2xl block mb-1">{s.icon}</span>
                <p className="font-medium text-sm">{s.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{s.entities}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[var(--border)] rounded-xl p-8 text-left max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">¿Cómo funciona?</h2>
          <ol className="space-y-3 text-sm text-[var(--text-secondary)]">
            <li className="flex gap-3">
              <span className="font-bold text-[var(--foreground)] shrink-0">1.</span>
              <span><strong className="text-[var(--foreground)]">Elige un rol</strong> — Banquero Central, Empresario, Gobierno o Ciudadano.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[var(--foreground)] shrink-0">2.</span>
              <span><strong className="text-[var(--foreground)]">Toma decisiones</strong> — Ajusta tasas de interés, impuestos, precios y más.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[var(--foreground)] shrink-0">3.</span>
              <span><strong className="text-[var(--foreground)]">Observa el impacto</strong> — Ve cómo el dinero fluye entre entidades en tiempo real.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[var(--foreground)] shrink-0">4.</span>
              <span><strong className="text-[var(--foreground)]">Aprende</strong> — Cada acción enseña un concepto económico real.</span>
            </li>
          </ol>
        </div>
      </section>

      <footer className="text-center text-xs text-[var(--text-secondary)] py-8 border-t border-[var(--border)]">
        Dinero — Simulador Económico Educativo
      </footer>
    </main>
  );
}
