import { RadioGroupProps } from './radio-group.type';
import { useInputAble, useListSelectSingle, usePersistFn, util } from '@sheinx/hooks';
import GroupContext from './group-context';
import Radio from './radio';
import React, { useContext } from 'react';
import clsx from 'clsx';
import useWithFormConfig from '../common/use-with-form-config';
import Button from '../button/button';
import { FormFieldContext } from '../form/form-field-context';

const defaultFormat = (d: any) => d;
const defaultRenderItem = (d: any) => d;

const Group = <DataItem, Value>(props0: RadioGroupProps<DataItem, Value>) => {
  const {format = defaultFormat, renderItem = defaultRenderItem} = props0
  const props = useWithFormConfig(props0);
  const { fieldId } = useContext(FormFieldContext);

  const { children, className, button, block, keygen, jssStyle, style, size, disabled, renderWrapper: externalRenderWrapper  } = props;
  const radioClasses = jssStyle?.radio?.();

  const inputAbleProps = useInputAble({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
    control: 'value' in props,
    beforeChange: props.beforeChange,
  });

  const useListParams = {
    value: inputAbleProps.value,
    onChange: inputAbleProps.onChange,
    prediction: props.prediction,
    disabled,
    format: format,
    keygen: props.keygen,
    data: props.data || ([] as DataItem[]),
  };

  const datum = useListSelectSingle(useListParams);

  const handleItemChange = usePersistFn((d: DataItem) => {
    datum.add(d);
  });

  const handleIndexChange = usePersistFn((index: number) => {
    datum.add(props.data![index]);
  });

  const isChecked = usePersistFn((d: DataItem) => {
    return datum.check(d);
  });

  const getContent = (d: DataItem, index: number) => {
    if (typeof renderItem === 'string') {
      return d[renderItem] as unknown as React.ReactNode;
    }
    if (typeof renderItem === 'function') {
      return renderItem(d, index);
    }

    return '';
  };

  const createInternalRenderWrapper = React.useCallback((data?: any, index?: number) => {
    return (info: any): React.ReactElement => {
      const { children, content, checked, disabled, wrapperProps, inputProps } = info;
      const isOutline = button === 'outline';
      const checkedProps = {
        mode: isOutline ? 'outline' : undefined,
        type: checked ? 'primary' : 'secondary',
      } as any;
      if (button) {
        return (
          <Button
            jssStyle={jssStyle}
            size={size}
            disabled={disabled}
            {...util.getDataAttribute({ ['outline']: isOutline ? 'true' : undefined })}
            {...checkedProps}
            {...wrapperProps}
          >
            <input type='radio' {...inputProps} />
            {children}
          </Button>
        );
      }
      if (externalRenderWrapper) {
        return externalRenderWrapper({ ...info, item: data, index });
      }
      return content;
    };
  }, [button, externalRenderWrapper]);

  const internalRenderWrapper = React.useMemo(() => createInternalRenderWrapper(), [createInternalRenderWrapper]);

  const providerValue: any = {
    checked: isChecked,
    onChange: handleItemChange,
    renderWrapper: internalRenderWrapper,
    ...(size !== undefined && { size }),
    ...(disabled !== undefined && { disabled })
  };

  const groupClass = clsx(
    className,
    radioClasses?.group,
    !!block && radioClasses?.groupBlock,
    !!button && radioClasses?.groupButton,
  );

  const Radios =
    props.data === undefined ? (
      <GroupContext.Provider value={providerValue}>{children}</GroupContext.Provider>
    ) : (
      // 传一个空的providerValue目的是为了避免父级Radio向下传递的GroupContext.Consumer影响
      <GroupContext.Provider value={{}}>
        {props.data.map((d, i) => (
          <Radio
            jssStyle={jssStyle}
            checked={datum.check(d)}
            disabled={datum.disabledCheck(d)}
            key={util.getKey(keygen, d, i)}
            htmlValue={i}
            size={size}
            onChange={handleIndexChange}
            renderWrapper={createInternalRenderWrapper(d, i)}
          >
            {getContent(d, i)}
          </Radio>
        ))}
        {children}
      </GroupContext.Provider>
    );
  if (button)
    return (
      <Button.Group jssStyle={jssStyle} className={groupClass} style={style} id={fieldId}>
        {Radios}
      </Button.Group>
    );

  return (
    <div className={groupClass} style={style} id={fieldId}>
      {Radios}
    </div>
  );
};

export default Group;
