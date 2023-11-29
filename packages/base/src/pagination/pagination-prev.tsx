import classNames from 'classnames';
import { PaginationActionButtonProps } from './pagination-buttons.type';
import Button from './pagination-button';
import Icons from '../icons';

const PaginationButtonPrev = (props: PaginationActionButtonProps) => {
  const { jssStyle, disabled, current, mode, text, size, onChange } = props;
  const paginationStyle = jssStyle?.pagination?.();
  const rootClasses = classNames(paginationStyle?.section);
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
      shape={hasText ? undefined : 'square'}
      onClick={onChange}
    >
      {hasText ? text.prev : Icons.ArrowLeft}
    </Button>
  );
};

export default PaginationButtonPrev;
