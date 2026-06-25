# Mapa del flujo del dinero — relaciones (fuente de verdad)

Este documento define **todos los agentes** y **todas las relaciones de dinero**
entre ellos. El componente `src/components/learn/MapaFlujo.tsx` se construye a
partir de esta tabla: cada relación de aquí es una flecha en el mapa.

Regla de oro: **toda flecha mueve dinero y tiene un monto**. Nada de "influencia"
sin plata. La influencia se explica en el texto, pero la flecha que se dibuja es
la compra que genera (NPCs → empresa).

---

## 1. Agentes (21)

| id | nombre | grupo | rol en una frase |
|----|--------|-------|------------------|
| `cobre` | Cobre · Codelco | recurso | Exporta cobre, entra plata nueva al país |
| `litio` | Litio · SQM | recurso | Exporta litio |
| `export` | Exportación | recurso | Convierte recursos en dólares |
| `central` | Banco Central | estado | Imprime y presta dinero base |
| `gobierno` | Gobierno | estado | Cobra impuestos, gasta en bonos/obras |
| `bancos` | Bancos · BCI | banca | Crean dinero como deuda, cobran interés |
| `afp` | AFP | banca | Toma el 10% forzoso, compra acciones |
| `falabella` | Falabella | empresa | Retail: pide crédito, vende, hace marketing |
| `cencosud` | Cencosud · Jumbo | empresa | Supermercado: consumo obligatorio |
| `copec` | Copec | empresa | Combustible/energía: insumo de todo |
| `constructora` | Constructora | empresa | Vive del crédito, emplea muchos NPCs |
| `importador` | Importador | empresa | Trae productos de China para las empresas |
| `exterior` | Exterior · China | recurso | Fábricas extranjeras; reciben dólares que salen de Chile |
| `agencia` | Agencia Marketing | marketing | Reparte la plata de marketing |
| `productora` | Productora | marketing | Graba comerciales, contrata NPCs |
| `gymapp` | Tu App · Gym | mio | Suscripción de miles de NPCs (**solo NPCs**) |
| `sharebet` | Tu App · ShareBet | mio | NPCs pagan por usar la app (**solo NPCs**) |
| `consultora` | Tu Consultora | mio | Le vende servicios/asesoría a las empresas (**B2B**) |
| `casino` | Casino | empresa | Gana con las apuestas de los NPCs; te paga **sponsorship** |
| `tu` | TÚ (dueño) | mio | Recibe el flujo de tus negocios. Tus negocios cuelgan **abajo a la derecha** |
| `influencer` | NPC influencer | npc | NPC que escaló; lo paga la agencia |
| `juan` | Juan · NPC ejemplo | npc | El NPC concreto ($650k/mes) |
| `npcs` | Los NPCs · millones | npc | Todos los Juan juntos |
| `endeudados` | NPCs endeudados | npc | Piden crédito y pagan interés |

---

## 2. Relaciones (flechas) por bloque

Formato: **origen → destino · tipo · monto · por qué · capítulos**

### A. De dónde nace el dinero (fuentes)
1. `central → bancos` · préstamo · **a 5%** · el BC crea dinero base y se lo presta a los bancos · `[empresa, todo]`
2. `central → gobierno` · préstamo · **bonos** · el BC compra bonos del gobierno (financia déficit) · `[todo]`
3. `cobre → export` · recurso · **US$45.000M** · Codelco exporta cobre · `[empresa, todo]`
4. `litio → export` · recurso · **US$7.000M** · SQM exporta litio · `[empresa, todo]`
5. `export → gobierno` · impuesto · **US$2.000M** · royalty e impuestos a la exportación · `[empresa, todo]`
6. `export → bancos` · recurso · **comisión + presta** · el banco cambia los dólares del exportador a pesos (se queda la comisión / spread FX) y presta esos depósitos a interés → **así gana con cada exportación** · `[empresa, todo]`
7. `cobre → npcs` · sueldo · **sueldos minería** · la minería paga sueldos (altos) · `[todo]`

### B. Banca: presta a empresas y personas, cobra interés
8. `bancos → falabella` · préstamo · **$500M** · crédito para operar/expandir · `[empresa, todo]`
9. `bancos → cencosud` · préstamo · **$400M** · línea de crédito · `[todo]`
10. `bancos → constructora` · préstamo · **$800M** · crédito para obras · `[empresa, todo]`
11. `bancos → copec` · préstamo · **$300M** · crédito · `[todo]`
12. `bancos → endeudados` · préstamo · **$400k c/u** · crédito de consumo · `[todo]`
13. `bancos → tu` · préstamo · **$200M** · te presta al ver el flujo entrar · `[mio, todo]`
14. `falabella → bancos` · interés · **$540M** · devuelve préstamo + interés · `[empresa, todo]`
15. `endeudados → bancos` · interés · **$45k/mes** · cuota tarjeta al 35% · `[todo]`

### C. Gobierno: gasta y recauda
16. `gobierno → npcs` · sueldo · **bono $50k** · bonos y sueldos públicos · `[empresa, todo]`
17. `falabella → gobierno` · impuesto · **IVA+renta** · impuestos de la empresa · `[todo]`
18. `npcs → gobierno` · impuesto · **IVA 19%** · IVA en cada compra · `[todo]`
19. `copec → gobierno` · impuesto · **imp. específico** · impuesto al combustible · `[todo]`

### D. AFP: el 10% forzoso
20. `juan → afp` · AFP · **$65k** · 10% del sueldo de Juan · `[sueldo]`
21. `npcs → afp` · AFP · **$65k c/u** · cotización forzosa de todos · `[todo]`
22. `afp → falabella` · AFP · **$2.000M** · invierte el ahorro en acciones de las grandes empresas · `[todo]`
23. `afp → copec` · AFP · **acciones** · invierte en acciones · `[todo]`
24. `afp → npcs` · sueldo · **pensión $280k** · al jubilar devuelve poco · `[todo]`

### E. Empresas → NPCs (sueldos, pagan poco)
25. `falabella → juan` · sueldo · **$650k** · sueldo de Juan (el ejemplo) · `[sueldo, todo]`
26. `falabella → npcs` · sueldo · **$650k** · sueldos (la masa) · `[todo]`
27. `cencosud → npcs` · sueldo · **$550k** · sueldos · `[todo]`
28. `constructora → npcs` · sueldo · **$700k** · sueldos de obra · `[todo]`
29. `copec → npcs` · sueldo · **$600k** · sueldos · `[todo]`
30. `importador → npcs` · sueldo · **$500k** · pocos empleos · `[todo]`

### F. NPCs → Empresas (consumo, devuelven casi todo)
31. `juan → cencosud` · consumo · **$250k** · comida del mes · `[sueldo]`
32. `juan → falabella` · consumo · **$120k** · ropa, tele, muebles (CMR) · `[sueldo]`
33. `npcs → falabella` · consumo · **+$45M** · compran lo promocionado → vuelve a Falabella · `[marketing, todo]`
34. `npcs → cencosud` · consumo · **$250k c/u** · comida obligatoria · `[todo]`
35. `npcs → copec` · consumo · **$80k c/u** · bencina · `[todo]`
36. `endeudados → falabella` · consumo · **a crédito** · consumo con CMR · `[todo]`

### F2. Sostenibilidad: cada empresa recupera y devuelve el préstamo
> Regla: ninguna empresa solo "recibe préstamo y paga sueldos". Toda empresa
> que pide crédito tiene un ingreso (ventas u obras) y devuelve el préstamo —
> por eso puede pedir otro. Auditado por código (5/5 sostenibles).

- `gobierno → constructora` · consumo · **obras $400M** · el Estado le paga obras públicas · `[empresa, todo]`
- `npcs → constructora` · consumo · **compran depto** · la gente compra las casas/deptos que construye · `[todo]`
- `constructora → bancos` · interés · **$860M** · recupera y devuelve el préstamo → puede pedir otro · `[empresa, todo]`
- `cencosud → bancos` · interés · **+interés** · recupera con ventas y devuelve · `[todo]`
- `copec → bancos` · interés · **+interés** · recupera con ventas y devuelve · `[todo]`

| empresa | ingreso (recupera) | ¿pide préstamo? | ¿lo devuelve? |
|---------|--------------------|-----------------|---------------|
| falabella | NPCs, AFP, endeudados | sí ($500M) | sí ($540M) |
| cencosud | NPCs (comida) | sí ($400M) | sí (+interés) |
| copec | NPCs (bencina), AFP | sí ($300M) | sí (+interés) |
| constructora | obras del Estado + venta de deptos | sí ($800M) | sí ($860M) |
| importador | Falabella (le compra stock) | no | — |

### G. Importación (fuga de dinero al exterior)
37. `falabella → importador` · consumo · **paga stock** · le compra productos importados · `[empresa, todo]`
38. `importador → exterior` · consumo · **US$ salen** · paga a las fábricas en China → el dinero sale del país · `[empresa, todo]`
    > Antes esto iba `importador → export` y confundía importación con exportación. Ahora el destino es un nodo aparte (`exterior`), que es un **sumidero**: el dinero que llega ahí deja de circular en Chile.

### H. Cadena de marketing
39. `falabella → agencia` · marketing · **$30M** · le paga una campaña · `[marketing, todo]`
40. `cencosud → agencia` · marketing · **$15M** · publicidad · `[todo]`
41. `agencia → influencer` · marketing · **$3M** · paga al influencer (NPC) · `[marketing, todo]`
42. `influencer → npcs` · marketing (**punteada = influencia**) · **los hace comprar** · el influencer convence a su audiencia de comprar en Falabella · `[marketing, todo]`
43. `agencia → productora` · marketing · **$8M** · paga la grabación · `[marketing, todo]`
44. `productora → npcs` · sueldo · **$1,5M** · contrata NPCs por proyecto · `[marketing, todo]`
    > La influencia (#42) lleva a la compra real: la flecha #33 (`npcs → falabella · +$45M`).

### I. Mis apps: SOLO los NPCs me pagan → TÚ
45. `juan → gymapp` · mío · **$15k** · Juan suscrito a tu app · `[sueldo]`
46. `npcs → gymapp` · mío · **$45M/mes** · suscripción de miles de NPCs · `[mio, todo]`
47. `npcs → sharebet` · mío · **$20M/mes** · NPCs pagan por usar tu app · `[mio, todo]`
48. `gymapp → tu` · mío · **$30M/mes** · el flujo de la app desemboca en ti · `[mio, todo]`
49. `sharebet → tu` · mío · **$18M/mes** · el flujo de la app desemboca en ti · `[mio, todo]`

> Las apps **no** se conectan con empresas ni con el influencer: su única fuente son los NPCs.

### J. Tu consultora le vende servicios a las empresas (B2B) → TÚ
50. `falabella → consultora` · mío · **$8M** · Falabella te paga por servicios/asesoría · `[mio, todo]`
51. `cencosud → consultora` · mío · **$5M** · Cencosud te paga por servicios · `[mio, todo]`
52. `consultora → tu` · mío · **$10M/mes** · tu consultora desemboca en ti · `[mio, todo]`

### K. El casino: gana con los NPCs y te paga sponsorship (sostenible)
53. `npcs → casino` · consumo · **apuestas $90M** · los NPCs apuestan y pierden (la casa siempre gana) · `[mio, todo]`
54. `casino → npcs` · sueldo · **premios $60M** · paga algunos premios, menos de lo que recauda · `[todo]`
55. `casino → gobierno` · impuesto · **imp. juego** · impuesto al juego · `[todo]`
56. `casino → sharebet` · mío · **sponsorship $5M** · el casino patrocina tu app ShareBet (y de ahí llega a ti) · `[mio, todo]`

> Sostenibilidad del casino: recauda $90M en apuestas, paga $60M en premios + impuestos + sponsorship → le queda margen. La casa siempre gana.

---

## 3. Verificación (chequeada por código)

- **22/22 agentes** conectados en el diagrama completo (`todo`). ✅
- **Cada agente** aparece además en al menos un capítulo específico (1–4), no solo en el completo. ✅
  - `copec` entra al cap. 1 (Juan paga bencina) y `importador` + `endeudados` al cap. 2.
  - `consultora` entra al cap. 4.

El script de verificación vive en el commit; reglas: ningún agente solo-en-completo, ninguna flecha sin monto (salvo #42, marcada como influencia punteada).

## 4. Los loops que cuentan la historia

- **Loop de extracción:** falabella → juan (sueldo) → cencosud/falabella (consumo) → falabella. Lo que paga vuelve, pero pagando poco.
- **Loop AFP:** npcs → afp → falabella (acciones) → … el trabajador capitaliza a su jefe.
- **Loop de deuda:** central → bancos → empresas/endeudados → bancos (interés). Sin techo mientras los NPCs consuman.
- **Loop de marketing:** falabella → agencia → influencer → (influencia) → npcs → falabella. El influencer hace que los NPCs compren, y la plata vuelve a Falabella.
- **Hacia TI, dos fuentes separadas:**
  - **B2C (apps):** npcs → gymapp / sharebet → tú. Solo NPCs.
  - **B2B (consultora):** empresas → consultora → tú. Solo empresas.
  - Y el banco te presta ($200M) al ver ese flujo entrar.
