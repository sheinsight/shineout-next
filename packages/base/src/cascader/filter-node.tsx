import classNames from 'classnames';
import { KeygenResult } from '@sheinx/hooks';
import { CascaderClasses } from '@sheinx/shineout-style';
import { FilterNodeProps } from './filter-node.type';

const FilterNode = <DataItem, Value extends KeygenResult[]>(
  props: FilterNodeProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    data,
    shouldFinal,
    datum,
    renderItem,
    setInputText,
    setFilterText,
    onChange,
    onPathChange,
  } = props;

  const styles = jssStyle?.cascader?.() as CascaderClasses;

  const handleSelectItem = (index: number, e?: any) => {
    const isFinal = data && index === data.length - 1;
    if (shouldFinal && !isFinal) return;
    if (e) e.stopPropagation();
    const item = data[index];
    const isDisabled = datum.isDisabled(datum.getKey(item));
    if (isDisabled) return;
    const keys = data.slice(0, index + 1).map((i: DataItem) => datum.getKey(i)) as Value;
    if (onChange) onChange(keys);
    onPathChange(datum.getKey(item), item, keys.slice(0, keys.length - 1) as Value, true);
    // TODO: 清空输入框内容
    setInputText('');
    setFilterText('');
  };

  const handleSelect = () => {
    handleSelectItem(data.length - 1);
  };

  return (
    <div className={classNames(styles.option, styles.filterOption)} onClick={handleSelect}>
      <div className={classNames(styles.optionInner)}>
        {data.map((item, index) => {
          const handleClick = (e: any) => {
            handleSelectItem(index, e);
          };
          const isDisabled = datum.isDisabled(datum.getKey(item));
          const content = (
            <div
              key='content'
              onClick={handleClick}
              className={classNames(isDisabled && styles.filterDisabledOption)}
            >
              {renderItem(item)}
            </div>
          );
          if (index === 0) return content;

          return [
            <span key='separator' className={classNames(styles.filterOptionSeparator)}>
              /
            </span>,
            content,
          ];
        })}
      </div>
    </div>
  );
};

export default FilterNode;
