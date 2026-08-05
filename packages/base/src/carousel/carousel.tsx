import { getDataset, useCarousel } from '@sheinx/hooks';
import classNames from 'classnames';
import React from 'react';
import { CarouselProps, CarouselSemanticKey, CarouselClassNamesInfo } from './carousel.type';
import Icons from '../icons';
import { useConfig } from '../config';
import { useSemantic } from '../common';
import type { SemanticClassValue } from '../common/use-semantic';

const Carousel = (props: CarouselProps) => {
  const { animation = 'slide', indicatorPosition = 'center', indicatorType = 'circle', itemClassName, showIndicator = true, classNames: classNamesProp, styles: stylesProp } = props;
  const total = React.Children.toArray(props.children).length;
  const carouselClasses = props.jssStyle?.carousel?.();
  const config = useConfig();

  // Semantic DOM
  const [semClass, semStyle] = useSemantic<CarouselSemanticKey>(
    classNamesProp,
    stylesProp,
    config.carousel,
  );

  // indicatorItem 支持函数式 classNames，需要逐个 resolve
  const getIndicatorItemClass = (active: boolean) => {
    const raw = classNamesProp?.indicatorItem;
    const resolved: SemanticClassValue =
      typeof raw === 'function'
        ? (raw as (info: CarouselClassNamesInfo) => SemanticClassValue)({ active })
        : (raw as string | undefined);
    const globalRaw = config.carousel?.classNames?.indicatorItem;
    return classNames(globalRaw, resolved);
  };

  const { current, pre, direction, func } = useCarousel({
    total,
    interval: props.interval,
    defaultValue: props.defaultValue,
    value: props.value,
    onChange: props.onChange,
    onMove: props.onMove,
  });

  const wrapperClasses = classNames(
    carouselClasses?.rootClass,
    carouselClasses?.wrapper,
    props.className,
    animation === 'slide' && carouselClasses?.animationSlide,
    animation === 'fade' && carouselClasses?.animationFade,
    animation === 'slide-y' && carouselClasses?.animationSlideY,
    direction === 'forward' && carouselClasses?.directionForward,
    direction === 'backward' && carouselClasses?.directionBackward,
    direction === 'stop' && carouselClasses?.directionStop,
    semClass('root', []),
  );

  const renderItems = () => {
    return (
      <div className={classNames(carouselClasses?.slider, semClass('slider', []))} style={{ height: props.style?.height, ...semStyle('slider') }}>
        {React.Children.map(props.children, (child, index) => {
          const itemClasses = classNames(
            carouselClasses?.item,
            index === current && carouselClasses?.itemCurrent,
            index === pre && pre !== current && carouselClasses?.itemPre,
            itemClassName,
            semClass('item', []),
          );
          return <div className={itemClasses} style={semStyle('item')}>{child}</div>;
        })}
      </div>
    );
  };
  const renderArrow = () => {
    if (!props.showArrow) return null;
    const handlePrev = () => {
      if (config.direction === 'ltr') {
        func.backward()
      } else {
        func.forward()
      }
      func.stop()
    }
    const handleNext = () => {
      if (config.direction === 'ltr') {
        func.forward()
      } else {
        func.backward()
      }
      func.stop()
    }
    return (
      <div
        className={classNames(
          props.showArrow === 'hover' && carouselClasses?.arrowHover,
          carouselClasses?.arrowWrapper,
          props.arrowClassName,
        )}
      >
        <div
          className={classNames(carouselClasses?.arrowLeft, carouselClasses?.arrowItem, semClass('arrow', []))}
          key={'left'}
          onClick={handlePrev}
          style={semStyle('arrow')}
        >
          {Icons.carousel.Backward}
        </div>
        <div
          className={classNames(carouselClasses?.arrowRight, carouselClasses?.arrowItem, semClass('arrow', []))}
          key={'right'}
          onClick={handleNext}
          style={semStyle('arrow')}
        >
          {Icons.carousel.Forward}
        </div>
      </div>
    );
  };

  const renderIndicator = () => {
    if ((total <= 1 && typeof indicatorType !== 'function') || showIndicator === false) return null;
    let content = null;
    if (typeof indicatorType === 'function') {
      content = indicatorType(current, func.moveTo);
    } else if (indicatorType === 'number') {
      content = (
        <>
          <div
            className={carouselClasses?.indicatorArrow}
            onClick={func.backward}
          >
            {config.direction === 'rtl' && ['center', 'outer'].includes(indicatorPosition)
              ? Icons.carousel.Forward
              : Icons.carousel.Backward}
          </div>
          <div className={carouselClasses?.indicatorNumber}>
            <span>{current + 1}</span>
            <span>/</span>
            <span>{total}</span>
          </div>
          <div
            className={carouselClasses?.indicatorArrow}
            onClick={func.forward}
          >
            {config.direction === 'rtl' && ['center', 'outer'].includes(indicatorPosition)
              ? Icons.carousel.Backward
              : Icons.carousel.Forward}
          </div>
        </>
      );
    } else {
      content = (
        <>
          {Array.from({ length: total }).map((_, index) => {
            const isActive = index === current;
            const indicatorClasses = classNames(
              carouselClasses?.indicator,
              isActive && carouselClasses?.indicatorActive,
              getIndicatorItemClass(isActive),
            );
            return (
              <div key={index} className={indicatorClasses} style={semStyle('indicatorItem')} onClick={() => func.moveTo(index)} />
            );
          })}
        </>
      );
    }

    return (
      <div
        className={classNames(
          carouselClasses?.indicatorWrapper,
          indicatorPosition === 'center' && carouselClasses?.indicatorCenter,
          indicatorPosition === 'left' && carouselClasses?.indicatorLeft,
          indicatorPosition === 'right' && carouselClasses?.indicatorRight,
          indicatorPosition === 'outer' && carouselClasses?.indicatorOuter,
          indicatorType === 'circle' && carouselClasses?.indicatorTypeCircle,
          indicatorType === 'number' && carouselClasses?.indicatorTypeNumber,
          indicatorType === 'line' && carouselClasses?.indicatorTypeLine,
          indicatorType === 'bar' && carouselClasses?.indicatorTypeBar,
          semClass('indicator', []),
        )}
        style={semStyle('indicator')}
      >
        {content}
      </div>
    );
  };
  return (
    <div
      className={wrapperClasses}
      style={{ ...props.style, height: 'auto', ...semStyle('root') }}
      onMouseEnter={func.stop}
      onMouseLeave={func.start}
      {...getDataset(props)}
    >
      {renderItems()}
      {renderIndicator()}
      {renderArrow()}
    </div>
  );
};

export default Carousel;
