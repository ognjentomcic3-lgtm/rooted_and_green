// English (en-GB). Key set must stay identical to sr.js — the dev-time check in
// core.js warns loudly if the two catalogues drift apart.

export default {
  // -------------------- Document / meta --------------------
  'meta.title': 'Rooted & Green — Gardens that live with you',

  // -------------------- Navigation --------------------
  'nav.tagline': 'Gardens that live with you',
  'nav.home': 'Home',
  'nav.blog': 'Blog',
  'nav.admin': 'Admin',
  'nav.cta': 'Read the blog',
  'nav.toggle': 'Toggle menu',
  'nav.language': 'Language',

  // -------------------- Footer --------------------
  'footer.tagline': 'Gardens that live with you.',
  'footer.navLabel': 'Footer',
  'footer.note': 'Garden design & maintenance · Serving keen gardeners everywhere',
  'footer.copyright': '© {year} Rooted & Green. Grown with care.',

  // -------------------- Landing: hero --------------------
  'landing.eyebrow': 'Garden design & maintenance',
  'landing.hero.titleLead': 'Gardens that',
  'landing.hero.titleAccent': 'live with you.',
  'landing.hero.lead':
    'Rooted & Green designs, plants, and cares for beautiful, wildlife-friendly gardens. Practical advice, honest craft, and a love of growing things.',
  'landing.hero.ctaPrimary': 'Explore the blog',
  'landing.hero.ctaSecondary': 'Our services',
  'landing.hero.imageAlt': 'A lush, thriving garden border in full growth',
  'landing.hero.badgeText': 'Growing gardens since day one',

  // -------------------- Landing: services --------------------
  'landing.services.eyebrow': 'What we do',
  'landing.services.title': 'Care for every corner of your garden',
  'landing.services.lead':
    'From first sketch to seasonal upkeep, we help your outdoor space flourish.',
  'landing.service.design.title': 'Garden Design',
  'landing.service.design.text':
    'Bespoke planting plans and layouts that suit your space, soil, and the way you like to live outdoors.',
  'landing.service.planting.title': 'Planting & Maintenance',
  'landing.service.planting.text':
    'Seasonal care, pruning, feeding, and tidy-ups that keep your borders looking their best all year.',
  'landing.service.wildlife.title': 'Wildlife & Meadows',
  'landing.service.wildlife.text':
    'Pollinator borders, wildflower meadows, and habitats that make your garden hum with life.',
  'landing.service.containers.title': 'Containers & Courtyards',
  'landing.service.containers.text':
    'Lush pot displays and small-space schemes that turn balconies and patios into green retreats.',

  // -------------------- Landing: blog teaser & CTA --------------------
  'landing.blog.eyebrow': 'From the potting shed',
  'landing.blog.title': 'Latest from the blog',
  'landing.blog.viewAll': 'View all posts',
  'landing.blog.empty': 'No posts yet — check back soon.',
  'landing.cta.title': 'Ready to grow something wonderful?',
  'landing.cta.lead':
    'Whether you dream of a wildflower meadow or simply want tidy, healthy borders, we would love to help your garden thrive.',
  'landing.cta.button': 'Start reading',

  // -------------------- Blog list --------------------
  'blog.eyebrow': 'The Rooted & Green blog',
  'blog.title': 'Notes from the garden',
  'blog.lead':
    'Practical guides, seasonal know-how, and inspiration for growing a garden you love.',
  'blog.searchPlaceholder': 'Search posts…',
  'blog.searchLabel': 'Search posts',
  'blog.filterLabel': 'Filter by category',
  'blog.all': 'All',
  'blog.results': {
    one: '{count} post',
    other: '{count} posts',
  },
  'blog.resultsInCategory': {
    one: '{count} post in {category}',
    other: '{count} posts in {category}',
  },
  'blog.resultsMatching': {
    one: '{count} post matching “{query}”',
    other: '{count} posts matching “{query}”',
  },
  'blog.resultsInCategoryMatching': {
    one: '{count} post in {category} matching “{query}”',
    other: '{count} posts in {category} matching “{query}”',
  },
  'blog.empty.title': 'No posts found',
  'blog.empty.text': 'Try a different search term or category.',
  'blog.empty.clear': 'Clear filters',

  // -------------------- Post card --------------------
  'postCard.read': 'Read article',

  // -------------------- Blog post --------------------
  'post.back': 'Back to all posts',
  'post.by': 'By {author}',
  'post.readMore': 'Read more articles',
  'post.coverAlt': 'Cover image for {title}',
  'post.notFound.title': 'Post not found',
  'post.notFound.text': 'That article may have been moved or removed.',
  'post.notFound.back': 'Back to the blog',

  // -------------------- Admin --------------------
  'admin.eyebrow': 'Admin',
  'admin.list.title': 'Manage posts',
  'admin.list.lead':
    'Create, edit, and delete blog posts. Changes save to your browser and appear instantly on the public site.',
  'admin.edit.title': 'Edit post',
  'admin.new.title': 'New post',
  'admin.form.lead':
    'Fill in the details below. All fields marked required must be completed.',
  'admin.newPost': 'New post',
  'admin.stats.posts': 'Total posts',
  'admin.stats.categories': 'Categories',
  'admin.stats.authors': 'Authors',
  'admin.empty.title': 'No posts yet',
  'admin.empty.text': 'Create your first post to get growing.',
  'admin.table.post': 'Post',
  'admin.table.category': 'Category',
  'admin.table.author': 'Author',
  'admin.table.date': 'Date',
  'admin.table.actions': 'Actions',
  'admin.action.edit': 'Edit',
  'admin.action.delete': 'Delete',
  'admin.deleteConfirm': 'Delete “{title}”? This cannot be undone.',
  'admin.back': 'Back to posts',

  // -------------------- Post form --------------------
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
  'form.excerptPlaceholder': 'A short, enticing summary of the post…',
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
  'form.error.content': 'Post content cannot be empty.',
  'form.error.cover': 'A cover image URL is required.',
  'form.save': 'Save changes',
  'form.publish': 'Publish post',
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
