import classNames from 'classnames';
import { PaginationActionButtonProps } from './pagination-buttons.type';
import Button from './pagination-button';
import Icons from '../icons';

const PaginationButtonPrev = (props: PaginationActionButtonProps) => {
  const { jssStyle, disabled, current, mode, text, size, onChange } = props;
  const paginationStyle = jssStyle?.pagination?.();
  const rootClasses = classNames(paginationStyle?.section, paginationStyle?.sectionSize);
  const prev = current - 1;
  const hasText = text && text.prev;

  return (
    <Button
      className={rootClasses}
      jssStyle={jssStyle}
      mode={mode}
      disabled={disabled || prev < 1}
      page={prev}
      size={size}
      // shape={hasText ? undefined : 'square'}
      shape='square'
      onClick={onChange}
    >
      {hasText ? (
        text.prev
      ) : (
        <span className={paginationStyle?.icon}>{Icons.pagination.PreInButton}</span>
      )}
    </Button>
  );
};

export default PaginationButtonPrev;
