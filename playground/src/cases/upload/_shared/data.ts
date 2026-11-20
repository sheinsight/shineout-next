/** 内联 SVG 图片，避免外链图片带来的网络噪声 */
export const imgUrl =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' fill='#9ec5fe'/><circle cx='40' cy='40' r='20' fill='#0d6efd'/></svg>",
  );
