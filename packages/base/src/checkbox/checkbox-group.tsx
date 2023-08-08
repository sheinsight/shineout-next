import { CheckboxGroupProps } from './checkbox-group.type';
import { useInputAble, useListSelect, usePersistFn, util } from '@sheinx/hooks';
import groupContext from './group-context';
import Checkbox from './checkbox';
import React from 'react';
import classNames from 'classnames';
import useWithFormConfig from '../common/use-with-form-config';

const Group = <DataItem, Value extends any[]>(props: CheckboxGroupProps<DataItem, Value>) => {
  const { children, className, block, keygen, jssStyle, style } = props;
  const { disabled } = useWithFormConfig(props);

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
    format: props.format,
    keygen: props.keygen,
    data: props.data || ([] as DataItem[]),
  };

  const datum = useListSelect<DataItem, Value>(useListParams);

  const handleItemChange = usePersistFn(
    (_: DataItem | undefined, checked: boolean, raw: DataItem) => {
      if (checked) {
        datum.add(raw);
      } else {
        datum.remove(raw);
      }
    },
  );

  const isChecked = usePersistFn((d: DataItem) => {
    return datum.check(d);
  });

  const getContent = (d: DataItem, index: number) => {
    const { renderItem } = props;
    if (typeof renderItem === 'string') {
      return d[renderItem] as unknown as React.ReactNode;
    }
    if (typeof renderItem === 'function') {
      return renderItem(d, index);
    }

    return '';
  };

  const providerValue = {
    checked: isChecked,
    onChange: handleItemChange,
    disabled,
  };
  const groupClass = classNames(
    className,
    jssStyle.checkbox?.group,
    !!block && jssStyle?.checkbox?.groupBlock,
  );
  if (props.data === undefined) {
    return (
      <div className={groupClass}>
        <groupContext.Provider value={providerValue}>{children}</groupContext.Provider>
      </div>
    );
  } else {
    return (
      <div className={groupClass} style={style}>
        {props.data.map((d, i) => (
          <Checkbox
            jssStyle={jssStyle}
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
Group.defaultProps = {
  format: (d: any) => d,
  renderItem: (d: any) => d,
};

export default Group;
