import { deepGet } from '../../utils/object';
import { shallowEqual } from '../../utils/shallow-equal';

interface FlowGuard {
  names: string[];
  snapshot?: unknown[];
  fn: () => void;
}

/**
 * 为 Form.Flow 的更新函数加一层守卫：只有 Flow 关心的值发生变化时才触发更新。
 *
 * 依赖数据按 immutable 方式更新（结构共享）：值没变引用就不变，因此可以用引用比较判断。
 * - 不带 names（globalKey）：对表单根对象做浅比较
 * - 带 names：逐个比较对应路径的值
 *
 * 守卫以 updateFn 为 key 缓存，Flow 因 names 引用变化而重复 watch 时快照不丢失。
 * 首次通知没有快照，一律放行（Flow 渲染到挂载 watch 之间值可能已变化）。
 */
export const createFlowGuard = (getFormValue: () => any, globalKey: string) => {
  const guards = new WeakMap<() => void, FlowGuard>();

  return (names: string[], updateFn: () => void) => {
    let guard = guards.get(updateFn);
    if (!guard) {
      const g: FlowGuard = {
        names,
        snapshot: undefined,
        fn: () => {
          const formValue = getFormValue();
          const next = g.names.map((n) => (n === globalKey ? formValue : deepGet(formValue, n)));
          const prev = g.snapshot;
          const same =
            !!prev &&
            prev.length === next.length &&
            next.every((v, i) =>
              g.names[i] === globalKey ? shallowEqual(prev[i], v) : prev[i] === v,
            );
          g.snapshot = next;
          if (!same) updateFn();
        },
      };
      guard = g;
      guards.set(updateFn, g);
    }
    guard.names = names;
    return guard.fn;
  };
};
