function toBoolean(value: string | undefined): boolean {
  return value === "true";
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 3306,
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS || "Th3b4k3nd",
  DB_NAME: process.env.DB_NAME || "sales",

  DB_LOGGER: toBoolean(process.env.DB_LOGGER),
};