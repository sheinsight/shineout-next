import { BaseFormProps, useFormConfig } from '@sheinx/hooks';

export const useWithFormConfig = <T>(props: T) => {
  const formConfig = useFormConfig();
  const size: BaseFormProps<any>['size'] = (props as any)?.size || formConfig.size;
  const disabled: boolean = formConfig.disabled || (props as any)?.disabled;
  const reserveAble: boolean = (props as any)?.reserveAble ?? formConfig.reserveAble;
  return {
    ...props,
    size,
    disabled,
    reserveAble,
  } as T;
};

export default useWithFormConfig;
