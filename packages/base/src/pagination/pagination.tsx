import classNames from 'classnames';
import List from './pagination-size-list';
import Jumper from './pagination-jumper';
import Buttons from './pagination-buttons';
import Simple from './pagination-simple';
import { getDataset, usePagination, util } from '@sheinx/hooks';
import { PaginationProps } from './pagination.type';

const { devUseWarning } = util;

const Pagination = (props: PaginationProps) => {
  const {
    className,
    jssStyle,
    size,
    align = 'left',
    total = 0,
    pageSize: pageSizeProp = 10,
    defaultCurrent = 1,
    current: currentProp,
    span = 5,
    onChange: onChangeProp,
    layout = ['links'],
    mode = 'text',
    simple,
    disabled,
    text = {},
    pageSizeList,
    style,
    select,
    sizeListProps,
  } = props;

  // 兼容v1 & v2版本
  if (props.sizeListProps) {
    devUseWarning.deprecated('sizeListProps', 'select', 'Pagination');
  }

  const { onChange, current, pageSize } = usePagination({
    total,
    span,
    pageSize: pageSizeProp,
    defaultCurrent,
    current: currentProp,
    onChange: onChangeProp,
  });

  const paginationStyle = jssStyle?.pagination?.();

  if (total < 0) return null;

  const rootClasses = classNames(
    className,
    paginationStyle?.rootClass,
    paginationStyle?.pagination,
    align === 'left' && paginationStyle?.left,
    align === 'center' && paginationStyle?.center,
    align === 'right' && paginationStyle?.right,
    size === 'small' && paginationStyle?.small,
    size === 'large' && paginationStyle?.large,
  );

  const getRootProps = () => {
    return {
      style,
    };
  };

  if (simple || layout.includes('simple')) {
    return (
      <div {...getRootProps()} className={rootClasses}>
        <Simple
          jssStyle={jssStyle}
          mode={mode}
          size={size}
          text={text}
          total={total}
          current={current || 0}
          pageSize={pageSize}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div {...getRootProps()} {...getDataset(props)} className={rootClasses}>
      {layout.map((section, i) => {
        switch (section) {
          case 'links':
            return (
              <Buttons
                key={i}
                jssStyle={jssStyle}
                span={span}
                mode={mode}
                size={size}
                total={total}
                text={text}
                current={current || 0}
                disabled={disabled}
                pageSize={pageSize}
                onChange={onChange}
              />
            );
          case 'jumper':
            return (
              <Jumper
                key={i}
                {...props}
                text={text}
                total={total}
                current={current}
                pageSize={pageSize}
                onChange={onChange}
              />
            );
          case 'list':
            return (
              <List
                key={i}
                {...props}
                total={props.total || 0}
                text={text}
                size={size}
                select={select}
                current={current || 0}
                pageSize={pageSize}
                pageSizeList={pageSizeList}
                onChange={onChange}
                sizeListProps={sizeListProps}
              />
            );
          case 'simple':
            return (
              <Simple
                key={i}
                {...props}
                mode={mode}
                text={text}
                disabled={disabled}
                total={total}
                current={current || 0}
                pageSize={pageSize}
                onChange={onChange}
              />
            );
          default:
            if (typeof section === 'function') {
              return (
                <div key={i} className={classNames(paginationStyle?.section)}>
                  <span>{section({ ...props, current, pageSize })}</span>
                </div>
              );
            }
            return null;
        }
      })}
    </div>
  );
};

export default Pagination;
