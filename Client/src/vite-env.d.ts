/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_BASE_API_URL: string;
  readonly VITE_REACT_API_GOOGLE_URL: string;
  readonly VITE_REACT_CDN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}