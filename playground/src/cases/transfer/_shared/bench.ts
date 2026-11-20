import { useEffect, useState } from 'react';
import { useBenchState } from '../../../core/define';

/**
 * 性能测试用：初始 value=[]（目标列表为空）、预先勾选 preselect 里的几项。
 * 自动测试（mode=auto）里，一旦 value 或勾选状态偏离初始，400ms 后自动还原，
 * 这样每次测量都从同样的初始状态开始。手动查看时不会还原。
 * 上报 { moved: 目标列表条数, selected: 当前勾选条数 }。
 */
const AUTO = new URLSearchParams(location.search).get('mode') === 'auto';

export function useTransferBench(preselect: string[]) {
  const [value, setValue] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>(preselect);
  useBenchState({ moved: value.length, selected: selected.length });
  useEffect(() => {
    if (!AUTO) return;
    if (value.length === 0 && selected.length === preselect.length) return;
    const t = setTimeout(() => {
      setValue([]);
      setSelected(preselect);
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, selected]);
  return { value, setValue, selected, setSelected };
}
