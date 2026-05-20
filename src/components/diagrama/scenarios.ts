export interface EntityNode {
  id: string;
  label: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  description: string;
  metrics: Record<string, string>;
}

export interface Flow {
  id: string;
  from: string;
  to: string;
  label: string;
  color: string;
  thickness: number; // 1-5
  speed: number; // animation duration in seconds, lower = faster
  description: string;
}

export interface Scenario {
  id: string;
  name: string;
  icon: string;
  description: string;
  verdict: 'healthy' | 'warning' | 'danger';
  verdictLabel: string;
  keyPoints: string[];
  entities: EntityNode[];
  flows: Flow[];
  indicators: {
    inflacion: string;
    desempleo: string;
    pib: string;
    tasaInteres: string;
    deudaPib: string;
    gini: string;
  };
}

const BASE_ENTITIES: EntityNode[] = [
  {
    id: 'central_bank',
    label: 'Banco Central',
    icon: '🏛️',
    color: '#6366f1',
    x: 50,
    y: 8,
    description: 'Controla política monetaria: tasa de interés, encaje y emisión de dinero.',
    metrics: {},
  },
  {
    id: 'government',
    label: 'Gobierno',
    icon: '🏛️',
    color: '#dc2626',
    x: 15,
    y: 25,
    description: 'Recauda impuestos y gasta en bienes públicos.',
    metrics: {},
  },
  {
    id: 'commercial_bank',
    label: 'Bancos',
    icon: '🏦',
    color: '#2563eb',
    x: 85,
    y: 25,
    description: 'Reciben depósitos, otorgan préstamos y crean dinero a través del crédito.',
    metrics: {},
  },
  {
    id: 'business',
    label: 'Empresas',
    icon: '🏭',
    color: '#16a34a',
    x: 65,
    y: 55,
    description: 'Producen bienes, contratan trabajadores y generan ingresos.',
    metrics: {},
  },
  {
    id: 'consumer',
    label: 'Consumidores',
    icon: '👤',
    color: '#d97706',
    x: 35,
    y: 55,
    description: 'Trabajan, consumen, ahorran y pagan impuestos.',
    metrics: {},
  },
  {
    id: 'resource',
    label: 'Recursos',
    icon: '⛏️',
    color: '#7c3aed',
    x: 85,
    y: 75,
    description: 'Oro, petróleo, agricultura — insumos para la producción.',
    metrics: {},
  },
];

function makeEntities(overrides: Partial<Record<string, Partial<EntityNode>>>): EntityNode[] {
  return BASE_ENTITIES.map((e) => {
    const o = overrides[e.id];
    return o ? { ...e, ...o, metrics: { ...e.metrics, ...o.metrics } } : e;
  });
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'healthy',
    name: 'Economía Saludable',
    icon: '✅',
    description:
      'Todos los flujos en equilibrio. La producción crece al ritmo de la oferta monetaria. Inflación baja y estable, pleno empleo, bancos solventes.',
    verdict: 'healthy',
    verdictLabel: 'Equilibrio',
    keyPoints: [
      'Inflación al 2% — Si un café cuesta $1,000 hoy, en un año costará $1,020. Eso es tan poco que puedes planificar: sabes cuánto necesitas para vivir el próximo mes. Si fuera 15%, ese café pasaría a $1,150 y tu salario no alcanzaría.',
      'Desempleo al 4% — De cada 100 personas, 96 tienen trabajo y reciben un salario. Eso significa que hay consumidores comprando cosas, lo que mantiene a las empresas vendiendo, contratando y pagando impuestos. Es un ciclo que se alimenta solo.',
      'Bancos con reservas sanas — Los bancos guardan el 10% de los depósitos y prestan el resto. Si tienes $10,000 ahorrados, $1,000 está en caja y $9,000 fue prestado a una empresa. Mientras no todos retiren al mismo tiempo, funciona. Las empresas reciben crédito para operar y crecer.',
      'Gobierno sin déficit — El gobierno recauda $120K en impuestos y gasta $115K en servicios públicos. No necesita pedir prestado ni imprimir dinero. Cuando el gobierno gasta más de lo que recauda, esa diferencia se convierte en deuda que eventualmente todos pagan.',
      'El dinero circula — Una empresa paga $3,000 de salario → el trabajador gasta $2,400 comprando cosas → la empresa recibe ese dinero como ingreso → paga salarios de nuevo. Cada vuelta que da el dinero es actividad económica. Si el dinero deja de circular (la gente ahorra todo por miedo), la economía se frena.',
    ],
    indicators: {
      inflacion: '2%',
      desempleo: '4%',
      pib: '+3%',
      tasaInteres: '5%',
      deudaPib: '45%',
      gini: '0.35',
    },
    entities: makeEntities({
      central_bank: { metrics: { 'Tasa': '5%', 'Encaje': '10%', 'M1': '$1.2M' } },
      government: { metrics: { 'Impuestos': '$120K', 'Gasto': '$115K', 'Deuda': '$540K' } },
      commercial_bank: { metrics: { 'Depósitos': '$800K', 'Préstamos': '$600K', 'Reservas': '$200K' } },
      business: { metrics: { 'Ingresos': '$250K', 'Empleados': '28', 'Margen': '+15%' } },
      consumer: { metrics: { 'Ingreso': '$3K', 'Ahorro': '$5K', 'Satisfacción': '78%' } },
      resource: { metrics: { 'Reservas': '85%', 'Precio': 'Estable', 'Extracción': 'Normal' } },
    }),
    flows: [
      { id: 'h1', from: 'central_bank', to: 'commercial_bank', label: 'Tasa de interés 5%', color: '#6366f1', thickness: 2, speed: 3, description: 'El banco central fija la tasa base. Los bancos prestan a tasa + spread.' },
      { id: 'h2', from: 'commercial_bank', to: 'business', label: 'Préstamos', color: '#2563eb', thickness: 2, speed: 2.5, description: 'Bancos prestan a empresas para financiar operaciones e inversión.' },
      { id: 'h3', from: 'business', to: 'consumer', label: 'Salarios $3K', color: '#16a34a', thickness: 3, speed: 2, description: 'Empresas pagan salarios mensuales a sus empleados.' },
      { id: 'h4', from: 'consumer', to: 'business', label: 'Compras', color: '#16a34a', thickness: 3, speed: 2, description: 'Consumidores gastan parte de su ingreso comprando bienes.' },
      { id: 'h5', from: 'consumer', to: 'commercial_bank', label: 'Depósitos', color: '#0891b2', thickness: 2, speed: 3, description: 'Consumidores ahorran excedente en depósitos bancarios.' },
      { id: 'h6', from: 'consumer', to: 'government', label: 'Impuesto renta', color: '#dc2626', thickness: 1.5, speed: 3, description: 'Consumidores pagan impuesto sobre su ingreso.' },
      { id: 'h7', from: 'business', to: 'government', label: 'Impuesto corp.', color: '#dc2626', thickness: 1.5, speed: 3, description: 'Empresas pagan impuesto sobre sus ganancias.' },
      { id: 'h8', from: 'government', to: 'consumer', label: 'Gasto público', color: '#7c3aed', thickness: 2, speed: 2.5, description: 'Gobierno redistribuye vía bienes públicos y transferencias.' },
      { id: 'h9', from: 'resource', to: 'business', label: 'Insumos', color: '#7c3aed', thickness: 1.5, speed: 3, description: 'Recursos naturales son insumos para la producción.' },
      { id: 'h10', from: 'business', to: 'commercial_bank', label: 'Pago deuda', color: '#64748b', thickness: 1.5, speed: 3, description: 'Empresas repagan préstamos con interés.' },
    ],
  },
  {
    id: 'inflation',
    name: 'Inflación Alta',
    icon: '🔥',
    description:
      'Demasiado dinero persiguiendo muy pocos bienes. El banco central imprimió en exceso, los precios suben rápido y el poder adquisitivo se desploma.',
    verdict: 'danger',
    verdictLabel: 'Crisis',
    keyPoints: [
      'Demasiado dinero, pocos bienes — El banco central imprimió dinero de más. Ahora hay $3.5M circulando pero la misma cantidad de productos. Si hay más plata persiguiendo los mismos bienes, los vendedores suben precios porque saben que la gente puede pagar más.',
      'Tu salario sube 5% pero los precios suben 15% — Ganabas $3,000 y comprabas 300 unidades a $10. Ahora ganas $3,150 pero cada unidad cuesta $11.50. Solo puedes comprar 274 unidades. Perdiste poder de compra aunque "ganes más".',
      'El gobierno gasta más de lo que recauda — Recauda $90K en impuestos pero gasta $180K. La diferencia ($90K) la cubre imprimiendo dinero. Ese dinero nuevo entra al sistema sin producción nueva detrás → más inflación. Es un ciclo que se alimenta.',
      'El banco central sube la tasa al 18% — Intenta frenar la inflación encareciendo los préstamos. Si pedir prestado es caro, la gente y empresas piden menos → circula menos dinero → los precios bajan. Pero tarda meses en hacer efecto y mientras tanto la economía sufre.',
      'Los ahorristas pierden — Si tienes $100,000 ahorrados y la inflación es 15%, en un año tu dinero compra lo que antes compraban $85,000. Perdiste $15,000 de poder adquisitivo sin gastar nada. La inflación es un impuesto invisible sobre los ahorros.',
    ],
    indicators: {
      inflacion: '15%',
      desempleo: '6%',
      pib: '+1%',
      tasaInteres: '18%',
      deudaPib: '80%',
      gini: '0.48',
    },
    entities: makeEntities({
      central_bank: {
        description: 'Imprimió dinero en exceso. Ahora sube tasa agresivamente para frenar inflación.',
        metrics: { 'Tasa': '18%', 'Encaje': '15%', 'M1': '$3.5M ⚠️' },
      },
      government: {
        description: 'Déficit fiscal. Gasta más de lo que recauda, financiado con emisión.',
        metrics: { 'Impuestos': '$90K', 'Gasto': '$180K', 'Déficit': '$90K ⚠️' },
      },
      commercial_bank: {
        description: 'Tasas altas dificultan el crédito. Depósitos pierden valor real.',
        metrics: { 'Depósitos': '$1.2M', 'Préstamos': '$400K ↓', 'Tasa prést.': '22%' },
      },
      business: {
        description: 'Costos suben, márgenes se comprimen. Suben precios para sobrevivir.',
        metrics: { 'Precios': '+15% ↑', 'Costos': '+18% ↑', 'Margen': '3%' },
      },
      consumer: {
        description: 'El salario no alcanza. Poder de compra se erosiona cada mes.',
        metrics: { 'Ingreso real': '-10%', 'Ahorro real': '-15%', 'Satisfacción': '42%' },
      },
      resource: {
        description: 'Precios de commodities suben, encareciendo la producción.',
        metrics: { 'Precio': '+20% ↑', 'Demanda': 'Alta', 'Escasez': 'Creciente' },
      },
    }),
    flows: [
      { id: 'i1', from: 'central_bank', to: 'commercial_bank', label: 'Tasa 18% (agresiva)', color: '#ef4444', thickness: 4, speed: 1.5, description: 'Tasa alta para frenar crédito e inflación — Taylor Rule en acción.' },
      { id: 'i2', from: 'central_bank', to: 'government', label: 'Emisión monetaria 💸', color: '#f59e0b', thickness: 4, speed: 1, description: 'CAUSA RAÍZ: El banco central emite dinero para financiar déficit del gobierno.' },
      { id: 'i3', from: 'commercial_bank', to: 'business', label: 'Préstamos caros', color: '#2563eb', thickness: 1, speed: 4, description: 'Tasa alta = préstamos caros. Empresas dejan de invertir.' },
      { id: 'i4', from: 'business', to: 'consumer', label: 'Salarios (+5%)', color: '#16a34a', thickness: 2, speed: 2, description: 'Salarios suben pero menos que la inflación — pérdida de poder adquisitivo.' },
      { id: 'i5', from: 'consumer', to: 'business', label: 'Compras (precios +15%)', color: '#ef4444', thickness: 4, speed: 1.5, description: 'Los mismos bienes cuestan 15% más. Consumidores compran menos unidades.' },
      { id: 'i6', from: 'government', to: 'consumer', label: 'Gasto público excesivo', color: '#7c3aed', thickness: 4, speed: 1.5, description: 'Gobierno inyecta dinero que no tiene → más demanda → más inflación.' },
      { id: 'i7', from: 'consumer', to: 'government', label: 'Impuestos', color: '#dc2626', thickness: 1.5, speed: 3, description: 'Recaudación no alcanza a cubrir el gasto descontrolado.' },
      { id: 'i8', from: 'resource', to: 'business', label: 'Insumos caros', color: '#7c3aed', thickness: 2, speed: 2, description: 'Commodities más caros = costos de producción más altos.' },
    ],
  },
  {
    id: 'deflation',
    name: 'Deflación',
    icon: '🧊',
    description:
      'Los precios caen. Suena bien, pero es una trampa: los consumidores postergan compras, la demanda colapsa, las empresas quiebran y el desempleo sube.',
    verdict: 'danger',
    verdictLabel: 'Espiral negativa',
    keyPoints: [
      'Los precios bajan y eso es MALO — Suena bien que las cosas se abaraten, pero si sabes que el celular que hoy cuesta $500 mañana costará $480 y en un mes $450, ¿para qué comprarlo hoy? Todos piensan igual → nadie compra → las empresas no venden nada.',
      'Las empresas quiebran porque nadie compra — Si vendes 100 productos al mes y la gente deja de comprar esperando precios más bajos, vendes 50. No puedes pagar a todos tus empleados → despides. Esos despedidos dejan de comprar → más empresas en problemas. Espiral descendente.',
      'La deuda se vuelve más pesada — Pediste un préstamo de $100,000 cuando tu salario era $3,000. Ahora con deflación tu salario baja a $2,500 pero sigues debiendo $100,000. La deuda no baja con la deflación, pero tu ingreso sí. Cada mes es más difícil pagar.',
      'El banco central no puede hacer nada — La tasa ya está en 1% (casi cero). No puede bajarla más. Es como empujar una cuerda: puedes subir la tasa para frenar la economía, pero bajarla no garantiza reactivarla. Esto se llama "trampa de liquidez".',
      'La paradoja del ahorro — Cada persona hace lo racional: ahorrar. Pero si TODOS ahorran y nadie gasta, la economía se contrae. Lo que es bueno para uno es destructivo para todos juntos.',
    ],
    indicators: {
      inflacion: '-3%',
      desempleo: '18%',
      pib: '-2%',
      tasaInteres: '1%',
      deudaPib: '65%',
      gini: '0.52',
    },
    entities: makeEntities({
      central_bank: {
        description: 'Baja tasa al mínimo y reduce encaje, pero la trampa de liquidez impide la reactivación.',
        metrics: { 'Tasa': '1%', 'Encaje': '5% ↓', 'M1': '$700K ↓' },
      },
      government: {
        description: 'Recaudación cae por menos actividad. Intenta estimular con gasto.',
        metrics: { 'Impuestos': '$60K ↓', 'Gasto': '$100K', 'Déficit': '$40K' },
      },
      commercial_bank: {
        description: 'No quieren prestar (riesgo alto). Los depósitos crecen pero se quedan ahí.',
        metrics: { 'Depósitos': '$900K', 'Préstamos': '$200K ↓↓', 'Exceso res.': 'Alto' },
      },
      business: {
        description: 'Bajan precios para vender algo. Márgenes negativos. Despiden.',
        metrics: { 'Precios': '-3% ↓', 'Ventas': '-25% ↓', 'Empleados': '15 ↓' },
      },
      consumer: {
        description: 'Muchos desempleados. Los que trabajan ahorran por miedo. No consumen.',
        metrics: { 'Desempleo': '18%', 'Consumo': '-30%', 'Satisfacción': '35%' },
      },
      resource: {
        description: 'Precios de commodities caen por baja demanda.',
        metrics: { 'Precio': '-10% ↓', 'Demanda': 'Baja', 'Extracción': 'Mínima' },
      },
    }),
    flows: [
      { id: 'd1', from: 'central_bank', to: 'commercial_bank', label: 'Tasa 1% (mínima)', color: '#60a5fa', thickness: 1, speed: 4, description: 'Tasa casi cero pero los bancos igual no prestan — trampa de liquidez.' },
      { id: 'd2', from: 'commercial_bank', to: 'business', label: 'Crédito congelado', color: '#94a3b8', thickness: 0.5, speed: 5, description: 'Bancos no quieren prestar: demasiado riesgo de impago.' },
      { id: 'd3', from: 'business', to: 'consumer', label: 'Salarios ↓ / Despidos', color: '#ef4444', thickness: 1, speed: 3, description: 'Empresas recortan salarios y despiden para sobrevivir.' },
      { id: 'd4', from: 'consumer', to: 'business', label: 'Compras mínimas', color: '#94a3b8', thickness: 1, speed: 4, description: 'Consumidores postergan compras esperando precios más bajos.' },
      { id: 'd5', from: 'consumer', to: 'commercial_bank', label: 'Ahorro por miedo', color: '#0891b2', thickness: 3, speed: 2, description: 'Paradoja del ahorro: todos ahorran → nadie gasta → la economía se contrae.' },
      { id: 'd6', from: 'consumer', to: 'government', label: 'Impuestos (bajos)', color: '#dc2626', thickness: 1, speed: 4, description: 'Menor ingreso = menor recaudación fiscal.' },
      { id: 'd7', from: 'government', to: 'consumer', label: 'Estímulo fiscal', color: '#7c3aed', thickness: 2, speed: 2, description: 'Gobierno intenta reactivar con gasto, pero no alcanza.' },
      { id: 'd8', from: 'resource', to: 'business', label: 'Insumos baratos', color: '#7c3aed', thickness: 1, speed: 4, description: 'Precios bajos pero nadie quiere producir.' },
    ],
  },
  {
    id: 'wage_spiral',
    name: 'Espiral Salarial',
    icon: '🌀',
    description:
      'Pleno empleo → escasez de trabajadores → salarios suben → costos suben → precios suben → salarios suben más. Un ciclo que se retroalimenta.',
    verdict: 'warning',
    verdictLabel: 'Ciclo peligroso',
    keyPoints: [
      'Casi no hay desempleados — Solo 3% sin trabajo. Las empresas necesitan gente pero no la encuentran. ¿Qué hacen? Ofrecen salarios más altos para robarle empleados a la competencia. Tu salario sube de $3,000 a $3,240 (+8%).',
      'Los salarios suben → los precios suben — La empresa ahora gasta más en nómina. Para no perder, sube el precio de sus productos un 6%. Ahora el trabajador gana más pero todo es más caro. Resultado neto: casi igual que antes, pero los números son más grandes.',
      'El ciclo se repite — El trabajador ve que los precios subieron 6% y pide otro aumento. La empresa sube precios de nuevo. Y otra vez. Cada ronda, salarios y precios suben más. Es un espiral que se retroalimenta y cada vez es más difícil de frenar.',
      'El banco central debe "enfriar" la economía — Sube la tasa de 5% a 10%. Ahora pedir préstamos es caro → empresas invierten menos → contratan menos → la presión salarial baja. Es como echar agua fría a una olla hirviendo. Funciona, pero puede causar despidos si se excede.',
      'Si no se frena a tiempo → inflación permanente — Lo que empezó como "buenas noticias" (todos empleados, salarios subiendo) se puede convertir en inflación descontrolada. La ventana para actuar es corta.',
    ],
    indicators: {
      inflacion: '8%',
      desempleo: '3%',
      pib: '+4%',
      tasaInteres: '10%',
      deudaPib: '50%',
      gini: '0.32',
    },
    entities: makeEntities({
      central_bank: {
        description: 'Debe subir tasa para enfriar la economía y romper la espiral.',
        metrics: { 'Tasa': '10% ↑', 'Encaje': '12%', 'Objetivo': 'Frenar espiral' },
      },
      government: {
        description: 'Buena recaudación por alto empleo. Debería ahorrar, no gastar más.',
        metrics: { 'Impuestos': '$150K ↑', 'Gasto': '$130K', 'Superávit': '$20K' },
      },
      commercial_bank: {
        description: 'Mucho crédito demandado. Empresas necesitan financiar mayores nóminas.',
        metrics: { 'Depósitos': '$1M', 'Préstamos': '$850K ↑', 'Demanda': 'Alta' },
      },
      business: {
        description: 'Ganancias altas pero costos salariales crecen más rápido.',
        metrics: { 'Salarios': '+8% ↑↑', 'Precios': '+6% ↑', 'Margen': '10% ↓' },
      },
      consumer: {
        description: 'Todos empleados, salarios subiendo. Pero precios suben también.',
        metrics: { 'Ingreso': '$3.5K ↑', 'Consumo': 'Alto', 'Satisfacción': '72%' },
      },
      resource: {
        description: 'Alta demanda de insumos presiona precios al alza.',
        metrics: { 'Precio': '+5% ↑', 'Demanda': 'Muy alta', 'Presión': 'Creciente' },
      },
    }),
    flows: [
      { id: 'w1', from: 'central_bank', to: 'commercial_bank', label: 'Tasa 10% ↑', color: '#f59e0b', thickness: 3, speed: 2, description: 'Banco central sube tasa para enfriar crédito y romper la espiral.' },
      { id: 'w2', from: 'commercial_bank', to: 'business', label: 'Préstamos (nómina)', color: '#2563eb', thickness: 3, speed: 2, description: 'Empresas piden más crédito para pagar salarios crecientes.' },
      { id: 'w3', from: 'business', to: 'consumer', label: 'Salarios +8% 🌀', color: '#f59e0b', thickness: 4, speed: 1.5, description: 'ESPIRAL: Empresas suben salarios para retener trabajadores escasos.' },
      { id: 'w4', from: 'consumer', to: 'business', label: 'Compras +6% 🌀', color: '#f59e0b', thickness: 4, speed: 1.5, description: 'ESPIRAL: Más ingreso = más consumo = más demanda = precios suben.' },
      { id: 'w5', from: 'consumer', to: 'commercial_bank', label: 'Depósitos', color: '#0891b2', thickness: 2, speed: 3, description: 'Algo de ahorro pero la mayoría se gasta.' },
      { id: 'w6', from: 'consumer', to: 'government', label: 'Impuestos (altos)', color: '#dc2626', thickness: 2.5, speed: 2.5, description: 'Alta recaudación por pleno empleo y buenos salarios.' },
      { id: 'w7', from: 'government', to: 'consumer', label: 'Gasto público', color: '#7c3aed', thickness: 2, speed: 2.5, description: 'Gobierno debería moderar gasto para no alimentar la espiral.' },
      { id: 'w8', from: 'resource', to: 'business', label: 'Insumos +5%', color: '#7c3aed', thickness: 2, speed: 2.5, description: 'Precios de insumos también suben por alta demanda.' },
    ],
  },
  {
    id: 'bank_crisis',
    name: 'Crisis Bancaria',
    icon: '🏦💥',
    description:
      'Los bancos prestaron demasiado y sus reservas cayeron por debajo del mínimo. El crédito se congela, empresas no pueden operar y la economía se paraliza.',
    verdict: 'danger',
    verdictLabel: 'Colapso crediticio',
    keyPoints: [
      'Los bancos prestaron casi todo — Recibieron $800K en depósitos, guardaron solo $30K (3%) y prestaron el resto. El mínimo legal es 10% ($80K). No tienen con qué responder si la gente quiere su dinero de vuelta.',
      'Las empresas no pagan sus préstamos — Cuando la economía se frenó, las empresas dejaron de vender, no generaron ingresos y no pudieron pagar sus deudas al banco. Esos $200K en impagos son pérdidas directas para el banco.',
      'El crédito se congela — Los bancos no tienen plata para prestar. Una empresa que necesita $50K para pagar la nómina de este mes recibe un "no". No importa si el negocio es bueno — sin crédito, no puede operar. Tiene que despedir o cerrar.',
      'Corrida bancaria — Los ahorristas se enteran de que el banco está en problemas y van todos a retirar su dinero al mismo tiempo. Pero el banco solo tiene 3% en caja. Si 100 personas tienen $10,000 cada una, solo los primeros 3 pueden retirar. El resto pierde.',
      'El banco central inyecta dinero de emergencia — Es el "prestamista de última instancia". Crea dinero nuevo y se lo da al banco para que no quiebre. Esto salva el sistema pero ese dinero nuevo diluye el valor de la moneda para todos.',
    ],
    indicators: {
      inflacion: '1%',
      desempleo: '12%',
      pib: '-4%',
      tasaInteres: '2%',
      deudaPib: '75%',
      gini: '0.50',
    },
    entities: makeEntities({
      central_bank: {
        description: 'Prestamista de última instancia. Inyecta reservas de emergencia a bancos.',
        metrics: { 'Tasa': '2% ↓', 'Inyección': '$500K ⚠️', 'Modo': 'Emergencia' },
      },
      government: {
        description: 'Debe decidir si rescata bancos con dinero público.',
        metrics: { 'Rescate': '¿$300K?', 'Deuda': '+20% ↑', 'Confianza': 'Baja' },
      },
      commercial_bank: {
        description: 'Reservas agotadas. No pueden prestar. Algunos al borde de quiebra.',
        metrics: { 'Reservas': '3% ⚠️', 'Impagos': '$200K', 'Estado': 'Crítico' },
      },
      business: {
        description: 'Sin acceso a crédito. No pueden financiar operaciones ni nómina.',
        metrics: { 'Crédito': 'Denegado', 'Empleados': '20 ↓', 'Liquidez': 'Crítica' },
      },
      consumer: {
        description: 'Preocupados por sus depósitos. Corrida bancaria posible.',
        metrics: { 'Confianza': 'Muy baja', 'Retiros': '↑↑↑', 'Desempleo': '12%' },
      },
      resource: {
        description: 'Producción paralizada reduce demanda de recursos.',
        metrics: { 'Demanda': 'Mínima', 'Precio': '-8% ↓', 'Extracción': 'Parada' },
      },
    }),
    flows: [
      { id: 'b1', from: 'central_bank', to: 'commercial_bank', label: 'Liquidez emergencia 🚨', color: '#ef4444', thickness: 5, speed: 1, description: 'Banco central inyecta reservas de emergencia para evitar colapso total.' },
      { id: 'b2', from: 'commercial_bank', to: 'business', label: 'Crédito congelado ❌', color: '#94a3b8', thickness: 0.5, speed: 6, description: 'Bancos no prestan — no tienen reservas suficientes.' },
      { id: 'b3', from: 'business', to: 'consumer', label: 'Despidos masivos', color: '#ef4444', thickness: 1, speed: 3, description: 'Sin crédito, las empresas no pueden pagar nómina.' },
      { id: 'b4', from: 'consumer', to: 'business', label: 'Consumo mínimo', color: '#94a3b8', thickness: 1, speed: 4, description: 'Sin ingreso y con miedo, el consumo cae drásticamente.' },
      { id: 'b5', from: 'consumer', to: 'commercial_bank', label: 'Retiros masivos 🏃', color: '#ef4444', thickness: 4, speed: 1, description: 'Corrida bancaria: todos quieren sacar su dinero al mismo tiempo.' },
      { id: 'b6', from: 'business', to: 'commercial_bank', label: 'Impagos 💀', color: '#ef4444', thickness: 3, speed: 1.5, description: 'Empresas no pueden pagar préstamos → pérdidas para bancos.' },
      { id: 'b7', from: 'government', to: 'commercial_bank', label: 'Rescate bancario?', color: '#f59e0b', thickness: 3, speed: 2, description: 'Gobierno debate inyectar dinero público para salvar bancos.' },
    ],
  },
  {
    id: 'debt_crisis',
    name: 'Deuda Insostenible',
    icon: '📉',
    description:
      'El gobierno gastó más de lo que recaudó durante años. La deuda supera el 100% del PIB. Debe subir impuestos o recortar gasto — ambas opciones duelen.',
    verdict: 'danger',
    verdictLabel: 'Insostenible',
    keyPoints: [
      'El gobierno debe más de lo que produce el país en un año — La deuda es 120% del PIB. Si todo lo que producen todas las empresas y personas del país en un año es $1M, el gobierno debe $1.2M. Es como si tu sueldo anual fuera $30,000 y debieras $36,000 en la tarjeta.',
      'Los intereses se comen el presupuesto — El gobierno paga $120K/año solo en intereses de su deuda. Eso es dinero que no puede usar en hospitales, escuelas o carreteras. Cada año que pasa, debe más, paga más intereses, y le queda menos para gobernar.',
      'Subir impuestos no funciona — Si sube impuestos, la gente tiene menos plata → compra menos → las empresas venden menos → despiden gente → la gente paga menos impuestos. Se recauda MENOS, no más. Es una trampa.',
      'Recortar gasto tampoco funciona — Si recorta gasto público, hay menos servicios, menos obras, menos empleos públicos → la gente gasta menos → la economía se contrae → menos recaudación. Otra trampa.',
      'La tentación de imprimir — El gobierno presiona al banco central para que imprima dinero y pague la deuda. Esto "funciona" a corto plazo pero genera inflación: si hay más dinero pero la misma producción, los precios suben y el peso de la deuda se diluye — junto con los ahorros de todos.',
    ],
    indicators: {
      inflacion: '7%',
      desempleo: '10%',
      pib: '-1%',
      tasaInteres: '12%',
      deudaPib: '120%',
      gini: '0.55',
    },
    entities: makeEntities({
      central_bank: {
        description: 'Presionado para imprimir y monetizar la deuda. Independencia en riesgo.',
        metrics: { 'Tasa': '12%', 'Presión': 'Monetizar', 'Credibilidad': 'Baja' },
      },
      government: {
        description: 'Atrapado: no puede gastar más ni recaudar más. La deuda crece sola.',
        metrics: { 'Deuda': '$1.5M ⚠️', 'Déficit': '$150K', 'Intereses': '$120K/año' },
      },
      commercial_bank: {
        description: 'Tienen bonos del gobierno que pierden valor. Riesgo de contagio.',
        metrics: { 'Bonos gob.': '$400K ↓', 'Riesgo': 'Alto', 'Crédito': 'Restringido' },
      },
      business: {
        description: 'Impuestos altos y crédito caro. Difícil crecer o contratar.',
        metrics: { 'Imp. corp.': '35% ↑', 'Inversión': '-20%', 'Confianza': 'Baja' },
      },
      consumer: {
        description: 'Pagan más impuestos, reciben menos servicios. Doble golpe.',
        metrics: { 'Imp. renta': '30% ↑', 'Servicios': '↓', 'Satisfacción': '38%' },
      },
      resource: {
        description: 'Gobierno vende recursos para financiarse, agotando reservas.',
        metrics: { 'Reservas': '40% ↓', 'Venta forzada': 'Sí', 'Sostenibilidad': 'Baja' },
      },
    }),
    flows: [
      { id: 'dc1', from: 'central_bank', to: 'government', label: 'Presión para emitir', color: '#f59e0b', thickness: 3, speed: 2, description: 'Gobierno presiona al banco central para que imprima dinero y pague deuda.' },
      { id: 'dc2', from: 'consumer', to: 'government', label: 'Impuestos altos', color: '#ef4444', thickness: 4, speed: 1.5, description: 'Gobierno sube impuestos para cerrar déficit — reduce ingreso disponible.' },
      { id: 'dc3', from: 'business', to: 'government', label: 'Impuestos corp. altos', color: '#ef4444', thickness: 3, speed: 2, description: 'Impuesto corporativo alto desalienta inversión y empleo.' },
      { id: 'dc4', from: 'government', to: 'consumer', label: 'Gasto recortado', color: '#7c3aed', thickness: 1, speed: 4, description: 'Gobierno recorta gasto público para reducir déficit.' },
      { id: 'dc5', from: 'commercial_bank', to: 'government', label: 'Compra bonos (riesgo)', color: '#2563eb', thickness: 2, speed: 3, description: 'Bancos compran deuda del gobierno — si el gobierno no paga, bancos quiebran.' },
      { id: 'dc6', from: 'business', to: 'consumer', label: 'Salarios estancados', color: '#16a34a', thickness: 1.5, speed: 3, description: 'Sin crecimiento, los salarios no suben.' },
      { id: 'dc7', from: 'consumer', to: 'business', label: 'Consumo reducido', color: '#94a3b8', thickness: 1.5, speed: 3, description: 'Menos ingreso disponible = menos consumo.' },
      { id: 'dc8', from: 'resource', to: 'government', label: 'Venta de recursos', color: '#7c3aed', thickness: 2, speed: 2, description: 'Gobierno vende recursos naturales para financiarse.' },
    ],
  },
  {
    id: 'crisis_2008',
    name: 'Crisis 2008',
    icon: '🏚️',
    description:
      'Hipotecas subprime, burbuja inmobiliaria, colapso bancario y rescate gubernamental. La peor crisis desde 1929, paso a paso.',
    verdict: 'danger',
    verdictLabel: 'Colapso sistémico',
    keyPoints: [
      'Los bancos prestaron a quien no debían — Daban hipotecas a personas sin ingresos ni activos ("¿Tienes pulso? Aprobado"). ¿Por qué? Porque las casas siempre subían de precio: si el deudor no pagaba, el banco se quedaba con una casa que valía más. Hasta que dejaron de subir.',
      'Empaquetaron la basura como oro — Los bancos mezclaron miles de hipotecas basura en productos financieros complejos (MBS/CDOs) y los vendieron como "inversión segura" a otros bancos y fondos. Cuando las hipotecas fallaron, todos los que compraron esos paquetes perdieron su dinero.',
      'Las casas perdieron 35% de valor — Una familia compró una casa de $220,000 con hipoteca de $180,000. La casa bajó a $140,000. Ahora deben más de lo que vale su casa. No pueden venderla para pagar la deuda. Están atrapados — o entregan la casa y pierden todo.',
      'Sin crédito, las empresas despidieron 8.7 millones — Los bancos dejaron de prestar. Una empresa que necesita $50K para pagar sueldos este mes no lo consigue. Aunque venda bien, sin efectivo HOY no puede operar. Despide gente. Esa gente deja de comprar. Más empresas en problemas.',
      'El banco se recuperó en 2 años, la gente en 10 — El gobierno dio $700B a los bancos. La familia promedio no recibió nada. Salarios congelados 5 años, ahorros perdidos, casas ejecutadas. El sistema financiero se salvó; las personas absorbieron el costo.',
    ],
    indicators: {
      inflacion: '0.1%',
      desempleo: '10%',
      pib: '-4.3%',
      tasaInteres: '0.25%',
      deudaPib: '100%',
      gini: '0.49',
    },
    entities: makeEntities({
      central_bank: {
        description: 'Bajó tasa a casi 0% e inyectó billones (QE). Prestamista de última instancia.',
        metrics: { 'Tasa': '0.25%', 'QE': '$4.5T inyectados', 'Modo': 'Emergencia total' },
      },
      government: {
        description: 'Rescató bancos con $700B (TARP). Deuda nacional se disparó.',
        metrics: { 'Rescate': '$700B', 'Deuda': '+40% ↑', 'Déficit': '$1.4T' },
      },
      commercial_bank: {
        description: 'Hipotecas impagas, productos tóxicos sin valor. Lehman Brothers quebró. Otros rescatados.',
        metrics: { 'Pérdidas': '$500B+', 'Hipotecas': 'Tóxicas', 'Confianza': 'Cero' },
      },
      business: {
        description: 'Sin acceso a crédito. No pueden financiar operaciones. Despidos masivos.',
        metrics: { 'Crédito': 'Congelado', 'Despidos': '8.7M empleos', 'Quiebras': '+40%' },
      },
      consumer: {
        description: 'Perdieron casas, empleos y ahorros. Salarios estancados por años. Recuperación tardó 7-10 años.',
        metrics: { 'Casas perdidas': '3.8M', 'Riqueza': '-$13T', 'Recuperación': '7-10 años' },
      },
      resource: {
        description: 'Petróleo cayó de $147 a $30 en meses por desplome de la demanda.',
        metrics: { 'Petróleo': '$147→$30', 'Demanda': 'Desplomada', 'Commodities': '-50%' },
      },
    }),
    flows: [
      { id: 'c1', from: 'central_bank', to: 'commercial_bank', label: 'Tasa 0.25% + QE masivo', color: '#ef4444', thickness: 5, speed: 1, description: 'Banco central baja tasa a casi 0% e inyecta $4.5 trillones comprando activos tóxicos a los bancos.' },
      { id: 'c2', from: 'government', to: 'commercial_bank', label: 'Rescate TARP $700B', color: '#f59e0b', thickness: 5, speed: 1, description: 'Gobierno inyecta $700B de dinero público para salvar bancos "too big to fail".' },
      { id: 'c3', from: 'commercial_bank', to: 'business', label: 'Crédito congelado ❌', color: '#94a3b8', thickness: 0.5, speed: 6, description: 'A pesar del rescate, los bancos no prestan — acumulan reservas por miedo.' },
      { id: 'c4', from: 'consumer', to: 'commercial_bank', label: 'Hipotecas impagas 💀', color: '#ef4444', thickness: 4, speed: 1.5, description: '3.8 millones de familias perdieron sus casas. No pueden pagar hipotecas.' },
      { id: 'c5', from: 'business', to: 'consumer', label: 'Despidos 8.7M empleos', color: '#ef4444', thickness: 4, speed: 1.5, description: 'Sin crédito, las empresas despiden masivamente. 8.7 millones de empleos perdidos.' },
      { id: 'c6', from: 'consumer', to: 'business', label: 'Consumo -3.5%', color: '#94a3b8', thickness: 1, speed: 4, description: 'Sin empleo ni ahorros, el consumo cae drásticamente.' },
      { id: 'c7', from: 'consumer', to: 'government', label: 'Impuestos (caen)', color: '#dc2626', thickness: 1, speed: 4, description: 'Menos empleo = menos recaudación fiscal.' },
      { id: 'c8', from: 'government', to: 'consumer', label: 'Estímulo fiscal', color: '#7c3aed', thickness: 2, speed: 2.5, description: 'Gobierno intenta estimular con gasto público y extensión de seguro de desempleo.' },
    ],
  },
];
