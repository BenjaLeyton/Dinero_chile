import type { EntityType, FlowType } from '@/types/economy';

export const ENTITY_COLORS: Record<EntityType, string> = {
  central_bank: '#6366f1',
  commercial_bank: '#2563eb',
  business: '#16a34a',
  consumer: '#d97706',
  government: '#dc2626',
  resource: '#7c3aed',
};

export const FLOW_COLORS: Record<FlowType, string> = {
  wage: '#16a34a',
  loan: '#2563eb',
  tax: '#dc2626',
  money_creation: '#d97706',
  government_spending: '#7c3aed',
  interest: '#ea580c',
  deposit: '#0891b2',
  purchase: '#16a34a',
  debt_payment: '#64748b',
  transfer: '#64748b',
  reserve: '#6366f1',
};

export const FLOW_LABELS: Record<FlowType, string> = {
  wage: 'Salario',
  loan: 'Préstamo',
  tax: 'Impuesto',
  money_creation: 'Creación de dinero',
  government_spending: 'Gasto público',
  interest: 'Interés',
  deposit: 'Depósito',
  purchase: 'Compra',
  debt_payment: 'Pago de deuda',
  transfer: 'Transferencia',
  reserve: 'Reserva',
};

export const ENTITY_LABELS: Record<EntityType, string> = {
  central_bank: 'Banco Central',
  commercial_bank: 'Banco',
  business: 'Empresa',
  consumer: 'Consumidor',
  government: 'Gobierno',
  resource: 'Recurso',
};
