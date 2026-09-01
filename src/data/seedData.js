// Seed content for Malina Garden. Loaded into localStorage on first run.
// All images use picsum.photos seeded URLs so they load without API keys.
//
// Categories are stable keys — display labels live in src/i18n/messages/*.js.
// Each post keeps language-neutral fields at the top level and its copy under
// `i18n`, so the slug (and therefore every /projects/:slug URL) stays single.

export const CATEGORIES = [
  'design',
  'planting',
  'maintenance',
  'sustainability',
  'seasonal',
];

export const seedPosts = [
  {
    id: 'post-raised-beds',
    slug: 'building-raised-beds-that-last',
    coverImage: 'https://picsum.photos/seed/raisedbeds-cover/1200/675',
    category: 'design',
    author: 'Maya Fernsby',
    date: '2026-06-28',
    i18n: {
      sr: {
        title: 'Podignute leje koje traju deceniju',
        excerpt:
          'Dobro napravljena podignuta leja vraća uloženo godinama. Evo kako projektujemo i gradimo leje koje ostaju u pravom uglu, dobro se dreniraju i daju obilan rod.',
        content: `Podignute leje su kičma produktivnog vrta koji ne lomi leđa. U proleće se ranije zagreju, voda kroz njih slobodno otiče, a zemlja ostaje rastresita jer po njoj nikada ne gazite.

![Sveže napravljene leje od kedrovine](https://picsum.photos/seed/raisedbeds-inline/800/450)

## Zašto ih volimo

- **Bolja drenaža** — nema više zagušenog korena posle jake kiše.
- **Manje korova** — jasna ivica zaustavlja travu koja se širi.
- **Blaže prema leđima** — vrt negujete bez klečanja u blatu.

## Izbor pravog materijala

Gradimo gotovo isključivo od **netretirane kedrovine** ili **ariša**. Oba prirodno odolevaju truljenju i vremenom dobiju meku srebrnosivu patinu koja se lepo uklapa u svaki vrt.

1. Merite dvaput — leja šira od *1,2 metra* teško se dohvata s obe strane.
2. Dno obložite kartonom da ugušite postojeći busen trave.
3. Napunite mešavinom baštenske zemlje, komposta i lisnog humusa.

> Podignuta leja vredi tačno onoliko koliko i ono čime je napunite. Hranite zemlju, a zemlja će hraniti biljke.

Ostavite drvenariji punu sezonu da se slegne, svakog proleća dopunite zemlju i dobra leja će vam služiti deset godina i duže.`,
      },
      en: {
        title: 'Building Raised Beds That Last a Decade',
        excerpt:
          'A well-built raised bed pays you back for years. Here is how we design and construct beds that stay square, drain well, and grow abundant harvests.',
        content: `Raised beds are the backbone of a productive, low-strain garden. They warm up earlier in spring, drain freely, and keep your soil loose because you never walk on it.

![Freshly built cedar raised beds](https://picsum.photos/seed/raisedbeds-inline/800/450)

## Why we love them

- **Better drainage** — no more waterlogged roots after heavy rain.
- **Fewer weeds** — a defined edge keeps encroaching grass out.
- **Kinder on your back** — tend the garden without kneeling in mud.

## Choosing the right material

We build almost exclusively with **untreated cedar** or **larch**. Both resist rot naturally and weather to a soft silver-grey that looks at home in any garden.

1. Measure twice — a bed wider than *1.2 metres* is hard to reach across.
2. Line the base with cardboard to smother existing turf.
3. Fill with a blend of topsoil, compost, and leaf mould.

> A raised bed is only as good as what you put in it. Feed the soil, and the soil feeds the plants.

Give the timber a full season to settle, top up the soil each spring, and a good bed will serve you for ten years or more.`,
      },
    },
  },
  {
    id: 'post-pollinator-border',
    slug: 'pollinator-border-every-season',
    coverImage: 'https://picsum.photos/seed/pollinator-cover/1200/675',
    category: 'planting',
    author: 'Theo Marsh',
    date: '2026-06-15',
    i18n: {
      sr: {
        title: 'Leja za oprašivače koja cveta u svakoj sezoni',
        excerpt:
          'Pčelama, leptirima i osolikim muvama treba paše od marta do oktobra. Ovaj plan sadnje čini da nešto cveta sve vreme.',
        content: `Vrt koji bruji od života nije slučajnost. Tajna je u *smeni* — sadite tako da se, čim jedan cvet prođe, otvori sledeći.

![Leja puna pčela i leptira](https://picsum.photos/seed/pollinator-inline/800/450)

## Pravilo tri sezone

Leju delimo na tri talasa koji se preklapaju:

### Prolećna paša
- Plućnjak
- Krokusi i muskari
- Ukrasna ribizla

### Letnje obilje
- Lavanda i mačja metvica
- Ehinacea
- Žalfija 'Amistad'

### Jesenji nektar
- Sedum (Hylotelephium)
- Jesenja astra
- Verbena bonariensis

## Nekoliko zlatnih pravila

1. Sadite u **grupama od najmanje pet biljaka** — oprašivači lakše pronađu veće mrlje boje.
2. Ostavite osušene cvasti preko zime, zbog strukture i hrane za ptice.
3. Potpuno izbegavajte pesticide.

> Ciljajte na bar dve medonosne biljke u cvetu tokom svakog meseca vegetacije.

Uradite to i vaša leja će biti puna života od prvog toplog dana u martu do poslednjeg u oktobru.`,
      },
      en: {
        title: 'Designing a Pollinator Border for Every Season',
        excerpt:
          'Bees, butterflies, and hoverflies need forage from March to October. This planting plan keeps something in bloom the whole way through.',
        content: `A garden that hums with life is no accident. The secret is *succession* — planting so that as one flower fades, another opens.

![A border alive with bees and butterflies](https://picsum.photos/seed/pollinator-inline/800/450)

## The three-season rule

We split the border into three overlapping waves:

### Spring forage
- Pulmonaria
- Crocus and grape hyacinth
- Flowering currant

### Summer abundance
- Lavender and catmint
- Echinacea
- Salvia 'Amistad'

### Autumn nectar
- Sedum (Hylotelephium)
- Michaelmas daisy
- Verbena bonariensis

## A few golden rules

1. Plant in **drifts of at least five** — pollinators find blocks of colour more easily.
2. Leave the seedheads standing over winter for structure and bird food.
3. Skip the pesticides entirely.

> Aim for at least two nectar plants in flower during every month of the growing season.

Do this, and your border will be busy from the first warm day of March to the last of October.`,
      },
    },
  },
  {
    id: 'post-lawn-to-meadow',
    slug: 'tired-lawn-to-wildflower-meadow',
    coverImage: 'https://picsum.photos/seed/meadow-cover/1200/675',
    category: 'sustainability',
    author: 'Maya Fernsby',
    date: '2026-05-30',
    i18n: {
      sr: {
        title: 'Od umornog travnjaka do livade divljeg cveća',
        excerpt:
          'Zamena žednog travnjaka mini-livadom smanjuje košenje, hrani divlji svet i izgleda predivno. Evo realnog metoda, korak po korak.',
        content: `Klasičan travnjak je zelena pustinja — žedan, gladan i zahteva stalno košenje. Livada divljeg cveća daje mnogo više, uz daleko manje truda.

![Mlada livada divljeg cveća početkom leta](https://picsum.photos/seed/meadow-inline/800/450)

## Iskreno o livadama

One *nisu* bez održavanja, ali jesu **niskog** održavanja. Trik je u smanjenju plodnosti zemljišta, da trave ne nadjačaju cveće.

## Naša konverzija u četiri koraka

1. **Iscrpite plodnost.** Celu sezonu skupljajte pokošenu travu posle svakog košenja; nikada ne prihranjujte.
2. **Otvorite busen.** Temeljno vertikutirajte da ogolite zemlju i seme dođe u dodir s njom.
3. **Posejte zvečac.** Ovaj domišljati poluparazit slabi bujne trave.
4. **Dodajte sadnice** ivančice, zečine i udovičice.

### Šta da očekujete, godinu po godinu

- **1. godina:** rupičasto i pomalo neuredno — verujte procesu.
- **2. godina:** zvečac se primi, cveće se ustali.
- **3. godina:** prava livada, koja bruji od insekata.

> Pokosite jednom, krajem leta, sklonite seno i pustite je da se sama zaseje. To je ceo godišnji ritual.

Manje košenja, više leptira i vrt koji se prelepo menja iz sezone u sezonu.`,
      },
      en: {
        title: 'From Tired Lawn to Wildflower Meadow',
        excerpt:
          'Swapping a thirsty lawn for a mini-meadow cuts your mowing, feeds wildlife, and looks glorious. Here is the realistic, step-by-step method.',
        content: `A traditional lawn is a green desert — thirsty, hungry, and demanding constant mowing. A wildflower meadow gives more back for far less effort.

![A young wildflower meadow in early summer](https://picsum.photos/seed/meadow-inline/800/450)

## The honest truth about meadows

They are *not* no-maintenance, but they are **low**-maintenance. The trick is reducing soil fertility so grasses do not out-compete the flowers.

## Our four-step conversion

1. **Strip the fertility.** Remove clippings after every cut for a season; never feed.
2. **Open the sward.** Scarify hard to expose bare soil for seed contact.
3. **Sow yellow rattle.** This clever parasite weakens vigorous grasses.
4. **Add plug plants** of oxeye daisy, knapweed, and field scabious.

### What to expect, year by year

- **Year 1:** patchy, a little scruffy — trust the process.
- **Year 2:** rattle takes hold, flowers establish.
- **Year 3:** a genuine meadow, humming with insects.

> Cut once in late summer, lift the hay, and let it self-seed. That is the whole annual routine.

Less mowing, more butterflies, and a garden that changes beautifully with the seasons.`,
      },
    },
  },
  {
    id: 'post-winter-pruning',
    slug: 'gardeners-guide-winter-pruning',
    coverImage: 'https://picsum.photos/seed/pruning-cover/1200/675',
    category: 'maintenance',
    author: 'Theo Marsh',
    date: '2026-01-18',
    i18n: {
      sr: {
        title: 'Vrtlarski vodič kroz zimsku rezidbu',
        excerpt:
          'Zima je idealno vreme da oblikujete jabuke, gliciniju i ruže dok spavaju. Naučite rezove koji vode ka zdravijim i rodnijim biljkama.',
        content: `Kada list opadne i sokovi se povuku, konačno *vidite* strukturu biljke. Zato je zima savršena sezona za rezidbu oblikovanja.

![Čisti rezovi na uspavanom stablu jabuke](https://picsum.photos/seed/pruning-inline/800/450)

## Prvo alat

- Oštre makaze za rezidbu s mimoilazećim sečivima
- Sklopiva testerica za sve deblje od palca
- Makaze na dugim drškama za nezgodnu sredinu
- Krpa i alkohol za dezinfekciju između biljaka

## Tri „O“

Šta god da režete, uvek počnite uklanjanjem grana koje su:

1. **Osušene**
2. **Obolele**
3. **Oštećene**

Tek *tada* pređite na oblikovanje.

## Biljka po biljka

### Jabuke i kruške
Težite otvorenom obliku pehara, da svetlost i vazduh dopru do sredine. Uklonite grane koje se ukrštaju i bujne uspravne *vodopije*.

### Glicinija
Skratite bujne letnje izdanke na dva do tri pupoljka — upravo to izaziva one čuvene vodopade cvetova.

> Nikada ne uklanjajte više od četvrtine krošnje u toku jedne zime.

Ne žurite, često se odmaknite i pogledajte celinu i zapamtite: granu ne možete zalepiti nazad.`,
      },
      en: {
        title: 'The Gardener’s Guide to Winter Pruning',
        excerpt:
          'Winter is the ideal time to shape apples, wisteria, and roses while they sleep. Learn the cuts that lead to healthier, more productive plants.',
        content: `When the leaves are down and the sap is low, you can finally *see* the structure of a plant. That makes winter the perfect season for structural pruning.

![Clean pruning cuts on a dormant apple tree](https://picsum.photos/seed/pruning-inline/800/450)

## First, the toolkit

- Sharp bypass secateurs
- A folding pruning saw for anything thicker than a thumb
- Loppers for the awkward middle ground
- A cloth and rubbing alcohol to sterilise between plants

## The three D's

Whatever you are pruning, always start by removing wood that is:

1. **Dead**
2. **Diseased**
3. **Damaged**

Only *then* move on to shaping.

## Plant by plant

### Apples and pears
Aim for an open, goblet shape so light and air reach the centre. Remove crossing branches and the vigorous vertical *water shoots*.

### Wisteria
Cut back the summer's whippy growth to two or three buds — this is what triggers those famous cascades of flower.

> Never remove more than a quarter of a plant's canopy in a single winter.

Take your time, step back often, and remember: you cannot glue a branch back on.`,
      },
    },
  },
  {
    id: 'post-container-shade',
    slug: 'container-plants-that-thrive-in-shade',
    coverImage: 'https://picsum.photos/seed/shade-cover/1200/675',
    category: 'seasonal',
    author: 'Priya Ellwood',
    date: '2026-04-09',
    i18n: {
      sr: {
        title: 'Deset biljaka za saksije koje uspevaju u senci',
        excerpt:
          'Senovito dvorište ili balkon nisu ograničenje — to je prilika za bujnu, lisnatu dramu. Ovih deset biljaka zaslužuje mesto u saksiji.',
        content: `Senka se često doživljava kao problem koji treba rešiti. Mi je vidimo drugačije — ona je savršena pozornica za hladne zelene tonove, upadljivo lišće i smirenu sadnju.

![Grupa lisnatih biljaka za senku u saksijama](https://picsum.photos/seed/shade-inline/800/450)

## Prvo lišće

Pri slabom svetlu *lišće* radi više posla od cvetova. Posegnite za teksturom i oblikom:

- **Hoste** — neprikosnovene kraljice senovite saksije.
- **Paprati** — jelenji jezik i japanska šarena paprat.
- **Hojhere** — za dašak karamele ili šljive.

## Za malo boje

1. Astilba — perjaste cvasti u nežnim nijansama roze.
2. Fuksija — pouzdana i dugo cveta.
3. Vodenika — klasika za senovite žardinjere.

## Nega saksija u senci

- Senka **ne** znači da ne treba zalivati — kiša često promaši saksije pod strehom.
- Prihranjujte na svakih petnaest dana tokom leta uravnoteženim tečnim đubrivom.
- Svakog proleća osvežite gornjih nekoliko centimetara supstrata.

> Grupa neparnog broja saksija — tri, pet, sedam — uvek izgleda prirodnije od urednog para.

Zbijte saksije u grupu, varirajte visine i najmračniji ćošak postaje zeleno utočište.`,
      },
      en: {
        title: 'Ten Container Plants That Thrive in Shade',
        excerpt:
          'A shady courtyard or balcony is not a limitation — it is an opportunity for lush, leafy drama. These ten performers earn their place in a pot.',
        content: `Shade is often treated as a problem to solve. We see it differently — it is the perfect stage for cool greens, bold foliage, and calm, restful planting.

![A collection of leafy shade-loving containers](https://picsum.photos/seed/shade-inline/800/450)

## Foliage first

In low light, *leaves* do more work than flowers. Reach for texture and shape:

- **Hostas** — the undisputed champions of the shady pot.
- **Ferns** — hart's tongue and Japanese painted fern.
- **Heuchera** — for a splash of caramel or plum.

## For a little colour

1. Astilbe — feathery plumes in soft pinks.
2. Fuchsia — reliable and long-flowering.
3. Impatiens — the classic shade bedding.

## Care notes for pots in shade

- Shade does **not** mean skip watering — rain often misses containers under eaves.
- Feed fortnightly through summer with a balanced liquid feed.
- Refresh the top few centimetres of compost each spring.

> A grouping of odd numbers — three, five, seven pots — always looks more natural than a tidy pair.

Cluster your containers, vary the heights, and even the darkest corner becomes a green retreat.`,
      },
    },
  },
];
