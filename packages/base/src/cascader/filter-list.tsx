import classNames from 'classnames';
import { KeygenResult, util } from '@sheinx/hooks';
import { CascaderClasses } from '@sheinx/shineout-style';
import { FilterListProps } from './filter-list.type';
import FilterNode from './filter-node';
import Spin from '../spin';

const FilterList = <DataItem, Value extends KeygenResult[]>(
  props: FilterListProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    data,
    datum,
    loading,
    childrenKey,
    wideMatch,
    shouldFinal,
    filterFunc,
    renderItem,
    renderOptionList,
    setInputText,
    setFilterText,
    onChange,
    onPathChange,
  } = props;
  const styles = jssStyle?.cascader?.() as CascaderClasses;

  const getKey = (path: DataItem[]) => {
    return path.map((d) => datum.getKey(d)).join('-');
  };

  const getWideMatch = (list: DataItem[][]) => {
    return list.filter((arr) => arr.some((item) => filterFunc?.(item)));
  };

  const renderLoading = () => {
    return <Spin jssStyle={jssStyle}></Spin>;
  };

  const renderList = () => {
    let list = util.getFlattenTree(data, childrenKey, wideMatch);
    if (wideMatch) {
      list = getWideMatch(list);
    }
    if (loading) return renderLoading();

    return (
      <div className={classNames(styles.list)}>
        {list.map((item) => {
          return (
            <FilterNode
              jssStyle={jssStyle}
              key={getKey(item)}
              data={item}
              datum={datum}
              shouldFinal={shouldFinal}
              renderItem={renderItem}
              setInputText={setInputText}
              setFilterText={setFilterText}
              onChange={onChange}
              onPathChange={onPathChange}
            />
          );
        })}
      </div>
    );
  };

  const renderEmpety = () => {
    return <span>noData</span>;
  };

  if (!data || data.length === 0) return renderEmpety();

  const list = renderList();
  return renderOptionList ? renderOptionList(list, { loading: !!loading }) : list;
};

export default FilterList;
