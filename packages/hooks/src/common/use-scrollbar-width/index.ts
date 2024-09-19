import { useState, useEffect } from 'react';

let scrollbarWidthCache: number | undefined;
function getScrollbarWidth() {
  // 检查是否在服务器端运行
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 0;
  }

  // 如果我们的缓存变量已经存在，则直接返回该值
  if (scrollbarWidthCache !== undefined) {
    return scrollbarWidthCache;
  }

  // 客户端环境，计算滚动条宽度
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  if(outer.parentNode) outer.parentNode.removeChild(outer);

  // 缓存并返回计算结果
  scrollbarWidthCache = scrollbarWidth;
  return scrollbarWidth;
}


export function useScrollbarWidth() {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    // 只有在客户端时才计算滚动条宽度
    if (typeof window !== 'undefined') {
      setScrollbarWidth(getScrollbarWidth());
    }
  }, []);

  return scrollbarWidth;
}


export default useScrollbarWidth;
