// The admin username and password, in the clear.
//
// This site is front end only — there is no server anywhere to check a password
// against, so these two words are compiled into the JavaScript bundle that every
// visitor downloads. Anyone who opens the browser's developer tools can read
// them. The client was told exactly that and chose these credentials anyway.
//
// So: this is a gate that stops a stray click on /admin from landing someone in
// the editor. It is not security, and nothing here should be mistaken for it.

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin';
