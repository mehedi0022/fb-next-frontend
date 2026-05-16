type ApiErrorShape = {
  data?: {
    message?: string;
    errors?: Record<string, string | string[]>;
  };
  error?: string;
  status?: number | string;
};

const firstErrorFromMap = (errors?: Record<string, string | string[]>) => {
  if (!errors) return null;
  for (const value of Object.values(errors)) {
    if (Array.isArray(value) && value.length > 0) return String(value[0]);
    if (typeof value === "string" && value.trim()) return value;
  }
  return null;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Request failed.",
) => {
  const err = error as ApiErrorShape;
  const fieldError = firstErrorFromMap(err?.data?.errors);
  if (fieldError) return fieldError;
  if (err?.data?.message) return err.data.message;
  if (err?.error) return err.error;
  return fallback;
};

