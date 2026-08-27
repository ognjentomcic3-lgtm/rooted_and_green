// Finished projects, shown on the homepage as an index rather than a card grid.
//
// Shape mirrors seedData.js: language-neutral facts stay at the top level
// (place names and years read the same in both catalogues) and only the copy
// lives under `i18n`. Imagery uses seeded picsum URLs so it loads without keys.
//
// `images[0]` is the one the hover preview shows; the rest fill the expanded
// row. Two or three reads best — the layout stops looking deliberate past four.

export const projects = [
  {
    id: 'gorica',
    place: 'Podgorica',
    year: 2026,
    images: [
      'https://picsum.photos/seed/rg-gorica-1/900/1200',
      'https://picsum.photos/seed/rg-gorica-2/900/1200',
      'https://picsum.photos/seed/rg-gorica-3/900/1200',
    ],
    i18n: {
      sr: {
        title: 'Dvorište pod borovima',
        summary:
          'Zapuštena kosina iza kuće pretvorena je u tri nivoa suvozida, sa sadnjom koja podnosi suvo leto i senku borova.',
        scope: ['Idejno rešenje', 'Zemljani radovi', 'Sadnja', 'Navodnjavanje'],
      },
      en: {
        title: 'Courtyard under the pines',
        summary:
          'A neglected slope behind the house became three dry-stone terraces, planted for dry summers and pine shade.',
        scope: ['Concept design', 'Earthworks', 'Planting', 'Irrigation'],
      },
    },
  },
  {
    id: 'tivat',
    place: 'Tivat',
    year: 2025,
    images: [
      'https://picsum.photos/seed/rg-tivat-1/900/1200',
      'https://picsum.photos/seed/rg-tivat-2/900/1200',
    ],
    i18n: {
      sr: {
        title: 'Vrt uz more',
        summary:
          'Mediteranska sadnja otporna na so i vetar, sa kamenim stazama koje vode od terase do mora.',
        scope: ['Idejno rešenje', 'Kamene staze', 'Sadnja', 'Rasveta'],
      },
      en: {
        title: 'A garden by the sea',
        summary:
          'Salt- and wind-tolerant Mediterranean planting, with stone paths running from the terrace down to the water.',
        scope: ['Concept design', 'Stone paths', 'Planting', 'Lighting'],
      },
    },
  },
  {
    id: 'cetinje',
    place: 'Cetinje',
    year: 2025,
    images: [
      'https://picsum.photos/seed/rg-cetinje-1/900/1200',
      'https://picsum.photos/seed/rg-cetinje-2/900/1200',
      'https://picsum.photos/seed/rg-cetinje-3/900/1200',
    ],
    i18n: {
      sr: {
        title: 'Obnova starog voćnjaka',
        summary:
          'Stabla su ostala — vratili smo im oblik, a ispod njih zasejali livadu koja se kosi dva puta godišnje.',
        scope: ['Orezivanje', 'Livada', 'Prihrana', 'Održavanje'],
      },
      en: {
        title: 'Reviving an old orchard',
        summary:
          'The trees stayed — we brought back their shape and sowed a meadow beneath them that is cut twice a year.',
        scope: ['Pruning', 'Meadow', 'Feeding', 'Maintenance'],
      },
    },
  },
  {
    id: 'budva',
    place: 'Budva',
    year: 2025,
    images: [
      'https://picsum.photos/seed/rg-budva-1/900/1200',
      'https://picsum.photos/seed/rg-budva-2/900/1200',
    ],
    i18n: {
      sr: {
        title: 'Krovna terasa u saksijama',
        summary:
          'Sve raste u posudama, jer se ispod nalazi stan. Sistem kap po kap je sakriven u ivičnjaku.',
        scope: ['Saksije', 'Navodnjavanje', 'Biodekoracija', 'Održavanje'],
      },
      en: {
        title: 'A roof terrace in pots',
        summary:
          'Everything grows in containers, because there is a flat below. The drip system hides inside the edging.',
        scope: ['Containers', 'Irrigation', 'Bio-decoration', 'Maintenance'],
      },
    },
  },
  {
    id: 'niksic',
    place: 'Nikšić',
    year: 2024,
    images: [
      'https://picsum.photos/seed/rg-niksic-1/900/1200',
      'https://picsum.photos/seed/rg-niksic-2/900/1200',
      'https://picsum.photos/seed/rg-niksic-3/900/1200',
    ],
    i18n: {
      sr: {
        title: 'Travnjak koji izdrži decu',
        summary:
          'Nivelisan teren, drenaža ispod i smeša trave koja podnosi igru — plus raspored košenja kojeg se držimo.',
        scope: ['Nivelacija', 'Drenaža', 'Travnjak', 'Redovno košenje'],
      },
      en: {
        title: 'A lawn that survives children',
        summary:
          'Levelled ground, drainage underneath and a hard-wearing grass mix — plus a mowing rota we actually keep.',
        scope: ['Levelling', 'Drainage', 'Lawn', 'Regular mowing'],
      },
    },
  },
  {
    id: 'kolasin',
    place: 'Kolašin',
    year: 2024,
    images: [
      'https://picsum.photos/seed/rg-kolasin-1/900/1200',
      'https://picsum.photos/seed/rg-kolasin-2/900/1200',
    ],
    i18n: {
      sr: {
        title: 'Planinski vrt bez zalivanja',
        summary:
          'Sadnja od domaćih vrsta koje same izdrže zimu i sušu, sa drvenom stazom kroz sredinu.',
        scope: ['Idejno rešenje', 'Drvena staza', 'Sadnja', 'Suzbijanje korova'],
      },
      en: {
        title: 'A mountain garden that needs no watering',
        summary:
          'Native planting that handles winter and drought on its own, with a timber walkway through the middle.',
        scope: ['Concept design', 'Timber walkway', 'Planting', 'Weed control'],
      },
    },
  },
];

// Falls back to the other catalogue the same way translate() does, so a project
// added in only one language still renders instead of blanking out.
export function projectCopy(project, lang) {
  return project.i18n[lang] ?? project.i18n.sr ?? Object.values(project.i18n)[0];
}
