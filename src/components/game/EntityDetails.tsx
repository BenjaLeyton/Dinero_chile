'use client';

import { useGameStore } from '@/stores/game-store';
import { useUIStore } from '@/stores/ui-store';
import { formatCurrency, formatPercent } from '@/lib/format';
import { ENTITY_COLORS, ENTITY_LABELS } from '@/lib/colors';
import type { AnyEntity } from '@/engine/entities/types';

export default function EntityDetails() {
  const snapshot = useGameStore(s => s.snapshot);
  const selectedId = useUIStore(s => s.selectedEntityId);
  const selectEntity = useUIStore(s => s.selectEntity);

  if (!snapshot || !selectedId) return null;

  const allEntities: AnyEntity[] = [
    snapshot.centralBank,
    ...snapshot.commercialBanks,
    ...snapshot.businesses,
    ...snapshot.consumers,
    snapshot.government,
    ...snapshot.resources,
  ];

  const entity = allEntities.find(e => e.id === selectedId);
  if (!entity) return null;

  const color = ENTITY_COLORS[entity.type];

  return (
    <div className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card)]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm">{entity.name}</h3>
          <span className="text-[10px] uppercase tracking-wider" style={{ color }}>
            {ENTITY_LABELS[entity.type]}
          </span>
        </div>
        <button
          onClick={() => selectEntity(null)}
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--foreground)]"
        >
          Cerrar
        </button>
      </div>

      <div className="space-y-1.5 text-xs">
        <Row label="Efectivo" value={formatCurrency(entity.cash)} />

        {entity.type === 'commercial_bank' && (
          <>
            <Row label="Depósitos" value={formatCurrency(entity.deposits)} />
            <Row label="Reservas" value={formatCurrency(entity.reserves)} />
            <Row label="Préstamos activos" value={String(entity.loans.length)} />
            <Row label="Spread" value={formatPercent(entity.interestRateSpread)} />
          </>
        )}

        {entity.type === 'business' && (
          <>
            <Row label="Sector" value={entity.sector} />
            <Row label="Empleados" value={String(entity.employees)} />
            <Row label="Salario" value={formatCurrency(entity.wage)} />
            <Row label="Precio" value={formatCurrency(entity.price)} />
            <Row label="Inventario" value={String(Math.floor(entity.inventory))} />
            <Row label="Ingresos" value={formatCurrency(entity.revenue)} />
            <Row label="Costos" value={formatCurrency(entity.costs)} />
            <Row label="Deuda" value={formatCurrency(entity.debt)} />
          </>
        )}

        {entity.type === 'consumer' && (
          <>
            <Row label="Ingreso" value={formatCurrency(entity.income)} />
            <Row label="Ahorros" value={formatCurrency(entity.savings)} />
            <Row label="Deuda" value={formatCurrency(entity.debt)} />
            <Row label="Empleado" value={entity.employed ? 'Sí' : 'No'} />
            <Row label="Satisfacción" value={`${entity.satisfaction.toFixed(0)}/100`} />
          </>
        )}

        {entity.type === 'resource' && (
          <>
            <Row label="Tipo" value={entity.resourceType} />
            <Row label="Reservas" value={String(Math.floor(entity.totalReserves))} />
            <Row label="Precio mercado" value={formatCurrency(entity.marketPrice)} />
            <Row label="Agotamiento" value={formatPercent(entity.depletion)} />
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[var(--text-secondary)]">{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}
