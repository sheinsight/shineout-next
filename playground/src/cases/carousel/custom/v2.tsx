import { Carousel } from 'shineout-v2';
import './indicator.css';

const items = ['S', 'H', 'I', 'N', 'E'];
const duration = 5000;
const containerStyle = { fontSize: 40, color: '#fff', display: 'flex', margin: 'auto' } as const;

export default function Demo() {
  const indicator = (current: number, moveTo: (index: number) => void) => (
    <div className='indicator'>
      {items.map((item, index) => {
        const active = current === index;
        const style = active ? { animation: `indicator-rise ${duration / 1000}s linear` } : {};
        return (
          <div key={item} onClick={() => moveTo(index)} className={active ? 'indicator-item active' : 'indicator-item'}>
            <span>{item}</span>
            <div className='indicator-progress'>
              <div className='fg' style={style} />
              <div className='bg' />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Carousel indicatorType={indicator} style={{ width: 600, height: 280 }} interval={duration}>
      {items.map((item) => (
        <div key={item} style={{ background: '#2e97f1', display: 'flex' }}>
          <div style={containerStyle}>{item}</div>
        </div>
      ))}
    </Carousel>
  );
}
