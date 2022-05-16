export interface StandardResponse extends Record<string, unknown> {
  success?: boolean;
  message?: string;
  error?: string;
}