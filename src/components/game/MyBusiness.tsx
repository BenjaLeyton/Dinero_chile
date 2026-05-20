'use client';

import { useGameStore } from '@/stores/game-store';
import { formatCurrency, formatPercent } from '@/lib/format';
import { getIndustryById } from '@/engine/config/industries';

export default function MyBusiness() {
  const snapshot = useGameStore(s => s.snapshot);
  const executeAction = useGameStore(s => s.executeAction);

  if (!snapshot) return null;

  const player = snapshot.consumers[0];
  if (!player) return null;

  const myBiz = snapshot.businesses.find(b => b.ownerId === player.id);
  if (!myBiz) return null;

  const industry = myBiz.industryId ? getIndustryById(myBiz.industryId) : null;
  const profit = myBiz.revenue - myBiz.costs;
  const profitMargin = myBiz.revenue > 0 ? profit / myBiz.revenue : 0;
  const monthlyProduction = myBiz.employees * (industry?.productionPerEmployee ?? 10);
  const potentialRevenue = monthlyProduction * myBiz.price;

  return (
    <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center gap-2">
          <span className="text-sm">{industry?.icon ?? '🏢'}</span>
          <div>
            <h3 className="text-xs font-semibold">{myBiz.name}</h3>
            <span className="text-[9px] text-[var(--text-secondary)]">
              {industry?.sectorType === 'primary' ? 'Sector Primario' :
               industry?.sectorType === 'secondary' ? 'Sector Secundario' :
               industry?.sectorType === 'tertiary' ? 'Sector Terciario' : myBiz.sector}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <MiniStat label="Caja" value={formatCurrency(myBiz.cash)} color={myBiz.cash > 0 ? '#16a34a' : '#dc2626'} />
          <MiniStat label="Ingresos/mes" value={formatCurrency(myBiz.revenue)} color="#2563eb" />
          <MiniStat label="Costos/mes" value={formatCurrency(myBiz.costs)} color="#dc2626" />
          <MiniStat label="Ganancia" value={formatCurrency(profit)} color={profit >= 0 ? '#16a34a' : '#dc2626'} />
        </div>

        <div className="space-y-1 text-xs">
          <Row label="Empleados" value={`${myBiz.employees}`} />
          <Row label="Salario" value={`${formatCurrency(myBiz.wage)}/mes`} />
          <Row label="Precio venta" value={`${formatCurrency(myBiz.price)}/ud`} />
          <Row label="Inventario" value={`${myBiz.inventory} uds`} />
          <Row label="Producción" value={`${monthlyProduction} uds/mes`} />
          <Row label="Margen" value={formatPercent(profitMargin)} highlight={profitMargin >= 0} />
          {myBiz.monthlyFixedCosts > 0 && (
            <Row label="Costos fijos" value={`${formatCurrency(myBiz.monthlyFixedCosts)}/mes`} />
          )}
        </div>

        {potentialRevenue > 0 && (
          <div className="bg-[var(--info-muted)] border border-[var(--info-border)] rounded-lg px-3 py-2">
            <p className="text-[10px] text-[var(--info)]">
              Potencial: {formatCurrency(potentialRevenue)}/mes si vendes toda la producción
            </p>
          </div>
        )}

        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Gestionar</p>

          <div className="flex gap-1.5">
            <button
              onClick={() => executeAction({ type: 'hire', entityId: myBiz.id, count: 1 })}
              className="flex-1 px-2 py-1.5 rounded-md border border-[var(--border)] text-[10px] font-medium hover:bg-[var(--success-muted)] hover:border-[var(--success-border)] transition-colors"
            >
              + Contratar
            </button>
            <button
              onClick={() => executeAction({ type: 'fire', entityId: myBiz.id, count: 1 })}
              disabled={myBiz.employees <= 1}
              className="flex-1 px-2 py-1.5 rounded-md border border-[var(--border)] text-[10px] font-medium hover:bg-[var(--danger-muted)] hover:border-[var(--danger-border)] transition-colors disabled:opacity-40"
            >
              - Despedir
            </button>
          </div>

          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-[var(--text-secondary)]">Precio de venta</span>
              <span className="font-mono">{formatCurrency(myBiz.price)}</span>
            </div>
            <input
              type="range"
              min={1}
              max={Math.max(200, myBiz.price * 3)}
              step={1}
              value={myBiz.price}
              onChange={e => executeAction({ type: 'set_price', entityId: myBiz.id, value: parseInt(e.target.value) })}
              className="w-full h-1.5 rounded-full appearance-none bg-[var(--border)] accent-blue-500"
            />
            <div className="flex justify-between text-[9px] text-[var(--text-secondary)]">
              <span>Más ventas</span>
              <span>Más margen</span>
            </div>
          </div>
        </div>

        {industry && (
          <div className="pt-2 border-t border-[var(--border)]">
            <p className="text-[10px] italic text-[var(--text-secondary)]">
              💡 {industry.tips}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="px-2.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
      <p className="text-[9px] text-[var(--text-secondary)]">{label}</p>
      <p className="text-xs font-mono font-semibold" style={{ color }}>{value}</p>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-[var(--text-secondary)]">{label}</span>
      <span className={`font-mono ${highlight === false ? 'text-[var(--danger)]' : highlight ? 'text-[var(--success)]' : ''}`}>{value}</span>
    </div>
  );
}
