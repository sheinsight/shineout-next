import classNames from 'classnames';
import { SelectClasses } from '@sheinx/shineout-style';
import { ListOptionProps } from './list-option.type';
import Icons from '../icons';

const ListOption = <DataItem, Value>(props: ListOptionProps<DataItem, Value>) => {
  const { jssStyle, datum, index, data, multiple, renderItem } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const isChecked = datum.check(data);
  const isDisabled = datum.disabledCheck(data);

  const rootClass = classNames(styles?.option, `option-${index}`, {});

  const innerClass = classNames(styles?.optionInner, {
    [styles?.optionActive]: isChecked,
    [styles?.optionDisabled]: isDisabled,
  });

  const handleClick = () => {
    if (isChecked) {
      datum.remove(data);
    } else {
      datum.add(data);
    }
  };

  const renderCheckedIcon = () => {
    return <span className={styles.checkedIcon}>{Icons.Check}</span>;
  };

  return (
    <li className={rootClass} onClick={handleClick}>
      <div className={innerClass}>
        {renderItem(data)}
        {multiple && isChecked && renderCheckedIcon()}
      </div>
    </li>
  );
};

export default ListOption;
