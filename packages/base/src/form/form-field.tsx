import React, { useContext, useMemo } from 'react';
import {
  useFormConfig,
  useFormControl,
  usePersistFn,
  util,
  FieldsetContext,
  FormItemContext,
  useFormSchema,
  useFormFunc,
} from '@sheinx/hooks';
import { FieldControlProps, FormFieldProps } from './form-field.type';
import { FormFieldContext } from './form-field-context';

const FormField = <T extends any = any>(props: FormFieldProps<T>) => {
  const { children, validateTrigger: fieldValidateTrigger } = props;

  const formConfig = useFormConfig();
  const formFunc = useFormFunc();

  // 获取最终的 validateTrigger: 优先使用字段级配置,其次使用 Form 级配置,默认为 'change'
  const validateTrigger = fieldValidateTrigger || formConfig.validateTrigger || 'change';

  const getValidateProps = usePersistFn(() => {
    if (props.getValidateProps) return props.getValidateProps();
    return props;
  });

  const formControl = useFormControl<T>({
    name: props.name,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
    reserveAble: props.reserveAble,
    rules: props.rules,
    onError: props.onError,
    bind: props.bind,
    getValidateProps,
    clearToUndefined: props.clearToUndefined,
  });

  const handleChange = usePersistFn((value: T, ...args) => {
    // @ts-ignore 兼容老版本支持传 event
    if (value && value.nativeEvent) {
      // @ts-ignore
      formControl.onChange(value.target.value, ...args);
    } else {
      formControl.onChange(value, ...args);
    }
  });

  const handleBlur = usePersistFn((e: React.FocusEvent<any>) => {
    // 先调用原始的 onBlur
    const originalOnBlur = React.isValidElement(children) ? children.props.onBlur : undefined;
    originalOnBlur?.(e);

    // 根据 validateTrigger 配置决定是否在失焦时触发校验
    // 只有 'change-blur' 模式才在失焦时触发校验
    const shouldValidateOnBlur = validateTrigger === 'change-blur';

    if (shouldValidateOnBlur && formControl.inForm && formControl.name && formFunc?.validateFields) {
      formFunc.validateFields(formControl.name as string | string[]).catch(() => {});
    }
  });

  const childrenProps = React.isValidElement(children) ? children.props : {};

  const error = childrenProps.error ?? formControl.error;

  const status = childrenProps.status ?? (formControl.error ? 'error' : undefined);

  const { fieldId, separator } = useContext(FormFieldContext);
  const formFieldId = useMemo(() => {
    if (!formConfig.formName) return;
    if (childrenProps.id) return childrenProps.id;

    if (Array.isArray(formControl.name)) {
      return formControl.name
        .map((name) => util.getFieldId(name, formConfig.formName))
        .join(separator);
    }

    return util.getFieldId(formControl.name, formConfig.formName);
  }, [formControl.name, formConfig.formName, childrenProps.id]);

  const { path: fieldsetPath } = useContext(FieldsetContext);
  const fieldsetPathId = useMemo(() => {
    if (!formConfig.formName) return;
    return util.getFieldId(fieldsetPath, formConfig.formName);
  }, [fieldsetPath, formConfig.formName]);

  const cloneProps: FieldControlProps<T> = {
    onChange: handleChange,
    onBlur: handleBlur,
    status,
    error,
  };

  if (formControl.inForm) {
    cloneProps.value = formControl.value;
  }

  if (formControl.disabled) {
    cloneProps.disabled = true;
  }

  let finalChildren;
  if (util.isFunc(children)) {
    finalChildren = children(cloneProps);
  } else if (React.isValidElement(children)) {
    finalChildren = React.cloneElement(children, cloneProps);
  } else {
    finalChildren = children;
  }

  const formSchema = useFormSchema();
  const { label } = useContext(FormItemContext);
  const finalFieldId = formFieldId || fieldId || fieldsetPathId;

  try {
    // 只有当 formConfig.formName 存在时才运行 schema 逻辑
    if (formConfig.formName && formSchema && finalFieldId) {
      const schemaFields = finalFieldId.split(separator) || [];
      const schemaMeta = formSchema.buildSchemaFromComponent({
        componentElement: finalChildren,
        rules: props.rules,
        label,
        finalFieldId,
        separator,
      });

      schemaFields.forEach((field: string) => {
        formSchema.updateSchema({
          path: util.getOriginField(field, formConfig.formName),
          meta: schemaMeta,
        });
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      util.devUseWarning.warn(`formSchema buildSchemaFromComponent error: >>${error}`);
    }
  }

  return (
    <FormFieldContext.Provider value={{ fieldId: finalFieldId, separator }}>
      {finalChildren}
    </FormFieldContext.Provider>
  );
};

export default FormField;
