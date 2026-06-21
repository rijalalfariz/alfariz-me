import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Config ─────────────────────────────────────────────────────────────────────
// Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your .env.local
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

// Add or remove scopes as needed
const SCOPES = [
  'https://www.googleapis.com/auth/drive',            // list, upload, delete, download
  'https://www.googleapis.com/auth/spreadsheets',     // read & write sheets
].join(' ');

// ─── Types ───────────────────────────────────────────────────────────────────────
type TokenClient = ReturnType<Window['google']['accounts']['oauth2']['initTokenClient']>;

export interface UseGoogleAuthReturn {
  /** True once both gapi and GIS scripts are initialised and ready */
  isReady:    boolean;
  isSignedIn: boolean;
  signIn:     () => void;
  signOut:    () => void;
}

// ─── Helper: inject a <script> tag only once ─────────────────────────────────────
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s   = document.createElement('script');
    s.src     = src;
    s.async   = true;
    s.defer   = true;
    s.onload  = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

// ─── Hook ────────────────────────────────────────────────────────────────────────
export function useGoogleAuth(): UseGoogleAuthReturn {
  const [gapiReady, setGapiReady] = useState(false);
  const [gisReady,  setGisReady]  = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const tokenClientRef = useRef<TokenClient | null>(null);

  // ── Load gapi ──────────────────────────────────────────────────────────────
  useEffect(() => {
    loadScript('https://apis.google.com/js/api.js')
      .then(() => {
        window.gapi.load('client', async () => {
          // We don't need a discoveryDoc — we call REST directly
          await window.gapi.client.init({});
          setGapiReady(true);
        });
      })
      .catch(console.error);
  }, []);

  // ── Load Google Identity Services ──────────────────────────────────────────
  useEffect(() => {
    loadScript('https://accounts.google.com/gsi/client')
      .then(() => {
        tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope:     SCOPES,
          callback:  (resp) => {
            if (resp.error) {
              console.error('Google auth error:', resp.error);
              return;
            }
            // Token is now stored in gapi — accessible via gapi.client.getToken()
            setIsSignedIn(true);
          },
        });
        setGisReady(true);
      })
      .catch(console.error);
  }, []);

  // ── Sign in ────────────────────────────────────────────────────────────────
  const signIn = useCallback(() => {
    const client = tokenClientRef.current;
    if (!client) return;

    // If a token already exists in gapi, skip the consent screen
    const hasExistingToken = !!window.gapi?.client?.getToken();
    client.requestAccessToken({ prompt: hasExistingToken ? '' : 'consent' });
  }, []);

  // ── Sign out ───────────────────────────────────────────────────────────────
  const signOut = useCallback(() => {
    const token = window.gapi?.client?.getToken();
    if (token) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken(null);
    }
    setIsSignedIn(false);
  }, []);

  return {
    isReady:  gapiReady && gisReady,
    isSignedIn,
    signIn,
    signOut,
  };
}

// ─── Standalone helper used inside API hooks ─────────────────────────────────────
/** Reads the current access token from gapi. Throws if not authenticated. */
export function getAccessToken(): string {
  const token = window.gapi?.client?.getToken()?.access_token;
  if (!token) throw new Error('Not authenticated — please sign in with Google.');
  return token;
}