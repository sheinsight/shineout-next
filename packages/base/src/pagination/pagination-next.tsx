import clsx from 'clsx';
import { PaginationActionButtonProps } from './pagination-buttons.type';
import Button from './pagination-button';
import Icons from '../icons';
import { useConfig } from '../config';

const PaginationButtonNext = (props: PaginationActionButtonProps) => {
  const { jssStyle, disabled, total, pageSize, current, text, size, style, mode, onChange } = props;
  const paginationStyle = jssStyle?.pagination?.();
  const rootClasses = clsx(paginationStyle?.section);
  const max = Math.ceil(total / pageSize);
  const next = current + 1;
  const hasText = text && text.next;
  const config = useConfig();

  return (
    <Button
      className={rootClasses}
      jssStyle={jssStyle}
      mode={mode}
      page={next}
      size={size}
      style={style}
      shape={hasText ? undefined : 'square'}
      disabled={disabled || next > max}
      onClick={onChange}
    >
      {hasText ? (
        text.next
      ) : (
        <span className={paginationStyle?.icon}>
          {config.direction === 'rtl'
            ? Icons.pagination.PreInButton
            : Icons.pagination.NextInButton}
        </span>
      )}
    </Button>
  );
};

export default PaginationButtonNext;
