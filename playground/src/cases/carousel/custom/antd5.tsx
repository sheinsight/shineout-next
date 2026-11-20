import { useRef, useState } from 'react';
import { Carousel } from 'antd-v5';
import './indicator.css';

const items = ['S', 'H', 'I', 'N', 'E'];
const duration = 5000;
const containerStyle = { fontSize: 40, color: '#fff', display: 'flex', margin: 'auto' } as const;

// antd 用 customPaging + dots 自定义指示器：每个指示点由 customPaging(index) 返回，
// 当前项通过自己维护的 current 判断（afterChange 更新），点击切换由 antd 自己处理
export default function Demo() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<any>(null);
  return (
    <div style={{ width: 600, height: 280 }}>
      <Carousel
        ref={ref}
        autoplay
        autoplaySpeed={duration}
        dots={{ className: 'indicator' }}
        afterChange={setCurrent}
        customPaging={(index) => {
          const active = current === index;
          const style = active ? { animation: `indicator-rise ${duration / 1000}s linear` } : {};
          return (
            <div className={active ? 'indicator-item active' : 'indicator-item'}>
              <span>{items[index]}</span>
              <div className='indicator-progress'>
                <div className='fg' style={style} />
                <div className='bg' />
              </div>
            </div>
          );
        }}
      >
        {items.map((item) => (
          <div key={item}>
            <div style={{ background: '#2e97f1', display: 'flex', height: 280 }}>
              <div style={containerStyle}>{item}</div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
