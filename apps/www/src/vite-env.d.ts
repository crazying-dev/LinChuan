/// <reference types="vite/client" />

// https://cn.vitejs.dev/guide/env-and-mode.html

declare const __APP_VERSION__: string;

interface ImportMetaEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
