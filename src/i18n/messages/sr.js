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
  'nav.blog': 'Blog',
  'nav.admin': 'Admin',
  'nav.cta': 'Pročitajte blog',
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
  'home.hero.scrollCue': 'Pređite na projekte',

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

  // -------------------- Home: projects --------------------
  'projects.eyebrow': 'Realizovani projekti',
  'projects.title': 'Mesta koja smo zasadili',
  'projects.lead':
    'Svaki vrt je jedno mesto, jedna godina i jedan spisak poslova. Evo tri skorašnja.',
  'projects.scope': 'Obim radova',
  'projects.imageAlt': '{title} — {place}, fotografija {index}',
  'projects.viewAll': 'Svi projekti',
  'projectsPage.title': 'Svi projekti',
  'projectsPage.lead':
    'Vrtovi koje smo do sada napravili i održavamo — od primorja do planine.',

  // -------------------- Blog list --------------------
  'blog.eyebrow': 'Blog Malina Garden',
  'blog.title': 'Beleške iz vrta',
  'blog.lead':
    'Praktični vodiči, sezonsko znanje i inspiracija za vrt koji ćete voleti.',
  'blog.searchPlaceholder': 'Pretražite objave…',
  'blog.searchLabel': 'Pretraga objava',
  'blog.filterLabel': 'Filtriranje po kategoriji',
  'blog.all': 'Sve',
  // Four complete sentences instead of glued-on fragments — Serbian needs the
  // category and query phrases in its own word order, not appended to a stub.
  'blog.results': {
    one: '{count} objava',
    few: '{count} objave',
    other: '{count} objava',
  },
  'blog.resultsInCategory': {
    one: '{count} objava u kategoriji {category}',
    few: '{count} objave u kategoriji {category}',
    other: '{count} objava u kategoriji {category}',
  },
  'blog.resultsMatching': {
    one: '{count} objava za upit „{query}“',
    few: '{count} objave za upit „{query}“',
    other: '{count} objava za upit „{query}“',
  },
  'blog.resultsInCategoryMatching': {
    one: '{count} objava u kategoriji {category} za upit „{query}“',
    few: '{count} objave u kategoriji {category} za upit „{query}“',
    other: '{count} objava u kategoriji {category} za upit „{query}“',
  },
  'blog.empty.title': 'Nema pronađenih objava',
  'blog.empty.text': 'Probajte drugi pojam za pretragu ili drugu kategoriju.',
  'blog.empty.clear': 'Poništi filtere',

  // -------------------- Post card --------------------
  'postCard.read': 'Pročitajte tekst',

  // -------------------- Blog post --------------------
  'post.back': 'Nazad na sve objave',
  'post.by': 'Autor: {author}',
  'post.readMore': 'Pročitajte još tekstova',
  'post.coverAlt': 'Naslovna slika za tekst „{title}“',
  'post.notFound.title': 'Tekst nije pronađen',
  'post.notFound.text': 'Taj tekst je možda premešten ili uklonjen.',
  'post.notFound.back': 'Nazad na blog',

  // -------------------- Admin --------------------
  'admin.eyebrow': 'Administracija',
  'admin.list.title': 'Upravljanje objavama',
  'admin.list.lead':
    'Kreirajte, menjajte i brišite objave. Izmene se čuvaju u vašem pregledaču i odmah se vide na javnom sajtu.',
  'admin.edit.title': 'Izmena objave',
  'admin.new.title': 'Nova objava',
  'admin.form.lead':
    'Popunite podatke ispod. Sva obavezna polja moraju biti popunjena.',
  'admin.newPost': 'Nova objava',
  'admin.stats.posts': 'Ukupno objava',
  'admin.stats.categories': 'Kategorije',
  'admin.stats.authors': 'Autori',
  'admin.empty.title': 'Još nema objava',
  'admin.empty.text': 'Napravite prvu objavu i krenite u rast.',
  'admin.table.post': 'Objava',
  'admin.table.category': 'Kategorija',
  'admin.table.author': 'Autor',
  'admin.table.date': 'Datum',
  'admin.table.actions': 'Radnje',
  'admin.action.edit': 'Izmeni',
  'admin.action.delete': 'Obriši',
  'admin.deleteConfirm': 'Obrisati „{title}“? Ovo se ne može poništiti.',
  'admin.back': 'Nazad na objave',

  // -------------------- Post form --------------------
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
  'form.excerptPlaceholder': 'Kratak, primamljiv sažetak objave…',
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
  'form.error.content': 'Sadržaj objave ne može biti prazan.',
  'form.error.cover': 'URL naslovne slike je obavezan.',
  'form.save': 'Sačuvaj izmene',
  'form.publish': 'Objavi',
  'form.cancel': 'Otkaži',

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
