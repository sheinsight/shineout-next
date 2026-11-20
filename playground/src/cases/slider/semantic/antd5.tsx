import { Slider } from 'antd-v5';

const marks = { 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' };

export default function Demo() {
  return (
    <>
      <style>{`
        .square-handle::after {
          border-radius: 0 !important;
          border-width: 4px !important;
          width: 16px !important;
          height: 16px !important;
        }
      `}</style>
      <Slider
        defaultValue={40}
        marks={marks}
        classNames={{ handle: 'square-handle' }}
        styles={{
          root: { padding: '20px 10px' },
          rail: { height: 6, borderRadius: 3 },
          track: { height: 6, borderRadius: 3 },
        }}
      />
    </>
  );
}
