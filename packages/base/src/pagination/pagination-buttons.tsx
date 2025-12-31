import clsx from 'clsx';
import { useState } from 'react';
import { PaginationButtonsProps, PaginationMoreTypes } from './pagination-buttons.type';
import Icons from '../icons';
import Button from './pagination-button';
import Next from './pagination-next';
import Prev from './pagination-prev';
import { useConfig } from '../config';

const PaginationButtons = (props: PaginationButtonsProps) => {
  const {
    jssStyle,
    disabled,
    current,
    size,
    total,
    pageSize = 10,
    span = 5,
    text,
    mode,
    onChange,
  } = props;

  const [showPrevMore, setShowPrevMore] = useState(false);
  const [showNextMore, setShowNextMore] = useState(false);

  const config = useConfig();

  const paginationStyle = jssStyle?.pagination?.();
  const rootClasses = clsx(paginationStyle?.section, paginationStyle?.buttons);

  const getLinks = () => {
    if (total === 0) return { buttons: [], max: 0 };

    const max = Math.ceil(total / pageSize);
    const buttons = [];
    let right;
    let left = current - Math.floor(span / 2);
    if (left < 3) {
      left = 3;
    }
    right = left + span;
    if (right + 1 >= max) {
      right = max - 1;
      left = right - span;
      if (left < 1) {
        left = 1;
      }
    } else {
      right -= left > 1 ? 1 : 0;
    }

    if (left > 1) {
      buttons.push(1);
    }
    if (left === 3) {
      buttons.push(2);
    } else if (left > 3) {
      buttons.push('prev');
    }

    for (let i = left; i < right + 1; i++) {
      buttons.push(i);
    }

    if (right === max - 2) {
      buttons.push(max - 1);
    } else if (right < max - 1) {
      buttons.push('next');
    }

    if (right < max) {
      buttons.push(max);
    }

    return { buttons, max };
  };

  const getButtonProps = () => {
    return {
      mode,
      size,
      jssStyle,
      disabled,
    };
  };

  const handleHoverMore = (type: PaginationMoreTypes, is: boolean) => {
    if (type === 'prev') {
      setShowPrevMore(is);
    } else {
      setShowNextMore(is);
    }
  };

  const renderPrev = () => {
    return (
      <Prev
        jssStyle={jssStyle}
        pageSize={pageSize}
        disabled={disabled}
        current={current}
        total={total}
        mode={mode}
        text={text}
        size={size}
        onChange={onChange}
      ></Prev>
    );
  };

  const renderNext = () => {
    return (
      <Next
        jssStyle={jssStyle}
        pageSize={pageSize}
        disabled={disabled}
        current={current}
        total={total}
        mode={mode}
        text={text}
        size={size}
        onChange={onChange}
      ></Next>
    );
  };

  const renderMore = (type: PaginationMoreTypes) => {
    if (type === 'prev' && showPrevMore) {
      return config.direction === 'rtl' ? Icons.pagination.NetPage : Icons.pagination.PrePage;
    }

    if (type === 'next' && showNextMore) {
      return config.direction === 'rtl' ? Icons.pagination.PrePage : Icons.pagination.NetPage;
    }

    return Icons.pagination.More;
  };

  const renderButtons = () => {
    const { buttons, max } = getLinks();

    return buttons.map((pageNum) => {
      if (typeof pageNum === 'number') {
        return (
          <Button
            {...getButtonProps()}
            mode={pageNum === current ? undefined : mode}
            key={pageNum}
            page={pageNum}
            shape={pageNum >= 100 ? undefined : 'square'}
            type={pageNum === current ? 'primary' : 'secondary'}
            onClick={onChange}
          >
            {pageNum}
          </Button>
        );
      }
      const isPrev = pageNum === 'prev';
      let page = isPrev ? current - span : current + span;
      if (page < 1) page = 1;
      if (page > max) page = max;

      return (
        <Button
          {...getButtonProps()}
          page={page}
          key={pageNum}
          type='secondary'
          onClick={onChange}
          moreType={pageNum as PaginationMoreTypes}
          onMouseEnter={handleHoverMore}
          shape='square'
          onMouseLeave={handleHoverMore}
        >
          <span className={paginationStyle?.icon}>
            {renderMore(pageNum as PaginationMoreTypes)}
          </span>
        </Button>
      );
    });
  };

  return (
    <div className={rootClasses}>
      {renderPrev()}
      {renderButtons()}
      {renderNext()}
    </div>
  );
};

export default PaginationButtons;
