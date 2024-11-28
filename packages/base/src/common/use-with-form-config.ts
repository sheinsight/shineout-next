import { BaseFormProps, useFormConfig } from '@sheinx/hooks';

export const useWithFormConfig = <T>(props: T) => {
  const formConfig = useFormConfig();
  const size: BaseFormProps<any>['size'] = (props as BaseFormProps<any>)?.size || formConfig.size;
  const disabled: boolean | undefined = formConfig.disabled || (props as BaseFormProps<any>)?.disabled;
  const reserveAble: boolean | undefined = (props as BaseFormProps<any>)?.reserveAble ?? formConfig.reserveAble;

  return {
    ...props,
    ...(size !== undefined && { size }),
    ...(disabled !== undefined && { disabled }),
    ...(reserveAble !== undefined && { reserveAble }),
    ...(formConfig.formName !== undefined && { formName: formConfig.formName }),
  } as T
};

export default useWithFormConfig;

