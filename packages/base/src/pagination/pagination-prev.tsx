import clsx from 'clsx';
import { PaginationActionButtonProps } from './pagination-buttons.type';
import Button from './pagination-button';
import Icons from '../icons';
import { useConfig } from '../config';

const PaginationButtonPrev = (props: PaginationActionButtonProps) => {
  const { jssStyle, disabled, current, mode, text, size, onChange } = props;
  const paginationStyle = jssStyle?.pagination?.();
  const rootClasses = clsx(paginationStyle?.section);
  const prev = current - 1;
  const hasText = text && text.prev;

  const config = useConfig();

  return (
    <Button
      className={rootClasses}
      jssStyle={jssStyle}
      mode={mode}
      disabled={disabled || prev < 1}
      page={prev}
      size={size}
      shape={hasText ? undefined : 'square'}
      onClick={onChange}
    >
      {hasText ? (
        text.prev
      ) : (
        <span className={paginationStyle?.icon}>
          {config.direction === 'rtl'
            ? Icons.pagination.NextInButton
            : Icons.pagination.PreInButton}
        </span>
      )}
    </Button>
  );
};

export default PaginationButtonPrev;
