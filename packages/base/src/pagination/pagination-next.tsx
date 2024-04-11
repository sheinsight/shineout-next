import classNames from 'classnames';
import { PaginationActionButtonProps } from './pagination-buttons.type';
import Button from './pagination-button';
import Icons from '../icons';

const PaginationButtonNext = (props: PaginationActionButtonProps) => {
  const { jssStyle, disabled, total, pageSize, current, text, size, style, mode, onChange } = props;
  const paginationStyle = jssStyle?.pagination?.();
  const rootClasses = classNames(paginationStyle?.section, paginationStyle?.sectionSize);
  const max = Math.ceil(total / pageSize);
  const next = current + 1;
  const hasText = text && text.next;

  return (
    <Button
      className={rootClasses}
      jssStyle={jssStyle}
      mode={mode}
      page={next}
      size={size}
      style={style}
      // shape={hasText ? undefined : 'square'}
      shape={'square'}
      disabled={disabled || next > max}
      onClick={onChange}
    >
      {hasText ? (
        text.next
      ) : (
        <span className={paginationStyle?.icon}>{Icons.pagination.NextInButton}</span>
      )}
    </Button>
  );
};

export default PaginationButtonNext;
