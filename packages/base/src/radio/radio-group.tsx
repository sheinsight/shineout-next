import { RadioGroupProps } from './radio-group.type';
import { useInputAble, useListSelectSingle, usePersistFn, util } from '@sheinx/hooks';
import groupContext from './group-context';
import Radio from './radio';
import React from 'react';
import classNames from 'classnames';

const Group = <DataItem, Value>(props: RadioGroupProps<DataItem, Value>) => {
  const { children, className, button, size, block, keygen, jssStyle } = props;

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
    disabled: props.disabled,
    format: props.format,
    keygen: props.keygen,
    data: props.data || ([] as DataItem[]),
  };

  const datum = useListSelectSingle(useListParams);

  const handleItemChange = usePersistFn((d: DataItem) => {
    datum.add(d, { overwrite: true });
  });

  const handleIndexChange = usePersistFn((index: number) => {
    datum.add(props.data![index], { overwrite: true });
  });

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
    disabled: props.disabled,
  };
  const groupClass = classNames(className, jssStyle.group, {
    [jssStyle.groupBlock]: block,
    [jssStyle.groupButton]: button,
    [jssStyle.groupOutline]: button === 'outline',
    [jssStyle.groupSmall]: button && size === 'small',
    [jssStyle.groupLarge]: button && size === 'large',
  });
  if (props.data === undefined) {
    return (
      <div className={groupClass}>
        <groupContext.Provider value={providerValue}>{children}</groupContext.Provider>
      </div>
    );
  } else {
    return (
      <div className={groupClass}>
        {props.data.map((d, i) => (
          <Radio
            jssStyle={jssStyle}
            checked={datum.check(d)}
            disabled={datum.disabledCheck(d)}
            key={util.getKey(d, keygen, i)}
            htmlValue={i}
            onChange={handleIndexChange}
          >
            {getContent(d, i)}
          </Radio>
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
