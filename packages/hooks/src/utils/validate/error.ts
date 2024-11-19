export class FormError extends Error {
  fieldName: string = '';
  constructor(message: string, props?: any) {
    super(message);
    this.name = 'FormError';
    this.props = props;
    if (props.name) {
      this.fieldName = props.name;
    }
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
