import { BaseFormProps, useFormConfig } from '@sheinx/hooks';

export const useWithFormConfig = <T>(props: T) => {
  const formConfig = useFormConfig();
  const size: BaseFormProps<any>['size'] = (props as BaseFormProps<any>)?.size || formConfig.size;
  const disabled: boolean | undefined = formConfig.disabled || (props as BaseFormProps<any>)?.disabled;

  return {
    ...props,
    ...(size !== undefined && { size }),
    ...(disabled !== undefined && { disabled }),
    ...(formConfig.formName !== undefined && { formName: formConfig.formName }),
    forceSyncInputValue: formConfig.forceSyncInputValue,
  } as T
};

export default useWithFormConfig;

