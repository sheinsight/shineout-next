import { FilterNodeProps } from './filter-node.type';

const FilterNode = <DataItem,>(props: FilterNodeProps<DataItem>) => {
  const { data } = props;
  return <div>FilterNode</div>;
};

export default FilterNode;