import { useEffect, useState } from 'react';
import { useBenchState } from '../../../core/define';

/**
 * 性能测试用：自动测试（mode=auto）里，状态一旦偏离初始，400ms 后自动还原，
 * 这样每次测量都从同样的初始状态开始。手动查看时不会还原。
 * 上报 { expanded: 展开的节点数 } 或 { checked: 勾选的节点数 }。
 */
const AUTO = new URLSearchParams(location.search).get('mode') === 'auto';

export function useListBench(key: 'expanded' | 'checked') {
  const [list, setList] = useState<string[]>([]);
  useBenchState({ [key]: list.length });
  useEffect(() => {
    if (!AUTO || list.length === 0) return;
    const t = setTimeout(() => setList([]), 400);
    return () => clearTimeout(t);
  }, [list]);
  return [list, setList] as const;
}
