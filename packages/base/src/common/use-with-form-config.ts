import { BaseFormProps, useFormConfig } from '@sheinx/hooks';

export const useWithFormConfig = <T extends { disabled?: boolean; size?: any; reserveAble?: boolean }>(props: T) => {
  const formConfig = useFormConfig();
  const size: BaseFormProps<any>['size'] = props?.size || formConfig.size;
  const disabled: boolean | undefined = formConfig.disabled || props?.disabled;
  const reserveAble: boolean | undefined = props?.reserveAble ?? formConfig.reserveAble;

  return {
    ...props,
    ...(size !== undefined && { size }),
    ...(disabled !== undefined && { disabled }),
    ...(reserveAble !== undefined && { reserveAble }),
  }
};

export default useWithFormConfig;
