import classNames from 'classnames';
import { PaginationActionButtonProps } from './pagination-buttons.type';
import { PaginationClasses } from '@sheinx/shineout-style';
import Button from './pagination-button';
import Icons from '../icons';

const PaginationButtonPrev = (props: PaginationActionButtonProps) => {
  const { jssStyle, disabled, current, mode, text, size, onChange } = props;
  const styles = jssStyle?.pagination?.() as PaginationClasses;
  const rootClasses = classNames(styles?.section);
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
      <span className={styles.icon}>{hasText ? text.prev : Icons.ArrowLeft}</span>
    </Button>
  );
};

export default PaginationButtonPrev;
