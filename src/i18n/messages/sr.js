// Serbian (Latin script, sr-Latn-RS). Every user-visible string lives here.
// Keeping the whole language in one file means a future Cyrillic variant is a
// single-file job. Plural-aware messages are objects keyed by CLDR category —
// Serbian uses one / few / other.

export default {
  // -------------------- Document / meta --------------------
  'meta.title': 'Malina Garden — Vrtovi koji žive s vama',

  // -------------------- Navigation --------------------
  'nav.tagline': 'Vrtovi koji žive s vama',
  'nav.home': 'Početna',
  'nav.projects': 'Projekti',
  'nav.cta': 'Pogledajte projekte',
  'nav.toggle': 'Meni',
  'nav.language': 'Jezik',

  // -------------------- Footer --------------------
  // Row one is the ideology sentence and the contact button; the rest is the
  // usual footer matter.
  'footer.ideology': 'Vrtovi koji žive s vama.',
  'footer.contactCta': 'Javite nam se',
  'footer.exploreLabel': 'Sajt',
  'footer.contactLabel': 'Kontakt',
  'footer.followLabel': 'Pratite nas',
  'footer.tagline': 'Vrtovi koji žive s vama.',
  'footer.navLabel': 'Podnožje',
  'footer.note': 'Dizajn i održavanje vrtova · Uz vas gde god da gajite vrt',
  'footer.copyright': '© {year} Malina Garden. Uzgojeno s pažnjom.',

  // -------------------- Home: header --------------------
  'home.hero.ideology': 'Vrtovi koji žive s vama.',
  'home.hero.service': 'Dizajn i održavanje vrtova',
  'home.hero.imageAlt': 'Bujna cvetna leja u punom rastu',
  'home.hero.scrollCue': 'Pređite na usluge',

  // -------------------- Home: services in detail --------------------
  'servicesDetail.eyebrow': 'Šta radimo',
  'servicesDetail.title': 'Od prve skice do redovnog održavanja',
  'servicesDetail.lead':
    'Radimo ceo posao — izađemo na teren, nacrtamo rešenje, damo predmer i predračun, izvedemo radove i posle toga održavamo ono što smo zasadili.',
  'servicesDetail.body':
    'Ne prodajemo pakete. Svaki vrt dobije spisak poslova koji mu zaista treba, u redosledu koji ima smisla za sezonu i za teren.',
  'servicesDetail.imageAlt': 'Rad u vrtu tokom sadnje',

  // -------------------- Home: why choose us --------------------
  // Written from scratch rather than translated across from en.js. "Zašto baš
  // mi" is how the question is actually put here — the "baš" is the whole
  // point of it, and English has no word to spend on it.
  'whyUs.eyebrow': 'Zašto baš mi',
  'whyUs.title': 'Razlozi zbog kojih ostaju s nama',
  'whyUs.lead':
    'Najveći deo posla dobijemo od ljudi koji već imaju naš broj. Evo šta kažu troje od njih i šta se za ove godine skupilo.',
  'whyUs.tally.eyebrow': 'U brojkama',
  'whyUs.tally.title': 'Šta smo do sada uradili',

  // -------------------- Projects list --------------------
  'projects.eyebrow': 'Realizovani projekti',
  'projects.title': 'Mesta koja smo zasadili',
  'projects.lead':
    'Vrtovi koje smo do sada napravili i održavamo — od primorja do planine.',
  // Restored with the homepage showcase: the alt text for each row's
  // photographs and the button that leads to the full list.
  'projects.imageAlt': '{title} — {place}, fotografija {index}',
  'projects.viewAll': 'Svi projekti',
  'projects.searchPlaceholder': 'Pretražite projekte…',
  'projects.searchLabel': 'Pretraga projekata',
  'projects.filterLabel': 'Filtriranje po kategoriji',
  'projects.all': 'Svi',
  // Four complete sentences instead of glued-on fragments — Serbian needs the
  // category and query phrases in its own word order, not appended to a stub.
  'projects.results': {
    one: '{count} projekat',
    few: '{count} projekta',
    other: '{count} projekata',
  },
  'projects.resultsInCategory': {
    one: '{count} projekat u kategoriji {category}',
    few: '{count} projekta u kategoriji {category}',
    other: '{count} projekata u kategoriji {category}',
  },
  'projects.resultsMatching': {
    one: '{count} projekat za upit „{query}“',
    few: '{count} projekta za upit „{query}“',
    other: '{count} projekata za upit „{query}“',
  },
  'projects.resultsInCategoryMatching': {
    one: '{count} projekat u kategoriji {category} za upit „{query}“',
    few: '{count} projekta u kategoriji {category} za upit „{query}“',
    other: '{count} projekata u kategoriji {category} za upit „{query}“',
  },
  'projects.empty.title': 'Nema pronađenih projekata',
  'projects.empty.text': 'Probajte drugi pojam za pretragu ili drugu kategoriju.',
  'projects.empty.clear': 'Poništi filtere',

  // -------------------- Project card --------------------
  'projectCard.read': 'Pogledajte projekat',

  // -------------------- Project page --------------------
  'project.back': 'Nazad na sve projekte',
  'project.by': 'Autor: {author}',
  'project.readMore': 'Pogledajte još projekata',
  'project.coverAlt': 'Naslovna slika za projekat „{title}“',
  'project.notFound.title': 'Projekat nije pronađen',
  'project.notFound.text': 'Taj projekat je možda premešten ili uklonjen.',
  'project.notFound.back': 'Nazad na projekte',

  // -------------------- Admin: login --------------------
  // The only admin screen without the split shell around it. Kept short: two
  // fields, one button, one error.
  'login.eyebrow': 'Administracija',
  'login.title': 'Prijava',
  'login.lead':
    'Unesite korisničko ime i lozinku da biste uređivali projekte i reference.',
  'login.username': 'Korisničko ime',
  'login.password': 'Lozinka',
  'login.submit': 'Prijavite se',
  'login.error': 'Pogrešno korisničko ime ili lozinka.',

  // -------------------- Admin: shell --------------------
  // The admin has no navbar and no footer, so the master pane carries the only
  // way out: back to the public site, or out of the session altogether.
  'admin.nav.title': 'Administracija',
  'admin.nav.label': 'Odeljci administracije',
  'admin.nav.projects': 'Projekti',
  'admin.nav.references': 'Reference',
  'admin.nav.site': 'Nazad na sajt',
  'admin.nav.logout': 'Odjavite se',

  // -------------------- Admin: projects --------------------
  'admin.projects.title': 'Projekti',
  'admin.projects.lead':
    'Uređujte projekte i birajte koji se od njih prikazuju na početnoj strani.',
  'admin.projects.new': 'Novi projekat',
  'admin.projects.col.featured': 'Na početnoj',
  'admin.projects.col.project': 'Projekat',
  'admin.projects.col.category': 'Kategorija',
  'admin.projects.col.date': 'Datum',
  'admin.projects.col.actions': 'Radnje',
  'admin.projects.edit': 'Izmeni',
  'admin.projects.delete': 'Obriši',
  'admin.projects.deleteConfirm': 'Obrisati „{title}“? Ovo se ne može poništiti.',
  'admin.projects.empty.title': 'Još nema projekata',
  'admin.projects.empty.text': 'Napravite prvi projekat i krenite u rast.',
  'admin.projects.newTitle': 'Novi projekat',
  'admin.projects.editTitle': 'Izmena projekta',
  'admin.projects.formLead':
    'Popunite podatke ispod. Sva obavezna polja moraju biti popunjena.',
  'admin.projects.back': 'Nazad na projekte',
  'admin.projects.notFound.title': 'Projekat nije pronađen',
  'admin.projects.notFound.text':
    'Na toj adresi nema projekta — možda je u međuvremenu obrisan.',
  'admin.projects.notFound.back': 'Nazad na spisak projekata',

  // -------------------- Admin: references --------------------
  'admin.references.title': 'Reference',
  'admin.references.lead':
    'Uređujte izjave klijenata i birajte koje se prikazuju na početnoj strani.',
  'admin.references.new': 'Nova referenca',
  'admin.references.col.featured': 'Na početnoj',
  'admin.references.col.name': 'Ime',
  'admin.references.col.place': 'Mesto',
  'admin.references.col.actions': 'Radnje',
  'admin.references.edit': 'Izmeni',
  'admin.references.delete': 'Obriši',
  'admin.references.deleteConfirm':
    'Obrisati referencu od {name}? Ovo se ne može poništiti.',
  'admin.references.empty.title': 'Još nema referenci',
  'admin.references.empty.text': 'Dodajte prvu izjavu klijenta.',
  'admin.references.noSelection.title': 'Nijedna referenca nije izabrana',
  'admin.references.noSelection.text':
    'Izaberite referencu sa spiska da biste je izmenili, ili dodajte novu.',

  // -------------------- Admin: on the landing page --------------------
  // The checkbox that puts a project or a reference on the landing page. Three
  // at most; once three are ticked the rest go dead and say why. "Na početnoj"
  // is how the column reads in a table — the full sentence is on the checkbox
  // itself, where there is room for it.
  'admin.featured.label': 'Prikaži na početnoj strani',
  'admin.featured.count': '{count} / 3 na početnoj strani',
  'admin.featured.limitReached':
    'Već su izabrana tri. Skinite kvačicu sa jednog da biste dodali drugi.',

  // -------------------- Project form --------------------
  'form.langLabel': 'Jezik sadržaja',
  'form.required': 'obavezno',
  'form.incomplete': 'nepotpuno',
  'form.title': 'Naslov',
  'form.titlePlaceholder': 'npr. Podignute leje koje traju deceniju',
  'form.slug': 'Skraćeni URL',
  'form.slugHint': '(URL — popunjava se sam iz naslova)',
  'form.slugPlaceholder': 'podignute-leje',
  'form.excerpt': 'Sažetak',
  'form.excerptHint': '(prikazuje se na karticama)',
  'form.excerptPlaceholder': 'Kratak, primamljiv sažetak projekta…',
  'form.content': 'Sadržaj',
  'form.contentHint':
    '(Markdown — podržava naslove, liste, **podebljano** i slike u tekstu)',
  'form.contentPlaceholder':
    '## Naslov\n\nMalo teksta sa **podebljanim** delom.\n\n![Opis slike](https://picsum.photos/seed/example/800/450)\n\n- stavka liste',
  'form.cover': 'URL naslovne slike',
  'form.coverPlaceholder': 'https://picsum.photos/seed/xyz/1200/675',
  'form.coverAlt': 'Pregled naslovne slike',
  'form.category': 'Kategorija',
  'form.author': 'Autor',
  'form.authorPlaceholder': 'npr. Maya Fernsby',
  'form.date': 'Datum',
  'form.error.title': 'Naslov je obavezan.',
  'form.error.author': 'Autor je obavezan.',
  'form.error.content': 'Sadržaj projekta ne može biti prazan.',
  'form.error.cover': 'URL naslovne slike je obavezan.',
  'form.save': 'Sačuvaj izmene',
  'form.publish': 'Objavi projekat',
  'form.cancel': 'Otkaži',

  // -------------------- Reference form --------------------
  // Same shape as the project form: a tab per language with Serbian required,
  // while the name, the town and the photo are shared by both.
  'referenceForm.newTitle': 'Nova referenca',
  'referenceForm.editTitle': 'Izmena reference',
  'referenceForm.langLabel': 'Jezik izjave',
  'referenceForm.required': 'obavezno',
  'referenceForm.incomplete': 'nepotpuno',
  'referenceForm.name': 'Ime i prezime',
  'referenceForm.namePlaceholder': 'npr. Ana Jovanović',
  'referenceForm.place': 'Mesto',
  'referenceForm.placePlaceholder': 'npr. Podgorica',
  'referenceForm.avatar': 'URL fotografije',
  'referenceForm.avatarPlaceholder': 'https://i.pravatar.cc/160?img=12',
  'referenceForm.avatarAlt': 'Pregled fotografije',
  'referenceForm.quote': 'Izjava',
  'referenceForm.quotePlaceholder': 'Šta je klijent rekao o saradnji…',
  'referenceForm.error.name': 'Ime je obavezno.',
  'referenceForm.error.avatar': 'URL fotografije je obavezan.',
  'referenceForm.error.quote': 'Izjava na srpskom je obavezna.',
  'referenceForm.save': 'Sačuvaj izmene',
  'referenceForm.create': 'Dodaj referencu',
  'referenceForm.cancel': 'Otkaži',

  // -------------------- Not found --------------------
  'notFound.title': 'Stranica nije pronađena',
  'notFound.text':
    'Nismo uspeli da pronađemo stranicu koju tražite. Hajde da vas vratimo u vrt.',
  'notFound.home': 'Nazad na početnu',

  // -------------------- Categories --------------------
  'category.design': 'Dizajn',
  'category.planting': 'Sadnja',
  'category.maintenance': 'Održavanje',
  'category.sustainability': 'Održivost',
  'category.seasonal': 'Sezonski',
};
