import { useState, useRef } from 'react';
import classNames from 'classnames';
import { KeygenResult, util } from '@sheinx/hooks';
import { CascaderClasses } from './cascader.type';
import { CascaderNodeProps } from './node.type';
import Checkbox from '../checkbox';
import Spin from '../spin';
import Icons from '../icons';

const { getDataAttributeName } = util;

const CascaderNode = <DataItem, Value extends KeygenResult[]>(
  props: CascaderNodeProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    active,
    data,
    multiple,
    datum,
    id,
    path,
    loader,
    expandTrigger,
    renderItem,
    childrenKey,
    shouldFinal,
    onChange,
    onPathChange,
    mode,
  } = props;

  const [loading, setLoading] = useState(false);
  const checkboxRef = useRef<HTMLElement>();
  const isDisabled = datum.isDisabled(id);
  const children = data[childrenKey] as DataItem[];
  const hasChildren = children && children.length > 0;
  const uncertainChildren = loader && !loading && children === undefined;

  const styles = jssStyle?.cascader?.() as CascaderClasses;
  const rootClass = classNames(
    styles.option,
    active && styles.activeOption,
    isDisabled && mode !== 4 && styles.optionDisabled,
  );

  const handlePathChange = () => {
    onPathChange?.(id, data, path);
  };

  const handleClick = (e: MouseEvent) => {
    if (onPathChange) onPathChange(id, data, path, true);
    if (!multiple) {
      // 单选设置了 final 属性后 如果不是末节点不触发onChange
      const shouldJump = shouldFinal && hasChildren;
      if (onChange && path && !shouldJump) onChange([...path, id] as Value, datum.getDataById(id));
    }
    if (
      loader &&
      uncertainChildren &&
      !loading &&
      !util.getParent(
        e.target as HTMLElement,
        `[${getDataAttributeName('role')}=checkbox-indicator]`,
      )
    ) {
      setLoading(true);
      loader(id, data);
    }
  };

  const handleChange = (_: any, checked: boolean) => {
    datum.set(id, checked ? 1 : 0);
    if (onChange) onChange(datum.getValue() as Value, datum.getDataById(id));
  };

  const handleSelect = (e: MouseEvent) => {
    if (util.getParent(e.target as HTMLElement, checkboxRef.current)) return;
    const checked = datum.getChecked(id);
    handleChange(null, !checked);
  };

  const isHoverAble = expandTrigger === 'hover' || expandTrigger === 'hover-only';

  const getEvents = () => {
    const events: any = {};

    if (expandTrigger !== 'hover-only' || !hasChildren) {
      if (!isDisabled || props.mode === 4) events.onClick = handleClick;
    }

    if (isHoverAble) {
      events.onMouseEnter = handlePathChange;
      if (multiple) events.onClick = handleSelect;
    }
    return events;
  };

  const renderContent = () => {
    const render = typeof renderItem === 'function' ? renderItem : (d: DataItem) => d[renderItem];
    return render(data, active, id) as React.ReactNode;
  };

  const renderIcon = () => {
    if (loading && children === undefined) {
      return (
        <span className={classNames(styles.optionIcon)} style={{ paddingTop: 2 }}>
          <Spin jssStyle={jssStyle} size={10} />
        </span>
      );
    }
    if (hasChildren || uncertainChildren) {
      return <span className={classNames(styles.optionIcon)}>{Icons.cascader.CollapseArrow}</span>;
    }

    return null;
  };
  return (
    <div className={rootClass} {...getEvents()}>
      <div className={classNames(styles.optionInner)}>
        {multiple && !(shouldFinal && hasChildren) && (
          <Checkbox
            // @ts-ignore
            theme='dark'
            jssStyle={jssStyle}
            className={styles.optionCheckbox}
            checked={datum.getChecked(id)}
            disabled={isDisabled}
            onChange={isHoverAble && multiple ? undefined : handleChange}
          />
        )}
        {renderContent()}
        {renderIcon()}
      </div>
    </div>
  );
};

export default CascaderNode;
