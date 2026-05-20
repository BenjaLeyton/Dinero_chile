import Link from 'next/link';
import FloatingThemeToggle from '@/components/ui/FloatingThemeToggle';
import CircuitoChile from '@/components/learn/CircuitoChile';

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'section'; title: string }
  | { type: 'example'; title: string; text: string }
  | { type: 'case'; title: string; text: string; verdict?: string }
  | { type: 'keypoint'; text: string }
  | { type: 'diagram'; rows: string[] };

interface TopicData {
  title: string;
  intro: string;
  blocks: ContentBlock[];
}

const TOPIC_CONTENT: Record<string, TopicData> = {

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 1: ORIGEN DEL DINERO
  // ═══════════════════════════════════════════════════════════════
  origin: {
    title: 'Origen del Dinero',
    intro: 'El dinero no fue inventado — evolucionó durante miles de años para resolver un problema fundamental del comercio humano.',
    blocks: [
      { type: 'section', title: 'El problema del trueque' },
      { type: 'paragraph', text: 'Hace miles de años, las personas intercambiaban bienes directamente: trigo por carne, pieles por herramientas. Esto se llama trueque.' },
      { type: 'keypoint', text: 'El problema del trueque es la "doble coincidencia de deseos" — necesitas encontrar a alguien que tenga lo que quieres Y quiera lo que tienes. Si eres granjero y necesitas zapatos, tienes que encontrar un zapatero que necesite trigo. Si no lo encuentras, no hay intercambio.' },
      { type: 'example', title: 'Imagina un pueblo de 3 personas', text: 'Ana tiene trigo y quiere carne. Pedro tiene carne y quiere zapatos. María tiene zapatos y quiere trigo. Nadie puede intercambiar directamente con quien necesita — Ana no tiene lo que Pedro quiere. Necesitan un intermediario o hacer un trueque circular de 3 pasos. Esto es ineficiente y a veces imposible.' },

      { type: 'section', title: 'Dinero mercancía: la primera solución' },
      { type: 'paragraph', text: 'Para resolver esto, las sociedades comenzaron a usar bienes como medio de intercambio universal: conchas, sal, ganado, dientes de ballena. Esto es el dinero mercancía — un bien que todos aceptan porque tiene valor propio.' },
      { type: 'example', title: '¿Por qué la sal?', text: 'La sal era ideal: todos la necesitaban para conservar alimentos, era divisible (podías dar media bolsa), relativamente duradera, y escasa. La palabra "salario" viene del latín salarium — el pago en sal que recibían los soldados romanos.' },

      { type: 'section', title: 'Monedas: estandarización del valor' },
      { type: 'paragraph', text: 'Alrededor del 600 AC, el rey Aliates de Lidia (actual Turquía) acuñó las primeras monedas de electro (aleación de oro y plata), estandarizando el peso y valor. Ya no necesitabas pesar el metal cada vez — la moneda garantizaba su contenido.' },
      { type: 'paragraph', text: 'Las monedas resolvieron los problemas del dinero mercancía: eran duraderas (el metal no se pudre), divisibles (diferentes denominaciones), portátiles y con valor intrínseco.' },

      { type: 'section', title: '¿Pero cómo llegaron las monedas a la gente?' },
      { type: 'paragraph', text: 'No es que un día el rey repartió 100 monedas a cada campesino. Las monedas NO se distribuyeron — entraron a circular a través de la actividad económica real. Fue un proceso gradual que tomó décadas o siglos.' },
      { type: 'keypoint', text: 'El mecanismo principal fue el GASTO DEL ESTADO. El rey necesitaba un ejército, obras públicas, templos. Acuñaba monedas con el oro y plata de sus minas o de impuestos en metal, y las usaba para PAGAR a soldados, constructores y proveedores. Esos trabajadores luego gastaban las monedas en el mercado comprando comida, ropa, herramientas. Y así las monedas se esparcían por toda la economía.' },
      { type: 'diagram', rows: [
        'CÓMO SE DISTRIBUYERON LAS MONEDAS:',
        '',
        '1. EL REY ACUÑA MONEDAS',
        '   ├─ Usa oro/plata de minas reales o de tributos',
        '   ├─ Las monedas llevan su sello = garantía de peso',
        '   └─ Solo el Estado tenía derecho a acuñar',
        '',
        '2. EL ESTADO LAS GASTA',
        '   ├─ Paga soldados → el ejército era el mayor gasto',
        '   ├─ Paga constructores de templos, caminos, murallas',
        '   ├─ Compra suministros: armas, comida, caballos',
        '   └─ Paga a funcionarios y sacerdotes',
        '',
        '3. LOS TRABAJADORES LAS GASTAN',
        '   ├─ Soldado compra comida al granjero',
        '   ├─ Constructor compra ropa al artesano',
        '   └─ Las monedas llegan a comerciantes y campesinos',
        '',
        '4. EL REY LAS RECUPERA CON IMPUESTOS',
        '   ├─ Cobra tributos EN MONEDA (no en trigo)',
        '   ├─ Esto OBLIGA a todos a conseguir monedas',
        '   └─ El ciclo se repite continuamente',
      ]},
      { type: 'example', title: 'El truco de los impuestos', text: 'Cobrar impuestos en monedas fue la jugada clave. Si el rey te dice "págame 5 monedas de plata al año", tú NECESITAS conseguir esas monedas. ¿Cómo? Vendiendo tu trigo, tu trabajo o tus servicios a alguien que ya tenga monedas. Esto forzó a toda la economía a adoptar las monedas como medio de intercambio — no fue voluntario, fue obligatorio. No necesitabas que te "regalaran" monedas, necesitabas GANARLAS.' },
      { type: 'paragraph', text: 'También entraban monedas por el comercio entre regiones. Un mercader vendía aceite de oliva en otra ciudad y volvía con monedas extranjeras. Los cambistas (los primeros "banqueros") convertían monedas de un reino a otro. Y el saqueo militar: cuando un ejército ganaba una guerra, se llevaba el tesoro del enemigo y esas monedas entraban a su economía.' },
      { type: 'paragraph', text: 'Al principio, las monedas coexistieron con el trueque por mucho tiempo. Un campesino podía pagar al herrero con trigo la mayoría del año, pero necesitaba monedas para pagar impuestos al rey. Con el tiempo, la comodidad de las monedas hizo que se usaran para todo.' },

      { type: 'section', title: '¿Cómo se le pone precio a las cosas?' },
      { type: 'paragraph', text: 'Una vez que las monedas circulan, surge la pregunta más importante del comercio: ¿cuántas monedas vale esto? ¿Quién decide que un kilo de trigo vale 2 monedas y no 5? Nadie lo "decidió" — los precios nacieron de la negociación entre personas, y siguen funcionando igual hoy.' },

      { type: 'section', title: 'El precio básico: costo + tiempo + ganancia' },
      { type: 'paragraph', text: 'El punto de partida es simple. Si eres granjero y produces trigo, tu precio tiene que cubrir como mínimo lo que te costó producirlo: las semillas, el agua, las herramientas, y el tiempo que dedicaste (porque ese tiempo podrías haberlo usado en otra cosa). Si no cubres eso, trabajaste gratis o a pérdida.' },
      { type: 'keypoint', text: 'Pero el costo no determina el precio — solo pone un PISO. Nadie va a vender por debajo de lo que le costó (al menos no por mucho tiempo). El precio real lo determina otra cosa: cuánto está dispuesto a pagar el comprador. Y eso depende de cuánto lo necesita y cuántas opciones tiene.' },
      { type: 'example', title: 'Agua en el desierto vs. agua en un río', text: 'Un vaso de agua cuesta casi nada de producir. Pero si estás en el desierto muriendo de sed, pagarías todo lo que tienes por ese vaso. El costo de producción es el mismo, pero el precio cambia radicalmente según la situación. Esto se llama oferta y demanda: cuando hay poca oferta y mucha demanda, el precio sube. Cuando hay mucha oferta y poca demanda, el precio baja.' },

      { type: 'section', title: 'La cadena de valor: cómo un producto se encarece' },
      { type: 'paragraph', text: 'Casi nada que compras lo hizo una sola persona. Los productos pasan por una CADENA de personas, y cada una agrega trabajo, riesgo o conveniencia. Cada eslabón sube el precio, aunque la materia prima original pueda costar casi nada.' },
      { type: 'diagram', rows: [
        'EJEMPLO: UNA TAZA DE CAFÉ DE $3.000',
        '',
        'AGRICULTOR (Colombia)',
        '├─ Costo: semillas, agua, tierra, trabajo',
        '├─ Vende 1 kg de granos por $2.000',
        '└─ Su ganancia: cubre costos + algo mínimo',
        '',
        'EXPORTADOR',
        '├─ Compra a $2.000/kg, vende a $4.500/kg',
        '├─ ¿Qué agrega? Recolección de muchas fincas,',
        '│  control de calidad, transporte al puerto,',
        '│  papeles de exportación, seguro de carga',
        '└─ Su ganancia: el servicio logístico',
        '',
        'IMPORTADOR / TOSTADOR (Chile)',
        '├─ Compra a $4.500/kg, vende a $12.000/kg',
        '├─ ¿Qué agrega? Importación, aranceles, bodega,',
        '│  tostado del grano (máquinas + energía),',
        '│  empaquetado, marca, distribución a tiendas',
        '└─ Su ganancia: transformar materia prima en producto',
        '',
        'CAFETERÍA',
        '├─ Compra a $12.000/kg, vende a $3.000 por TAZA',
        '│  (1 kg = ~50 tazas = $150.000 en ventas)',
        '├─ ¿Qué agrega? Local (arriendo), empleados,',
        '│  máquina espresso, leche, vasos, wifi,',
        '│  un lugar cómodo para sentarte, ubicación',
        '└─ Su ganancia: conveniencia + experiencia',
        '',
        'RESUMEN: granos $2.000/kg → taza $3.000',
        'El café subió 75x de precio del campo a tu mano',
        'Cada eslabón cobró por el VALOR QUE AGREGÓ',
      ]},
      { type: 'keypoint', text: 'El agricultor que sembró el café recibe una fracción mínima de lo que tú pagas. No es porque su trabajo valga poco — es porque entre él y tú hay 3 o 4 intermediarios, cada uno agregando algo (transporte, transformación, ubicación, conveniencia). El precio final refleja TODO el trabajo acumulado de la cadena, no solo la materia prima.' },

      { type: 'section', title: 'Cuando el costo real es casi CERO' },
      { type: 'paragraph', text: 'El caso más extremo es cuando la materia prima es prácticamente gratis, pero el producto final cuesta mucho. Esto pasa especialmente con servicios y productos digitales.' },
      { type: 'example', title: 'Un corte de pelo de $15.000', text: 'El costo de los materiales es casi nada: un poco de electricidad para la máquina, una gota de shampoo, desgaste de las tijeras. ¿Entonces por qué cuesta $15.000? Porque no estás pagando por los materiales — estás pagando por la HABILIDAD del peluquero (años aprendiendo), su TIEMPO (30 minutos dedicados solo a ti), el ARRIENDO del local, y la CONVENIENCIA de tener un lugar donde cortarte el pelo. Si el costo del material fuera el precio, un corte costaría $50.' },
      { type: 'example', title: 'Software: costo marginal $0', text: 'A Netflix le cuesta millones crear una serie. Pero una vez creada, enviártela cuesta fracciones de centavo (es solo datos por internet). El costo de producir la "primera copia" es enorme, pero cada copia adicional es casi gratis. Por eso los productos digitales tienen márgenes altísimos — el costo no escala con la cantidad de clientes.' },
      { type: 'example', title: 'Una botella de agua de $1.000', text: 'El agua sale de la tierra gratis. Pero alguien la filtró, la embotelló, la transportó hasta la tienda, pagó el envase plástico, pagó empleados, pagó arriendo de la fábrica, y la tienda necesita su margen. Todo eso transforma algo gratis en un producto de $1.000. Y si esa misma botella la vendes en un concierto donde no hay otra opción, puede costar $3.000 — mismo producto, diferente contexto.' },

      { type: 'section', title: '¿Quién decide el precio final?' },
      { type: 'paragraph', text: 'Nadie "decide" los precios en una economía libre. Los precios emergen del equilibrio entre lo que los vendedores necesitan cobrar para que les convenga vender, y lo que los compradores están dispuestos a pagar. Si cobras demasiado, nadie compra y quiebras. Si cobras muy poco, no cubres costos y también quiebras.' },
      { type: 'diagram', rows: [
        'LOS 4 FACTORES QUE DETERMINAN UN PRECIO:',
        '',
        '1. COSTO DE PRODUCCIÓN (el piso)',
        '   └─ Materiales + trabajo + tiempo + energía',
        '      Si vendes por debajo de esto, pierdes dinero',
        '',
        '2. OFERTA Y DEMANDA (la fuerza principal)',
        '   ├─ Muchos quieren + pocos venden = precio sube',
        '   ├─ Pocos quieren + muchos venden = precio baja',
        '   └─ Ejemplo: las frutas en temporada son baratas',
        '      porque hay mucha oferta',
        '',
        '3. COMPETENCIA (el techo)',
        '   ├─ Si hay 10 panaderías, ninguna puede cobrar',
        '   │  el triple — la gente va a otra',
        '   ├─ Si hay 1 sola (monopolio), cobra lo que quiere',
        '   └─ La competencia PROTEGE al consumidor',
        '',
        '4. PERCEPCIÓN DE VALOR (el multiplicador)',
        '   ├─ Un café en Starbucks vs. un café de máquina',
        '   │  — mismo café, precio 5x diferente',
        '   ├─ Marca, experiencia, estatus, confianza',
        '   └─ La gente paga más por lo que PERCIBE como',
        '      mejor, aunque objetivamente sea igual',
      ]},
      { type: 'keypoint', text: 'El precio de algo NO tiene que ver con lo que "debería" valer o con lo que es "justo". Tiene que ver con lo que alguien está dispuesto a pagar en un momento dado. Un diamante es caro no porque sea útil (no lo es), sino porque es escaso y la gente lo desea. El agua es barata no porque no sea importante (es vital), sino porque hay mucha. La utilidad real y el precio son cosas completamente distintas.' },

      { type: 'section', title: 'Papel moneda y la era moderna' },
      { type: 'paragraph', text: 'En China (700 DC) aparece el primer papel moneda, respaldado por depósitos de monedas en bancos. En 1694 se funda el Banco de Inglaterra, uno de los primeros bancos centrales modernos.' },
      { type: 'keypoint', text: 'En 1971, Nixon abandona el patrón oro. Desde entonces, el dinero es "fiat" — su valor viene de la confianza en el gobierno y las instituciones, no del respaldo en metal. Un billete de $100 vale $100 porque todos aceptamos que vale eso.' },
      { type: 'paragraph', text: 'En 2009 nace Bitcoin, la primera criptomoneda, proponiendo un sistema monetario descentralizado sin banco central. El debate sobre qué es "dinero real" sigue abierto.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 2: PATRÓN ORO
  // ═══════════════════════════════════════════════════════════════
  'gold-standard': {
    title: 'El Patrón Oro',
    intro: 'Durante siglos, el dinero estuvo respaldado por oro físico. Entender por qué se abandonó — y a quién le convino — es clave para entender el sistema actual.',
    blocks: [
      { type: 'section', title: 'Del oro a la deuda: ¿cómo pasamos de un sistema al otro?' },
      { type: 'paragraph', text: 'Mucha gente piensa que primero existía el patrón oro (dinero respaldado por metal), y que un día se "apagó" y se "encendió" el sistema de deuda. Que la gente traspasó su oro a billetes y recién ahí empezaron los préstamos. Eso NO es lo que pasó.' },

      { type: 'keypoint', text: 'Los bancos ya creaban dinero con préstamos DURANTE el patrón oro. La banca fraccionaria existe desde los años 1600. El patrón oro no impedía los préstamos — solo ponía un TECHO a cuánto dinero podía existir en total (porque todo debía tener respaldo en oro). Cuando se eliminó el patrón oro, no "empezó" el sistema de deuda. Solo se le quitó el techo.' },

      { type: 'diagram', rows: [
        'LA TRANSICIÓN REAL (no fue un switch):',
        '',
        '1600s-1800s: PATRÓN ORO + BANCA FRACCIONARIA',
        '├─ Los bancos YA prestaban más de lo que tenían',
        '├─ Pero cada billete debía tener respaldo en oro',
        '├─ Si un banco prestaba demasiado → no tenía oro',
        '│  suficiente → quiebra (pasaba seguido)',
        '└─ El oro era el FRENO del sistema',
        '',
        '1944: BRETTON WOODS',
        '├─ Todas las monedas se fijan al dólar',
        '├─ El dólar se fija al oro ($35 por onza)',
        '├─ Los bancos siguen prestando y creando dinero',
        '└─ Pero EE.UU. debe tener oro para respaldar cada dólar',
        '',
        '1971: NIXON CORTA EL VÍNCULO CON EL ORO',
        '├─ El dólar ya NO se puede cambiar por oro',
        '├─ Las monedas del mundo "flotan" libremente',
        '├─ Para la gente común: nada cambia de un día a otro',
        '│  (tu dólar sigue siendo un dólar)',
        '└─ Lo que cambia: ya NO hay techo de oro',
        '   → Los bancos centrales pueden crear sin límite físico',
        '   → Los bancos comerciales pueden prestar más libremente',
        '',
        '2024: SISTEMA ACTUAL',
        '├─ 90% del dinero = creado por préstamos bancarios',
        '├─ 10% del dinero = creado por el banco central',
        '├─ El freno ya no es el oro sino la TASA DE INTERÉS',
        '└─ Y la supervisión del regulador financiero',
      ]},

      { type: 'section', title: '¿Cuál era el problema del patrón oro? — El debate real' },
      { type: 'paragraph', text: 'Si el patrón oro ponía un freno a la impresión de dinero y evitaba que los gobiernos gastaran de más, ¿por qué lo abandonaron? Hay una versión oficial — y hay una versión más incómoda. Veamos las dos.' },

      { type: 'section', title: 'Lo que dicen los libros de texto...' },

      { type: 'example', title: 'Argumento oficial #1: "La deflación destruye la economía"', text: 'Si la población crece 3% al año pero el oro crece 1%, hay más personas peleando por el mismo dinero. Los precios bajan (deflación). Los economistas dicen que la gente deja de gastar esperando que todo baje más, y eso hunde la economía.' },
      { type: 'keypoint', text: 'Contraargumento: La gente tiene que COMER. Tiene que pagar arriendo, vestirse, moverse. Nadie deja de comprar comida porque "quizás mañana baje $50". La deflación afecta las compras grandes y de lujo (autos, casas, tecnología), pero el consumo básico — que es la mayor parte de la economía — sigue igual. Además, la tecnología SIEMPRE causa deflación: los computadores, los celulares, la ropa — todo baja de precio con el tiempo y la gente sigue comprando. La deflación no es el monstruo que pintan.' },

      { type: 'example', title: 'Argumento oficial #2: "Las crisis bancarias eran constantes"', text: 'Los bancos prestaban más de lo que tenían en oro (reserva fraccionaria). Cuando la gente corría a retirar, el banco no tenía suficiente y quebraba. Pánicos en EE.UU.: 1819, 1837, 1857, 1873, 1893, 1907.' },
      { type: 'keypoint', text: 'Contraargumento: Las crisis eran culpa de los BANCOS, no del oro. Si un banco presta dinero que no tiene, está haciendo algo que en cualquier otro negocio sería fraude. Si tú vendes 10 autos pero solo tienes 1, vas preso. Pero un banco puede "prestar" $900 que no tiene y eso es legal. Los bank runs no eran un fallo del patrón oro — eran la consecuencia natural de un sistema donde los bancos prestaban lo que no tenían. El oro simplemente hacía visible la mentira.' },

      { type: 'example', title: 'Argumento oficial #3: "No puedes responder a emergencias"', text: 'Guerra, pandemia, terremoto — necesitas gastar MUCHO dinero AHORA. Con patrón oro, solo puedes gastar lo que tienes en la bóveda.' },
      { type: 'keypoint', text: 'Contraargumento: Eso se llama ser RESPONSABLE. Una familia responsable tiene ahorros para emergencias. ¿Por qué un gobierno no? Si un país no tiene reservas para una crisis, el problema no es el patrón oro — es que el gobierno ya se gastó todo. Además, "necesitamos imprimir para la emergencia" es exactamente la excusa que usan TODOS los gobiernos que terminan en hiperinflación. Venezuela, Argentina, Zimbabwe — todos empezaron diciendo "es temporal, es una emergencia".' },

      { type: 'example', title: 'Argumento oficial #4: "Los países sin oro quedan en desventaja"', text: 'Si tu país no tiene minas de oro, tu economía depende de que alguien te lo venda. La geografía determina la riqueza.' },
      { type: 'keypoint', text: 'Contraargumento: La riqueza nunca dependió solo del oro. Los países árabes son los más ricos del mundo y no es por oro — es por PETRÓLEO. Chile creció con cobre. Brasil con agricultura. Japón no tiene casi ningún recurso natural y fue la segunda economía del mundo. Un país puede respaldar su moneda con cualquier recurso valioso, no solo oro. El argumento de "necesitas oro" ignora que la economía real se construye con producción, no con un metal específico.' },

      { type: 'section', title: '...Y lo que no dicen los libros de texto' },
      { type: 'paragraph', text: '¿A quién le conviene que no exista patrón oro? A los gobiernos. Con patrón oro, un gobierno NO PUEDE gastar más de lo que tiene. No puede financiar guerras infinitas, no puede regalar plata antes de las elecciones, no puede tapar sus errores imprimiendo. El patrón oro era una CADENA que limitaba el poder del gobierno sobre el dinero de la gente.' },

      { type: 'diagram', rows: [
        'CON PATRÓN ORO:',
        '├─ Gobierno quiere gastar → necesita oro real',
        '├─ No tiene oro → no puede gastar → tiene que ser eficiente',
        '├─ Los ciudadanos saben que su dinero vale algo tangible',
        '└─ El gobierno NO puede diluir tus ahorros imprimiendo',
        '',
        'SIN PATRÓN ORO (hoy):',
        '├─ Gobierno quiere gastar → le pide al BC que imprima',
        '├─ BC imprime → hay más dinero → los precios suben',
        '├─ Tus $100,000 ahorrados ahora compran menos',
        '├─ El gobierno gastó, pero TÚ pagaste (vía inflación)',
        '└─ La inflación es un IMPUESTO INVISIBLE',
      ]},

      { type: 'keypoint', text: 'La inflación es el impuesto más injusto que existe. No lo vota nadie, no aparece en tu boleta de impuestos, y castiga más a los pobres (que guardan su plata en efectivo) que a los ricos (que la tienen en propiedades y acciones que suben con la inflación). Cada vez que un gobierno "imprime dinero", está sacándole valor a la plata que tú ya tenías. Abandonar el patrón oro les dio a los gobiernos el poder de hacer esto sin pedirle permiso a nadie.' },

      { type: 'case', title: 'Nixon en 1971: ¿necesidad o conveniencia?', text: 'La historia oficial dice que Nixon "tuvo que" abandonar el patrón oro porque EE.UU. no tenía suficiente oro para respaldar todos los dólares que había impreso. Pero ¿por qué había impreso tantos dólares? Para financiar la Guerra de Vietnam y los programas sociales de los años 60. Es decir: el gobierno gastó de más, imprimió de más, y cuando el oro no alcanzó para cubrir la mentira, en vez de dejar de gastar, eliminó la restricción. Es como si te gastas toda tu tarjeta de crédito y en vez de dejar de gastar, llamas al banco para que te suba el límite infinitamente.', verdict: 'El patrón oro no falló — los gobiernos fallaron en respetarlo. Y en vez de disciplinarse, eliminaron la regla que los limitaba.' },

      { type: 'section', title: 'Entonces, ¿quién tiene razón?' },
      { type: 'paragraph', text: 'La verdad es que ambos lados tienen puntos válidos. El patrón oro SÍ tenía limitaciones reales (rigidez, dificultad para crecer). Pero también es cierto que abandonarlo le dio a los gobiernos un poder que han abusado una y otra vez. La pregunta no es si el patrón oro era perfecto — no lo era. La pregunta es si el sistema actual es MEJOR para la gente común.' },

      { type: 'diagram', rows: [
        'EL MARCADOR DESDE 1971 (fin del patrón oro):',
        '',
        '✓ Más crecimiento económico global',
        '✓ Más flexibilidad ante crisis',
        '✓ Más herramientas para los bancos centrales',
        '',
        '✗ Inflación constante en TODOS los países',
        '✗ El dólar perdió +95% de su poder adquisitivo desde 1971',
        '✗ Crisis financieras más grandes (2008 > cualquier pánico del s.XIX)',
        '✗ Deuda global en niveles récord histórico',
        '✗ Desigualdad creciente (ricos compran activos, pobres guardan cash)',
        '✗ Gobiernos gastan sin consecuencias inmediatas',
        '',
        '¿Quién ganó? Los gobiernos y los bancos.',
        '¿Quién perdió? El poder adquisitivo de la gente común.',
      ]},

      { type: 'keypoint', text: 'No hay respuesta "correcta" en este debate. Lo que sí es un hecho: desde que se abandonó el patrón oro, los gobiernos han impreso más dinero que en toda la historia de la humanidad combinada. Algunos dicen que eso permitió el progreso. Otros dicen que es el mayor robo silencioso de la historia. Probablemente ambos tengan razón. Lo importante es que entiendas el mecanismo — porque la inflación que comes tú todos los días tiene su origen directo en esta decisión de 1971.' },

      { type: 'section', title: 'Préstamos con patrón oro vs préstamos hoy — la diferencia real' },
      { type: 'paragraph', text: 'Con patrón oro los bancos también prestaban. También hacían reserva fraccionaria. También creaban dinero con crédito. Entonces, ¿cuál es la diferencia con hoy? La diferencia no es SI prestan — es qué pasa cuando se pasan.' },

      { type: 'diagram', rows: [
        'PRÉSTAMOS CON PATRÓN ORO:',
        '',
        'Un banco tiene 100 monedas de oro en su bóveda.',
        'Presta 900 en "recibos de papel" (billetes).',
        '(Reserva fraccionaria: solo guarda 10% real)',
        '',
        '── Si todo sale bien: ──',
        'Los deudores pagan → el banco gana intereses',
        'Igual que hoy. Sin diferencia.',
        '',
        '── Si el banco se pasa y presta 2,000: ──',
        'Alguien sospecha → corre a cambiar billetes por oro',
        'Otros lo siguen → "bank run"',
        'El banco solo tiene 100 monedas para 2,000 en billetes',
        '→ QUIEBRA. Se acabó. Cierra.',
        '',
        'No hay rescate. No hay "imprimir más oro".',
        'El oro es FÍSICO — no puedes inventarlo.',
        'El banco irresponsable MUERE.',
        'Los bancos responsables sobreviven.',
        'La selección natural funciona.',
      ]},

      { type: 'diagram', rows: [
        'PRÉSTAMOS HOY (sin patrón oro):',
        '',
        'Un banco tiene $100M en reservas digitales del BC.',
        'Presta $900M escribiendo números en cuentas.',
        '(Misma reserva fraccionaria)',
        '',
        '── Si todo sale bien: ──',
        'Los deudores pagan → el banco gana intereses',
        'Igual que antes. Sin diferencia.',
        '',
        '── Si el banco se pasa y presta $2,000M: ──',
        'Los préstamos empiezan a fallar',
        'El banco se queda sin reservas',
        'Va al banco central: "necesito más reservas"',
        'El BC CREA reservas nuevas de la nada → se las da',
        '→ El banco SOBREVIVE.',
        '',
        'SÍ hay rescate. SÍ puedes "imprimir más".',
        'Las reservas son DIGITALES — las creas con un click.',
        'El banco irresponsable SOBREVIVE.',
        'No hay selección natural.',
        'La irresponsabilidad no tiene consecuencia.',
      ]},

      { type: 'keypoint', text: 'La diferencia NO es que antes no había préstamos y ahora sí. La diferencia es las CONSECUENCIAS. Con oro, el banco que se pasaba quebraba — y eso disciplinaba a todos los demás. Sin oro, el banco que se pasa es rescatado — y eso le enseña a todos que pueden pasarse sin consecuencias. El oro era un juez que no perdonaba. El sistema actual es un juez que siempre absuelve.' },

      { type: 'example', title: 'Piénsalo como un juego', text: 'Imagina un casino donde si ganas, te quedas con la plata. Pero si pierdes, el casino te devuelve todo lo que apostaste. ¿Cómo apostarías? AGRESIVAMENTE. Apostarías todo cada vez, porque no hay riesgo real. Eso es exactamente lo que hacen los bancos hoy. Pueden prestar agresivamente porque saben que si les va mal, el banco central los rescata. Con patrón oro el casino era real — si perdías, perdías. Y eso hacía que los jugadores fueran más cuidadosos.' },

      { type: 'diagram', rows: [
        'LO QUE CAMBIÓ REALMENTE EN 1971:',
        '',
        '              CON ORO          │         SIN ORO (hoy)',
        '─────────────────────────────────────────────────────────',
        'Préstamos     Sí, existían     │  Sí, existen',
        'Reserva frac. Sí, existía      │  Sí, existe',
        'Creación $    Sí, por crédito   │  Sí, por crédito',
        'Multiplicador Sí, funcionaba    │  Sí, funciona',
        '─────────────────────────────────────────────────────────',
        'Límite        ORO FÍSICO        │  La "voluntad" del BC',
        'Si banco falla QUIEBRA          │  RESCATE',
        'Si gob. gasta  Se le acaba $    │  Imprime más',
        'Inflación     Baja/nula         │  Constante',
        'Riesgo moral  Bajo (hay castigo)│  Alto (no hay castigo)',
        '─────────────────────────────────────────────────────────',
        '',
        'Todo lo de ARRIBA es igual.',
        'Todo lo de ABAJO es lo que cambió.',
        'Cambiaron las CONSECUENCIAS, no el mecanismo.',
      ]},

      { type: 'paragraph', text: 'En resumen: el sistema de préstamos es el mismo. El multiplicador es el mismo. La reserva fraccionaria es la misma. Lo que cambió es que antes había un límite FÍSICO e imposible de trucar (el oro), y ahora el límite es una decisión HUMANA que depende de la voluntad del banco central y la presión del gobierno. Y como vimos con Venezuela, Argentina y Turquía, la voluntad humana es mucho más fácil de corromper que una bóveda de oro.' },

      { type: 'section', title: 'La transición: del oro a los billetes' },
      { type: 'example', title: '¿Y la gente que tenía oro?', text: 'Nadie le "quitó" el oro a la gente para dárselo en billetes. Lo que pasó fue gradual. Durante siglos, la gente fue depositando su oro en bancos a cambio de recibos de papel (los primeros billetes). Esos recibos eran más fáciles de cargar que lingotes. Con el tiempo, la gente dejó de usar oro directamente y solo usaba los papeles. Los bancos tenían el oro en bóvedas y emitían papeles. Cuando Nixon cortó el vínculo en 1971, esos papeles simplemente dejaron de ser "canjeables por oro" — pero ya nadie los canjeaba. El oro pasó a ser una inversión (como comprar acciones), no dinero. Tu billetera ya no tiene nada que ver con una bóveda de oro.' },

      { type: 'example', title: 'Lo que sí cambió para siempre', text: 'Con el patrón oro, si un gobierno gastaba demasiado, eventualmente se le acababa el oro y tenía que parar. Era un freno automático (incómodo, pero efectivo). Sin patrón oro, un gobierno puede gastar indefinidamente pidiendo al banco central que imprima más. El único freno ahora es la INFLACIÓN — si imprimes demasiado, los precios suben y la gente sufre. Pero ese freno es más lento y más fácil de ignorar que quedarse sin oro en la bóveda.' },

      { type: 'keypoint', text: 'El sistema de deuda no "reemplazó" al patrón oro — ya existía dentro de él. El patrón oro era como una correa que limitaba cuánto podían prestar los bancos. En 1971 se cortó esa correa. Los bancos siguieron haciendo lo mismo (crear dinero con préstamos), pero ahora sin un límite físico. El resultado: la cantidad de dinero en el mundo se multiplicó exponencialmente desde 1971. Más crecimiento, pero también más riesgo de crisis.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 3: CREACIÓN DEL DINERO
  // ═══════════════════════════════════════════════════════════════
  creation: {
    title: 'Creación del Dinero',
    intro: 'La mayoría de la gente piensa que el gobierno o el banco central "imprimen" todo el dinero. La realidad es mucho más interesante — y más peligrosa.',
    blocks: [
      { type: 'section', title: '¿El banco central imprime dinero? Sí y no.' },
      { type: 'keypoint', text: 'El banco central SÍ crea dinero — pero no el dinero que usas tú. Crea lo que se llama "base monetaria" o "dinero de alta potencia": los billetes físicos y las reservas digitales que los bancos comerciales guardan en sus cuentas del banco central. Este dinero es como la semilla. Los bancos comerciales son los que plantan esa semilla y la multiplican.' },
      { type: 'paragraph', text: 'Piénsalo así: el Banco Central de Chile (o la Fed en EE.UU.) decide "voy a crear $1,000 millones de base monetaria". Pero esos $1,000 millones NO van a tu bolsillo ni al supermercado. Van a las cuentas de reserva de los bancos comerciales (BancoEstado, Santander, BCI, etc.). Esos bancos luego usan esas reservas para dar préstamos — y ahí es donde realmente se "crea" el dinero que tú usas.' },

      { type: 'diagram', rows: [
        '¿QUIÉN CREA QUÉ?',
        '',
        'BANCO CENTRAL (ej: Banco Central de Chile):',
        '├─ Imprime billetes físicos (los que ves en tu billetera)',
        '├─ Crea reservas digitales (dinero que solo ven los bancos)',
        '├─ Esto es el ~10% del dinero total',
        '└─ Se llama M0 o "base monetaria"',
        '',
        'BANCOS COMERCIALES (ej: BancoEstado, Santander, BCI):',
        '├─ Crean dinero cada vez que hacen un préstamo',
        '├─ Escriben un número en tu cuenta → dinero nuevo',
        '├─ Esto es el ~90% del dinero total',
        '└─ Se llama M1/M2 (depósitos + crédito)',
        '',
        'TÚ usas el dinero M1/M2, no el M0.',
      ]},

      { type: 'section', title: '¿Los bancos comerciales usan el dinero del banco central?' },
      { type: 'paragraph', text: 'Sí, pero no como piensas. Los bancos comerciales NO reciben plata del banco central y la reparten. Lo que reciben son reservas — dinero que queda en sus cuentas del banco central y que sirve como respaldo. Es como un colchón de seguridad.' },
      { type: 'example', title: 'Cómo funciona en la práctica', text: 'Santander tiene $100 millones en reservas en el Banco Central de Chile. Con un requisito de reserva del 10%, puede prestar hasta $900 millones a sus clientes. ¿De dónde salen esos $900 millones? Los crea Santander. Literalmente escribe números en las cuentas de las personas cuando les da un crédito. No necesita que el Banco Central le "dé" esos $900 millones — los crea de la nada, respaldados por sus $100 millones de reserva.' },
      { type: 'keypoint', text: 'El banco central NO decide a qué banco darle dinero para prestar. Todos los bancos con licencia tienen acceso a las facilidades del banco central. Lo que el banco central controla es el PRECIO de ese acceso (la tasa de interés) y las REGLAS (cuánta reserva deben mantener). Los bancos comerciales deciden a quién prestar y cuánto — esa es su decisión, no del banco central.' },

      { type: 'section', title: '¿Los bancos comerciales pueden imprimir su propio dinero?' },
      { type: 'paragraph', text: 'No pueden imprimir billetes — eso solo lo hace el banco central. Pero SÍ crean dinero digital cada vez que hacen un préstamo. Y la cantidad que pueden crear tiene límites, aunque no son tan estrictos como parecen:' },

      { type: 'diagram', rows: [
        'LÍMITES A LA CREACIÓN DE DINERO POR BANCOS COMERCIALES:',
        '',
        '1. Requisito de reserva ─→ Deben guardar % de depósitos',
        '2. Ratio de capital ────→ Deben tener capital propio mínimo',
        '3. Tasa de interés ────→ Si es alta, menos gente pide crédito',
        '4. Supervisión (CMF) ──→ El regulador revisa sus libros',
        '5. Demanda de crédito ─→ Alguien tiene que querer el préstamo',
        '',
        'Si todos estos límites se respetan: sistema estable',
        'Si alguno falla: crisis financiera',
      ]},

      { type: 'paragraph', text: 'En teoría, un banco comercial no puede prestar infinitamente. En la práctica, los límites son más flojos de lo que parecen. Un banco grande y agresivo puede prestar mucho más de lo prudente, y el banco central solo se entera cuando ya es tarde — como pasó en 2008.' },

      { type: 'section', title: 'El multiplicador monetario' },
      { type: 'paragraph', text: 'El mecanismo por el cual los bancos multiplican el dinero se llama reserva fraccionaria. El banco solo necesita mantener una fracción de los depósitos como reserva. El resto lo puede prestar.' },
      { type: 'diagram', rows: [
        'Depósito inicial:     $1,000',
        'Reserva (10%):          -$100  → El banco guarda',
        'Préstamo:               $900  → Se deposita en otro banco',
        '',
        'Segundo banco recibe:   $900',
        'Reserva (10%):           -$90  → Guarda',
        'Préstamo:               $810  → Se deposita en otro banco',
        '',
        'Tercer banco recibe:    $810',
        'Reserva (10%):           -$81  → Guarda',
        'Préstamo:               $729  → Y así sucesivamente...',
        '',
        '═══════════════════════════════════════',
        'Total creado:       hasta $10,000',
        'De un depósito de:        $1,000',
        'Multiplicador:              10x',
      ]},
      { type: 'keypoint', text: 'El multiplicador monetario teórico es 1 ÷ ratio_de_reserva. Con 10% de reserva, $1,000 pueden convertirse en hasta $10,000 de dinero circulando en la economía. El banco central controla este multiplicador ajustando el requisito de reserva.' },

      { type: 'section', title: '¿Cómo controla el banco central la creación de dinero?' },
      { type: 'paragraph', text: 'El banco central no puede prohibir directamente a los bancos comerciales crear dinero — es parte esencial de cómo funciona la economía. Pero tiene herramientas poderosas para influir cuánto dinero crean:' },

      { type: 'example', title: '1. Tasa de interés de referencia (TPM)', text: 'El banco central fija la Tasa de Política Monetaria (TPM). Es la tasa a la que presta dinero a los bancos comerciales. Si la sube al 8%, los bancos necesitan cobrar más (digamos 12%) a sus clientes para ganar margen. A ese precio, menos personas piden préstamos → se crea menos dinero. Si la baja al 2%, los préstamos son baratos → más gente pide → se crea más dinero. Es como abrir o cerrar la llave del agua.' },

      { type: 'example', title: '2. Requisitos de reserva', text: 'El banco central puede exigir que los bancos guarden más dinero en reserva. Si el requisito sube del 10% al 20%, el multiplicador baja de 10x a 5x — los bancos solo pueden crear la mitad del dinero. Es una herramienta directa pero se usa poco porque es muy disruptiva.' },

      { type: 'example', title: '3. Operaciones de mercado abierto', text: 'El banco central compra o vende bonos del gobierno. Pero ojo: hay DOS tipos de operaciones con bonos y funcionan de forma muy diferente. No es lo mismo que el gobierno le venda un bono al banco central que a un banco comercial.' },

      { type: 'diagram', rows: [
        'PRIMERO: ¿QUÉ ES UN BONO?',
        '',
        'Un bono es un PAGARÉ. Quien lo emite dice:',
        '"Dame $1.000 hoy y en 1 año te devuelvo $1.050"',
        'Ese $50 extra es el INTERÉS — tu ganancia por prestar.',
        'El gobierno emite bonos cuando necesita plata.',
        'Es literalmente pedir prestado.',
      ]},

      { type: 'section', title: 'CASO 1: El gobierno le vende bonos a un BANCO COMERCIAL' },
      { type: 'paragraph', text: 'Esto es lo más común y pasa todos los días. El gobierno necesita dinero (para pagar sueldos públicos, construir carreteras, financiar hospitales) y no le alcanza con los impuestos. Entonces emite bonos y los vende en subastas donde participan bancos comerciales, fondos de pensiones, aseguradoras, etc.' },
      { type: 'diagram', rows: [
        'EJEMPLO: El gobierno de Chile necesita $10.000M',
        '',
        'Paso 1: Hacienda emite bonos por $10.000M',
        '        "Préstame $10.000M, te pago 5% anual"',
        '',
        'Paso 2: Banco Santander compra $10.000M en bonos',
        '        ├─ Santander transfiere $10.000M AL GOBIERNO',
        '        ├─ Recibe bonos (pagarés) que dicen:',
        '        │  "Te pagaremos $10.500M en 1 año"',
        '        └─ Santander tiene $10.000M MENOS en caja',
        '',
        'Paso 3: El gobierno GASTA ese dinero',
        '        ├─ Paga sueldos de funcionarios',
        '        ├─ Construye un hospital',
        '        ├─ Paga pensiones',
        '        └─ Ese dinero vuelve a circular en la economía',
        '',
        'Paso 4: En 1 año, el gobierno le paga a Santander',
        '        ├─ Los $10.000M originales + $500M de interés',
        '        └─ ¿De dónde sale esa plata? De los impuestos',
        '           que cobró durante el año (o de emitir más bonos)',
      ]},
      { type: 'keypoint', text: 'Lo importante: aquí NO se crea dinero nuevo. El dinero ya existía en Santander, se mueve al gobierno, el gobierno lo gasta, y vuelve a circular. Es una transferencia de dinero existente. El banco comercial gana intereses, el gobierno consigue financiamiento. Así se financia la mayoría del gasto público en el mundo.' },

      { type: 'section', title: 'CASO 2: El banco central compra bonos a un banco comercial' },
      { type: 'paragraph', text: 'Esto es la "operación de mercado abierto" propiamente dicha — la herramienta principal del banco central para controlar cuánto dinero hay en la economía. Aquí SÍ se crea o destruye dinero.' },
      { type: 'diagram', rows: [
        'SITUACIÓN: La economía está lenta, nadie gasta.',
        'El BC quiere INYECTAR dinero para reactivarla.',
        '',
        'Santander tiene $500M en bonos del gobierno',
        '(los compró antes, está esperando cobrarlos)',
        '',
        'El BC le dice: "Te compro esos bonos"',
        '├─ Santander entrega $500M en bonos (pagarés)',
        '├─ El BC le deposita $500M en dinero NUEVO',
        '│  ← AQUÍ ESTÁ LA MAGIA: este dinero NO existía',
        '│  El BC lo crea de la nada con un teclazo',
        '│  (es el único que puede hacer esto legalmente)',
        '├─ Santander ahora tiene $500M extra en reservas',
        '├─ Con reserva fraccionaria del 10%, puede prestar',
        '│  hasta $5.000M con esos $500M nuevos',
        '└─ Resultado: entran hasta $5.000M nuevos',
        '   a la economía → más consumo → reactivación',
        '',
        '═══════════════════════════════════════════',
        '',
        'SITUACIÓN OPUESTA: Hay mucha inflación.',
        'El BC quiere SACAR dinero para enfriar la economía.',
        '',
        'El BC le dice a Santander: "Cómprame estos bonos"',
        '├─ Santander entrega $500M en efectivo al BC',
        '├─ El BC le da $500M en bonos a cambio',
        '├─ Santander ahora tiene $500M MENOS en reservas',
        '├─ Puede prestar menos → menos dinero circulando',
        '└─ Los $500M que el BC recibió DESAPARECEN',
        '   ← El BC destruye ese dinero, lo saca de existencia',
        '   (así como lo creó de la nada, lo destruye)',
      ]},
      { type: 'keypoint', text: 'La diferencia es enorme: cuando un banco comercial compra bonos del gobierno, MUEVE dinero que ya existe. Cuando el banco central compra bonos a un banco comercial, CREA dinero nuevo que no existía. Y cuando el BC vende bonos, DESTRUYE dinero. El BC es la única entidad en la economía con este poder.' },

      { type: 'section', title: '¿Cuál se usa más?' },
      { type: 'diagram', rows: [
        'CASO 1: GOBIERNO → BANCO COMERCIAL',
        '├─ Se usa TODOS LOS DÍAS',
        '├─ Es la forma normal de financiar al gobierno',
        '├─ Los bonos se subastan semanalmente',
        '├─ No crea dinero nuevo, solo lo redistribuye',
        '├─ Participan: bancos, fondos de pensiones,',
        '│  aseguradoras, inversores extranjeros, personas',
        '└─ Ejemplo: Chile subasta bonos del Tesoro cada',
        '   semana. EE.UU. emite trillones al año.',
        '',
        'CASO 2: BANCO CENTRAL → BANCO COMERCIAL',
        '├─ Se usa como HERRAMIENTA de política monetaria',
        '├─ El BC compra/vende según necesite inyectar',
        '│  o retirar dinero de la economía',
        '├─ En tiempos normales: operaciones moderadas',
        '├─ En crisis: operaciones MASIVAS',
        '│  (la Fed compró $4.5 TRILLONES en bonos',
        '│   entre 2008-2014 para salvar la economía)',
        '├─ SÍ crea/destruye dinero',
        '└─ Solo participa el BC como comprador/vendedor',
        '',
        'AMBOS se usan siempre, pero para cosas distintas:',
        '├─ Caso 1 = FINANCIAR al gobierno (necesidad fiscal)',
        '└─ Caso 2 = CONTROLAR el dinero (política monetaria)',
      ]},

      { type: 'example', title: '¿Puede el BC comprarle bonos DIRECTAMENTE al gobierno?', text: 'En la mayoría de los países, NO. Está prohibido. Si el gobierno pudiera venderle bonos directamente al banco central, sería lo mismo que imprimir dinero para financiar su gasto — inflación garantizada. Por eso el gobierno vende bonos al mercado (bancos, fondos, personas), y el BC compra esos mismos bonos DESPUÉS en el mercado secundario. Es una diferencia técnica pero crucial: el gobierno no puede obligar al BC a financiarlo directamente. En la práctica, algunos gobiernos encuentran formas de presionar al BC para que compre sus bonos indirectamente — y eso es exactamente lo que causa hiperinflación en países como Venezuela y Argentina.' },

      { type: 'example', title: '4. "Forward guidance" (comunicación)', text: 'El banco central anuncia públicamente sus intenciones futuras. Si dice "vamos a subir la tasa en 3 meses", los bancos empiezan a ajustar su comportamiento de inmediato, antes de que la tasa cambie. Las palabras del presidente del banco central mueven mercados.' },

      { type: 'example', title: '5. Tasa de descuento (prestamista de última instancia)', text: 'Los bancos a veces necesitan pedir prestado al banco central cuando les falta liquidez. La tasa de descuento es lo que les cobra. Si es muy alta, los bancos son más cuidadosos con sus préstamos. Si es baja, asumen más riesgos porque saben que tienen un respaldo barato.' },

      { type: 'section', title: 'Fintechs y banca sombra: ¿Tenpo, Mercado Pago y las apps crean dinero?' },
      { type: 'paragraph', text: 'Aquí es donde la cosa se pone interesante. Hay empresas que se parecen a un banco — te guardan plata, te dejan pagar, algunas hasta te prestan — pero NO son bancos. Se llaman fintechs, y operan en una zona gris.' },

      { type: 'example', title: '¿Qué es Tenpo?', text: 'Tenpo es un emisor de tarjetas de prepago regulado por la CMF (Comisión para el Mercado Financiero) en Chile. NO es un banco. La diferencia clave: cuando depositas plata en Tenpo, Tenpo no puede prestar esa plata a otra persona. No tiene licencia bancaria, así que no puede hacer reserva fraccionaria. Tu plata queda ahí, guardada. Tenpo NO crea dinero nuevo — solo mueve el que ya existe.' },

      { type: 'keypoint', text: 'Tenpo NO es banca sombra y NO puede crear dinero infinito. No tiene licencia para dar préstamos con los depósitos de sus usuarios. Si quiere ofrecer crédito (como la "Línea Tenpo"), lo hace con capital propio o con dinero que pide prestado a otras instituciones — no con TU plata. El banco central y la CMF supervisan esto.' },

      { type: 'example', title: '¿Y Mercado Pago? ¿Y las apps de crédito?', text: 'Mercado Pago opera similar: es una institución de pago, no un banco. Pero las apps que te ofrecen "crédito rápido" son más complicadas. Algunas fintechs de crédito operan sin supervisión bancaria directa. Prestan dinero que consiguen de inversores, no de depósitos. No están sujetas a requisitos de reserva del banco central. Técnicamente, cada préstamo que dan sí inyecta dinero nuevo en la economía — pero a escala mucho menor que un banco.' },

      { type: 'paragraph', text: 'La pregunta real es: ¿pueden las fintechs de crédito dar préstamos sin límite? En teoría no — están limitadas por el capital que consigan de inversores. Pero la regulación es más laxa que para un banco. Si muchas fintechs dan préstamos agresivamente al mismo tiempo, el efecto acumulado puede ser significativo y el banco central tiene menos herramientas para controlarlo.' },

      { type: 'case', title: '¿Quién es "banca sombra" y quién no?', text: 'Banca sombra son las instituciones que hacen funciones bancarias (recibir dinero, prestar dinero) pero fuera de la regulación bancaria tradicional. Tenpo NO es banca sombra — está regulada por la CMF y no puede prestar depósitos. Un hedge fund que recauda plata de inversores y la presta a empresas SÍ es banca sombra. Una app de crédito que da préstamos con capital de terceros está en la zona gris. La línea entre "fintech regulada" y "banca sombra" depende del país y se mueve constantemente.', verdict: 'Regla simple: si acepta depósitos y presta esos depósitos → necesita ser banco. Si no hace eso → está fuera del sistema bancario tradicional, para bien o para mal.' },

      { type: 'section', title: '¿Y cuando los bancos ignoran al banco central?' },
      { type: 'paragraph', text: 'En la teoría, el sistema funciona perfectamente. En la práctica, los bancos comerciales y otras instituciones encuentran formas de crear dinero fuera del control del banco central. Esto ha causado varias de las peores crisis financieras de la historia.' },

      { type: 'case', title: '📉 Crisis de 2008 — Los préstamos invisibles', text: 'Los bancos de EE.UU. descubrieron que podían sacar los préstamos de sus balances. Empaquetaban miles de hipotecas en instrumentos financieros complejos (CDOs, MBS) y los vendían a inversores. Como los préstamos ya no estaban en sus libros, los requisitos de reserva no les aplicaban. Resultado: crearon cantidades masivas de dinero que el banco central no podía ver ni controlar. Cuando las hipotecas empezaron a fallar, todo el sistema colapsó.', verdict: 'Si el banco central no puede ver los préstamos, no puede controlar la creación de dinero.' },

      { type: 'case', title: '🏦 La "banca sombra" — El sistema paralelo', text: 'Hedge funds, fondos de inversión, y otras instituciones no bancarias hacen funciones similares a los bancos pero sin las mismas regulaciones. En EE.UU., la banca sombra mueve más dinero que los bancos tradicionales. No necesitan mantener reservas, no reportan al banco central, y pueden crear crédito sin límites regulatorios. El banco central literalmente no tiene jurisdicción sobre ellos.', verdict: 'Hoy la banca sombra representa más del 50% del sistema financiero global — un sector enorme fuera del radar del banco central.' },

      { type: 'section', title: 'Banco normal vs. Banca sombra: la comparación' },
      { type: 'paragraph', text: '¿Qué hace que la banca sombra sea tan peligrosa? Hacen lo MISMO que un banco pero sin NINGUNA de las reglas. Aquí la comparación directa:' },
      { type: 'diagram', rows: [
        '                    BANCO NORMAL          BANCA SOMBRA',
        '                    ════════════          ════════════',
        'Regulado por:       Banco central + CMF   Nadie (o regulación',
        '                                          mínima y vaga)',
        '',
        'Reservas:           Obligado a guardar     Sin requisito de',
        '                    10-20% de depósitos    reserva mínima',
        '',
        'Transparencia:      Reporta al regulador   No reporta a nadie',
        '                    trimestralmente        (opaco por diseño)',
        '',
        'Seguro de           SÍ — si quiebra, el    NO — si quiebra,',
        'depósitos:          Estado te devuelve      pierdes todo',
        '                    hasta cierto monto',
        '',
        'Quién lo usa:       Personas comunes,       Ricos, empresas,',
        '                    empresas, todos         fondos de inversión',
        '',
        'Límite de           Tasa del BC + reservas  Ninguno práctico',
        'préstamos:          + supervisión           — prestan lo que',
        '                                            quieran',
        '',
        'Si quiebra:         El BC lo puede           No hay rescate',
        '                    rescatar (too big        garantizado — pero',
        '                    to fail)                 si es muy grande,',
        '                                             lo rescatan igual',
        '                                             con TU plata',
        '',
        'Ejemplos:           Santander, BCI,          Hedge funds,',
        '                    Banco Estado,            Blackrock, fondos',
        '                    Banco de Chile           de cobertura,',
        '                                             plataformas DeFi',
      ]},

      { type: 'section', title: 'Lo que hace la banca sombra (y por qué daña la economía)' },
      { type: 'example', title: '1. Apalancamiento extremo: apostar con dinero prestado', text: 'Un banco normal puede prestar 10x sus reservas. Un hedge fund puede apalancarse 30x, 50x, o más. Ejemplo: Long-Term Capital Management (LTCM) en 1998 tenía $4 mil millones propios pero posiciones por $125 mil millones — un apalancamiento de 31x. Cuando sus apuestas salieron mal, el agujero era tan grande que la Fed tuvo que coordinar un rescate para que no arrastrara a todo Wall Street.' },
      { type: 'example', title: '2. Préstamos sin supervisión: el crédito invisible', text: 'Un banco normal tiene que reportar cada préstamo al regulador. La banca sombra presta sin que nadie lo vea. Fondos de inversión prestan a empresas directamente ("direct lending"), fintechs dan créditos por app, plataformas de peer-to-peer conectan prestamistas con deudores. Nadie sabe exactamente cuánto dinero circula por estos canales. El banco central intenta controlar la cantidad de dinero en la economía, pero una parte enorme es invisible para ellos.' },
      { type: 'example', title: '3. Productos opacos: esconder el riesgo', text: 'Los bancos de sombra empaquetan deudas riesgosas en productos financieros complejos con nombres que nadie entiende (CDO, CLO, CDS, MBS). Mezclan deudas buenas con deudas basura y las venden como "inversión segura". Las agencias calificadoras les dan nota AAA (máxima seguridad) porque les pagan por hacerlo. Los compradores no saben lo que están comprando. Esto fue EXACTAMENTE lo que causó la crisis de 2008.' },
      { type: 'example', title: '4. Rescates con plata pública: ganan ellos, pierde la gente', text: 'Cuando un banco normal quiebra, el seguro de depósitos protege a los ahorrantes. Cuando la banca sombra quiebra, en teoría deberían perder los inversores ricos que asumieron el riesgo. Pero en la práctica, si la banca sombra es lo suficientemente grande, el gobierno la rescata porque si no arrastra a toda la economía. El resultado: las ganancias son privadas (para los ricos) pero las pérdidas son públicas (las pagamos todos con impuestos o inflación).' },

      { type: 'diagram', rows: [
        'EL CICLO DE LA BANCA SOMBRA:',
        '',
        '1. BOOM: apuestan fuerte con dinero prestado',
        '   ├─ Ganan fortunas con el apalancamiento',
        '   ├─ Ejecutivos cobran bonos millonarios',
        '   └─ Nadie supervisa porque "no son bancos"',
        '',
        '2. CRISIS: las apuestas salen mal',
        '   ├─ Las pérdidas son enormes por el apalancamiento',
        '   ├─ Arrastran a bancos normales que les prestaron',
        '   └─ Contagian a toda la economía',
        '',
        '3. RESCATE: el gobierno interviene',
        '   ├─ Rescata con dinero público (impuestos)',
        '   ├─ O el BC imprime dinero (inflación)',
        '   ├─ La gente común paga la crisis con desempleo,',
        '   │  inflación, y recortes a servicios públicos',
        '   └─ Los ejecutivos ya cobraron sus bonos',
        '',
        '4. "REFORMA": prometen que no pasará de nuevo',
        '   ├─ Se aprueban algunas regulaciones',
        '   ├─ Los lobbies las debilitan en pocos años',
        '   └─ El ciclo se repite',
      ]},
      { type: 'keypoint', text: 'La banca sombra existe porque hay una regla simple en las finanzas: donde hay regulación, el dinero busca la salida. Los bancos normales tienen límites, entonces los ricos crean instituciones "no bancarias" que hacen lo mismo sin los límites. Mientras sea legal crear estas estructuras, van a seguir existiendo. Y mientras sean tan grandes que su quiebra amenaza a todos, van a seguir siendo rescatadas con plata de todos.' },

      { type: 'case', title: '🇨🇳 China — Préstamos disfrazados', text: 'Los bancos chinos enfrentaban límites estrictos sobre cuánto podían prestar. Su solución: crear "productos de gestión patrimonial" que en realidad eran préstamos disfrazados. No contaban como préstamos en sus libros, así que no requerían reservas. El Banco Popular de China ponía límites a los préstamos, pero los bancos encontraban formas creativas de ignorarlos. En su pico, estos productos sumaban más de $4 trillones.', verdict: 'Cuando el incentivo de ganar dinero es mayor que la regulación, los bancos siempre encuentran la vuelta.' },

      { type: 'case', title: '🇺🇸 La era sin banco central (1837–1863)', text: 'Durante 26 años, EE.UU. no tuvo banco central. Cada banco comercial podía emitir su propio papel moneda. Resultado: más de 8,000 tipos diferentes de billetes. Algunos bancos imprimían dinero sin respaldo. Los billetes de un banco podían valer 50 centavos en otra ciudad. Las crisis bancarias eran frecuentes.', verdict: 'Sin un banco central que regule, cada banco se convierte en su propia imprenta de dinero.' },

      { type: 'case', title: '🌐 Crypto y DeFi — Fuera de todo control', text: 'Las plataformas DeFi permiten prestar y pedir prestado sin ningún banco. Un usuario deposita Ethereum como colateral y recibe un préstamo en stablecoins — dinero creado por un algoritmo. Ningún banco central puede controlar este proceso. No hay requisitos de reserva, no hay tasa regulada, no hay supervisión.', verdict: 'La tecnología permite crear sistemas monetarios completamente fuera del alcance de cualquier banco central.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 4: EL SISTEMA DE DEUDA
  // ═══════════════════════════════════════════════════════════════
  'debt-system': {
    title: 'El Sistema de Deuda',
    intro: 'Si el 90% del dinero se crea con préstamos, ¿siempre tiene que haber alguien endeudado? ¿Qué pasa si nadie pide prestado? La respuesta revela cómo funciona realmente la economía.',
    blocks: [
      { type: 'section', title: 'La paradoja del interés: ¿de dónde sale el dinero para pagar?' },
      { type: 'paragraph', text: 'Aquí viene la pregunta que muy poca gente hace, pero que revela cómo funciona realmente el sistema. Si el banco crea $10,000 cuando te da un préstamo, y te cobra 10% de interés, tú le debes $11,000. Pero solo se crearon $10,000. ¿De dónde salen los $1,000 del interés? Si todos los que pidieron préstamos tienen que devolver más dinero del que se creó, ¿no quiebra todo el mundo?' },

      { type: 'keypoint', text: 'Esta es la "paradoja del interés" y es una pregunta legítima. La respuesta corta: el interés que tú pagas NO desaparece — el banco lo gasta de vuelta en la economía. Y el banco central SÍ inyecta dinero nuevo constantemente. El sistema solo funciona porque el dinero circula y porque la base monetaria crece.' },

      { type: 'example', title: 'Paso a paso: ¿cómo se pagan los intereses?', text: 'El banco te presta $10,000 y te cobra $1,000 de interés al año. Tú trabajas, ganas dinero, y le pagas al banco $11,000. Parece que le quitaste $1,000 a la economía. Pero el banco no guarda esos $1,000 en una bóveda para siempre. Con ese dinero paga: salarios de sus empleados ($400), alquiler de sucursales ($200), dividendos a sus accionistas ($200), impuestos al gobierno ($100), y tecnología y servicios ($100). Todo ese dinero vuelve a la economía. Los empleados del banco compran en el supermercado, el dueño del edificio paga a sus proveedores, los accionistas invierten o gastan. El dinero del interés no desaparece — circula.' },

      { type: 'diagram', rows: [
        'EL CICLO DEL INTERÉS:',
        '',
        'Banco crea ─→ $10,000 ─→ Tú (préstamo)',
        '                              │',
        '                              │ Trabajas, produces, ganas',
        '                              │',
        'Banco recibe ←─ $11,000 ←─── Tú (pagas préstamo + interés)',
        '     │',
        '     │ ¿Desaparece el interés? NO.',
        '     │ El banco lo GASTA:',
        '     │',
        '     ├─→ $400 → Salarios empleados ──→ Economía',
        '     ├─→ $200 → Alquiler/servicios ──→ Economía',
        '     ├─→ $200 → Dividendos ───────────→ Economía',
        '     ├─→ $100 → Impuestos ────────────→ Gobierno → Economía',
        '     └─→ $100 → Tecnología/proveedores → Economía',
        '',
        'Los $1,000 del interés VUELVEN a circular.',
        'Alguien más los gana y puede pagar SU préstamo con ellos.',
      ]},

      { type: 'section', title: 'Pero hay un problema real...' },
      { type: 'paragraph', text: 'Si el banco gasta todo lo que gana, el dinero circula y alcanza. Pero la realidad es más complicada. No todo el interés vuelve inmediatamente a la economía — parte se queda como reservas, parte se invierte en activos financieros, parte sale del país. Entonces sí hay una presión constante: en cualquier momento dado, la deuda total del sistema es MAYOR que el dinero existente.' },

      { type: 'keypoint', text: 'Por eso el banco central necesita inyectar dinero nuevo constantemente. No es opcional — es estructuralmente necesario. Si el banco central dejara de crear base monetaria nueva, eventualmente no habría suficiente dinero para que todos paguen sus deudas con interés. Las empresas quebrarían, los bancos colapsarían, y la economía entraría en deflación y depresión.' },

      { type: 'example', title: '¿Cuánto dinero nuevo necesita inyectar?', text: 'Si la economía tiene $1 billón en préstamos al 5% de interés, se necesitan $50 mil millones extras al año solo para pagar los intereses. Ese dinero tiene que venir de algún lado: (1) el banco central crea más base monetaria, (2) los bancos dan nuevos préstamos que crean más dinero, o (3) la velocidad del dinero aumenta (el mismo billete se usa más veces). En la práctica, es una combinación de los tres.' },

      { type: 'example', title: '¿Y si los bancos dejan de prestar?', text: 'Esto es exactamente lo que pasó en 2008. Los bancos se asustaron y dejaron de hacer préstamos nuevos. Sin préstamos nuevos, no se crea dinero nuevo. Sin dinero nuevo, no hay suficiente para pagar los intereses de los préstamos viejos. Empresas quiebran → despiden gente → la gente no puede pagar sus préstamos → más empresas quiebran. Por eso la Fed y el BCE inyectaron trillones de dólares directamente: necesitaban reemplazar el dinero que los bancos dejaron de crear.' },

      { type: 'diagram', rows: [
        'EL SISTEMA NECESITA CRECER CONSTANTEMENTE:',
        '',
        'Año 1: Préstamos totales = $1,000,000',
        '        Interés adeudado  =   $50,000  (5%)',
        '        → Se necesitan $50,000 nuevos en la economía',
        '',
        'Año 2: Préstamos totales = $1,050,000  (deuda creció)',
        '        Interés adeudado  =   $52,500  (5%)',
        '        → Se necesitan $52,500 nuevos',
        '',
        'Año 3: Préstamos totales = $1,102,500  (sigue creciendo)',
        '        Interés adeudado  =   $55,125',
        '        → Se necesitan $55,125 nuevos',
        '',
        'La deuda SIEMPRE crece más rápido que el dinero existente.',
        'El sistema REQUIERE creación constante de dinero nuevo.',
        'Si se detiene → colapso (como 2008).',
      ]},

      { type: 'section', title: '¿Cuándo se sostiene y cuándo colapsa?' },
      { type: 'paragraph', text: 'La clave es esta: si la economía real (lo que la gente produce y vende) crece al mismo ritmo que la deuda, el sistema se sostiene. Los intereses se pueden pagar porque hay más riqueza real respaldando la deuda. Pero si la deuda crece mucho más rápido que la producción, se forma una burbuja — y eventualmente estalla.' },

      { type: 'diagram', rows: [
        '✅ CASO SANO — La producción crece con la deuda:',
        '',
        'Año 1: Deuda = $1,000,000  |  PIB = $2,000,000  |  Ratio: 50%',
        'Año 2: Deuda = $1,100,000  |  PIB = $2,200,000  |  Ratio: 50%',
        'Año 3: Deuda = $1,210,000  |  PIB = $2,420,000  |  Ratio: 50%',
      ]},

      { type: 'example', title: '¿Qué pasó en cada año? (caso sano)', text: 'Año 1: Un agricultor pide $200,000 para comprar un tractor. Con el tractor produce el doble de trigo y gana $300,000 al año. Paga su deuda y le sobra. Una constructora pide $800,000 para materiales. Construye 10 casas y las vende por $1,500,000. La deuda se pagó con casas reales que la gente necesitaba. Año 2: Con las ganancias, el agricultor contrata 3 empleados y compra más tierra ($100,000 de deuda nueva). Pero ahora produce el triple. La constructora pide otro crédito para construir una escuela pública. Más deuda, pero también más producción real: trigo, casas, educación. Año 3: Lo mismo. Cada peso de deuda nueva financia algo que produce más de lo que costó. La deuda crece, pero la riqueza real crece igual o más rápido.' },

      { type: 'diagram', rows: [
        '❌ CASO BURBUJA — La deuda crece más rápido que la producción:',
        '',
        'Año 1: Deuda = $1,000,000  |  PIB = $2,000,000  |  Ratio: 50%',
        'Año 2: Deuda = $1,300,000  |  PIB = $2,060,000  |  Ratio: 63%',
        'Año 3: Deuda = $1,690,000  |  PIB = $2,120,000  |  Ratio: 80%',
        'Año 4: Deuda = $2,197,000  |  PIB = $2,180,000  |  Ratio: 101% ⚠️',
      ]},

      { type: 'example', title: '¿Qué pasó en cada año? (caso burbuja)', text: 'Año 1: Todo igual que antes — créditos para tractores y construcción. Año 2: La gente ve que las casas subieron de precio un 20% en un año. Piensan: "si compro una casa hoy por $100,000, el próximo año vale $120,000 — gano $20,000 sin hacer nada". Piden préstamos no para producir, sino para COMPRAR casas y revenderlas. Los bancos prestan felices porque la casa es garantía. Deuda nueva: $300,000. Producción nueva real: casi nada — solo se están revendiendo las mismas casas más caras. Año 3: Más gente hace lo mismo. Un taxista pide crédito para comprar 3 departamentos. Un estudiante compra un terreno con deuda. Los precios siguen subiendo PORQUE hay más compradores con dinero prestado. La deuda explota. Pero nadie está produciendo trigo, ni casas nuevas, ni nada nuevo — solo especulando. Año 4: Alguien no puede pagar. El banco ejecuta la garantía y vende la casa. Pero ahora hay muchas casas en venta. Los precios caen. Otros ven que bajan y venden también. Pánico. Los precios se desploman, la gente queda con deudas mayores al valor de su casa, los bancos pierden dinero, dejan de prestar. Crash.' },

      { type: 'keypoint', text: 'La diferencia entre los dos casos NO es la cantidad de deuda — es PARA QUÉ se usó. Deuda para comprar un tractor que produce trigo = riqueza real. Deuda para comprar una casa esperando revenderla más cara = apuesta. La primera se paga sola con producción. La segunda solo se paga si alguien más está dispuesto a pagar más — hasta que nadie más quiere pagar.' },

      { type: 'section', title: '¿Y si nadie pidiera préstamos?' },
      { type: 'paragraph', text: 'Si las burbujas son peligrosas, ¿no sería mejor que nadie pidiera préstamos? La respuesta es NO — sería peor. Mucho peor.' },

      { type: 'example', title: 'Sin préstamos = sin dinero nuevo', text: 'Recuerda: el 90% del dinero lo crean los bancos al prestar. Si nadie pide préstamos, los bancos no crean dinero nuevo. Pero los préstamos viejos se siguen pagando — y cada pago DESTRUYE dinero (el dinero que se creó con ese préstamo desaparece al devolverlo). Resultado: la cantidad de dinero circulando baja cada mes. Menos dinero → los precios caen (deflación) → las empresas ganan menos → despiden gente → la gente gana menos → compra menos → más empresas cierran.' },

      { type: 'diagram', rows: [
        'SIN PRÉSTAMOS NUEVOS:',
        '',
        'Mes 1: Dinero circulando = $10,000,000',
        '        Pagos de deudas viejas = -$200,000 (se destruye)',
        '        Préstamos nuevos = $0 (nadie pide)',
        '        → Dinero restante: $9,800,000',
        '',
        'Mes 2: Dinero = $9,800,000',
        '        Pagos = -$190,000',
        '        → Dinero: $9,610,000',
        '',
        'Mes 6: Dinero = $8,900,000 (bajó 11%)',
        '        Empresas venden menos porque hay menos dinero',
        '        Despiden gente. Más gente sin ingreso.',
        '',
        'Mes 12: Dinero = $7,500,000 (bajó 25%)',
        '         Recesión profunda. Desempleo masivo.',
        '         Precios caen pero nadie compra igual.',
        '',
        'El dinero se "evapora" sin crédito nuevo.',
        'El sistema NECESITA préstamos para existir.',
      ]},

      { type: 'case', title: 'Ejemplo real: Japón después de 1991', text: 'Después del estallido de su burbuja, los japoneses quedaron traumados. Las empresas dejaron de pedir préstamos y se dedicaron a pagar deuda vieja. Los consumidores ahorraban en vez de gastar. Los bancos querían prestar pero nadie quería pedir. Resultado: el dinero circulando se estancó. Los precios bajaron año tras año (deflación). La economía no creció en 20 años. El banco central bajó la tasa a 0% pero aun así nadie pedía préstamos. Japón tuvo que inventar herramientas nuevas (QE, tasas negativas) para intentar forzar el dinero a circular.', verdict: 'El miedo a la deuda puede ser tan destructivo como el exceso de deuda. La economía necesita un flujo constante de crédito nuevo — ni demasiado (burbuja) ni muy poco (deflación). Encontrar el equilibrio es el trabajo más difícil de un banco central.' },

      { type: 'example', title: '"Pero yo tengo mi amasandería y no debo nada — ¿por qué me afecta?"', text: 'Buena pregunta. Tú produces pan, no debes nada, tu negocio funciona. ¿Por qué te importa si los bancos prestan o no? Porque tus clientes SÍ dependen del sistema. El obrero que te compra pan todos los días trabaja en una constructora. Esa constructora necesitó un préstamo para comprar materiales y pagarle el sueldo. Sin ese préstamo, la constructora no existe, el obrero no tiene trabajo, y nadie te compra el pan. Tú no necesitas un préstamo para producir — pero necesitas que OTROS tengan dinero para comprarte. Y ese dinero, en un 90%, existe porque alguien en algún lado pidió un préstamo.' },

      { type: 'diagram', rows: [
        'TU AMASANDERÍA SIN PRÉSTAMOS EN LA ECONOMÍA:',
        '',
        'Mes 1: Todo normal',
        '├─ Vendes 100 panes/día a $1,000 c/u',
        '├─ Ingreso: $3,000,000/mes',
        '├─ Compras harina, pagas luz, arriendas local',
        '└─ Ganancia: $800,000/mes ✓',
        '',
        'Mes 3: Los bancos dejan de prestar',
        '├─ La constructora del barrio cierra (no renovó crédito)',
        '├─ 15 obreros quedan sin trabajo',
        '├─ Esos 15 dejaron de comprarte pan',
        '├─ Vendes 85 panes/día',
        '└─ Ganancia: $500,000/mes ↓',
        '',
        'Mes 6: Efecto cadena',
        '├─ La ferretería también vendía a la constructora → cierra',
        '├─ El dueño y sus 3 empleados ya no compran pan',
        '├─ El almacén de la esquina vende menos → despide 1 persona',
        '├─ Vendes 60 panes/día',
        '├─ El proveedor de harina sube el precio (él también vende menos)',
        '└─ Ganancia: $100,000/mes ↓↓',
        '',
        'Mes 12: Espiral',
        '├─ Vendes 35 panes/día',
        '├─ No alcanzas a cubrir costos fijos (arriendo, luz)',
        '└─ Pérdida: -$200,000/mes ✗',
        '',
        'Tu pan es el mismo. Tu receta no cambió.',
        'Lo que cambió es que tus clientes ya no tienen dinero.',
        'El agua del río se secó — tus cultivos mueren igual.',
      ]},

      { type: 'paragraph', text: 'Este es el punto más contra-intuitivo de la economía moderna: tu negocio puede ser perfecto — buen producto, sin deuda, bien administrado — y aun así quebrar porque el SISTEMA alrededor se queda sin dinero. No alcanza con producir; alguien tiene que poder pagarte. Y la capacidad de pago de tus clientes depende de que el dinero siga circulando.' },

      { type: 'keypoint', text: 'El sistema monetario moderno es como una bicicleta: solo se mantiene en pie si se mueve. Dejar de pedalear (dejar de prestar) no te hace "más seguro" — te hace caer. La deuda no es mala ni buena — lo que importa es si financia producción real o especulación.' },

      { type: 'section', title: '¿Y si partiéramos de cero — sin deudas y sin poder pedir prestado?' },
      { type: 'paragraph', text: 'Ok, olvidemos las deudas viejas. Imagina un mundo completamente nuevo: 100 personas, un gobierno, y CERO deudas. Nadie debe nada. Nadie puede pedir prestado. No existen los bancos comerciales. Solo hay un banco central que imprime billetes. ¿Cuál sería el problema?' },

      { type: 'keypoint', text: 'El problema es que el ÚNICO dinero que existe es el que el banco central imprime y reparte físicamente. No hay multiplicación monetaria. No hay creación de crédito. Lo que el gobierno te da es todo lo que hay. Y eso no alcanza para que una economía crezca.' },

      { type: 'diagram', rows: [
        'ECONOMÍA DESDE CERO, SIN PRÉSTAMOS:',
        '',
        'El gobierno imprime $10,000,000 y los reparte:',
        '├─ 100 personas reciben $100,000 cada una',
        '├─ Ese es TODO el dinero que existe',
        '└─ No hay forma de crear más (nadie puede prestar)',
        '',
        '── ¿Qué puedes hacer con $100,000? ──',
        '',
        'Abrir una panadería:',
        '  Horno industrial:     $60,000',
        '  Arriendo (6 meses):   $30,000',
        '  Harina y materiales:  $15,000',
        '  Total:                $105,000',
        '  Tu dinero:            $100,000',
        '  → NO TE ALCANZA. Y no puedes pedir prestado.',
        '',
        'Construir una casa:',
        '  Materiales + terreno: $300,000',
        '  Tu dinero:            $100,000',
        '  → IMPOSIBLE sin crédito.',
        '',
        'Comprar un camión para transportar:',
        '  Camión usado:         $150,000',
        '  Tu dinero:            $100,000',
        '  → Tendrías que ahorrar MESES sin gastar en nada.',
      ]},

      { type: 'paragraph', text: 'Sin crédito, solo puedes invertir lo que ya tienes. Quieres abrir un negocio grande? Ahorra durante años sin gastar casi nada. Pero mientras ahorras, NO consumes — y los negocios de otros venden menos. Es un círculo vicioso: para ahorrar, dejas de comprar. Eso hace que otros ganen menos. Y ellos también ahorran más. La economía se encoge.' },

      { type: 'example', title: 'El problema del crecimiento', text: 'Imagina que 10 personas quieren emprender AL MISMO TIEMPO. Cada una necesita $150,000, pero solo tiene $100,000. Sin préstamos, las 10 tendrían que ahorrar simultáneamente. Para ahorrar, reducen su consumo. Pero si TODOS reducen su consumo, NADIE vende lo suficiente para ahorrar. Es una trampa: necesitas que otros gasten para que tú puedas ahorrar, pero todos quieren ahorrar al mismo tiempo. Con crédito, las 10 pueden emprender HOY — piden prestado, construyen sus negocios, producen bienes, y pagan la deuda con las ganancias futuras. Sin crédito, tienen que esperar años — y tal vez nunca junten suficiente.' },

      { type: 'example', title: '¿Y si el gobierno imprime más?', text: 'La solución obvia sería que el gobierno imprima más dinero. Pero si imprime $50,000,000 más y los reparte, ahora hay $60,000,000 persiguiendo los mismos bienes que antes. Los precios suben. El pan que costaba $1,000 ahora cuesta $3,000. Nadie es más rico — solo hay más papeles circulando. El gobierno no puede "resolver" la falta de crédito imprimiendo más, porque imprimir sin producción = inflación.' },

      { type: 'diagram', rows: [
        'CON PRÉSTAMOS vs SIN PRÉSTAMOS:',
        '',
        '── CON PRÉSTAMOS ──',
        'Año 1: 100 personas, $10M en circulación',
        '  → 20 piden préstamos, abren negocios',
        '  → Se crean $18M adicionales (multiplicador)',
        '  → Total en circulación: $28M',
        '  → Economía crece 15%: más bienes, más empleo',
        '',
        'Año 2: Negocios producen, pagan deudas, piden más',
        '  → PIB sube, todos tienen más opciones',
        '  → Hay casas, transporte, tecnología, servicios',
        '',
        '── SIN PRÉSTAMOS ──',
        'Año 1: 100 personas, $10M en circulación',
        '  → 3 personas logran ahorrar lo suficiente',
        '  → Abren negocios pequeños (solo lo que les alcanza)',
        '  → Total en circulación: $10M (no cambia)',
        '  → Economía crece 1-2% como máximo',
        '',
        'Año 2: Poco empleo nuevo, pocos bienes nuevos',
        '  → Los que no pudieron emprender siguen igual',
        '  → La economía parece un pueblo medieval',
        '',
        'Año 10 CON crédito: Ciudad moderna con industria',
        'Año 10 SIN crédito: Todavía un pueblo básico',
      ]},

      { type: 'case', title: 'Ejemplo real: las economías sin crédito SÍ existieron', text: 'Antes de la banca moderna (antes del siglo XIV), las economías funcionaban exactamente así. Solo existía el dinero que los reyes acuñaban. No había crédito, no había multiplicación. Resultado: la economía europea casi no creció durante MIL AÑOS (del 500 al 1500 DC). El PIB per cápita era prácticamente el mismo en el año 500 que en el 1400. Cuando aparecieron los bancos en Italia (Florencia, Venecia) y empezaron a dar préstamos, la economía explotó. El Renacimiento no fue solo arte y cultura — fue una revolución financiera. Los Medici prestaban dinero a comerciantes, que compraban especias en Asia, las vendían en Europa, y pagaban con las ganancias. Sin ese crédito, el comercio habría sido imposible a esa escala.', verdict: 'El crédito es la herramienta que le permite a la humanidad invertir en el FUTURO usando recursos del presente. Sin él, estamos atrapados en lo que tenemos hoy — literalmente como en la Edad Media.' },

      { type: 'keypoint', text: 'Una economía sin préstamos es como una granja donde solo puedes plantar las semillas que ya tienes en la mano. Con crédito, puedes pedir semillas prestadas, plantar una cosecha enorme, y devolver las semillas con parte de la ganancia. El crédito convierte el potencial futuro en capacidad presente. Sin él, la economía solo puede crecer al ritmo que el gobierno imprime — y si imprime demasiado, genera inflación. Es un callejón sin salida.' },

      { type: 'section', title: 'La verdad incómoda: siempre debe haber alguien endeudado' },
      { type: 'paragraph', text: 'Si el 90% del dinero existe porque alguien pidió un préstamo, eso significa algo brutal: para que TÚ tengas dinero en el bolsillo, alguien en algún punto de la cadena tuvo que endeudarse. Tu sueldo, el billete con el que compras pan, los $50,000 que tienes en la cuenta — casi todo ese dinero fue creado por un préstamo que alguien pidió.' },

      { type: 'diagram', rows: [
        'RASTREA TU SUELDO HASTA SU ORIGEN:',
        '',
        'Tú recibes $800,000 de sueldo',
        '  └─ Tu empresa te paga con la plata que recibe de clientes',
        '       └─ Los clientes pagan con sus sueldos',
        '            └─ Sus sueldos vienen de OTRAS empresas',
        '                 └─ Esas empresas financiaron su operación con...',
        '                      └─ Un préstamo bancario ← AQUÍ SE CREÓ tu dinero',
        '',
        'En algún eslabón de la cadena, alguien pidió un',
        'préstamo. Ese préstamo CREÓ el dinero que eventualmente',
        'llegó a tu bolsillo como sueldo.',
        '',
        'Si nadie se hubiera endeudado → ese dinero no existiría',
        '→ tu empresa no tendría con qué pagarte.',
      ]},

      { type: 'example', title: 'Ejemplo concreto: la cadena de tu sueldo', text: 'Trabajas en un café. Tu jefe te paga con lo que gana vendiendo café. Los clientes te pagan con sus sueldos. Un cliente es obrero de una constructora. La constructora recibió un crédito de $500 millones del Banco de Chile para comprar materiales y pagar sueldos. Ese crédito CREÓ $500 millones de dinero nuevo. Parte de esos $500 millones se convirtieron en el sueldo del obrero. Parte de ese sueldo se convirtió en el café que te compra. Y parte de ese café se convirtió en TU sueldo. Tu sueldo existe porque la constructora se endeudó. Si la constructora no hubiera pedido ese préstamo, esos $500 millones nunca habrían existido, el obrero no tendría trabajo, no compraría café, y tu jefe no tendría con qué pagarte.' },

      { type: 'keypoint', text: 'En el sistema actual, la deuda de unos es el dinero de otros. Literalmente. Cada peso de deuda que existe en el sistema es un peso que alguien más tiene como ingreso, ahorro o capital. Si la deuda total fuera cero, el dinero circulando también sería casi cero. Solo quedarían los billetes físicos del banco central (el 10%).' },

      { type: 'diagram', rows: [
        '¿QUÉ PASA SI TODOS PAGAN SUS DEUDAS?',
        '',
        'Situación actual:',
        '├─ Deuda total en el sistema: $100,000,000',
        '├─ Dinero circulando (M2):    $110,000,000',
        '├─ Base monetaria (M0):        $10,000,000',
        '└─ Dinero creado por crédito:  $100,000,000 (90%)',
        '',
        'Si TODOS pagan sus deudas:',
        '├─ Deuda total: $0',
        '├─ Dinero que se destruye al pagar: $100,000,000',
        '├─ Dinero restante: $10,000,000 (solo M0)',
        '└─ Desaparece el 90% del dinero',
        '',
        'Resultado: no hay suficiente dinero para pagar sueldos,',
        'comprar bienes, ni operar la economía. Colapso total.',
        '',
        'Por eso SIEMPRE debe haber deuda en el sistema.',
        'La deuda no es un error — ES el mecanismo.',
      ]},

      { type: 'paragraph', text: 'Esto no significa que la deuda sea "buena" o "mala" moralmente. Es simplemente cómo funciona el mecanismo. El sistema monetario actual REQUIERE que exista deuda para que exista dinero. Son dos caras de la misma moneda — literalmente. Cada préstamo crea dinero, cada pago lo destruye. El nivel de deuda total en la economía es casi idéntico al nivel de dinero total. No son cosas separadas: son la misma cosa vista desde dos lados.' },

      { type: 'example', title: '¿No hay alternativa?', text: 'Sí la hay, en teoría. Un gobierno podría crear todo el dinero directamente (sin bancos comerciales) y distribuirlo por gasto público, sin que nadie se endeude. Esto se llama "dinero soberano" o "full reserve banking". Algunos economistas lo proponen. El problema: le da al gobierno un poder enorme sobre la economía, elimina el rol de los bancos privados, y nadie ha probado que funcione a gran escala. Islandia lo estudió después de su crisis de 2008. Suiza lo votó en referéndum en 2018 (fue rechazado). Es una idea real, pero radical — cambiaría todo el sistema financiero mundial.' },

      { type: 'keypoint', text: 'El sistema actual no es el único posible — pero es el que tenemos. Y en este sistema, la deuda es el motor que crea el dinero. Entender esto es fundamental: cuando un político dice "vamos a eliminar toda la deuda", está diciendo (sin saberlo) "vamos a eliminar la mayor parte del dinero". La deuda total de un país no es como la deuda de una persona — no es algo que se "paga y listo". Es el combustible del sistema.' },

      { type: 'case', title: '¿De dónde ganan los bancos comerciales realmente?', text: 'Los bancos ganan del "spread" — la diferencia entre lo que pagan por los depósitos y lo que cobran por los préstamos. Si te pagan 2% por tu cuenta de ahorro y cobran 8% por un crédito, su ganancia bruta es 6% sobre cada peso prestado. También ganan por comisiones (mantención, transferencias, tarjetas), inversiones propias, y servicios financieros. Un banco grande como Santander Chile puede ganar más de $500 mil millones de pesos al año. No necesitan que el banco central les "dé" dinero para ganar — lo crean ellos mismos al prestar, y ganan con el interés.', verdict: 'Los bancos son las únicas empresas del mundo que pueden crear el producto que venden (dinero/crédito). Por eso son tan rentables — y por eso están tan regulados.' },

      { type: 'section', title: 'La deuda como escudo fiscal' },
      { type: 'paragraph', text: 'Existe un uso estratégico de la deuda que no tiene nada que ver con "necesitar dinero": el escudo fiscal (tax shield). En casi todos los países, los intereses que una empresa paga por sus deudas se DESCUENTAN de la base imponible — es decir, reducen los impuestos que paga. Esto crea una situación paradójica: endeudarse puede ser más barato que NO endeudarse.' },

      { type: 'diagram', rows: [
        'ESCUDO FISCAL — EJEMPLO NUMÉRICO:',
        '',
        '                       SIN deuda    CON deuda',
        '───────────────────── ──────────── ────────────',
        'Ingresos               $1,000,000   $1,000,000',
        'Costos operativos      -$600,000    -$600,000',
        'Utilidad operativa      $400,000     $400,000',
        'Intereses pagados             $0     -$80,000',
        'Utilidad antes de imp.  $400,000     $320,000',
        'Impuesto (25%)         -$100,000     -$80,000',
        'Utilidad neta           $300,000     $240,000',
        '',
        'Pero espera — ¿qué pasa con el COSTO REAL?',
        '',
        'Sin deuda: pagó $100,000 en impuestos',
        'Con deuda: pagó $80,000 en impuestos + $80,000 en intereses',
        '',
        'El interés REAL que pagó la empresa con deuda:',
        '$80,000 - $20,000 (ahorro en impuestos) = $60,000 neto',
        '',
        'La deuda le "costó" solo $60,000, no $80,000.',
        'El gobierno subsidió el 25% del costo de la deuda.',
      ]},

      { type: 'keypoint', text: 'El escudo fiscal significa que el gobierno paga parte de tus intereses. Si el impuesto es 25% y tu tasa de interés es 8%, tu costo REAL de deuda es solo 6% (8% × 0.75). Mientras que tu capital propio no tiene ningún beneficio fiscal — cada peso de ganancia paga impuesto completo. El sistema tributario está diseñado para PREMIAR la deuda sobre el capital propio.' },

      { type: 'example', title: 'Apple: $160 mil millones en caja y aun así se endeuda', text: 'Apple tenía más de $160 mil millones en efectivo en 2020 — podía comprar cualquier cosa sin pedir prestado. Pero emitió $14 mil millones en bonos (deuda). ¿Por qué? Dos razones: (1) La mayor parte de su efectivo estaba en el extranjero — traerlo a EE.UU. costaba 35% en impuestos. (2) Los bonos pagaban 2-3% de interés, y con el escudo fiscal el costo real era ~1.5%. Era MÁS BARATO endeudarse al 1.5% que traer su propia plata pagando 35%. Cuando la deuda cuesta menos que usar tu propio dinero, endeudarse es la decisión racional — aunque tengas los recursos para no hacerlo.' },

      { type: 'section', title: 'Los dos usos estratégicos de la deuda' },
      { type: 'paragraph', text: 'La deuda tiene dos usos que van más allá de "no me alcanza la plata": el apalancamiento y el escudo fiscal. Son herramientas, no necesidades.' },

      { type: 'diagram', rows: [
        'USO 1 — APALANCAMIENTO (multiplicar ganancias):',
        '',
        'Tengo $100,000. Un local comercial cuesta $500,000.',
        'Opción A: Espero 5 años hasta ahorrar $500,000.',
        'Opción B: Pongo $100,000 + pido $400,000 prestados.',
        '',
        'Si el local genera $60,000/año de arriendo:',
        '  Opción A: Gano 0% los 5 años que espero.',
        '  Opción B: Gano $60,000/año - $32,000 intereses = $28,000/año',
        '            Sobre MIS $100,000 = retorno de 28% anual.',
        '',
        'El apalancamiento convierte $100,000 de capital en',
        '$500,000 de inversión. La ganancia se calcula sobre',
        'LO TUYO, no sobre el total.',
        '',
        '── Riesgo: Si el arriendo baja a $25,000, no alcanza',
        '   para pagar intereses. PIERDES todo.',
        '',
        '════════════════════════════════════════════',
        '',
        'USO 2 — ESCUDO FISCAL (reducir impuestos):',
        '',
        'Empresa gana $1,000,000. Impuesto 25% = paga $250,000.',
        'Si se endeuda y paga $200,000 en intereses:',
        '  Base imponible: $800,000. Impuesto = $200,000.',
        '  Ahorro fiscal: $50,000.',
        '',
        'El gobierno le "devolvió" $50,000 por endeudarse.',
        '',
        '── Riesgo: Si los ingresos bajan, la deuda sigue ahí',
        '   y puede quebrar la empresa.',
      ]},

      { type: 'case', title: '¿Por qué el sistema premia la deuda?', text: 'Los gobiernos deducen intereses de la base imponible porque QUIEREN que las empresas se endeuden e inviertan. Si una empresa pide prestado para construir una fábrica, crea empleos, genera impuestos por sueldos, y produce bienes. El gobierno "pierde" $50,000 en impuestos por el escudo fiscal, pero "gana" $200,000 en impuestos por los nuevos empleos y la actividad económica. Es un subsidio calculado. El problema es que también premia la deuda ESPECULATIVA — comprar acciones propias con deuda, comprar competidores para eliminarlos, o repartir dividendos financiados con deuda. El sistema no distingue entre deuda "productiva" y deuda "financiera".', verdict: 'El escudo fiscal es una herramienta poderosa pero con un sesgo: premia a quien ya tiene capital (puede endeudarse) sobre quien no lo tiene (paga impuesto completo). Cuanto más grande eres, más deuda puedes tomar, más impuestos ahorras. Es otro mecanismo que concentra riqueza.' },

      { type: 'keypoint', text: 'La deuda NO es solo para "cuando no te alcanza" — es una herramienta estratégica. El apalancamiento multiplica tus retornos (pero también tus pérdidas). El escudo fiscal reduce tu carga tributaria. Las empresas más sofisticadas usan ambas conscientemente. Pero cada vez que una empresa se endeuda, depende del banco — y si la economía se frena, esa dependencia puede destruirla. La independencia financiera (operar sin deuda) es más lenta pero más resiliente.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 5: EL FLUJO DEL DINERO
  // ═══════════════════════════════════════════════════════════════
  'money-flow': {
    title: 'El Flujo del Dinero',
    intro: 'El dinero no se queda quieto — circula. Entender cómo fluye es la clave para posicionar un negocio, entender tu sueldo, y ver cómo funciona la economía real.',
    blocks: [
      { type: 'section', title: 'El dinero es un flujo — y tu negocio es un punto en el circuito' },
      { type: 'paragraph', text: 'La mayoría de la gente piensa en el dinero como algo estático — "tengo $5,000 en mi cuenta". Pero el dinero es un flujo. Cada peso que existe está en constante movimiento: del banco central → a los bancos → a las empresas → a los trabajadores → a los negocios → y de vuelta. El dinero no se queda quieto — si se queda quieto, la economía se muere.' },

      { type: 'diagram', rows: [
        'EL CIRCUITO DEL DINERO EN LA ECONOMÍA:',
        '',
        '    ┌── Banco Central ──┐',
        '    │  (crea la base)   │',
        '    ▼                   │',
        ' Bancos Comerciales     │',
        '    │  (multiplican     │',
        '    │   con préstamos)  │',
        '    ▼                   │',
        ' Empresas ◄────────────┤',
        '    │  (producen,       │',
        '    │   venden,         │',
        '    │   contratan)      │',
        '    ▼                   │',
        ' Trabajadores           │',
        '    │  (gastan en       │',
        '    │   consumo)        │',
        '    ▼                   │',
        ' Negocios/Comercio      │',
        '    │  (venden bienes)  │',
        '    ▼                   │',
        ' Gobierno ──────────────┘',
        '    (cobra impuestos,',
        '     gasta en público)',
        '',
        'El dinero CIRCULA. Cada vuelta = actividad económica.',
        'Más vueltas por mes = economía más activa.',
        'Tu negocio quiere estar donde el flujo sea MAYOR.',
      ]},

      { type: 'keypoint', text: 'Un negocio exitoso no es el que "tiene" más dinero — es el que tiene más dinero PASANDO a través de él. Piensa en tu negocio como una tubería: lo que importa es el caudal (cuánto fluye por mes), no cuánta agua guardas en un balde.' },

      { type: 'section', title: '¿Cómo capturar más flujo de dinero?' },
      { type: 'paragraph', text: 'Si el dinero es un flujo que circula constantemente por la economía, la pregunta para cualquier emprendedor es: ¿cómo hago que una mayor parte de ese flujo pase por mi negocio? Hay estrategias claras:' },

      { type: 'example', title: '1. Vende algo que todos necesiten siempre', text: 'Comida, salud, transporte — la demanda no para nunca. Un restaurante o una farmacia tienen flujo constante porque la gente TIENE que comer y curarse. En la simulación, estos negocios tienen demanda "muy alta". Aunque el margen por venta sea bajo, el volumen compensa. Un supermercado gana 3% de margen pero vende miles de veces al día.' },

      { type: 'example', title: '2. Posiciónate entre dos puntos grandes del flujo', text: 'El dinero fluye de empresas → trabajadores → comercio. Si tu negocio está EN MEDIO de un flujo grande, capturas parte de él. Ejemplo: una empresa de transporte no produce bienes, pero conecta fábricas con tiendas. Todo el comercio depende de ella. Una fintech como un procesador de pagos cobra 2% de cada transacción — no vende nada, pero está en medio de CADA flujo de dinero entre comprador y vendedor.' },

      { type: 'example', title: '3. Aumenta la velocidad del flujo que pasa por ti', text: 'Si vendes un producto a $10 y lo vendes 100 veces al mes, tu flujo es $1,000/mes. Si subes el precio a $15 pero vendes solo 50 veces, tu flujo baja a $750/mes. A veces bajar el precio AUMENTA tu flujo total porque vendes más veces. Walmart entendió esto: precio bajo, volumen altísimo, flujo de dinero enorme.' },

      { type: 'example', title: '4. Crea flujos recurrentes (suscripciones)', text: 'Un flujo que pasa una vez es una venta. Un flujo que pasa cada mes es una suscripción. Netflix, Spotify, tu plan de celular — todos generan flujo automático y predecible. En la simulación, un negocio con clientes recurrentes tiene ingresos estables. Una consultoría que cobra por proyecto tiene flujo irregular. Un servicio mensual tiene flujo constante.' },

      { type: 'diagram', rows: [
        'EJEMPLO: DOS PANADERÍAS, MISMO BARRIO',
        '',
        'Panadería A: "Pan artesanal premium"',
        '├─ Precio: $5 por pan',
        '├─ Ventas: 40 panes/día',
        '├─ Flujo diario: $200',
        '├─ Flujo mensual: $6,000',
        '└─ Margen: 40% → Ganancia: $2,400/mes',
        '',
        'Panadería B: "Pan barato + café + empanadas"',
        '├─ Precio promedio: $2.5 por producto',
        '├─ Ventas: 200 productos/día',
        '├─ Flujo diario: $500',
        '├─ Flujo mensual: $15,000',
        '└─ Margen: 25% → Ganancia: $3,750/mes',
        '',
        'B gana MÁS con MENOR margen porque tiene',
        'MAYOR FLUJO. Más productos, más clientes,',
        'más veces al día. El volumen gana.',
      ]},

      { type: 'section', title: '¿De dónde viene el flujo nuevo?' },
      { type: 'paragraph', text: 'Cada vez que el banco central inyecta base monetaria, o un banco comercial da un préstamo, se inyecta flujo nuevo al circuito. Ese dinero nuevo pasa por la economía y eventualmente llega a tu negocio — si estás bien posicionado.' },

      { type: 'diagram', rows: [
        'CÓMO LLEGA EL DINERO NUEVO A TU NEGOCIO:',
        '',
        'BC inyecta $100,000 → Banco comercial',
        '    │',
        '    ├─→ Préstamo hipotecario a familia',
        '    │       └─→ Constructora recibe $80,000',
        '    │              └─→ Paga salarios a 10 obreros',
        '    │                     └─→ Obreros compran en TU tienda',
        '    │                            └─→ $3,000 llegan a ti ✓',
        '    │',
        '    ├─→ Crédito a empresa agrícola',
        '    │       └─→ Compra maquinaria, contrata gente',
        '    │              └─→ Trabajadores gastan en la zona',
        '    │                     └─→ $2,000 llegan a ti ✓',
        '    │',
        '    └─→ Gobierno recibe impuestos de todo esto',
        '            └─→ Gasta en obras públicas',
        '                   └─→ Más trabajadores con sueldo',
        '                          └─→ $1,500 llegan a ti ✓',
        '',
        'De $100,000 inyectados, $6,500 pasaron por tu negocio.',
        'Si vendes algo que TODOS necesitan (comida, servicios)',
        'capturas una parte de CADA flujo que pasa por la zona.',
      ]},

      { type: 'keypoint', text: 'El secreto de un buen negocio no es inventar algo genial — es posicionarte donde el flujo de dinero ya existe y va creciendo. Vende lo que la gente necesita, en el lugar donde el dinero circula, al precio que maximice el volumen. El margen importa, pero el flujo importa más.' },

      { type: 'section', title: 'El flujo real con números: ¿siempre es el mismo dinero?' },
      { type: 'paragraph', text: 'Sí. El dinero real en la economía es siempre el mismo — lo que cambia son los números que le ponemos encima. Veámoslo con un ejemplo simple: el banco central imprime $1,000 y los inyecta al sistema.' },

      { type: 'diagram', rows: [
        'CICLO 1 — $1,000 entran al sistema:',
        '',
        'Paso                    Banco    Empresa  Trabajador',
        '─────────────────────── ──────── ──────── ──────────',
        'Inicio                  $1,000   $0       $0',
        'Banco presta (10% int.) $0*      $1,000   $0',
        'Empresa paga salarios   $0       $200     $800',
        'Trabajador compra       $0       $700     $300',
        'Empresa paga deuda      $1,100   -$400    $300',
        '',
        '* El banco tiene $0 en caja pero $1,100 en derechos',
        '',
        'Dinero REAL que existe: $1,000 (nunca cambió)',
        'Dinero que el banco RECLAMA: $1,100',
        'Los $100 extra NO EXISTEN — son interés.',
        'La empresa queda en -$400 y necesita otro préstamo.',
      ]},

      { type: 'paragraph', text: 'Después de 5 ciclos de deuda + interés, el patrón se hace claro:' },

      { type: 'diagram', rows: [
        'ACUMULACIÓN DESPUÉS DE 5 CICLOS:',
        '',
        'Ciclo  Dinero real  Banco reclama  Diferencia',
        '─────  ──────────  ─────────────  ──────────',
        '  1    $1,000      $1,100         +$100',
        '  2    $1,000      $1,210         +$210',
        '  3    $1,000      $1,331         +$331',
        '  4    $1,000      $1,464         +$464',
        '  5    $1,000      $1,610         +$610',
        '',
        'El banco reclama $610 que NO EXISTEN.',
        'Solo se pueden pagar con: más deuda o más emisión.',
      ]},

      { type: 'keypoint', text: 'Cada ciclo de deuda + interés, el sistema financiero captura un pedazo más del flujo. El banco no produce nada, pero su tajada crece solo por cobrar interés. La inyección de dinero nuevo no crea riqueza — solo ajusta los números para que el sistema no colapse.' },

      { type: 'section', title: '¿Quién se queda con qué parte del flujo?' },
      { type: 'paragraph', text: 'Con el tiempo, la distribución del flujo se inclina hacia quienes cobran interés o tienen activos, no hacia quienes trabajan:' },

      { type: 'diagram', rows: [
        'DISTRIBUCIÓN DEL FLUJO CON EL TIEMPO:',
        '',
        'Posición en el flujo          Ciclo 1  Ciclo 5  Ciclo 10',
        '──────────────────────────── ──────── ──────── ─────────',
        'Sistema financiero (bancos)    10%      15%      22%',
        'Dueños de empresa sin deuda    25%      28%      30%',
        'Dueños de empresa con deuda    30%      25%      18%',
        'Trabajador que invierte        20%      20%      20%',
        'Trabajador que solo consume    15%      12%      10%',
        '',
        'El trabajador que solo consume tiene cada vez MENOS',
        'parte del flujo — no porque le roben, sino porque',
        'todos los demás están en posiciones donde el dinero',
        'se multiplica.',
      ]},

      { type: 'section', title: 'La empresa sin deuda: la posición más fuerte' },
      { type: 'paragraph', text: 'Una empresa que no necesita préstamos para operar está en la posición más poderosa del sistema. Mientras las empresas endeudadas transfieren riqueza al banco cada mes, la empresa sin deuda retiene todo y reinvierte:' },

      { type: 'diagram', rows: [
        'EMPRESA CON DEUDA vs. SIN DEUDA:',
        '',
        '                    Con deuda  Sin deuda',
        '─────────────────── ─────────  ─────────',
        'Ingresos            $1,000     $1,000',
        'Pago al banco       -$110      $0',
        'Salarios            -$800      -$800',
        'Ganancia neta       $90        $200',
        '',
        'Acumulado tras 5 ciclos:',
        'Con deuda:  $380',
        'Sin deuda:  $1,340',
        '',
        'Apple, Google operan así — tanta caja que no',
        'necesitan bancos. El que no paga interés,',
        'acumula riqueza. El que paga, la transfiere.',
      ]},

      { type: 'section', title: '¿Qué pasa si TODAS las empresas operan sin deuda?' },
      { type: 'paragraph', text: 'Si una empresa sin deuda es la posición más fuerte, ¿qué pasaría si TODAS las empresas lograran operar así? Suena ideal — pero las consecuencias serían enormes para todo el sistema.' },

      { type: 'diagram', rows: [
        'ECONOMÍA DONDE NINGUNA EMPRESA PIDE PRÉSTAMOS:',
        '',
        '1. BANCOS COMERCIALES — Pierden su negocio',
        '   ├─ Hoy: 70% de ingresos vienen de intereses empresariales',
        '   ├─ Sin empresas pidiendo: solo quedan hipotecas y consumo',
        '   ├─ Ingresos bancarios caen 40-60%',
        '   ├─ Despiden personal, cierran sucursales',
        '   └─ Muchos bancos pequeños quiebran',
        '',
        '2. CREACIÓN DE DINERO — Se frena',
        '   ├─ Los préstamos empresariales son ~50% del crédito total',
        '   ├─ Si desaparecen: M2 se contrae significativamente',
        '   ├─ Menos dinero circulando = presión deflacionaria',
        '   └─ El banco central tendría que compensar inyectando base',
        '',
        '3. CRECIMIENTO — Más lento pero más estable',
        '   ├─ Sin apalancamiento, las empresas crecen solo con',
        '   │   ganancias reinvertidas (~10-15% anual vs 30-50% con deuda)',
        '   ├─ Expansiones más lentas pero sin riesgo de quiebra por deuda',
        '   ├─ No hay crisis crediticias ni cadenas de impago',
        '   └─ PIB crece 2-3% en vez de 5-7%, pero sin recesiones',
        '',
        '4. DESIGUALDAD — Se reduce',
        '   ├─ Sin intereses, el dinero no fluye de empresas → bancos',
        '   ├─ Más ganancia queda en la empresa → mejores salarios',
        '   ├─ El sector financiero se encoge (hoy es 20% del PIB)',
        '   └─ La economía real (producción) gana peso relativo',
        '',
        '5. IMPUESTOS — El gobierno pierde y gana',
        '   ├─ Pierde: sin escudo fiscal, empresas pagan MÁS impuestos',
        '   ├─ Espera... eso es BUENO para el gobierno',
        '   ├─ Pero: menos actividad bancaria = menos impuestos de bancos',
        '   └─ Neto: gobierno probablemente recauda más (no hay elusión)',
      ]},

      { type: 'example', title: '¿Es posible en la práctica?', text: 'No a gran escala, por tres razones: (1) Velocidad competitiva — si tu competidor se endeuda para crecer más rápido y tú no, te quita el mercado antes de que acumules suficiente capital. (2) Inversiones grandes — construir una fábrica de $50 millones con solo ganancias toma 10 años; con deuda, 1 año. El que espera pierde. (3) El sistema tributario PREMIA la deuda — el escudo fiscal hace que endeudarse sea artificialmente barato. Para que TODAS las empresas operaran sin deuda, habría que eliminar el escudo fiscal (nadie en política propone esto), y aceptar crecimiento más lento (ningún votante acepta esto).' },

      { type: 'keypoint', text: 'Una economía sin deuda empresarial sería más estable, más equitativa, y sin crisis financieras — pero crecería más lento. Es el tradeoff fundamental: velocidad vs independencia. El sistema actual eligió velocidad (y las crisis que vienen con ella). Cada empresa individual puede elegir independencia, pero si TODAS lo hicieran, el sistema financiero actual colapsaría porque está diseñado alrededor del crédito.' },

      { type: 'section', title: 'Cómo un trabajador puede mejorar su posición en el flujo' },
      { type: 'paragraph', text: 'El problema del trabajador es que solo tiene una fuente de ingreso: su salario. Y el salario es un costo que la empresa quiere minimizar. El trabajador es solo un paso intermedio en el flujo — el dinero pasa por sus manos pero no se queda.' },

      { type: 'diagram', rows: [
        'POSICIÓN DEL TRABAJADOR EN EL FLUJO:',
        '',
        'Banco → Empresa → TRABAJADOR → Consumo → Empresa → Banco',
        '                      ↑',
        '               Solo un tubo.',
        '            El dinero pasa pero',
        '              no se queda.',
      ]},

      { type: 'paragraph', text: 'Para cambiar esto, tiene que moverse de posición:' },

      { type: 'example', title: 'Nivel 1 — Dejar de ser solo consumidor', text: 'Un trabajador que gana $3,000/mes y gasta todo siempre tiene $0 — es solo un tubo por donde pasa el dinero. Si ahorra 20%, después de un año tiene $7,200. No cambia nada todavía, pero es el requisito para los siguientes niveles.' },

      { type: 'example', title: 'Nivel 2 — Convertirse en acreedor (invertir)', text: 'Con esos ahorros, en vez de dejarlos en el banco (donde le pagan 3% y el banco cobra 10% con su plata), puede comprar acciones (~8% anual) o prestar directo (~7%). Ahora está en DOS posiciones del flujo: cobra salario Y cobra rendimiento.' },

      { type: 'example', title: 'Nivel 3 — Ser dueño de algo que genera ingreso sin su tiempo', text: 'Un negocio online, una propiedad en arriendo, un producto digital. La clave es que genera ingreso sin requerir su presencia constante. Ya no depende solo del salario.' },

      { type: 'example', title: 'Nivel 4 — Ser la empresa sin deuda', text: 'El trabajador que ahorra → invierte → crea un negocio → reinvierte sin pedir préstamos, se convierte en esa empresa sin deuda. Ahora está en la posición más fuerte del flujo. La fórmula es: haz que consumidores y empresas te paguen por resolver un problema, y diversifica para que el flujo no dependa de una sola fuente.' },

      { type: 'keypoint', text: 'La fórmula es simple: haz que el dinero fluya HACIA ti desde consumidores y empresas resolviendo un problema real. La cantidad depende de cuántas personas lo necesitan (mercado), qué tan difícil es reemplazarte (competencia), y si requiere tu tiempo o no (escalabilidad). Luego diversifica para tener múltiples fuentes de flujo.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 6: EL ABUSO DEL PODER MONETARIO
  // ═══════════════════════════════════════════════════════════════
  'power-abuse': {
    title: 'El Abuso del Poder Monetario',
    intro: 'Los bancos y los gobiernos pueden forzar al banco central a imprimir dinero. Las ganancias son privadas, las pérdidas son públicas. Así funciona.',
    blocks: [
      { type: 'section', title: 'Cómo los bancos obligan al banco central a imprimir — y tú pagas' },
      { type: 'paragraph', text: 'Este es el mecanismo más perverso del sistema financiero. Los bancos comerciales pueden, en la práctica, FORZAR al banco central a crear dinero nuevo. No se lo piden con un "por favor" — lo fuerzan con un chantaje implícito: "si no me das dinero, quiebro, y si quiebro, se lleva puesta a toda la economía". El banco central, para evitar el colapso, imprime. Y la inflación que eso genera la paga la gente.' },

      { type: 'diagram', rows: [
        'EL CICLO PERVERSO — PASO A PASO:',
        '',
        'PASO 1: El banco presta agresivamente',
        '├─ Tiene $100M en reservas',
        '├─ Presta $900M (límite legal)',
        '├─ Gana intereses: $72M/año (8% sobre $900M)',
        '└─ Ejecutivos reciben bonos millonarios ✓',
        '',
        'PASO 2: Quiere ganar MÁS → presta más allá de lo prudente',
        '├─ Busca formas creativas de prestar más',
        '├─ Baja los estándares: presta a gente más riesgosa',
        '├─ Empaqueta préstamos y los saca de sus libros',
        '└─ Ahora tiene $1,500M prestados con solo $100M de reserva',
        '',
        'PASO 3: Algunos préstamos fallan',
        '├─ La gente riesgosa no paga → el banco pierde dinero',
        '├─ Se queda sin reservas suficientes',
        '├─ Otros bancos ya no le quieren prestar',
        '└─ Está al borde de la quiebra',
        '',
        'PASO 4: Va al banco central',
        '├─ "Necesito reservas de emergencia o quiebro"',
        '├─ El BC tiene dos opciones:',
        '│   A) Dejarlo quebrar → pánico, cadena de quiebras,',
        '│      la gente pierde sus depósitos, crisis total',
        '│   B) Darle dinero nuevo (IMPRIMIR) → el banco sobrevive',
        '└─ El BC casi siempre elige B',
        '',
        'PASO 5: El BC imprime dinero nuevo',
        '├─ Crea reservas para el banco',
        '├─ Hay más dinero en el sistema → INFLACIÓN',
        '├─ Tus ahorros pierden valor',
        '├─ El pan sube de precio',
        '└─ TÚ pagaste el rescate del banco sin que nadie te pregunte',
        '',
        'PASO 6: El banco sobrevive',
        '├─ Los ejecutivos mantienen sus bonos',
        '├─ Los accionistas mantienen su inversión',
        '├─ El banco "aprendió" que siempre lo van a rescatar',
        '└─ Vuelve al Paso 1. El ciclo se repite.',
      ]},

      { type: 'keypoint', text: 'Esto se llama "riesgo moral" (moral hazard). Si un banco sabe que el banco central lo va a rescatar siempre, ¿para qué ser cuidadoso? Puede tomar todos los riesgos que quiera. Si le va bien, se queda con las ganancias. Si le va mal, el banco central imprime y la gente paga con inflación. Es el mejor negocio del mundo: las ganancias son privadas, las pérdidas son públicas.' },

      { type: 'example', title: '"Too big to fail" — Demasiado grande para dejarlo caer', text: 'Cuando un banco es tan grande que su quiebra arrastraría a toda la economía, el banco central NO PUEDE dejarlo caer. Lehman Brothers en 2008 tenía $600 mil millones en activos. Cuando lo dejaron quebrar (la única vez que EE.UU. no rescató a un banco grande), el sistema financiero mundial casi colapsa en 48 horas. Después de eso, el gobierno rescató a TODOS los demás: Bank of America, Citigroup, AIG, Goldman Sachs. ¿Con qué plata? Con dinero que la Fed imprimió: $4.5 TRILLONES entre 2008 y 2014. ¿Quién pagó la inflación resultante? Tú, yo, todos.' },

      { type: 'example', title: '¿Cómo funciona el chantaje en la práctica?', text: 'El banco ni siquiera necesita ir a "pedir" dinero. El mecanismo es automático. Los bancos tienen acceso a la "ventanilla de descuento" del banco central — un préstamo de emergencia siempre disponible. También pueden pedir dinero a través de "repos" (venden bonos al BC y los recompran después). Y en crisis grandes, el BC directamente compra los activos tóxicos del banco (los préstamos malos que nadie quiere). En todos los casos, el BC crea dinero nuevo para dárselo al banco. No es un favor — es un mecanismo diseñado dentro del sistema.' },

      { type: 'diagram', rows: [
        'QUIÉN GANA Y QUIÉN PIERDE:',
        '',
        '── CUANDO EL BANCO PRESTA BIEN ──',
        'Banco:    Gana intereses ($72M/año)          ✓ Gana',
        'Ejecutivos: Bonos de $5M+                    ✓ Ganan',
        'Accionistas: Dividendos y acciones suben     ✓ Ganan',
        'Gente:    Recibe crédito, la economía crece   ✓ Gana',
        '',
        '── CUANDO EL BANCO PRESTA MAL ──',
        'Banco:    Rescatado por el BC, sobrevive      ✓ Gana',
        'Ejecutivos: Ya cobraron sus bonos             ✓ Ganan',
        'Accionistas: Las acciones bajan pero no a 0   ~ Pierden algo',
        'Gente:    Inflación sube, ahorros valen menos ✗ PIERDE',
        '          Precios suben, sueldos no           ✗ PIERDE',
        '          Impuestos pagan parte del rescate   ✗ PIERDE',
        '',
        'El sistema está diseñado para que las ganancias',
        'sean privadas y las pérdidas sean públicas.',
      ]},

      { type: 'case', title: '2008: el ejemplo más claro de la historia', text: 'Los bancos de EE.UU. dieron hipotecas a personas que claramente no podían pagar (las "hipotecas subprime"). ¿Por qué? Porque cada hipoteca generaba comisiones. Y si el deudor no pagaba, no importaba — el banco ya había vendido esa hipoteca empaquetada a inversores. Cuando millones de personas dejaron de pagar, todo colapsó. Los bancos perdieron cientos de miles de millones. ¿El castigo? NINGUNO. El gobierno los rescató con $700 mil millones de dinero público (TARP). La Fed imprimió $4.5 trillones más (QE). Exactamente UN ejecutivo bancario fue a la cárcel. Los mismos bancos que causaron la crisis estaban dando bonos millonarios a sus ejecutivos un año después — con la plata del rescate.', verdict: 'La crisis de 2008 demostró que el sistema funciona exactamente como suena: los bancos toman riesgos con TU dinero, si ganan se quedan con las ganancias, y si pierden, el banco central imprime y tú pagas la inflación. No es una teoría conspirativa — es el diseño del sistema.' },

      { type: 'example', title: '¿Por qué no se cambia esto?', text: 'Porque los bancos son los principales donantes de campañas políticas, financian a los partidos, y sus ex-ejecutivos rotan entre el sector privado y los cargos públicos. El secretario del Tesoro de EE.UU. durante el rescate de 2008 (Hank Paulson) era el ex-CEO de Goldman Sachs — uno de los bancos rescatados. El presidente de la Fed de Nueva York (Tim Geithner) pasó a ser Secretario del Tesoro después. Los que deciden los rescates son las mismas personas que se benefician de ellos.' },

      { type: 'keypoint', text: 'Cuando alguien dice "el banco central imprime dinero", la pregunta real es: ¿para quién lo imprime? Si lo imprime para rescatar bancos que tomaron riesgos irresponsables, es un subsidio a los ricos pagado con la inflación de los pobres. Si lo imprime para responder a una pandemia o un terremoto, es una herramienta legítima. El problema no es que el banco central PUEDA imprimir — es que los bancos comerciales han aprendido a FORZARLO a hacerlo cada vez que sus apuestas salen mal.' },

      { type: 'section', title: 'Cómo los GOBIERNOS obligan al banco central a imprimir — y tú pagas' },
      { type: 'paragraph', text: 'Los bancos no son los únicos que fuerzan al banco central a imprimir. Los gobiernos también lo hacen — y el mecanismo es más directo, más político, y más dañino. Porque cuando un gobierno controla la impresora de dinero, no tiene límite para gastar. Y cada peso que imprime te lo roba a ti en forma de inflación.' },

      { type: 'section', title: 'El mecanismo: cómo lo hacen' },
      { type: 'paragraph', text: 'En teoría, el banco central es INDEPENDIENTE del gobierno. Nadie del gobierno puede llamar al presidente del banco central y decirle "imprime $500 mil millones". Pero en la práctica, hay muchas formas de forzarlo:' },

      { type: 'diagram', rows: [
        'MÉTODO 1: CONTROL DIRECTO (el más descarado)',
        '',
        '├─ El presidente nombra al gobernador del BC',
        '├─ Pone a un amigo/aliado político en el cargo',
        '├─ Le dice "imprime lo que yo necesite"',
        '├─ Si no obedece → lo despide y pone a otro',
        '└─ Ejemplo: Erdogan en Turquía despidió a 4 gobernadores',
        '   del BC en 2 años porque no le obedecían',
        '',
        'MÉTODO 2: EL TRUCO DE LOS BONOS (el más común)',
        '',
        '├─ El gobierno necesita $10,000 millones',
        '├─ No tiene plata (ya se la gastó toda)',
        '├─ Emite bonos del gobierno por $10,000M',
        '│  (un bono = "te debo plata, te pago después con interés")',
        '├─ ¿Quién compra los bonos? El banco central',
        '├─ ¿Con qué plata los compra? Con dinero que CREA',
        '├─ El gobierno recibe $10,000M frescos para gastar',
        '├─ El BC tiene un papel que dice "el gobierno me debe"',
        '└─ En la práctica: el gobierno se imprimió su propia plata',
        '',
        'MÉTODO 3: PRESIÓN POLÍTICA (el más sutil)',
        '',
        '├─ El gobierno no controla al BC directamente',
        '├─ Pero habla en público: "el BC debería bajar la tasa"',
        '├─ Los medios y el partido presionan',
        '├─ Amenazan con cambiar la ley del BC',
        '├─ Amenazan con quitarle la independencia',
        '└─ El BC cede "voluntariamente" para evitar el conflicto',
      ]},

      { type: 'keypoint', text: 'El truco de los bonos es el más importante de entender. El gobierno le vende bonos al banco central, y el banco central los compra con dinero que crea de la nada. Es exactamente lo mismo que imprimirse tu propia plata, pero con un paso intermedio para que no se vea tan obvio. En países con instituciones fuertes (Chile, EE.UU., Europa), el BC puede negarse a comprar bonos directamente del gobierno. En países con instituciones débiles (Venezuela, Argentina, Turquía), el gobierno simplemente ordena al BC que los compre.' },

      { type: 'section', title: '¿Por qué lo hacen? ¿En qué gastan?' },

      { type: 'example', title: 'Gasto populista antes de elecciones', text: 'El uso más clásico. Se acercan las elecciones y el presidente quiere ganar votos. Subsidios, bonos en efectivo, obras públicas, aumento de sueldos a funcionarios — todo pagado con dinero impreso. La gente recibe plata y está feliz. La inflación tarda 6-12 meses en llegar. Para cuando los precios suben, el presidente ya ganó la elección. Los que pagaron fueron los ciudadanos con sus ahorros devaluados. Argentina hace esto cada ciclo electoral. Cristina Kirchner financió subsidios masivos con emisión monetaria — la inflación pasó del 10% al 40%.' },

      { type: 'example', title: 'Financiar guerras y gasto militar', text: 'Es la razón original por la que los gobiernos quieren controlar la impresora. Las guerras son carísimas y ningún país tiene suficientes impuestos para pagarlas. La Primera Guerra Mundial, la Segunda, Vietnam — todas fueron financiadas en gran parte con dinero impreso. Nixon abandonó el patrón oro en 1971 precisamente porque EE.UU. había impreso demasiados dólares para pagar la Guerra de Vietnam y ya no tenía oro para respaldarlos.' },

      { type: 'example', title: 'Tapar déficits y mala administración', text: 'Cuando un gobierno gasta más de lo que recauda en impuestos, tiene un déficit. Las opciones honestas son: subir impuestos (impopular), reducir gastos (impopular), o pedir prestado al mercado (caro). La opción fácil: que el banco central imprima y compre bonos del gobierno. No necesitas subirle impuestos a nadie, no necesitas recortar nada. El problema es que la inflación ES el impuesto — solo que nadie votó por él y castiga más a los pobres.' },

      { type: 'example', title: 'Pagar deuda vieja con dinero nuevo', text: 'El gobierno pidió prestado $100 mil millones hace 10 años. Ahora tiene que pagar. No tiene plata. Solución: imprimir $100 mil millones nuevos y pagar la deuda. El problema: esos $100 mil millones nuevos diluyen el valor de todo el dinero que ya existía. Es como si tuvieras 10 acciones de una empresa y la empresa emite 90 más — tus 10 acciones ahora valen una fracción de lo que valían.' },

      { type: 'diagram', rows: [
        'POR QUÉ LA INFLACIÓN ES UN ROBO SILENCIOSO:',
        '',
        'Situación inicial:',
        '├─ Dinero total en el país: $100,000,000,000',
        '├─ Tú tienes ahorrados: $5,000,000',
        '├─ Tu parte del pastel: 0.005%',
        '└─ Un departamento cuesta: $80,000,000',
        '',
        'El gobierno imprime $50,000,000,000 (50% más):',
        '├─ Dinero total ahora: $150,000,000,000',
        '├─ Tú sigues con: $5,000,000',
        '├─ Tu parte del pastel: 0.0033% (bajó 33%)',
        '├─ El departamento ahora cuesta: $120,000,000',
        '└─ Tu plata compra 33% MENOS que antes',
        '',
        'Nadie te sacó plata del bolsillo.',
        'Nadie te subió los impuestos.',
        'Pero eres 33% más pobre.',
        '',
        'El gobierno gastó esos $50,000,000,000 en lo que quiso.',
        'Tú financiaste ese gasto sin que nadie te preguntara.',
        'Eso es la inflación: un impuesto sin votación.',
      ]},

      { type: 'section', title: 'Casos reales: cuando el gobierno usa la impresora' },

      { type: 'case', title: 'Venezuela: el caso más extremo', text: 'Hugo Chávez y después Nicolás Maduro usaron al banco central como cajero automático. El BCV (Banco Central de Venezuela) perdió toda independencia. El gobierno le ordenaba imprimir para financiar subsidios, programas sociales, y gasto público. Entre 2013 y 2018, la base monetaria creció más de 10,000%. Los bolívares se imprimían tan rápido que no daban abasto para imprimir los billetes. La inflación llegó a 130,000% en 2018 — los precios se duplicaban cada 19 días. Un café que costaba 1 bolívar pasó a costar 1,000,000. La gente usaba billetes como servilletas porque el papel valía más que el billete.', verdict: 'Venezuela tenía el petróleo más abundante del mundo. El gobierno decidió financiar todo con emisión monetaria en vez de administrar bien los ingresos petroleros. Resultado: el país más rico de Sudamérica se convirtió en el más pobre en 10 años.' },

      { type: 'case', title: 'Argentina: el ciclo eterno', text: 'Argentina lleva décadas en el mismo ciclo. Gobierno gasta de más → financia el déficit con emisión → inflación sube → la gente se enoja → cambia el gobierno → el nuevo gobierno promete no imprimir → a los 2 años empieza a imprimir de nuevo. El banco central argentino (BCRA) ha perdido y recuperado su independencia múltiples veces. Cada gobierno que llega pone a su gente en el BCRA. Resultado: inflación promedio de 50-100% anual durante la última década. Los argentinos aprendieron a cobrar el sueldo e ir CORRIENDO al supermercado antes de que suban los precios.', verdict: 'La independencia del banco central no sirve de nada si cada gobierno nuevo puede cambiar a los directores y poner a los suyos.' },

      { type: 'case', title: 'Turquía: un presidente contra la economía', text: 'Erdogan tiene una teoría económica personal: cree que bajar la tasa de interés reduce la inflación (lo contrario de lo que dice toda la teoría económica). Despidió a 4 gobernadores del banco central en 2 años porque subían la tasa. Puso a un aliado que bajó la tasa del 19% al 8.5% mientras la inflación estaba en 80%. Resultado: la lira turca perdió el 80% de su valor, la inflación superó el 85%, y millones de turcos cayeron en la pobreza.', verdict: 'Erdogan demostró en tiempo real lo que pasa cuando un presidente controla la política monetaria: destrucción del poder adquisitivo de toda la población.' },

      { type: 'case', title: 'Chile: el ejemplo de lo que funciona (hasta ahora)', text: 'El Banco Central de Chile tiene independencia constitucional desde 1989. El presidente de la república NO puede dar órdenes al BC, no puede despedir al presidente del BC a voluntad, y no puede obligarlo a comprar bonos del gobierno. Cuando la inflación subió después del COVID, el BC subió la tasa agresivamente del 0.5% al 11.25% — una decisión impopular pero que controló la inflación. Ningún político pudo impedirlo. Resultado: Chile tiene la inflación más baja y estable de Latinoamérica.', verdict: 'La independencia del banco central no es un detalle técnico — es lo que separa a Chile de Argentina y Venezuela en materia de inflación. Mientras esa independencia se mantenga, el gobierno no puede usar la impresora.' },

      { type: 'keypoint', text: 'El patrón es siempre el mismo: gobierno quiere gastar sin cobrar impuestos → presiona o controla al BC para que imprima → más dinero en circulación → inflación → la gente pierde poder adquisitivo → el gobierno culpa a los empresarios, a los especuladores, al capitalismo, a cualquiera menos a sí mismo. Mientras tanto, los políticos y sus cercanos tienen sus ahorros en dólares o en propiedades que suben con la inflación. Los que pagan son siempre los mismos: los trabajadores que cobran en moneda local y guardan su plata en el banco.' },

      { type: 'section', title: '¿Qué pasa si alguien mete dinero "de la nada" en la economía?' },
      { type: 'paragraph', text: 'Esta es la pregunta clave. ¿Qué haría el banco central si de repente aparece una cantidad masiva de dinero nuevo en la economía — ya sea porque un banco prestó de más, porque el gobierno imprimió sin control, o porque alguien encontró una forma de inyectar dinero?' },

      { type: 'keypoint', text: 'Si aparece dinero de la nada en grandes cantidades, el resultado siempre es el mismo: INFLACIÓN. Hay más dinero persiguiendo los mismos bienes → los precios suben. El banco central detecta esto a través del IPC (índice de precios al consumidor) y los indicadores monetarios (M1, M2).' },

      { type: 'example', title: 'Paso 1: Detección', text: 'El banco central monitorea constantemente cuánto dinero hay circulando (oferta monetaria M2), a qué velocidad se mueve (velocidad del dinero), y cómo se comportan los precios (IPC). Si M2 crece mucho más rápido que la producción real de bienes, el banco central sabe que hay un problema. También recibe reportes de la CMF/reguladores sobre los préstamos de los bancos.' },

      { type: 'example', title: 'Paso 2: Respuesta — Subir la tasa de interés', text: 'Lo primero que hace el banco central es subir la TPM (Tasa de Política Monetaria). Si la tasa sube del 3% al 8%, pedir préstamos se vuelve carísimo. Los bancos comerciales frenan los nuevos préstamos. La gente deja de pedir crédito. Se frena la creación de dinero nuevo. Pero esto también frena la economía — las empresas invierten menos, contratan menos, el crecimiento se desacelera.' },

      { type: 'example', title: 'Paso 3: Vender bonos (retirar dinero)', text: 'El banco central vende bonos del gobierno masivamente. Los bancos y las personas compran esos bonos con dinero que tenían circulando. Ese dinero sale de la economía y queda "congelado" en el banco central. Menos dinero circulando → menos presión sobre los precios.' },

      { type: 'example', title: 'Paso 4: Subir requisitos de reserva', text: 'Si la situación es grave, el banco central puede exigir a los bancos que guarden más dinero en reserva. Si sube del 10% al 25%, los bancos tienen que frenar préstamos dramáticamente para cumplir. Es como pisar el freno de emergencia — efectivo pero doloroso.' },

      { type: 'example', title: 'Paso 5 (extremo): Intervención directa', text: 'Si un banco específico está creando dinero descontroladamente, el regulador (CMF en Chile, Fed en EE.UU.) puede intervenir ese banco: congelar sus operaciones, poner un administrador externo, o incluso cerrarlo y proteger a los depositantes. Esto se hizo con Silicon Valley Bank en 2023.' },

      { type: 'section', title: '¿Por qué importa todo esto?' },
      { type: 'keypoint', text: 'El dinero que usas todos los días es, en su mayoría, una promesa digital creada por bancos comerciales, no billetes impresos por el gobierno. Cuando el sistema funciona, esto impulsa la economía. Cuando falla, las consecuencias las paga la gente común: pérdida de ahorros, desempleo, inflación.' },
      { type: 'paragraph', text: 'El banco central es como el freno de un auto — necesario y útil, pero solo funciona si: (1) es independiente del gobierno, (2) puede ver lo que hacen los bancos, y (3) las instituciones financieras están dentro del sistema regulado. Cuando alguna de estas condiciones falla — como Venezuela, Turquía, o la crisis de 2008 — el resultado es siempre el mismo: la gente común paga las consecuencias.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 7: BANCA CENTRAL
  // ═══════════════════════════════════════════════════════════════
  'central-banking': {
    title: 'Banca Central',
    intro: 'El banco central es la institución más poderosa de cualquier economía. Sus decisiones afectan el precio de todo lo que compras, tu empleo, y el valor de tus ahorros.',
    blocks: [
      { type: 'section', title: 'Herramientas del banco central' },
      { type: 'paragraph', text: 'El banco central controla la política monetaria — es decir, cuánto dinero hay en la economía y a qué precio se puede pedir prestado.' },

      { type: 'example', title: 'Tasa de interés', text: 'La herramienta más conocida. Cuando sube la tasa, pedir prestado es más caro → menos préstamos → menos dinero circulando → menos inflación. Cuando baja, ocurre lo contrario: más préstamos, más dinero, más actividad económica, pero potencialmente más inflación.' },

      { type: 'example', title: 'Requisitos de reserva', text: 'Define qué porcentaje de los depósitos deben guardar los bancos. Un requisito del 10% permite multiplicar el dinero por 10. Uno del 20% solo por 5. Es la forma más directa de controlar la creación de dinero.' },

      { type: 'section', title: '¿Qué son los bonos?' },
      { type: 'paragraph', text: 'Un bono es básicamente un "pagaré" — una promesa de devolver dinero en el futuro con intereses. Cuando el gobierno necesita dinero, en vez de imprimir billetes, emite bonos. Tú le das $1,000 hoy y el gobierno te promete devolverte $1,050 en un año. Esos $50 extra son el interés — tu ganancia por prestarle al gobierno.' },
      { type: 'keypoint', text: 'Los bonos son la herramienta más importante que tiene un gobierno para financiarse sin imprimir dinero. Y son la herramienta más importante del banco central para controlar cuánto dinero hay en la economía.' },

      { type: 'diagram', rows: [
        'CÓMO FUNCIONA UN BONO:',
        '',
        'Tú (inversor)  ──── $1,000 ────→  Gobierno',
        '                                     │',
        '                                     │ Usa el dinero para',
        '                                     │ gasto público',
        '                                     │',
        '                  ← $1,050 ──────────┘',
        '                  (en 1 año)',
        '',
        'Tu ganancia: $50 (5% de interés)',
        'El gobierno consiguió $1,000 sin imprimir dinero',
      ]},

      { type: 'section', title: 'Tipos de bonos' },
      { type: 'example', title: 'Bonos del Tesoro (corto plazo)', text: 'Duración: semanas a 1 año. Son los más seguros y líquidos. El gobierno los usa para financiar gastos inmediatos. Pagan poco interés precisamente porque son muy seguros — si el gobierno no paga, la economía tiene problemas mucho más grandes.' },
      { type: 'example', title: 'Notas del Tesoro (mediano plazo)', text: 'Duración: 2 a 10 años. Son el referente para las hipotecas y préstamos empresariales. Cuando escuchas "la tasa a 10 años subió", hablan de estos bonos. Su tasa afecta directamente cuánto pagas por tu casa.' },
      { type: 'example', title: 'Bonos a largo plazo', text: 'Duración: 20 a 30 años. Pagan más interés porque el riesgo es mayor — muchas cosas pueden pasar en 30 años. Los fondos de pensiones los compran porque necesitan rendimiento estable a largo plazo.' },

      { type: 'section', title: 'El precio y la tasa: la relación inversa' },
      { type: 'keypoint', text: 'Cuando el precio de un bono sube, su rendimiento (tasa) baja, y viceversa. Esto es contra-intuitivo pero fundamental. Si un bono de $1,000 al 5% se vuelve muy demandado y su precio sube a $1,100, el mismo cupón de $50 ahora representa solo 4.5% de rendimiento. El comprador pagó más por la misma ganancia.' },
      { type: 'paragraph', text: 'Esta relación inversa es la clave de cómo el banco central manipula las tasas de interés de toda la economía.' },

      { type: 'section', title: 'Operaciones de mercado abierto: los bonos como herramienta' },
      { type: 'paragraph', text: 'Las operaciones de mercado abierto son la herramienta más usada por cualquier banco central moderno. Son compras y ventas de bonos del gobierno que se hacen todos los días.' },

      { type: 'example', title: 'Cuando el BC quiere INYECTAR dinero (política expansiva)', text: 'El banco central compra bonos a los bancos comerciales. Les da dinero fresco a cambio de los bonos. Ahora los bancos tienen más reservas → pueden prestar más → se crea más dinero. Además, al comprar bonos masivamente, sube su precio → baja la tasa de interés de toda la economía. Préstamos más baratos para todos.' },
      { type: 'example', title: 'Cuando el BC quiere RETIRAR dinero (política contractiva)', text: 'El banco central vende bonos a los bancos. Los bancos le dan dinero al BC a cambio de los bonos. Ahora los bancos tienen menos reservas → pueden prestar menos → se crea menos dinero. Al vender bonos masivamente, baja su precio → sube la tasa de interés. Préstamos más caros para todos.' },

      { type: 'diagram', rows: [
        'INYECTAR DINERO:                    RETIRAR DINERO:',
        '',
        'BC compra bonos → da dinero         BC vende bonos → recibe dinero',
        'Bancos: +reservas                   Bancos: -reservas',
        'Precio bonos: ↑                     Precio bonos: ↓',
        'Tasas: ↓ (bajan)                    Tasas: ↑ (suben)',
        'Préstamos: más baratos              Préstamos: más caros',
        'Dinero circulando: ↑↑               Dinero circulando: ↓↓',
      ]},

      { type: 'section', title: 'La Regla de Taylor' },
      { type: 'paragraph', text: 'La "Regla de Taylor" es una fórmula que sugiere cómo ajustar la tasa de interés según la inflación actual y el crecimiento económico. Si la inflación está por encima de la meta (generalmente 2%), la regla dice que hay que subir la tasa. Si la economía crece poco, dice que hay que bajarla.' },
      { type: 'keypoint', text: 'En la simulación, el banco central usa automáticamente la Regla de Taylor cuando no estás controlándolo. Puedes observar cómo ajusta la tasa en respuesta a la inflación y el crecimiento.' },

      { type: 'section', title: 'Flexibilización cuantitativa (QE): cuando los bonos normales no alcanzan' },
      { type: 'paragraph', text: 'En situaciones extremas, la tasa de interés llega a 0% y ya no puede bajar más. El banco central recurre entonces a la "flexibilización cuantitativa": comprar cantidades masivas de bonos — no solo del gobierno, sino también bonos corporativos y otros activos — para inundar el sistema de dinero.' },

      { type: 'case', title: '🇺🇸 La Fed y el QE (2008–2014)', text: 'Después de la crisis de 2008, la Fed bajó la tasa a 0% pero la economía seguía paralizada. Entonces empezó a comprar bonos del Tesoro e hipotecarios a un ritmo de $85 mil millones por mes. En total, su balance pasó de $900 mil millones a más de $4.5 trillones. Literalmente creó trillones de dólares para comprar bonos y forzar las tasas a la baja.', verdict: 'Funcionó para estabilizar, pero los críticos argumentan que infló los precios de acciones y bienes raíces — beneficiando a los ricos que poseen esos activos.' },

      { type: 'case', title: '🇯🇵 Japón y el control de la curva de rendimiento (2016–2024)', text: 'El Banco de Japón fue más lejos que nadie: no solo compró bonos masivamente, sino que fijó un techo al rendimiento del bono a 10 años. Si la tasa intentaba subir por encima del 0.25%, el BoJ compraba bonos ilimitadamente para mantenerla abajo. En un momento, el BoJ poseía más del 50% de todos los bonos del gobierno japonés.', verdict: 'Cuando el banco central es el comprador mayoritario del mercado de bonos, ¿existe realmente un "mercado" libre? Japón mostró los límites de esta herramienta.' },

      { type: 'case', title: '🇪🇺 El BCE y la crisis del euro (2012–2022)', text: 'Cuando Grecia, España e Italia estaban al borde de la quiebra en 2012, el presidente del BCE, Mario Draghi, dijo tres palabras que salvaron al euro: "Whatever it takes" (lo que sea necesario). El BCE prometió comprar bonos ilimitados de los países en crisis. Solo el anuncio fue suficiente — las tasas de los bonos de estos países bajaron inmediatamente sin que el BCE tuviera que comprar mucho.', verdict: 'A veces la herramienta más poderosa del banco central no es comprar bonos — es la promesa creíble de que los comprará si es necesario.' },

      { type: 'case', title: '🇦🇷 Argentina — Cuando nadie quiere tus bonos (2001, 2019)', text: 'Argentina ha incumplido su deuda (defaulteado) 9 veces en su historia. Cuando un país hace default, nadie le quiere comprar bonos porque no confían en que les paguen. Argentina tuvo que ofrecer tasas del 40-60% para convencer a alguien de comprar sus bonos. El banco central no podía hacer operaciones de mercado abierto porque nadie quería los bonos. Sin esta herramienta, solo le quedaba imprimir dinero → inflación de más del 100% anual.', verdict: 'Sin confianza, los bonos no funcionan. Y sin bonos, el banco central pierde su herramienta más importante.' },

      { type: 'section', title: '¿Por qué te importan los bonos?' },
      { type: 'paragraph', text: 'Aunque nunca compres un bono directamente, los bonos afectan tu vida todos los días:' },
      { type: 'example', title: 'Tu hipoteca', text: 'La tasa de tu hipoteca se basa en el rendimiento del bono del gobierno a 10 años. Cuando el banco central compra bonos y baja su rendimiento, tu hipoteca se abarata. Cuando vende bonos y sube el rendimiento, tu hipoteca se encarece.' },
      { type: 'example', title: 'Tu empleo', text: 'Cuando las tasas de bonos suben, las empresas piden menos préstamos, invierten menos, y contratan menos. El mercado de bonos afecta el mercado laboral, aunque parezcan mundos separados.' },
      { type: 'example', title: 'Tu jubilación', text: 'Los fondos de pensiones invierten fuertemente en bonos. Si los rendimientos son muy bajos (como ocurrió con el QE), los fondos ganan menos y tu pensión futura podría ser menor.' },
      { type: 'example', title: 'La moneda de tu país', text: 'Si los bonos de tu país pagan más interés que los de otro, los inversores extranjeros compran tus bonos → necesitan tu moneda → tu moneda se fortalece. Por eso las decisiones del banco central sobre tasas afectan el tipo de cambio.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 8: INFLACIÓN Y DEFLACIÓN
  // ═══════════════════════════════════════════════════════════════
  inflation: {
    title: 'Inflación y Deflación',
    intro: 'La inflación es el enemigo silencioso de tus ahorros. Entender cómo funciona es la diferencia entre proteger tu dinero y perderlo lentamente.',
    blocks: [
      { type: 'section', title: '¿Qué es la inflación?' },
      { type: 'paragraph', text: 'La inflación es el aumento generalizado y sostenido de los precios. Si el año pasado un café costaba $2 y ahora cuesta $2.10, la inflación es del 5%.' },
      { type: 'paragraph', text: 'Se mide con el Índice de Precios al Consumidor (IPC), que rastrea una "canasta" de bienes y servicios representativos: comida, vivienda, transporte, salud, etc.' },

      { type: 'section', title: 'Causas de la inflación' },
      { type: 'example', title: 'Inflación monetaria (demasiado dinero)', text: 'Cuando el banco central imprime demasiado dinero o los bancos prestan excesivamente, hay más dinero persiguiendo los mismos bienes. Los precios suben. Como dijo Milton Friedman: "La inflación es siempre y en todo lugar un fenómeno monetario."' },
      { type: 'example', title: 'Inflación de costos', text: 'Cuando el costo de producir cosas sube (petróleo, materias primas, salarios), las empresas trasladan ese costo al consumidor. Los precios suben aunque la demanda no haya cambiado.' },
      { type: 'example', title: 'Inflación de demanda', text: 'Cuando hay más demanda que oferta — la gente quiere comprar más de lo que se produce. Las empresas suben precios porque pueden.' },

      { type: 'section', title: '¿Cuánta inflación es normal?' },
      { type: 'keypoint', text: 'Un poco de inflación (2-3% anual) se considera saludable. Incentiva el gasto (si los precios van a subir, mejor comprar ahora) y permite que los salarios se ajusten. La mayoría de bancos centrales apuntan a una meta de 2%.' },

      { type: 'section', title: 'Cuando se descontrola: Hiperinflación' },
      { type: 'paragraph', text: 'La hiperinflación ocurre cuando la inflación supera el 50% mensual. Los precios pueden duplicarse en días o semanas.' },
      { type: 'case', title: '🇻🇪 Venezuela (2016–2019)', text: 'El gobierno financió su gasto imprimiendo dinero masivamente. La inflación llegó a más de 1,000,000% anual en 2018. Un café que costaba 1 bolívar pasó a costar millones. La gente usaba billetes como servilletas porque el papel valía más que el dinero impreso en él.', verdict: 'Causa: gobierno imprimiendo dinero sin respaldo para financiar gasto público insostenible.' },
      { type: 'case', title: '🇩🇪 Alemania, República de Weimar (1921–1923)', text: 'Después de la Primera Guerra Mundial, Alemania tenía que pagar enormes reparaciones de guerra. Imprimió dinero para pagarlas. Los precios se duplicaban cada 3.7 días. La gente recibía su salario y corría a gastarlo antes del almuerzo porque al mediodía ya valía la mitad.', verdict: 'Se necesitaban carretillas llenas de billetes para comprar una barra de pan.' },

      { type: 'section', title: 'El otro extremo: Deflación' },
      { type: 'paragraph', text: 'La deflación (precios que bajan) parece buena pero es extremadamente peligrosa. Cuando los precios bajan, la gente deja de comprar esperando precios más bajos → las empresas venden menos → despiden empleados → menos gente tiene dinero → compran aún menos → espiral destructiva.' },
      { type: 'case', title: '🇯🇵 Japón — Las "décadas perdidas" (1991–actualidad)', text: 'Después del estallido de su burbuja inmobiliaria en 1991, Japón cayó en deflación. Los precios bajaban, la gente ahorraba en vez de gastar, las empresas no invertían. El banco central bajó la tasa a 0% y aun así la economía no se recuperaba. Japón lleva más de 30 años luchando contra la deflación.', verdict: 'La deflación es como arenas movedizas — una vez atrapado, es extremadamente difícil salir.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 9: POLÍTICA FISCAL
  // ═══════════════════════════════════════════════════════════════
  fiscal: {
    title: 'Política Fiscal',
    intro: 'La política fiscal es cómo el gobierno decide de dónde sacar dinero y en qué gastarlo. Afecta directamente tu bolsillo.',
    blocks: [
      { type: 'section', title: 'Las dos caras de la moneda' },
      { type: 'paragraph', text: 'La política fiscal tiene dos componentes: los ingresos (impuestos) y los gastos (gasto público). El gobierno cobra impuestos para financiar servicios: infraestructura, educación, salud, defensa, transferencias sociales.' },

      { type: 'section', title: 'Tipos de impuestos' },
      { type: 'example', title: 'Impuestos progresivos', text: 'Quien más gana, más paga (en porcentaje). Si ganas $1,000/mes pagas 10%, si ganas $10,000/mes pagas 30%. La idea es que los ricos pueden contribuir más sin afectar su nivel de vida.' },
      { type: 'example', title: 'Impuestos regresivos', text: 'El IVA (impuesto al valor agregado) es regresivo: todos pagan el mismo porcentaje. Pero para alguien que gana $500/mes, un IVA del 16% duele mucho más que para alguien que gana $50,000.' },

      { type: 'section', title: 'Déficit y deuda' },
      { type: 'paragraph', text: 'Cuando el gobierno gasta más de lo que recauda, tiene un déficit fiscal. Financia el déficit emitiendo deuda (bonos). La deuda nacional es la acumulación de todos los déficits a lo largo del tiempo. Se mide como porcentaje del PIB.' },
      { type: 'keypoint', text: 'La deuda no es inherentemente mala — un país puede endeudarse para invertir en infraestructura que generará crecimiento. El problema es cuando la deuda crece más rápido que la economía.' },

      { type: 'section', title: 'Política expansiva vs. contractiva' },
      { type: 'example', title: 'Política expansiva', text: 'Bajar impuestos y/o aumentar gasto para estimular la economía. Se usa en recesiones. Riesgo: más deuda e inflación. Ejemplo: los cheques de estímulo de EE.UU. durante COVID-19.' },
      { type: 'example', title: 'Política contractiva', text: 'Subir impuestos y/o reducir gasto para enfriar la economía. Reduce la inflación pero puede causar recesión y desempleo. Es políticamente impopular — ningún político quiere subir impuestos.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 10: MERCADOS Y COMERCIO
  // ═══════════════════════════════════════════════════════════════
  markets: {
    title: 'Mercados y Comercio',
    intro: 'Los mercados son donde se determina el precio de todo. Entenderlos es entender por qué las cosas cuestan lo que cuestan.',
    blocks: [
      { type: 'section', title: 'Oferta y demanda' },
      { type: 'paragraph', text: 'El precio de un bien se determina por la oferta (cuánto se produce) y la demanda (cuánto la gente quiere comprar). Cuando la demanda supera la oferta, los precios suben. Cuando la oferta supera la demanda, bajan.' },
      { type: 'keypoint', text: 'Esta es la ley más fundamental de la economía. Todo lo demás — inflación, salarios, tipos de cambio — se puede entender a través de oferta y demanda.' },

      { type: 'section', title: 'Fallos del mercado' },
      { type: 'example', title: 'Monopolios', text: 'Cuando una sola entidad controla todo el mercado, no hay competencia. Puede fijar precios altos y ofrecer mala calidad porque el consumidor no tiene alternativa. Por eso existen las leyes antimonopolio.' },
      { type: 'example', title: 'Externalidades', text: 'Cuando una transacción afecta a terceros. Una fábrica contamina un río — el costo lo pagan los habitantes, no la fábrica. Los gobiernos intervienen con regulaciones e impuestos para corregir estas externalidades.' },

      { type: 'section', title: 'Burbujas y crashes' },
      { type: 'paragraph', text: 'Las burbujas económicas ocurren cuando los precios de activos suben muy por encima de su valor real, impulsados por especulación y la creencia de que "siempre van a subir".' },
      { type: 'case', title: '🌷 La manía de los tulipanes (1637)', text: 'En los Países Bajos, el precio de los bulbos de tulipán subió hasta costar más que una casa. La gente compraba bulbos no porque los quisiera, sino para revenderlos más caros. Cuando la confianza colapsó, los precios cayeron un 99% en semanas.', verdict: 'La primera burbuja especulativa documentada — y la lección se repite cada generación.' },
      { type: 'case', title: '💻 Burbuja Dot-com (2000)', text: 'Empresas de internet sin ingresos ni modelo de negocio valían miles de millones en bolsa. "¿Ganancias? Lo importante es crecer." Cuando el mercado corrigió, el NASDAQ cayó un 78%. Empresas como Pets.com perdieron el 99% de su valor.', verdict: 'La tecnología era real, pero las valoraciones eran fantasía. Muchas empresas actuales exitosas nacieron de las cenizas del crash.' },
      { type: 'case', title: '🏠 Crisis inmobiliaria (2008)', text: 'Los bancos daban hipotecas a cualquiera ("¿Tienes pulso? Aprobado"). Los precios de las casas "nunca bajan". Cuando los compradores no pudieron pagar, los precios se derrumbaron, los bancos quebraron, y la economía mundial entró en recesión.', verdict: 'La crisis más grande desde 1929. Demostró que los bancos sin supervisión pueden destruir la economía global. Ve al módulo "La Crisis del 2008" para entenderla con números.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 11: LA CRISIS DEL 2008
  // ═══════════════════════════════════════════════════════════════
  'crisis-2008': {
    title: 'La Crisis del 2008',
    intro: 'La peor crisis financiera desde 1929, explicada paso a paso con números. Entender qué pasó es entender las debilidades del sistema bancario moderno.',
    blocks: [
      { type: 'section', title: 'Lo que pasó, en simple' },
      { type: 'paragraph', text: 'Los bancos prestaron plata a gente que no podía pagar. Hipotecas a personas sin ingresos suficientes, porque mientras las casas subían de precio, todos ganaban. Las casas dejaron de subir, la gente no pudo pagar, y los bancos se quedaron con casas que valían menos de lo que prestaron.' },
      { type: 'keypoint', text: 'El problema fue simple: prestaron plata a quien no debían. Cuando no les pagaron, todo colapsó.' },

      { type: 'section', title: 'La crisis con números' },
      { type: 'paragraph', text: 'Veamos qué le pasa a un banco típico:' },

      { type: 'diagram', rows: [
        'UN BANCO ANTES DE LA CRISIS:',
        '',
        'Depósitos de clientes:     $100M',
        'Reservas en caja (10%):    $10M',
        'Prestado en hipotecas:     $90M',
        'Valor de las casas:        $90M ← respaldo',
        '',
        '════════════════════════════════════════',
        '',
        'ESTALLA LA BURBUJA:',
        '',
        'Depósitos de clientes:     $100M  (no cambió)',
        'Reservas en caja:          $10M   (no cambió)',
        'Gente deja de pagar:       $90M → impagos',
        'Valor de las casas AHORA:  $50M ← cayeron',
        '',
        'El banco tiene:',
        '  $10M en caja',
        '+ $50M en casas que nadie quiere',
        '= $60M total',
        '',
        'Pero DEBE a sus clientes:  $100M',
        'LE FALTAN:                 $40M',
        '',
        'Si todos van a sacar su plata → solo hay $10M.',
        '→ QUIEBRA.',
      ]},

      { type: 'section', title: 'El efecto dominó' },
      { type: 'paragraph', text: 'El problema no se quedó en un banco. Los bancos habían empaquetado esas hipotecas tóxicas en productos financieros complejos (MBS, CDOs) y los vendieron como "inversiones seguras" a otros bancos y fondos. Cuando las hipotecas fallaron, todos perdieron.' },

      { type: 'diagram', rows: [
        'LA CADENA DE CONTAGIO:',
        '',
        '1. Hipotecas impagadas',
        '   └→ 2. Bancos con pérdidas enormes',
        '         └→ 3. Bancos dejan de prestarse entre sí',
        '               └→ 4. CRÉDITO SE CONGELA',
        '                     └→ 5. Empresas sin financiamiento',
        '                           └→ 6. Despidos masivos',
        '                                 └→ 7. Gente sin ingreso',
        '                                       └→ 8. Menos consumo',
        '                                             └→ 9. Más empresas quiebran',
        '                                                   └→ Vuelve a 6 ↑',
      ]},

      { type: 'keypoint', text: 'Las empresas perdieron acceso al crédito. La mayoría no funciona solo con lo que vende — necesita préstamos para pagar nómina, comprar inventario, cubrir gastos fijos mientras espera cobrar. Cuando el banco dice "no", incluso empresas sanas tienen que despedir o cerrar.' },

      { type: 'section', title: '¿Y la gente común?' },
      { type: 'paragraph', text: 'El gobierno rescató a los bancos con dinero público. Pero la gente común no recibió rescate. Veamos los números de una familia típica en EEUU:' },

      { type: 'diagram', rows: [
        'IMPACTO EN UNA FAMILIA PROMEDIO:',
        '',
        '                      2007        2009          2012',
        '                     (antes)    (crisis)    (recuperación)',
        '──────────────────── ────────── ──────────── ──────────────',
        'Salario anual        $50,000    $42,000*     $46,000',
        'Valor de su casa     $220,000   $140,000     $160,000',
        'Ahorros/inversiones  $80,000    $45,000      $55,000',
        'Deuda hipotecaria    $180,000   $180,000     $170,000',
        '',
        '* O $0 si fue despedido',
        '',
        'Lo clave: LA DEUDA NO BAJA, pero todo lo demás SÍ.',
        'Tu casa vale menos de lo que debes.',
        'Tu salario bajó o lo perdiste.',
        'Tus ahorros se evaporaron con la bolsa.',
      ]},

      { type: 'section', title: 'La asimetría del rescate' },

      { type: 'diagram', rows: [
        'TIEMPO DE RECUPERACIÓN:',
        '',
        'Los bancos:    ~2 años (con dinero público)',
        'Las empresas:  ~3-4 años',
        'La gente:      ~7-10 años',
        'Algunos:       NUNCA se recuperaron',
        '',
        'El banco se recuperó en 2 años con dinero público.',
        'La familia promedio tardó 7-10 años en volver',
        'a donde estaba antes de la crisis.',
      ]},

      { type: 'keypoint', text: 'El gobierno rescató a los bancos — no a la gente — porque la idea era reabrir el grifo del crédito para que las empresas pudieran volver a operar y contratar. Funcionó, pero tardó años y el costo social fue enorme. El rescate salva al sistema financiero, pero el costo lo absorben los consumidores.' },

      { type: 'section', title: '¿Por qué despidieron a tanta gente?' },
      { type: 'paragraph', text: 'Porque las empresas no podían funcionar sin crédito bancario. La cadena es directa:' },

      { type: 'diagram', rows: [
        'Banco sin plata',
        '  └→ No presta',
        '       └→ Empresa sin crédito',
        '            └→ No puede pagar nómina',
        '                 └→ Despide gente',
        '                      └→ Gente sin ingreso',
        '                           └→ Deja de comprar',
        '                                └→ Empresa vende menos',
        '                                     └→ Más despidos',
        '',
        'Un restaurante que vende bien pero necesita un',
        'préstamo puente para pagar proveedores este mes:',
        'si el banco dice "no", tiene que despedir o cerrar.',
        'No porque el negocio sea malo, sino porque NO HAY CRÉDITO.',
      ]},

      { type: 'section', title: 'Las lecciones' },
      { type: 'example', title: 'Para el sistema', text: 'Se crearon regulaciones más estrictas (Dodd-Frank en EEUU, Basilea III global). Los bancos ahora deben tener más reservas y pasar "pruebas de estrés" que simulan crisis. Pero muchos economistas argumentan que no es suficiente — el sistema sigue basándose en reserva fraccionaria y deuda.' },
      { type: 'example', title: 'Para las personas', text: 'Las empresas que sobrevivieron mejor fueron las que NO dependían de crédito bancario — tenían caja propia. Las personas que se recuperaron más rápido fueron las que tenían ahorros, múltiples fuentes de ingreso, y deuda baja. La lección personal: no dependas de una sola fuente de ingreso y mantén tu deuda controlada.' },

      { type: 'keypoint', text: 'La crisis del 2008 no fue un evento aislado — es una consecuencia natural de un sistema donde los bancos pueden prestar 90% de lo que reciben y cobrar interés sobre dinero que no existe. Cada generación tiene su versión: tulipanes (1637), ferrocarriles (1873), bolsa (1929), inmobiliaria (2008). El patrón se repite porque la estructura no cambia.' },
    ],
  },
};

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'section':
      return <h2 className="text-xl font-bold mt-10 mb-4 text-[var(--foreground)]">{block.title}</h2>;

    case 'paragraph':
      return <p className="text-[var(--text-secondary)] leading-relaxed mb-4">{block.text}</p>;

    case 'keypoint':
      return (
        <div className="border-l-4 border-[var(--keypoint-border)] bg-[var(--keypoint-bg)] px-5 py-4 rounded-r-lg mb-4">
          <p className="text-sm leading-relaxed text-[var(--keypoint-text)]">{block.text}</p>
        </div>
      );

    case 'example':
      return (
        <div className="border border-[var(--example-border)] bg-[var(--example-bg)] rounded-xl px-5 py-4 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--example-label)] mb-1.5">{block.title}</p>
          <p className="text-sm leading-relaxed text-[var(--example-text)]">{block.text}</p>
        </div>
      );

    case 'case':
      return (
        <div className="border border-[var(--border)] rounded-xl overflow-hidden mb-4">
          <div className="px-5 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
            <p className="text-sm font-semibold">{block.title}</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{block.text}</p>
            {block.verdict && (
              <p className="mt-3 text-xs font-medium text-[var(--foreground)] bg-[var(--surface)] px-3 py-2 rounded-lg">
                → {block.verdict}
              </p>
            )}
          </div>
        </div>
      );

    case 'diagram':
      return (
        <div className="bg-[var(--diagram-bg)] text-[var(--diagram-text)] rounded-xl px-5 py-4 mb-4 font-mono text-xs leading-relaxed overflow-x-auto">
          {block.rows.map((row, i) => (
            <div key={i} className={row === '' ? 'h-2' : ''}>{row}</div>
          ))}
        </div>
      );
  }
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;

  if (topic === 'circuito-chile') {
    return (
      <main className="min-h-screen bg-[var(--background)] py-12 px-6">
        <FloatingThemeToggle />
        <div className="max-w-5xl mx-auto">
          <Link href="/learn" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] mb-6 block">
            ← Volver a Aprender
          </Link>
          <CircuitoChile />
          <div className="mt-12 p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <p className="text-sm font-medium mb-2">Practica este concepto</p>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Usa la simulación para experimentar con estos conceptos en tiempo real.
            </p>
            <Link
              href="/play"
              className="inline-block px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Ir a la Simulación
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const data = TOPIC_CONTENT[topic];

  if (!data) {
    return (
      <main className="min-h-screen bg-[var(--background)] py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/learn" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] mb-6 block">
            ← Volver
          </Link>
          <h1 className="text-2xl font-bold">Tema no encontrado</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-6">
      <FloatingThemeToggle />
      <div className="max-w-2xl mx-auto">
        <Link href="/learn" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] mb-6 block">
          ← Volver a Aprender
        </Link>

        <h1 className="text-3xl font-bold mb-3">{data.title}</h1>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-base">{data.intro}</p>

        <div>
          {data.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <p className="text-sm font-medium mb-2">Practica este concepto</p>
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            Usa la simulación para experimentar con estos conceptos en tiempo real.
          </p>
          <Link
            href="/play"
            className="inline-block px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Ir a la Simulación
          </Link>
        </div>
      </div>
    </main>
  );
}
