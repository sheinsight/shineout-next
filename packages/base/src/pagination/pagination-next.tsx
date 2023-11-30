import classNames from 'classnames';
import { PaginationActionButtonProps } from './pagination-buttons.type';
import { PaginationClasses } from './pagination.type';
import Button from './pagination-button';
import Icons from '../icons';

const PaginationButtonNext = (props: PaginationActionButtonProps) => {
  const { jssStyle, disabled, total, pageSize, current, text, size, mode, onChange } = props;
  const styles = jssStyle?.pagination || ({} as PaginationClasses);
  const rootClasses = classNames(styles.section);
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
      shape={hasText ? undefined : 'square'}
      disabled={disabled || next > max}
      onClick={onChange}
    >
      <span className={styles.icon}>{hasText ? text.next : Icons.ArrowRight}</span>
    </Button>
  );
};

export default PaginationButtonNext;
