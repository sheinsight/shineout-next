import { BaseFormProps, useFormConfig } from '@sheinx/hooks';

export const useWithFormConfig = <T>(props: T) => {
  const formConfig = useFormConfig();
  const size: BaseFormProps<any>['size'] = (props as any)?.size || formConfig.size;
  const disabled: boolean = formConfig.disabled || (props as any)?.disabled;
  return {
    ...props,
    size,
    disabled,
  } as T;
};

export default useWithFormConfig;
