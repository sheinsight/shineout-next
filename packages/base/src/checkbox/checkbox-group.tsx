import { CheckboxGroupProps } from './checkbox-group.type';
import { useInputAble, useListSelectMultiple, usePersistFn, util } from '@sheinx/hooks';
import GroupContext from './group-context';
import Checkbox from './checkbox';
import React, { useContext } from 'react';
import clsx from 'clsx';
import useWithFormConfig from '../common/use-with-form-config';
import { FormFieldContext } from '../form/form-field-context';

const defaultFormat = (d: any) => d;
const defaultRenderItem = (d: any) => d;


const Group = <DataItem, Value extends any[]>(props0: CheckboxGroupProps<DataItem, Value>) => {
  const {format = defaultFormat, renderItem = defaultRenderItem} = props0
  const props = useWithFormConfig(props0);
  const { fieldId } = useContext(FormFieldContext);
  const { children, className, block, keygen, jssStyle, size, style, disabled } = props;
  const checkboxStyle = jssStyle?.checkbox?.();

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
    separator: props.separator,
    disabled,
    format: format,
    keygen: props.keygen,
    data: props.data || ([] as DataItem[]),
  };

  const datum = useListSelectMultiple<DataItem, Value>(useListParams);

  const handleItemChange = usePersistFn(
    (_: DataItem | undefined, checked: boolean, raw: DataItem) => {
      if (checked) {
        datum.add(raw);
      } else {
        datum.remove(raw);
      }

      if (children && React.isValidElement(children)) {
        children.props.onChange?.(_, checked, children.props.htmlValue);
      }
    },
  );

  const isChecked = usePersistFn((d: DataItem) => {
    return datum.check(d);
  });

  const getContent = (d: DataItem, index: number) => {
    if (typeof renderItem === 'string' && d) {
      return (d as any)[renderItem] as unknown as React.ReactNode;
    }
    if (typeof renderItem === 'function') {
      return renderItem(d, index);
    }

    return '';
  };

  const providerValue: {
    checked: (d: DataItem) => boolean;
    onChange: (_: DataItem | undefined, checked: boolean, raw: DataItem) => void;
    size?: 'small' | 'default' | 'large';
    disabled?: boolean | ((data: DataItem) => boolean) | undefined;
  } = {
    checked: isChecked,
    onChange: handleItemChange,
    size,
  };

  // 没有 disabled 无需透传，否则会影响下层 disabled 覆盖优先级
  if ('disabled' in props0) {
    providerValue.disabled = disabled;
  }

  const groupClass = clsx(
    className,
    checkboxStyle?.group,
    !!block && checkboxStyle?.groupBlock,
  );
  if (props.data === undefined) {
    return (
      <div className={groupClass} style={style} id={fieldId}>
        <GroupContext.Provider value={providerValue}>{children}</GroupContext.Provider>
      </div>
    );
  } else {
    return (
      <div className={groupClass} style={style} id={fieldId}>
        {props.data.map((d, i) => (
          <Checkbox
            jssStyle={jssStyle}
            size={size}
            checked={datum.check(d)}
            disabled={datum.disabledCheck(d)}
            key={util.getKey(keygen, d, i)}
            htmlValue={d}
            onChange={handleItemChange}
          >
            {getContent(d, i)}
          </Checkbox>
        ))}
        {children}
      </div>
    );
  }
};

export default Group;
