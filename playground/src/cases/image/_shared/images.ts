// 原示例用 raw.githubusercontent.com 上的图片，横评里网络会引入抖动，改用内联 SVG（data URI），
// 尺寸 400x300（非正方形，才能看出 fit 的区别），五张颜色不同，用于图片组
const COLORS = ['#7aa7ff', '#ffb36b', '#7fd6a4', '#d59cf5', '#ff8f8f'];

const svg = (color: string, text: string, size = 48) =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'>` +
  `<rect width='400' height='300' fill='${color}'/>` +
  `<circle cx='200' cy='150' r='90' fill='#fff' fill-opacity='.55'/>` +
  `<text x='200' y='168' font-size='${size}' text-anchor='middle' fill='#333' font-family='sans-serif'>${text}</text></svg>`;

const toUri = (s: string) => `data:image/svg+xml,${encodeURIComponent(s)}`;

export const IMGS = COLORS.map((c, i) => toUri(svg(c, String(i + 1))));
export const IMG = IMGS[0];
// antd 没有 error 渲染节点，只有 fallback（一个图片地址），用这张图代替 Shineout 示例里自定义的 error 内容
export const ERROR_IMG = toUri(svg('#f5f5f5', 'Error', 40));
