// Serbian (Latin script, sr-Latn-RS). Every user-visible string lives here.
// Keeping the whole language in one file means a future Cyrillic variant is a
// single-file job. Plural-aware messages are objects keyed by CLDR category —
// Serbian uses one / few / other.

export default {
  // -------------------- Document / meta --------------------
  'meta.title': 'Rooted & Green — Vrtovi koji žive s vama',

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
  'footer.copyright': '© {year} Rooted & Green. Uzgojeno s pažnjom.',

  // -------------------- Home: header --------------------
  'home.hero.ideology': 'Vrtovi koji žive s vama.',
  'home.hero.service': 'Dizajn i održavanje vrtova',
  'home.hero.imageAlt': 'Bujna cvetna leja u punom rastu',
  'home.hero.scrollCue': 'Pređite na projekte',

  // -------------------- Home: projects --------------------
  'projects.eyebrow': 'Realizovani projekti',
  'projects.title': 'Mesta koja smo zasadili',
  'projects.lead':
    'Svaki vrt je jedno mesto, jedna godina i jedan spisak poslova. Otvorite red da vidite kako izgleda.',
  'projects.hint': 'Otvorite red za slike i detalje',
  'projects.scope': 'Obim radova',
  'projects.imageAlt': '{title} — {place}, fotografija {index}',

  // -------------------- Landing: services --------------------
  'landing.services.eyebrow': 'Šta radimo',
  'landing.services.title': 'Briga za svaki kutak vašeg vrta',
  'landing.services.lead':
    'Od prve skice do sezonskog održavanja, pomažemo vašem prostoru da procveta.',
  'landing.service.design.title': 'Dizajn vrta',
  'landing.service.design.text':
    'Planovi sadnje i rasporedi po meri, prilagođeni vašem prostoru, zemljištu i načinu na koji volite da boravite napolju.',
  'landing.service.planting.title': 'Sadnja i održavanje',
  'landing.service.planting.text':
    'Sezonska nega, rezidba, prihrana i sređivanje koji vaše leje drže u najboljem izdanju tokom cele godine.',
  'landing.service.wildlife.title': 'Divlji svet i livade',
  'landing.service.wildlife.text':
    'Leje za oprašivače, livade divljeg cveća i staništa od kojih vaš vrt bruji od života.',
  'landing.service.containers.title': 'Saksije i dvorišta',
  'landing.service.containers.text':
    'Bujne kompozicije u saksijama i rešenja za male prostore koja balkone i terase pretvaraju u zelena utočišta.',

  // -------------------- Landing: blog teaser & CTA --------------------
  'landing.blog.eyebrow': 'Iz baštenske šupe',
  'landing.blog.title': 'Najnovije s bloga',
  'landing.blog.viewAll': 'Sve objave',
  'landing.blog.empty': 'Još nema objava — navratite uskoro.',
  'landing.cta.title': 'Spremni da uzgojite nešto divno?',
  'landing.cta.lead':
    'Bilo da sanjate livadu divljeg cveća ili jednostavno želite uredne i zdrave leje, rado ćemo pomoći vašem vrtu da napreduje.',
  'landing.cta.button': 'Počnite da čitate',

  // -------------------- Blog list --------------------
  'blog.eyebrow': 'Blog Rooted & Green',
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
