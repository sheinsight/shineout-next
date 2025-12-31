import clsx from 'clsx';
import { PaginationSizeListProps } from './pagination-size-list.type';
import Select from '../select';

const PaginationSizeList = (props: PaginationSizeListProps) => {
  const {
    jssStyle,
    disabled,
    current,
    pageSizeList = [10, 20, 30, 50, 100],
    text,
    size,
    select,
    sizeListProps,
    pageSize,
    onChange,
  } = props;
  const paginationStyle = jssStyle?.pagination?.();
  const rootClasses = clsx(paginationStyle?.section, paginationStyle?.sizeList);

  const handleChange = (pageSize: number) => {
    const start = (current - 1) * props.pageSize + 1;

    onChange(Math.ceil(start / pageSize), pageSize);
  };

  return (
    <div className={rootClasses}>
      <Select
        jssStyle={jssStyle}
        disabled={disabled}
        absolute
        autoAdapt
        keygen
        size={size}
        clearable={false}
        value={pageSize}
        onChange={handleChange}
        data={pageSizeList}
        renderItem={(d) => `${d} ${text.page || ''}`}
        {...sizeListProps}
        {...select}
      />
    </div>
  );
};

export default PaginationSizeList;
