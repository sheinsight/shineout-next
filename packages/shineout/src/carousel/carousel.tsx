import { useMemo } from 'react';
import { Carousel } from '@sheinx/base';
import { useCarouselStyle } from '@sheinx/shineout-style';
import { CarouselProps } from './carousel.type';

export default (props: CarouselProps) => {
  const jssStyle = useMemo(() => ({ carousel: useCarouselStyle }), []);

  return <Carousel {...props} jssStyle={jssStyle} />;
};
