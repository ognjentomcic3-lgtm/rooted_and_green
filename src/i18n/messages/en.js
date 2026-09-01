// English (en-GB). Key set must stay identical to sr.js — the dev-time check in
// core.js warns loudly if the two catalogues drift apart.

export default {
  // -------------------- Document / meta --------------------
  'meta.title': 'Malina Garden — Gardens that live with you',

  // -------------------- Navigation --------------------
  'nav.tagline': 'Gardens that live with you',
  'nav.home': 'Home',
  'nav.projects': 'Projects',
  'nav.admin': 'Admin',
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

  // -------------------- Admin --------------------
  'admin.eyebrow': 'Admin',
  'admin.list.title': 'Manage projects',
  'admin.list.lead':
    'Create, edit, and delete projects. Changes save to your browser and appear instantly on the public site.',
  'admin.edit.title': 'Edit project',
  'admin.new.title': 'New project',
  'admin.form.lead':
    'Fill in the details below. All fields marked required must be completed.',
  'admin.newProject': 'New project',
  'admin.stats.projects': 'Total projects',
  'admin.stats.categories': 'Categories',
  'admin.stats.authors': 'Authors',
  'admin.empty.title': 'No projects yet',
  'admin.empty.text': 'Create your first project to get growing.',
  'admin.table.project': 'Project',
  'admin.table.category': 'Category',
  'admin.table.author': 'Author',
  'admin.table.date': 'Date',
  'admin.table.actions': 'Actions',
  'admin.action.edit': 'Edit',
  'admin.action.delete': 'Delete',
  'admin.deleteConfirm': 'Delete “{title}”? This cannot be undone.',
  'admin.back': 'Back to projects',

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
