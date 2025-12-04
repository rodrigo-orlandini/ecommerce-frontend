import { z } from 'zod';

export function validateForm<T extends z.ZodTypeAny>(schema: T, data: unknown) {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true as const,
      data: result.data,
      error: null,
    };
  }

  const firstIssue = result.error.issues[0];
  const errorMessage = firstIssue ? firstIssue.message : 'Erro de validação';

  return {
    success: false as const,
    data: null,
    error: errorMessage,
  };
}
