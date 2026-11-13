import { Carousel } from 'shineout-v3';

const slide = (bg: string, text: string) => (
  <div style={{ background: bg, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>
    {text}
  </div>
);

export default function Demo() {
  return (
    <Carousel
      style={{ width: '100%', height: 200 }}
      showArrow='always'
      interval={0}
      classNames={{ root: 'my-carousel' }}
      styles={{
        root: { borderRadius: 8, overflow: 'hidden' },
        slider: { borderRadius: 8 },
        indicator: { bottom: 12 },
        arrow: { opacity: 0.9 },
      }}
    >
      {slide('#364d79', 'Slide 1')}
      {slide('#263c5a', 'Slide 2')}
      {slide('#1a2d47', 'Slide 3')}
    </Carousel>
  );
}
