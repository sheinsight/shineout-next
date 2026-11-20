/** 自定义图标：原示例的 svg 很长，这里换成简单的内联 svg，三个库共用 */
export const CustomIcon = () => (
  <svg width='100' height='75' viewBox='0 0 100 75' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M100 75C100 63.9 77.6 54.8 50 54.8C22.4 54.8 0 63.9 0 75H100Z' fill='#E8EBF0' />
    <rect x='28' y='14' width='44' height='36' rx='4' fill='#CCCFD7' />
    <path d='M36 26h28M36 34h20' stroke='#fff' strokeWidth='3' strokeLinecap='round' />
  </svg>
);

/** 图片：原示例用远程图片，这里换成内联 data URI，避免网络差异 */
export const IMG_SRC =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='90' viewBox='0 0 120 90'><rect width='120' height='90' rx='8' fill='#E8EBF0'/><circle cx='40' cy='34' r='10' fill='#CCCFD7'/><path d='M10 80 45 46 68 68 84 54 110 80Z' fill='#B8BDC9'/></svg>",
  );
