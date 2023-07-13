import { BaseFormProps, useFormConfig } from '@sheinx/hooks';

export const useWithFormConfig = (props: any) => {
  const formConfig = useFormConfig();
  const size: BaseFormProps<any>['size'] = (props as any)?.size || formConfig.size;
  const disabled: boolean = formConfig.disabled || (props as any)?.disabled;
  return {
    ...props,
    size,
    disabled,
  };
};

export default useWithFormConfig;
