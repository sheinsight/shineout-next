import { Slider } from 'shineout-v3';

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
        scale={[0, 25, 50, 75, 100]}
        classNames={{ indicator: 'square-handle' }}
        styles={{
          root: { padding: '20px 10px' },
          track: { height: 6, borderRadius: 3 },
          scale: { marginTop: 8, fontSize: 12 },
        }}
      />
    </>
  );
}
