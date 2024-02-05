import classNames from 'classnames';
import { KeygenResult } from '@sheinx/hooks';
import { CascaderClasses } from '@sheinx/shineout-style';
import { FilterListProps } from './filter-list.type';
import { getLocale } from '../config';
import FilterNode from './filter-node';

const FilterList = <DataItem, Value extends KeygenResult[]>(
  props: FilterListProps<DataItem, Value>,
) => {
  const { jssStyle, data, datum, loading, filterDataChange, renderOptionList } = props;
  const styles = jssStyle?.cascader?.() as CascaderClasses;

  const getKey = (path: DataItem[]) => {
    return path.map((d) => datum.getKey(d)).join('-');
  };

  const getWideMatch = (list: DataItem[][]) => {
    return list.filter((arr) => arr.some((item) => filterDataChange(item)));
  };

  const renderList = () => {
    return <span>noData</span>;
  };

  const renderEmpety = () => {
    return <span> {getLocale('noData')}</span>;
  };

  if (!data || data.length === 0) return renderEmpety();

  const list = renderList();

  return (
    <div className={classNames(styles.list)}>
      {renderOptionList ? renderOptionList(list, { loading: !!loading }) : list}
    </div>
  );
};

export default FilterList;
