import { useCallback, useEffect, useState } from 'react';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './credentials.js';

// sessionStorage, not localStorage, and deliberately: a session lives as long as
// the browser tab does, so closing the browser signs the admin out again.
export const SESSION_KEY = 'rooted-and-green:admin-session';

// The stored value is a marker, not a token — there is nothing to encode.
const SESSION_VALUE = 'signed-in';

// Several components hold their own useAuth(); this keeps them in step, so a
// logout in the admin shell is seen by the route guard straight away.
const SYNC_EVENT = 'rooted-and-green:admin-session-changed';

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === SESSION_VALUE;
  } catch {
    // Private mode or blocked storage: treat it as signed out.
    return false;
  }
}

function writeSession(signedIn) {
  try {
    if (signedIn) {
      sessionStorage.setItem(SESSION_KEY, SESSION_VALUE);
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Nothing to persist to — the in-memory state below still applies for as
    // long as the page is open.
  }
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function useAuth() {
  const [isAuthed, setIsAuthed] = useState(() => readSession());

  useEffect(() => {
    const refresh = () => setIsAuthed(readSession());
    window.addEventListener(SYNC_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(SYNC_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  // Returns whether the credentials matched, so the login screen can show its
  // error without a second round trip through state.
  const login = useCallback((user, pass) => {
    const ok = user === ADMIN_USERNAME && pass === ADMIN_PASSWORD;
    if (ok) {
      writeSession(true);
      setIsAuthed(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    writeSession(false);
    setIsAuthed(false);
  }, []);

  return { isAuthed, login, logout };
}
