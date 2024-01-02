import classNames from 'classnames';
import { SelectClasses } from '@sheinx/shineout-style';
import { ListOptionProps } from './list-option.type';
import Icons from '../icons';

const ListOption = <DataItem, Value>(props: ListOptionProps<DataItem, Value>) => {
  const {
    jssStyle,
    datum,
    index,
    data,
    multiple,
    isHover,
    closePop,
    renderItem,
    onHover,
    onOptionClick,
  } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
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
    if (isChecked) {
      if (multiple) datum.remove(data);
    } else {
      datum.add(data);
    }
    if (!multiple) {
      closePop();
    }
    onOptionClick(data, index);
  };

  const renderCheckedIcon = () => {
    return <span className={styles.checkedIcon}>{Icons.Check}</span>;
  };

  const result = renderItem(data);
  // [TODO] title 可能是 ReactNode，这种情况无法展示 title
  const title = typeof result === 'string' ? result : '';

  return (
    <li
      tabIndex={-1}
      className={rootClass}
      title={title}
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
