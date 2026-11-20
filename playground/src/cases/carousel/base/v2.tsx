import { Carousel } from 'shineout-v2';
import { images, SIZE, Slide } from '../_shared/slides';

export default function Demo() {
  return (
    <Carousel style={SIZE} showArrow='hover' interval={5000}>
      {images.map((src) => (
        <Slide key={src} src={src} />
      ))}
    </Carousel>
  );
}
