import { useEffect, useState } from 'react';
import { useBenchState } from '../../../core/define';

/**
 * 性能测试用：自动测试（mode=auto）里，已选文件数大于 0 时 300ms 后自动清空，
 * 让每次测量都从「没有文件」开始。手动查看时不会清空。上报 { count: 当前文件数 }。
 */
const AUTO = new URLSearchParams(location.search).get('mode') === 'auto';

export function useFilesBench<T>() {
  const [value, setValue] = useState<T[]>([]);
  useBenchState({ count: value.length });
  useEffect(() => {
    if (!AUTO || value.length === 0) return;
    const t = setTimeout(() => setValue([]), 300);
    return () => clearTimeout(t);
  }, [value]);
  return [value, setValue] as const;
}
