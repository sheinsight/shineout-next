import classNames from 'classnames';
import { PaginationActionButtonProps } from './pagination-buttons.type';
import { PaginationClasses } from './pagination.type';
import Button from './pagination-button';
import Icons from '../icons';

const PaginationButtonNext = (props: PaginationActionButtonProps) => {
  const { jssStyle, disabled, total, pageSize, current, size, mode, onChange } = props;
  const paginationStyle = jssStyle?.pagination || ({} as PaginationClasses);
  const rootClasses = classNames(paginationStyle.section);

  const max = Math.ceil(total / pageSize);
  const next = current + 1;

  return (
    <Button
      className={rootClasses}
      jssStyle={jssStyle}
      mode={mode}
      page={next}
      size={size}
      disabled={disabled || next > max}
      onClick={onChange}
    >
      {Icons.AngleRight}
    </Button>
  );
};

export default PaginationButtonNext;
