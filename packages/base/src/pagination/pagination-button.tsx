import { useEffect } from 'react';
import clsx from 'clsx';
import { ButtonShape } from '@sheinx/hooks';
import { PaginationMoreTypes } from './pagination-buttons.type';
import { PaginationButtonProps } from './pagination-button.type';
import Button from '../button';

const PaginationButton = (props: PaginationButtonProps) => {
  const {
    jssStyle,
    page,
    size,
    type = 'secondary',
    mode,
    shape,
    disabled,
    moreType,
    children,
    className,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const paginationStyle = jssStyle?.pagination?.();

  const handleClick = () => {
    onClick(page);
  };

  const handleMouseEnter = () => {
    onMouseEnter?.(moreType as PaginationMoreTypes, true);
  };

  const handleMouseLeave = () => {
    onMouseLeave?.(moreType as PaginationMoreTypes, false);
  };

  const getButtonProps = () => {
    const baseProps: Pick<
      PaginationButtonProps,
      'jssStyle' | 'mode' | 'type' | 'size' | 'disabled' | 'style'
    > & {
      className?: string;
      shape?: ButtonShape;
      onClick: () => void;
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
    } = {
      jssStyle,
      disabled,
      className: clsx(className, paginationStyle?.buttonItem),
      shape: shape,
      type,
      size,
      mode,
      style,
      onClick: handleClick,
    };

    if (moreType) {
      baseProps.onMouseEnter = handleMouseEnter;
      baseProps.onMouseLeave = handleMouseLeave;
    }
    return baseProps;
  };

  useEffect(() => {
    return () => {
      if (moreType) {
        handleMouseLeave();
      }
    };
  }, []);

  return <Button {...getButtonProps()}>{children}</Button>;
};

export default PaginationButton;
