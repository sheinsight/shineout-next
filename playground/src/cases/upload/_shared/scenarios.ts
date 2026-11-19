import type { Scenario } from '../../../core/types';

const state = () => (window as any).__compareState;

/** 往 <input type=file> 里塞一个文件并触发 change（和用户在文件选择框里选完文件后浏览器做的事一样） */
const pickFile = (el: Element) => {
  const dt = new DataTransfer();
  dt.items.add(new File(['hello'], 'a.txt', { type: 'text/plain' }));
  (el as HTMLInputElement).files = dt.files;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

export const pickScenarios: Scenario[] = [
  {
    key: 'pick-file',
    name: '选择一个文件',
    target: (ctx) => ctx.query('input[type="file"]'),
    action: (el) => pickFile(el),
    check: (ctx) => ctx.before?.count === 0 && ctx.after?.count === 1,
    settleUntil: () => state()?.count === 0,
  },
];
