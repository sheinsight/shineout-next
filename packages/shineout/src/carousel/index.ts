import Carousel from './carousel';

type RefCarousel = typeof Carousel;

export interface CarouselComponent extends RefCarousel {
  displayName: string;
}

const CarouselComp: CarouselComponent = Carousel as CarouselComponent;

CarouselComp.displayName = 'ShineoutCarousel';

export default CarouselComp;
