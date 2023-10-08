import classNames from 'classnames';
import { PaginationActionButtonProps } from './pagination-buttons.type';
import { PaginationClasses } from './pagination.type';
import Button from './pagination-button';
import Icons from '../icons';

const PaginationButtonPrev = (props: PaginationActionButtonProps) => {
  const { jssStyle, disabled, current, mode, size, onChange } = props;
  const paginationStyle = jssStyle?.pagination || ({} as PaginationClasses);
  const rootClasses = classNames(paginationStyle.section);

  const prev = current - 1;

  return (
    <Button
      className={rootClasses}
      jssStyle={jssStyle}
      mode={mode}
      disabled={disabled || prev < 1}
      page={prev}
      size={size}
      onClick={onChange}
    >
      {Icons.AngleLeft}
    </Button>
  );
};

export default PaginationButtonPrev;
