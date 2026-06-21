// ─── Minimal typings for gapi client + Google Identity Services ────────────────
// Full typings: @types/gapi and @types/google.accounts — install if preferred.

declare global {
  interface Window {
    gapi: {
      load: (lib: string, callback: () => void) => void;
      client: {
        init:     (config: object) => Promise<void>;
        getToken: () => { access_token: string } | null;
        setToken: (token: string | null) => void;
      };
    };
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope:     string;
            callback:  ((resp: { error?: string; access_token: string }) => void) | string;
          }) => {
            requestAccessToken: (options: { prompt: string }) => void;
          };
          revoke: (token: string, callback?: () => void) => void;
        };
      };
    };
  }
}

export {};