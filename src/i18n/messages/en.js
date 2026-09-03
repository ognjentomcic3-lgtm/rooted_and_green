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
  // The search box is the only filter left, so the count has just these two
  // shapes.
  'projects.results': {
    one: '{count} project',
    other: '{count} projects',
  },
  'projects.resultsMatching': {
    one: '{count} project matching “{query}”',
    other: '{count} projects matching “{query}”',
  },
  'projects.empty.title': 'No projects found',
  'projects.empty.text': 'Try a different search term.',
  'projects.empty.clear': 'Clear the search',

  // -------------------- Project card --------------------
  'projectCard.read': 'Read the project',

  // -------------------- Project page --------------------
  'project.back': 'Back to all projects',
  'project.readMore': 'More projects',
  'project.coverAlt': 'Cover image for {title}',
  'project.notFound.title': 'Project not found',
  'project.notFound.text': 'That project may have been moved or removed.',
  'project.notFound.back': 'Back to the projects',

  // -------------------- Project page: picture slider --------------------
  // A block of two or more pictures is shown as a slider on the public page.
  // The position reads as a fraction because that is what a reader glances at;
  // the alt text spells it out for anyone who cannot glance.
  'gallery.label': 'Pictures from the project',
  'gallery.previous': 'Previous picture',
  'gallery.next': 'Next picture',
  'gallery.position': '{index} / {total}',
  'gallery.imageAlt': 'Picture {index} of {total}',
  'gallery.missing': 'This picture is no longer available.',

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
  // The cover is picked out of the picture library and the address writes
  // itself from the title, so neither is typed any more — both labels say what
  // the field is for rather than what to put in it.
  'form.langLabel': 'Content language',
  'form.required': 'required',
  'form.incomplete': 'incomplete',
  'form.title': 'Title',
  'form.titlePlaceholder': 'e.g. Building Raised Beds That Last',
  'form.excerpt': 'Excerpt',
  'form.excerptHint': '(shown on cards)',
  'form.excerptPlaceholder': 'A short, enticing summary of the project…',
  'form.cover': 'Cover picture',
  'form.coverHint': '(the picture shown in the project list)',
  'form.coverAlt': 'Cover preview',
  'form.url': 'Page address',
  'form.urlHint': '(built from the title on its own)',
  'form.date': 'Date',
  'form.error.title': 'A title is required.',
  'form.error.cover': 'A cover picture must be chosen.',
  'form.error.blocks': 'At least one block of text or pictures is required.',
  'form.save': 'Save changes',
  'form.publish': 'Publish project',
  'form.cancel': 'Cancel',

  // -------------------- Project form: picture library --------------------
  // The picker opens over a library of pictures already uploaded. Everything
  // in it lives in this browser, which the hint says plainly — nobody should
  // discover that from an error message on another computer.
  'picker.choose': 'Choose a picture',
  'picker.change': 'Change the picture',
  'picker.title': 'Picture library',
  'picker.close': 'Close the library',
  'picker.upload': 'Add a picture',
  'picker.uploadHint':
    'The pictures stay in this browser — nothing is sent anywhere.',
  'picker.uploading': 'Adding…',
  'picker.loading': 'Loading the library…',
  'picker.empty.title': 'The library is empty',
  'picker.empty.text':
    'Add the first picture and you can pick it for any project from then on.',
  'picker.meta': '{width}×{height} · {size}',
  'picker.delete': 'Delete the picture',
  'picker.deleteConfirm':
    'Delete “{name}”? Projects using it will be left without a picture.',
  'picker.select': 'Choose this picture',
  'picker.selected': 'Chosen',
  'picker.count': {
    one: '{count} picture in the library',
    other: '{count} pictures in the library',
  },
  'picker.usage': 'Using {size}',
  'picker.error.quota':
    'The browser is out of room. Delete a picture and try again.',
  'picker.error.write': 'The picture was not saved. Try again.',
  'picker.error.read':
    'The library cannot be reached. A private window does not allow it — open the site in an ordinary window.',
  'picker.error.type': 'That file is not an image.',
  'picker.missing': 'The chosen picture is no longer in the library.',
  'picker.missingAlt': 'A picture that is no longer there',
  'picker.chosenAlt': 'Preview of the chosen picture',

  // -------------------- Project form: block editor --------------------
  // The body is a list of blocks instead of one textarea. The two preview
  // lines promise on screen exactly what the public page does with a picture
  // block, because the editor has no other way to show it.
  'editor.title': 'Project body',
  'editor.hint':
    'Stack blocks of text and pictures in the order they should read on the page.',
  'editor.empty.title': 'The body is still empty',
  'editor.empty.text': 'Add a block of text or a block of pictures to begin.',
  'editor.addText': 'Add text',
  'editor.addImages': 'Add pictures',
  'editor.moveUp': 'Move up',
  'editor.moveDown': 'Move down',
  'editor.remove': 'Remove block',
  'editor.removeConfirm': 'Remove this block? This cannot be undone.',
  'editor.blockText': 'Text',
  'editor.blockImages': 'Pictures',
  'editor.blockPosition': 'Block {index} of {total}',
  'editor.textPlaceholder':
    '## A heading\n\nSome text with **bold**.\n\n- a list item',
  'editor.textHint': '(Markdown — supports headings, lists and **bold**)',
  'editor.addPicture': 'Add a picture to the block',
  'editor.removePicture': 'Remove picture',
  'editor.removePictureConfirm': 'Remove this picture from the block?',
  'editor.pictureLeft': 'Move left',
  'editor.pictureRight': 'Move right',
  'editor.picturePosition': 'Picture {index} of {total}',
  'editor.picturesEmpty': 'No pictures in this block yet.',
  'editor.previewSingle': 'One picture: shown on its own, full width.',
  'editor.previewGallery': {
    one: '{count} picture: shown as a slider with left and right buttons.',
    other: '{count} pictures: shown as a slider with left and right buttons.',
  },

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
};
