// The detailed service list, grouped the way the work actually splits up.
//
// Lives here rather than in the message catalogues because those hold strings
// and plural objects only — an array under a key would be mistaken for a
// plural message by translate(). Same shape as projectsData.js: a stable id at
// the top level, the copy under `i18n`.
//
// Serbian copy follows sr.js and uses ekavica.

export const serviceGroups = [
  {
    id: 'planning',
    i18n: {
      sr: {
        title: 'Projektovanje',
        items: [
          'Izlazak na teren i snimanje postojećeg stanja',
          'Izrada idejnog rešenja',
          'Izrada 3D prikaza',
          'Predlog sadnog materijala',
          'Izrada predmera i predračuna',
        ],
      },
      en: {
        title: 'Design',
        items: [
          'Site visit and survey of what is already there',
          'Concept design',
          'A 3D visualisation',
          'A proposed planting list',
          'Bill of quantities and costing',
        ],
      },
    },
  },
  {
    id: 'planting',
    i18n: {
      sr: {
        title: 'Zelene površine',
        items: [
          'Redovno košenje travnjaka',
          'Dosejavanje travnjaka',
          'Sadnja biljaka',
          'Orezivanje biljaka',
          'Okopavanje biljaka',
          'Prihrana i hemijski tretman biljaka',
          'Suzbijanje i uklanjanje korova',
        ],
      },
      en: {
        title: 'Green space',
        items: [
          'Regular lawn mowing',
          'Overseeding tired lawns',
          'Planting',
          'Pruning',
          'Hoeing and weeding over',
          'Feeding and plant treatments',
          'Weed control and removal',
        ],
      },
    },
  },
  {
    id: 'groundwork',
    i18n: {
      sr: {
        title: 'Radovi na terenu',
        items: [
          'Zemljani radovi i nivelacija terena',
          'Betonske, drvene i kamene staze',
          'Reparacija i postavljanje sistema za navodnjavanje',
          'Rasveta na zelenim površinama',
          'Farbanje ograda i mobilijara',
          'Sakupljanje i transport materijala',
          'Biodekoracija',
        ],
      },
      en: {
        title: 'Groundwork',
        items: [
          'Earthworks and levelling',
          'Concrete, timber and stone paths',
          'Repairing and installing irrigation',
          'Lighting for planted areas',
          'Painting fences and garden furniture',
          'Collecting and hauling materials',
          'Bio-decoration',
        ],
      },
    },
  },
];

// Same fallback behaviour as translate(): a group written in only one language
// still renders rather than blanking out.
export function serviceCopy(group, lang) {
  return group.i18n[lang] ?? group.i18n.sr ?? Object.values(group.i18n)[0];
}
