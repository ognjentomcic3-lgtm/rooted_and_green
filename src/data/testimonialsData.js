// References from customers, and the tally of finished work shown beneath them.
//
// Shape mirrors a stored project: language-neutral facts stay at the top level
// and only the copy lives under `i18n`. A person's name and the town they
// garden in belong at the top level for the same reason a project's place
// does — they read identically in both catalogues, and duplicating them would
// only invite the two copies to drift.
//
// Avatars use seeded i.pravatar.cc URLs, the same trick as the picsum imagery
// elsewhere on the site: a stable placeholder face that loads without a key.
// They are served at 160px so they stay crisp at the 72px the card draws them.

export const testimonials = [
  {
    id: 'popovic',
    name: 'Jelena Popović',
    place: 'Podgorica',
    avatar: 'https://i.pravatar.cc/160?img=45',
    i18n: {
      sr: {
        quote:
          'Iza kuće je bio goli nasip na kamenu i ništa se tu nije primalo. Napravili su tri terase od suvomeđe i sproveli kap po kap ispod malča — prošlog jula, kad je Podgorica danima bila preko četrdeset, nije nam izgorela nijedna sadnica. Jave se i kad ih ne zovemo, samo da provere kapaljke.',
      },
      en: {
        quote:
          'Behind the house was bare fill over rock, and nothing would take. They built three dry-stone terraces and ran drip lines under the mulch — last July, with Podgorica over forty degrees for days on end, we did not lose a single plant. They ring us unprompted, just to check the emitters.',
      },
    },
  },
  {
    id: 'djurovic',
    name: 'Marko Đurović',
    place: 'Tivat',
    avatar: 'https://i.pravatar.cc/160?img=13',
    i18n: {
      sr: {
        quote:
          'Imamo staru maslinu i dve smokve nad samim morem, a so iz vetra ih je godinama sušila s morske strane. Podigli su nisku živicu od tamarisa kao zaklon i orezali masline kako treba, bez žurbe. Ove jeseni je rod bio najbolji otkako smo kupili kuću.',
      },
      en: {
        quote:
          'We have an old olive and two fig trees right above the water, and the salt in the wind had been scorching them on the seaward side for years. They put in a low tamarisk hedge as a windbreak and pruned the olives properly, in no hurry. This autumn gave us the best crop since we bought the house.',
      },
    },
  },
  {
    id: 'vukovic',
    name: 'Danica Vuković',
    place: 'Kolašin',
    avatar: 'https://i.pravatar.cc/160?img=32',
    i18n: {
      sr: {
        quote:
          'U Kolašinu mraz ume da padne i sredinom maja, pa smo bili digli ruke od svega što nije domaće. Oni su to odmah razumeli — zasadili su ono što i inače raste na ovim padinama i postavili drvenu stazu koja se ne kliza dok sneg kopni. Treća zima je za nama i sve je izdržalo.',
      },
      en: {
        quote:
          'In Kolašin a frost can still come in the middle of May, so we had given up on anything that is not native here. They understood that at once — they planted what already grows on these slopes and laid a timber path that stays sure underfoot while the snow melts. Three winters on, everything has come through.',
      },
    },
  },
];

// The tally lives in this file rather than in the message catalogues because a
// stat is a number and a sentence bound together: the figure is a fact and
// belongs at the top level, the label and the note are copy. Split across two
// files, one half could change without the other and nobody would notice.
export const achievements = [
  {
    id: 'gardens',
    value: 120,
    i18n: {
      sr: {
        label: 'Napravljenih vrtova',
        note: 'Projektovanih, izvedenih i zasađenih od 2017. naovamo.',
      },
      en: {
        label: 'Gardens made',
        note: 'Designed, built and planted since 2017.',
      },
    },
  },
  {
    id: 'years',
    value: 9,
    i18n: {
      sr: {
        label: 'Godina na terenu',
        note: 'Ista ekipa i ista dva kombija, od primorja do planine.',
      },
      en: {
        label: 'Years on the ground',
        note: 'The same small team and the same two vans, coast to mountains.',
      },
    },
  },
  {
    id: 'maintained',
    value: 40,
    i18n: {
      sr: {
        label: 'Vrtova koje i dalje održavamo',
        note: 'Po dogovorenom planu košenja, orezivanja i prihrane.',
      },
      en: {
        label: 'Gardens we still keep',
        note: 'On an agreed rota of mowing, pruning and feeding.',
      },
    },
  },
  {
    id: 'places',
    value: 6,
    i18n: {
      sr: {
        label: 'Gradova u kojima radimo',
        note: 'Podgorica, Tivat, Cetinje, Budva, Nikšić i Kolašin.',
      },
      en: {
        label: 'Towns we work in',
        note: 'Podgorica, Tivat, Cetinje, Budva, Nikšić and Kolašin.',
      },
    },
  },
];

// Falls back to the other catalogue the same way translate() does, so a
// reference added in only one language still renders instead of blanking out.
export function testimonialCopy(testimonial, lang) {
  return (
    testimonial.i18n[lang] ??
    testimonial.i18n.sr ??
    Object.values(testimonial.i18n)[0]
  );
}

// Same fallback chain, for the same reason: a number with no label under it
// would be worse than a label in the wrong language.
export function achievementCopy(achievement, lang) {
  return (
    achievement.i18n[lang] ??
    achievement.i18n.sr ??
    Object.values(achievement.i18n)[0]
  );
}
