import { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { addResizeObserver, usePersistFn, util, FilterContext } from '@sheinx/hooks';
import { SelectClasses } from './select.type';
import { ListOptionProps } from './list-option.type';
import Icons from '../icons';
import { useConfig } from '../config';
import { CommonClasses } from '../common/type';

const ListOption = <DataItem, Value>(props: ListOptionProps<DataItem, Value>) => {
  const {
    jssStyle,
    datum,
    index,
    data,
    lineHeight,
    multiple,
    isHover,
    renderItem,
    dynamicVirtual,
    isAnimationFinish,
    onHover,
    onOptionClick,
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);
  const config = useConfig();
  const styles = jssStyle?.select?.() as SelectClasses;
  const commonStyles = jssStyle?.common?.() as CommonClasses;
  const isChecked = datum.check(data);
  const isDisabled = datum.disabledCheck(data);
  const rootClass = classNames(styles?.option, `option-${index}`, {
    [styles?.optionHover]: isHover,
  });

  const innerClass = classNames(styles?.optionInner, {
    [styles?.optionActive]: isChecked,
    [styles?.optionDisabled]: isDisabled,
  });

  const handleEnter = () => {
    onHover(index);
  };

  const handleClick = () => {
    if (datum.disabledCheck(data)) return;
    if (isChecked && multiple) {
      datum.remove(data);
    } else {
      datum.add(data);
    }
    onOptionClick(data, index);
  };

  const setVirtualRowHeight = usePersistFn(() => {
    if (!props.setRowHeight || !optionRef.current) return;
    const optionHeight = optionRef.current.getBoundingClientRect().height;
    if (optionHeight !== 0) {
      props.setRowHeight(index, optionHeight);
    }
  });

  const renderCheckedIcon = () => {
    return (
      <span className={styles.checkedIcon} dir={config.direction}>
        {Icons.select.Check}
      </span>
    );
  };

  const { filterText } = useContext(FilterContext);
  const result = props.highlight ? util.getHighlightText({
    nodeList: renderItem(data),
    searchWords: filterText,
    highlightClassName: commonStyles.highlight,
  }) : renderItem(data);
  const title = typeof result === 'string' ? result : '';

  useEffect(() => {
    if (!isAnimationFinish) return;
    setVirtualRowHeight();
  }, [isAnimationFinish]);

  useEffect(() => {
    if (!optionRef.current) return;
    const cancelObserver = addResizeObserver(optionRef.current, setVirtualRowHeight, {
      direction: 'y',
    });

    return () => {
      cancelObserver();
    };
  }, []);
  return (
    <li
      ref={optionRef}
      tabIndex={-1}
      className={rootClass}
      title={title}
      style={{ [dynamicVirtual ? 'minHeight' : 'height']: lineHeight }}
      onClick={handleClick}
      onMouseEnter={handleEnter}
    >
      <div className={innerClass}>
        {result}
        {multiple && isChecked && renderCheckedIcon()}
      </div>
    </li>
  );
};

export default ListOption;
