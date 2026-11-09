import type { CaseMeta } from './types';

/** 用例描述，在 cases/<组件>/<用例>/index.ts 中默认导出 */
export function defineCase<S = any>(meta: CaseMeta<S>): CaseMeta<S> {
  return meta;
}

/**
 * 在实现组件里上报当前状态，供场景的 check 使用。每次 render 调用即可：
 *   useBenchState({ checked: value.length })
 * 同一个 frame 内只有一个用例，所以用全局变量保存。
 */
export function useBenchState<S>(state: S) {
  (window as any).__compareState = state;
}

export function getBenchState() {
  return (window as any).__compareState;
}
