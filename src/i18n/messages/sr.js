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
  // Two complete sentences instead of glued-on fragments — Serbian needs the
  // query phrase in its own word order, not appended to a stub. The search box
  // is the only filter left, so there are only these two.
  'projects.results': {
    one: '{count} projekat',
    few: '{count} projekta',
    other: '{count} projekata',
  },
  'projects.resultsMatching': {
    one: '{count} projekat za upit „{query}“',
    few: '{count} projekta za upit „{query}“',
    other: '{count} projekata za upit „{query}“',
  },
  'projects.empty.title': 'Nema pronađenih projekata',
  'projects.empty.text': 'Probajte drugi pojam za pretragu.',
  'projects.empty.clear': 'Poništi pretragu',

  // -------------------- Project card --------------------
  'projectCard.read': 'Pogledajte projekat',

  // -------------------- Project page --------------------
  'project.back': 'Nazad na sve projekte',
  'project.readMore': 'Pogledajte još projekata',
  'project.coverAlt': 'Naslovna slika za projekat „{title}“',
  'project.notFound.title': 'Projekat nije pronađen',
  'project.notFound.text': 'Taj projekat je možda premešten ili uklonjen.',
  'project.notFound.back': 'Nazad na projekte',

  // -------------------- Project page: picture slider --------------------
  // A block of two or more pictures is shown as a slider on the public page.
  // The position reads as a fraction because that is what a reader glances at;
  // the alt text spells it out for anyone who cannot glance.
  'gallery.label': 'Slike iz projekta',
  'gallery.previous': 'Prethodna slika',
  'gallery.next': 'Sledeća slika',
  'gallery.position': '{index} / {total}',
  // A lone picture in the body has no position to report, so it does not
  // borrow gallery.imageAlt and announce itself as "picture 1 of 1".
  'gallery.singleAlt': 'Slika iz projekta',
  'gallery.imageAlt': 'Slika {index} od {total}',
  'gallery.missing': 'Ova slika više nije dostupna.',

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
  // The cover is picked out of the picture library and the address writes
  // itself from the title, so neither is typed any more — both labels say what
  // the field is for rather than what to put in it.
  'form.langLabel': 'Jezik sadržaja',
  'form.required': 'obavezno',
  'form.incomplete': 'nepotpuno',
  'form.title': 'Naslov',
  'form.titlePlaceholder': 'npr. Podignute leje koje traju deceniju',
  'form.excerpt': 'Sažetak',
  'form.excerptHint': '(prikazuje se na karticama)',
  'form.excerptPlaceholder': 'Kratak, primamljiv sažetak projekta…',
  'form.cover': 'Naslovna slika',
  'form.coverHint': '(slika koja stoji na spisku projekata)',
  'form.url': 'Adresa strane',
  'form.urlHint': '(gradi se sama iz naslova)',
  'form.date': 'Datum',
  'form.error.title': 'Naslov je obavezan.',
  'form.error.cover': 'Morate izabrati naslovnu sliku.',
  'form.error.blocks': 'Potreban je bar jedan blok teksta ili slika.',
  'form.save': 'Sačuvaj izmene',
  'form.publish': 'Objavi projekat',
  'form.cancel': 'Otkaži',

  // -------------------- Project form: picture library --------------------
  // The picker opens over a library of pictures already uploaded. Everything
  // in it lives in this browser, which the hint says plainly — nobody should
  // discover that from an error message on another computer.
  'picker.choose': 'Izaberite sliku',
  'picker.change': 'Promenite sliku',
  'picker.title': 'Biblioteka slika',
  'picker.close': 'Zatvorite biblioteku',
  'picker.upload': 'Dodajte sliku',
  'picker.uploadHint':
    'Slike ostaju u ovom pregledaču — ne šalju se nigde na internet.',
  'picker.uploading': 'Dodavanje u toku…',
  'picker.loading': 'Učitavanje biblioteke…',
  'picker.empty.title': 'Biblioteka je prazna',
  'picker.empty.text':
    'Dodajte prvu sliku i od tada je možete izabrati u bilo kom projektu.',
  'picker.meta': '{width}×{height} · {size}',
  'picker.delete': 'Obriši sliku',
  'picker.deleteConfirm':
    'Obrisati „{name}“? Projekti koji je koriste ostaće bez slike.',
  'picker.select': 'Izaberite ovu sliku',
  'picker.selected': 'Izabrano',
  'picker.count': {
    one: '{count} slika u biblioteci',
    few: '{count} slike u biblioteci',
    other: '{count} slika u biblioteci',
  },
  'picker.usage': 'Zauzeto {size}',
  'picker.error.quota':
    'U pregledaču nema više mesta. Obrišite neku sliku pa pokušajte ponovo.',
  'picker.error.write': 'Slika nije sačuvana. Pokušajte ponovo.',
  'picker.error.delete': 'Slika nije obrisana. Pokušajte ponovo.',
  'picker.error.read':
    'Biblioteci se ne može pristupiti. U privatnom prozoru pregledač je ne dozvoljava — otvorite sajt u običnom prozoru.',
  'picker.error.type': 'Ta datoteka nije slika.',
  'picker.missing': 'Izabrane slike više nema u biblioteci.',
  'picker.missingAlt': 'Slika koje više nema',
  'picker.chosenAlt': 'Pregled izabrane slike',

  // -------------------- Project form: block editor --------------------
  // The body is a list of blocks instead of one textarea. The two preview
  // lines promise on screen exactly what the public page does with a picture
  // block, because the editor has no other way to show it.
  'editor.title': 'Sadržaj projekta',
  'editor.hint':
    'Slažite blokove teksta i slika onim redom kojim treba da stoje na strani.',
  'editor.empty.title': 'Sadržaj je još prazan',
  'editor.empty.text': 'Dodajte blok teksta ili blok slika da biste počeli.',
  'editor.addText': 'Dodaj tekst',
  'editor.addImages': 'Dodaj slike',
  'editor.moveUp': 'Pomeri naviše',
  'editor.moveDown': 'Pomeri naniže',
  'editor.remove': 'Ukloni blok',
  'editor.removeConfirm': 'Ukloniti ovaj blok? Ovo se ne može poništiti.',
  'editor.blockText': 'Tekst',
  'editor.blockImages': 'Slike',
  'editor.blockPosition': 'Blok {index} od {total}',
  'editor.textPlaceholder':
    '## Naslov\n\nMalo teksta sa **podebljanim** delom.\n\n- stavka liste',
  'editor.textHint': '(Markdown — podržava naslove, liste i **podebljano**)',
  'editor.addPicture': 'Dodaj sliku u blok',
  'editor.removePicture': 'Ukloni sliku',
  'editor.removePictureConfirm': 'Ukloniti ovu sliku iz bloka?',
  'editor.pictureLeft': 'Pomeri ulevo',
  'editor.pictureRight': 'Pomeri udesno',
  'editor.picturePosition': 'Slika {index} od {total}',
  'editor.picturesEmpty': 'U ovom bloku još nema slika.',
  'editor.previewSingle': 'Jedna slika: stoji sama, preko cele širine.',
  'editor.previewGallery': {
    one: '{count} slika: prikazuje se kao slajder sa dugmetom levo i desno.',
    few: '{count} slike: prikazuju se kao slajder sa dugmetom levo i desno.',
    other: '{count} slika: prikazuju se kao slajder sa dugmetom levo i desno.',
  },

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
};
