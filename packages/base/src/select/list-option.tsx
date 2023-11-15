import classNames from 'classnames';
import { SelectClasses } from '@sheinx/shineout-style';
import { ListOptionProps } from './list-option.type';

const ListOption = <DataItem, Value>(props: ListOptionProps<DataItem, Value>) => {
  const { jssStyle, datum, index, data, renderItem } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const isChecked = datum.check(data);

  const rootClass = classNames(styles?.option, `option-${index}`, {
    [styles?.optionActive]: isChecked,
  });

  const handleClick = () => {
    if (isChecked) {
      datum.remove(data);
    } else {
      datum.add(data);
    }
  };

  return (
    <div className={rootClass} onClick={handleClick}>
      {renderItem(data)}
    </div>
  );
};

export default ListOption;
