// English (en-GB). Key set must stay identical to sr.js — the dev-time check in
// core.js warns loudly if the two catalogues drift apart.

export default {
  // -------------------- Document / meta --------------------
  'meta.title': 'Malina Garden — Gardens that live with you',

  // -------------------- Navigation --------------------
  'nav.tagline': 'Gardens that live with you',
  'nav.home': 'Home',
  'nav.projects': 'Projects',
  'nav.cta': 'See the projects',
  'nav.toggle': 'Toggle menu',
  'nav.language': 'Language',

  // -------------------- Footer --------------------
  'footer.ideology': 'Gardens that live with you.',
  'footer.contactCta': 'Get in touch',
  'footer.exploreLabel': 'Site',
  'footer.contactLabel': 'Contact',
  'footer.followLabel': 'Follow',
  'footer.tagline': 'Gardens that live with you.',
  'footer.navLabel': 'Footer',
  'footer.note': 'Garden design & maintenance · Serving keen gardeners everywhere',
  'footer.copyright': '© {year} Malina Garden. Grown with care.',

  // -------------------- Home: header --------------------
  'home.hero.ideology': 'Gardens that live with you.',
  'home.hero.service': 'Garden design & maintenance',
  'home.hero.imageAlt': 'A lush, thriving garden border in full growth',
  'home.hero.scrollCue': 'Skip to the services',

  // -------------------- Home: services in detail --------------------
  'servicesDetail.eyebrow': 'What we do',
  'servicesDetail.title': 'From the first sketch to the regular upkeep',
  'servicesDetail.lead':
    'We do the whole job — come out to the site, draw up a design, price the work, build it, and then look after what we planted.',
  'servicesDetail.body':
    'We do not sell packages. Every garden gets the list of jobs it actually needs, in the order that makes sense for the season and the ground.',
  'servicesDetail.imageAlt': 'Work under way in a garden during planting',

  // -------------------- Home: why choose us --------------------
  // Two rows in one part: the references first, the tally under them. The
  // names, places and figures those rows are built from are facts, so they
  // live in data/testimonialsData.js and never pass through here.
  'whyUs.eyebrow': 'Why choose us',
  'whyUs.title': 'Reasons people stay with us',
  'whyUs.lead':
    'Most of our work comes from people who already have our number. Here is what three of them say, and what the years since add up to.',
  'whyUs.tally.eyebrow': 'By the numbers',
  'whyUs.tally.title': 'What we have accomplished',

  // -------------------- Projects list --------------------
  'projects.eyebrow': 'Finished projects',
  'projects.title': 'Places we have planted',
  'projects.lead':
    'The gardens we have built and still look after — from the coast to the mountains.',
  // Restored with the homepage showcase: the alt text for each row's
  // photographs and the button that leads to the full list.
  'projects.imageAlt': '{title} — {place}, photograph {index}',
  'projects.viewAll': 'All projects',
  'projects.searchPlaceholder': 'Search projects…',
  'projects.searchLabel': 'Search projects',
  'projects.filterLabel': 'Filter by category',
  'projects.all': 'All',
  'projects.results': {
    one: '{count} project',
    other: '{count} projects',
  },
  'projects.resultsInCategory': {
    one: '{count} project in {category}',
    other: '{count} projects in {category}',
  },
  'projects.resultsMatching': {
    one: '{count} project matching “{query}”',
    other: '{count} projects matching “{query}”',
  },
  'projects.resultsInCategoryMatching': {
    one: '{count} project in {category} matching “{query}”',
    other: '{count} projects in {category} matching “{query}”',
  },
  'projects.empty.title': 'No projects found',
  'projects.empty.text': 'Try a different search term or category.',
  'projects.empty.clear': 'Clear filters',

  // -------------------- Project card --------------------
  'projectCard.read': 'Read the project',

  // -------------------- Project page --------------------
  'project.back': 'Back to all projects',
  'project.by': 'By {author}',
  'project.readMore': 'More projects',
  'project.coverAlt': 'Cover image for {title}',
  'project.notFound.title': 'Project not found',
  'project.notFound.text': 'That project may have been moved or removed.',
  'project.notFound.back': 'Back to the projects',

  // -------------------- Admin: login --------------------
  'login.eyebrow': 'Admin',
  'login.title': 'Sign in',
  'login.lead': 'Enter the username and password to edit projects and references.',
  'login.username': 'Username',
  'login.password': 'Password',
  'login.submit': 'Sign in',
  'login.error': 'Wrong username or password.',

  // -------------------- Admin: shell --------------------
  'admin.nav.title': 'Admin',
  'admin.nav.label': 'Admin sections',
  'admin.nav.projects': 'Projects',
  'admin.nav.references': 'References',
  'admin.nav.site': 'Back to the site',
  'admin.nav.logout': 'Log out',

  // -------------------- Admin: projects --------------------
  'admin.projects.title': 'Projects',
  'admin.projects.lead':
    'Edit the projects and choose which of them show on the landing page.',
  'admin.projects.new': 'New project',
  'admin.projects.col.featured': 'On the landing page',
  'admin.projects.col.project': 'Project',
  'admin.projects.col.category': 'Category',
  'admin.projects.col.date': 'Date',
  'admin.projects.col.actions': 'Actions',
  'admin.projects.edit': 'Edit',
  'admin.projects.delete': 'Delete',
  'admin.projects.deleteConfirm': 'Delete “{title}”? This cannot be undone.',
  'admin.projects.empty.title': 'No projects yet',
  'admin.projects.empty.text': 'Create your first project to get growing.',
  'admin.projects.newTitle': 'New project',
  'admin.projects.editTitle': 'Edit project',
  'admin.projects.formLead':
    'Fill in the details below. All fields marked required must be completed.',
  'admin.projects.back': 'Back to projects',
  'admin.projects.notFound.title': 'Project not found',
  'admin.projects.notFound.text':
    'There is no project at that address — it may have been deleted since.',
  'admin.projects.notFound.back': 'Back to the project list',

  // -------------------- Admin: references --------------------
  'admin.references.title': 'References',
  'admin.references.lead':
    'Edit what clients said and choose which of them show on the landing page.',
  'admin.references.new': 'New reference',
  'admin.references.col.featured': 'On the landing page',
  'admin.references.col.name': 'Name',
  'admin.references.col.place': 'Town',
  'admin.references.col.actions': 'Actions',
  'admin.references.edit': 'Edit',
  'admin.references.delete': 'Delete',
  'admin.references.deleteConfirm':
    'Delete the reference from {name}? This cannot be undone.',
  'admin.references.empty.title': 'No references yet',
  'admin.references.empty.text': 'Add the first client quote.',
  'admin.references.noSelection.title': 'No reference selected',
  'admin.references.noSelection.text':
    'Pick a reference from the list to edit it, or add a new one.',

  // -------------------- Admin: on the landing page --------------------
  'admin.featured.label': 'Show on the landing page',
  'admin.featured.count': '{count} / 3 on the landing page',
  'admin.featured.limitReached':
    'Three are already chosen. Uncheck one to add another.',

  // -------------------- Project form --------------------
  'form.langLabel': 'Content language',
  'form.required': 'required',
  'form.incomplete': 'incomplete',
  'form.title': 'Title',
  'form.titlePlaceholder': 'e.g. Building Raised Beds That Last',
  'form.slug': 'Slug',
  'form.slugHint': '(URL — auto-filled from title)',
  'form.slugPlaceholder': 'building-raised-beds',
  'form.excerpt': 'Excerpt',
  'form.excerptHint': '(shown on cards)',
  'form.excerptPlaceholder': 'A short, enticing summary of the project…',
  'form.content': 'Content',
  'form.contentHint':
    '(Markdown — supports headings, lists, **bold**, and inline images)',
  'form.contentPlaceholder':
    '## A heading\n\nSome text with **bold**.\n\n![Alt text](https://picsum.photos/seed/example/800/450)\n\n- a list item',
  'form.cover': 'Cover image URL',
  'form.coverPlaceholder': 'https://picsum.photos/seed/xyz/1200/675',
  'form.coverAlt': 'Cover preview',
  'form.category': 'Category',
  'form.author': 'Author',
  'form.authorPlaceholder': 'e.g. Maya Fernsby',
  'form.date': 'Date',
  'form.error.title': 'A title is required.',
  'form.error.author': 'An author is required.',
  'form.error.content': 'Project content cannot be empty.',
  'form.error.cover': 'A cover image URL is required.',
  'form.save': 'Save changes',
  'form.publish': 'Publish project',
  'form.cancel': 'Cancel',

  // -------------------- Reference form --------------------
  'referenceForm.newTitle': 'New reference',
  'referenceForm.editTitle': 'Edit reference',
  'referenceForm.langLabel': 'Quote language',
  'referenceForm.required': 'required',
  'referenceForm.incomplete': 'incomplete',
  'referenceForm.name': 'Name',
  'referenceForm.namePlaceholder': 'e.g. Ana Jovanović',
  'referenceForm.place': 'Town',
  'referenceForm.placePlaceholder': 'e.g. Podgorica',
  'referenceForm.avatar': 'Photo URL',
  'referenceForm.avatarPlaceholder': 'https://i.pravatar.cc/160?img=12',
  'referenceForm.avatarAlt': 'Photo preview',
  'referenceForm.quote': 'Quote',
  'referenceForm.quotePlaceholder': 'What the client said about the work…',
  'referenceForm.error.name': 'A name is required.',
  'referenceForm.error.avatar': 'A photo URL is required.',
  'referenceForm.error.quote': 'A Serbian quote is required.',
  'referenceForm.save': 'Save changes',
  'referenceForm.create': 'Add reference',
  'referenceForm.cancel': 'Cancel',

  // -------------------- Not found --------------------
  'notFound.title': 'Page not found',
  'notFound.text':
    'We could not find the page you were looking for. Let’s get you back to the garden.',
  'notFound.home': 'Return home',

  // -------------------- Categories --------------------
  'category.design': 'Design',
  'category.planting': 'Planting',
  'category.maintenance': 'Maintenance',
  'category.sustainability': 'Sustainability',
  'category.seasonal': 'Seasonal',
};
