export class FormError extends Error {
  constructor(message: string, props?: any) {
    super(message);
    this.name = 'FormError';
    this.props = props;
  }
  props: any;
}

export function wrapFormError(error: Error, props?: any): FormError;
export function wrapFormError(error: Error[], props?: any): FormError[];
export function wrapFormError(error: Error | Error[], props: any = {}) {
  if (error instanceof FormError) return error;
  if (error instanceof Error) {
    return new FormError(error.message, props);
  }
  if (Array.isArray(error)) {
    return error.map((e) => wrapFormError(e));
  }
  return error;
}
