import classNames from 'classnames';
import List from './pagination-size-list';
import Jumper from './pagination-jumper';
import Buttons from './pagination-buttons';
import Simple from './pagination-simple';
import { usePagination } from '@sheinx/hooks';
import { PaginationProps, PaginationClasses } from './pagination.type';

const Pagination = (props: PaginationProps) => {
  const {
    className,
    style,
    jssStyle,
    size,
    align = 'left',
    total = 0,
    pageSize: pageSizeProp = 10,
    defaultCurrent = 1,
    current: currentProp = defaultCurrent,
    span = 5,
    onChange: onChangeProp,
    layout = ['links'],
    mode = 'text',
    simple,
    disabled,
    text = {},
  } = props;

  const { onChange, current, pageSize } = usePagination({
    total,
    span,
    pageSize: pageSizeProp,
    current: currentProp,
    onChange: onChangeProp,
  });

  const paginationStyle = jssStyle?.pagination || ({} as PaginationClasses);
  const rootClasses = classNames(className, paginationStyle.pagination, {
    [paginationStyle.left]: align === 'left',
    [paginationStyle.center]: align === 'center',
    [paginationStyle.right]: align === 'right',
  });

  if (simple || layout.includes('simple')) {
    return (
      <div style={style} className={rootClasses}>
        <Simple
          jssStyle={jssStyle}
          mode={mode}
          size={size}
          text={text}
          total={total}
          current={current}
          pageSize={pageSize}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div style={style} className={rootClasses}>
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
                current={current}
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
            return <List key={i} {...props} />;
          case 'simple':
            return (
              <Simple
                key={i}
                {...props}
                mode={mode}
                text={text}
                total={total}
                current={current}
                pageSize={pageSize}
                onChange={onChange}
              />
            );
          default:
            if (typeof section === 'function') {
              return (
                <div key={i} className={classNames(paginationStyle.section)}>
                  <span>{section(props)}</span>
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
