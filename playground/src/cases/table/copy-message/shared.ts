/** 各实现共用的数据和事件逻辑（不 import 任何组件库） */
import { getBenchState, setBenchState } from '../../../core/define';

export const ROWS = 200;

export interface RowData {
  id: string;
  name: string;
  title: string;
  category: string;
  price: string;
  stock: number;
  time: string;
  skcs: { skc: string; color: string; size: string }[];
}

export interface State {
  /** 点击复制的次数 */
  copied: number;
}

export const IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23ddd"/></svg>';

export const makeRows = (n: number): RowData[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `r_${i}`,
    name: `SPU_${String(i).padStart(4, '0')}`,
    title: `Product title ${i} some long long description text`,
    category: 'Women / Clothing / Dresses',
    price: (10 + i).toFixed(2),
    stock: 100 + i,
    time: '2026-10-28 12:00:00',
    skcs: Array.from({ length: 4 }, (__, k) => ({ skc: `skc${i}_${k}`, color: 'Black', size: 'S/M/L' })),
  }));

export const DATA = makeRows(ROWS);

// 模拟 copy-to-clipboard：同步 execCommand 复制
const copyText = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (e) {
    // 复制失败不影响测量
  }
  document.body.removeChild(textarea);
};

/** 每个 Message 显示的时长（秒），所有库一致。取 1 秒只是为了让测试快一点 */
export const MESSAGE_DURATION = 1;

/** 业务里的复制逻辑：同步复制，然后用各库自己的 Message 提示 */
export const copyAndNotify = (text: string, notify?: (content: string) => void) => {
  copyText(text);
  const prev = (getBenchState() as State | undefined) || { copied: 0 };
  setBenchState<State>({ copied: prev.copied + 1 });
  notify?.(`已复制 ${text}`);
};
