import type { ReactNode } from 'react';

/**
 * 用例里的「外部操作」按钮统一用原生 button，避免把某个库自己的 Button 算进测量结果。
 * 场景里通过 ctx.byBench(name) 找到它们。
 */
export function BenchToolbar({
  actions,
  children,
}: {
  actions: { name: string; label: string; onClick: () => void }[];
  children?: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 12, fontSize: 13 }}>
      {actions.map((a) => (
        <button key={a.name} type='button' data-bench={a.name} onClick={a.onClick}>
          {a.label}
        </button>
      ))}
      {children}
    </div>
  );
}
