/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEFAULT_PAGES_LIMIT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
