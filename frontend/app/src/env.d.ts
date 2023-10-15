/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_PROJECT_ID: string;
    VITE_INFURA_ID: string;
    VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}