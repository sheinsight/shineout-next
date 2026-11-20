// carousel 各用例共用的幻灯片。原示例用 GitHub 上的远程图片，计时里会混进网络加载，离线还会失败，
// 这里换成内联的 data URI（四张 600×280 的渐变 SVG），四个库用同一份
const COLORS = [
  ['#6a8cff', '#9ad0ff'],
  ['#ff7e5f', '#feb47b'],
  ['#52c41a', '#b7eb8f'],
  ['#722ed1', '#d3adf7'],
];

const makeImage = ([from, to]: string[], index: number) => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="280" viewBox="0 0 600 280">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>` +
    `<rect width="600" height="280" fill="url(#g)"/>` +
    `<text x="300" y="160" font-size="64" text-anchor="middle" fill="#fff">${index + 1}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const images = COLORS.map(makeImage);

export const SIZE = { width: 600, height: 280 };

// antd 的 Carousel 不会给子节点设置高度，图片要撑满容器，Shineout 则由组件撑满；
// 统一用 100% 宽高的 img，两边看到的尺寸一致
export const Slide = ({ src }: { src: string }) => (
  <img src={src} alt='' style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
);
