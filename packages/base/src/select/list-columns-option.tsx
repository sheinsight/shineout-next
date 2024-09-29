import { SelectClasses } from '../select/select.type';
import { ListColumnsOptionProps } from './list-columns-option.type';
import Checkbox from '../checkbox/simple-checkbox';
import Radio from '../radio/simple-radio';

const ListColumnsOption = <DataItem, Value>(props: ListColumnsOptionProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    datum,
    size,
    multiple,
    columns,
    columnWidth = 160,
    renderItem: renderItemProp,
  } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const style = { width: columns && columns <= 1 ? '100%' : columnWidth };

  const isChecked = datum.check(data);
  const isDisabled = datum.disabledCheck(data);

  const handleChange = () => {
    if (isDisabled) return;
    if (isChecked) {
      datum.remove(data);
      return;
    }
    datum.add(data);
  };

  const renderCheckbox = (d: DataItem) => {
    return (
      <Checkbox
        theme='dark'
        className={styles.columnsCheckbox}
        jssStyle={jssStyle}
        size={size}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      >
        {renderItemProp(d)}
      </Checkbox>
    );
  };

  const renderRadio = (d: DataItem) => {
    return (
      <Radio
        theme='dark'
        style={{ height: '100%', margin: 0 }}
        className={styles.columnsRadio}
        jssStyle={jssStyle}
        size={size}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      >
        {renderItemProp(d)}
      </Radio>
    );
  };

  const renderItem = () => {
    if (multiple) return renderCheckbox(data);
    return renderRadio(data);
  };

  return (
    <div style={style} className={styles?.columnsOption}>
      {renderItem()}
    </div>
  );
};

export default ListColumnsOption;
