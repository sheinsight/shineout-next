import classNames from 'classnames';
import { SelectClasses } from './select.type';
import { ListOptionProps } from './list-option.type';
import Icons from '../icons';
import { useConfig } from '../config';

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
    onHover,
    onOptionClick,
  } = props;
  const config = useConfig();
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
    if (datum.disabledCheck(data)) return;
    if (isChecked && multiple) {
      datum.remove(data);
    } else {
      datum.add(data);
    }
    onOptionClick(data, index);
  };

  const renderCheckedIcon = () => {
    return (
      <span className={styles.checkedIcon} dir={config.direction}>
        {Icons.select.Check}
      </span>
    );
  };

  const result = renderItem(data);
  const title = typeof result === 'string' ? result : '';

  return (
    <li
      tabIndex={-1}
      className={rootClass}
      title={title}
      style={{ height: lineHeight }}
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
