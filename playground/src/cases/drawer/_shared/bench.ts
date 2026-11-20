import { useEffect, useRef } from 'react';
import { useBenchState } from '../../../core/define';

/**
 * 性能测试用：抽屉打开 600ms 后自动关闭，并上报 { open, closedAt }。
 * 只在自动测试（mode=auto）里生效，手动查看时不会自己关。
 * 这样每次测量都从「关闭」开始，测到的是「关闭 → 打开」，而不是第一次之后的「已经渲染过」。
 */
const AUTO = new URLSearchParams(location.search).get('mode') === 'auto';

export function useDrawerBench(open: boolean, setOpen: (v: boolean) => void) {
  const closedAt = useRef(0);
  const wasOpen = useRef(open);
  if (wasOpen.current && !open) closedAt.current = performance.now();
  wasOpen.current = open;
  useBenchState({ open, closedAt: closedAt.current });
  useEffect(() => {
    if (!AUTO || !open) return;
    const t = setTimeout(() => setOpen(false), 600);
    return () => clearTimeout(t);
  }, [open, setOpen]);
}
