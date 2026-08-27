// Single place for the business' own details, so the footer (and anything else
// that needs them later) never hardcodes a phone number in JSX.
//
// NOTE: these are placeholders in the same spirit as the picsum imagery and the
// sample post authors — swap them for the real details before going live.

export const site = {
  name: 'Malina Garden',
  email: 'zdravo@rootedandgreen.me',
  phone: '+382 67 000 000',
  // Kept as a display string; a real address block would want structured data.
  address: 'Bulevar Svetog Petra Cetinjskog 12, 81000 Podgorica',
  hours: 'pon–pet 08–17h',
};

// `label` is language-neutral (a brand name is a brand name); only the group
// heading above these links gets translated.
export const socialLinks = [
  { key: 'instagram', label: 'Instagram', href: 'https://instagram.com/' },
  { key: 'facebook', label: 'Facebook', href: 'https://facebook.com/' },
];

export const contactHref = `mailto:${site.email}`;
export const phoneHref = `tel:${site.phone.replace(/[^+\d]/g, '')}`;
