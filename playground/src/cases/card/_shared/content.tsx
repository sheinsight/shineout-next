import type { CSSProperties } from 'react';

// card 各用例共用的文案和图标。原示例的页脚图标是几段很长的 svg 路径，这里换成简单的内联 svg，
// 四个库用同一份，差异只来自 Card 组件本身
export const TEXT =
  'Joy in living comes from having fine emotions, trusting them, giving them the freedom of a bird in the open.';

export const LONG_TEXT =
  'Joy in living comes from having fine emotions, trusting them, giving them the freedom of a bird in the open. ' +
  'Joy in living can never be assumed as a pose, or put on from the outside as a mask. People who have this joy do ' +
  'not need to talk about it; they radiate it. They just live out their joy and let it splash its sunlight and glow ' +
  'into other lives as naturally as bird sings.';

const iconBox: CSSProperties = {
  width: 32,
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  color: '#666C7C',
};

const Svg = ({ d }: { d: string }) => (
  <svg viewBox='0 0 24 24' width='14' height='14' fill='currentColor'>
    <path d={d} />
  </svg>
);

const LIKE = 'M12 21s-8-5.3-8-11a5 5 0 0 1 8-3.9A5 5 0 0 1 20 10c0 5.7-8 11-8 11z';
const COMMENT = 'M4 4h16v12H8l-4 4V4z';
const SEND = 'M2 3l20 9-20 9 3-9-3-9zm3 9l-1 5 12-5-12-5 1 5z';
const MORE = 'M4 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z';

export const FooterIcons = () => (
  <div style={{ display: 'flex', width: '100%' }}>
    <div style={{ ...iconBox, marginInlineEnd: 8 }}><Svg d={LIKE} /></div>
    <div style={{ ...iconBox, marginInlineEnd: 8 }}><Svg d={COMMENT} /></div>
    <div style={iconBox}><Svg d={SEND} /></div>
    <div style={{ ...iconBox, marginInlineStart: 'auto' }}><Svg d={MORE} /></div>
  </div>
);

export const ICONS = [LIKE, COMMENT, SEND].map((d) => <Svg key={d} d={d} />);
