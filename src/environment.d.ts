declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
      CONNECTION: string;
      ENABLE_REGISTRATION: "true" | "false";
      PRODUCTION_PORT: string;
    }
  }
}

export {};
