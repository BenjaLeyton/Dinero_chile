export const BASE_INTEREST_RATE = 0.05;
export const TARGET_INFLATION = 0.02;
export const BASE_RESERVE_REQUIREMENT = 0.10;
export const BASE_MONEY_SUPPLY = 1_000_000;
export const BASE_CPI = 100;
export const BASE_WAGE = 3000;
export const BASE_PRICE = 10;
export const BASE_CONSUMER_SAVINGS = 5000;
export const BASE_BUSINESS_CASH = 50000;
export const BASE_BANK_CASH = 200000;
export const BASE_GOVERNMENT_CASH = 500000;

export const LOAN_TERM_MONTHS = 60;
export const MAX_INTEREST_RATE = 0.50;
export const MIN_INTEREST_RATE = 0.0;
export const MAX_TAX_RATE = 0.60;
export const MAX_RESERVE_REQUIREMENT = 1.0;

export const TAYLOR_RULE_INFLATION_WEIGHT = 1.5;
export const TAYLOR_RULE_OUTPUT_WEIGHT = 0.5;

export const CONSUMPTION_ELASTICITY = 0.3;
export const PRICE_ADJUSTMENT_SPEED = 0.05;
export const WAGE_ADJUSTMENT_SPEED = 0.03;

export const HISTORY_BUFFER_SIZE = 500;

export const BUSINESS_NAMES: Record<string, string[]> = {
  agriculture: ['Granja Sol', 'AgroVerde', 'Campos del Sur', 'Tierras Fértiles'],
  manufacturing: ['FabriMax', 'IndusTec', 'MetalCraft', 'ProducMás'],
  services: ['ServiRápido', 'ConfiServ', 'AtenTodos', 'ServicioPlus'],
  technology: ['TecnoVa', 'DataSoft', 'InnoCode', 'DigitalPro'],
  energy: ['EnergíaViva', 'SolPower', 'PetroNorte', 'ElectroSur'],
};

export const BANK_NAMES = [
  'Banco Nacional', 'Banco del Pueblo', 'Banco Mercantil',
  'Banco de Comercio', 'Banco Agrario', 'Banco Industrial',
  'Banco Popular', 'Banco Central de Reserva', 'Banco Solidario',
  'Banco de Inversión',
];

export const CONSUMER_NAMES = [
  'María', 'José', 'Carlos', 'Ana', 'Luis',
  'Carmen', 'Pedro', 'Laura', 'Miguel', 'Sofia',
  'Diego', 'Elena', 'Andrés', 'Isabel', 'Roberto',
  'Patricia', 'Fernando', 'Rosa', 'Alejandro', 'Gloria',
  'Ricardo', 'Marta', 'Jorge', 'Teresa', 'Raúl',
  'Lucía', 'Pablo', 'Daniela', 'Sergio', 'Valentina',
  'Óscar', 'Natalia', 'Héctor', 'Camila', 'Manuel',
  'Adriana', 'Arturo', 'Gabriela', 'Eduardo', 'Clara',
  'Tomás', 'Beatriz', 'Javier', 'Lorena', 'Enrique',
  'Diana', 'Francisco', 'Verónica', 'Gustavo', 'Silvia',
];
