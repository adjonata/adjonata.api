declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
      CONNECTION: string;
      ENABLE_REGISTRATION: "true" | "false";
      PORT: string;
    }
  }
}

export {};
