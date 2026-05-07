export const apiBaseUrl: string =
// عنوان سيرفر الديتابيز 
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// Note: Only access server-only secrets (like DATABASE_URL) from server code.
export const databaseUrl: string | undefined = process.env.DATABASE_URL;

export function assertServerEnvVars(): void {
  if (typeof window !== "undefined") return; // skip on client
  // You can add required checks here if needed in the future.
}


