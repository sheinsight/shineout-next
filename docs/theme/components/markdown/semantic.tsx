import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import store from '../../store';
import { SemanticSchema } from 'docs/types';

interface SemanticTabProps {
  schema: SemanticSchema;
  name: string;
}

const MARK_PREFIX = 'sd-mark-';

/**
 * 文档站 Semantic tab：
 * - 左侧渲染 schema.demo
 * - demo 内的目标组件通过该组件名约定的 classNames 注入 mark class
 *   （hover 高亮选择器锚点，仅文档站场景）
 * - 右侧列 key 表，鼠标悬停切换左侧高亮
 *
 * 实现策略：用 React Context 把 mark className 表透传给 schema.demo。
 * 但 schema.demo 是黑盒组件——所以我们采用另一种方式：
 * 让 schema 提供 demo 的同时，也提供 `markedDemo: (markedClassNames) => ReactNode`
 * 的工厂，由本组件传入 marks。
 *
 * 为了让 PoC 简单，本版本采用**全局 setConfig 注入 mark class**：
 * 切到 Semantic tab 时 setConfig({ [组件名]: { classNames: { root: 'sd-mark-root', ... } } })
 * 离开时 reset。
 * setConfig 这条全局副作用仅在 docs 站点使用，不影响生产用户代码。
 */
import { setConfig, config as shineoutConfig } from 'shineout';

const Semantic: React.FC<SemanticTabProps> = ({ schema, name }) => {
  const state = useSnapshot(store);
  const Demo = schema.demo;
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState<{ x: number; y: number; w: number; h: number } | null>(
    null,
  );

  // 把 schema.keys 转为 mark class 映射
  const markClassNames = useMemo(() => {
    const map: Record<string, string> = {};
    schema.keys.forEach((k) => {
      map[k.key] = `${MARK_PREFIX}${k.key}`;
    });
    return map;
  }, [schema.keys]);

  // 组件名 → setConfig 字段（lowercase）
  const configKey = name.toLowerCase();

  // 切到 Semantic tab：把 mark class 合并进对应组件 config；离开时恢复原值
  useEffect(() => {
    const prev = (shineoutConfig as any)[configKey];
    setConfig({
      [configKey]: { ...prev, classNames: markClassNames },
    } as any);
    return () => {
      setConfig({ [configKey]: prev } as any);
    };
  }, [configKey, markClassNames]);

  // hover key 变化 → 重新定位 overlay
  useEffect(() => {
    if (!hoveredKey || !stageRef.current) {
      setOverlay(null);
      return;
    }
    const selector = `.${MARK_PREFIX}${hoveredKey}`;
    // 目标节点可能渲染在 portal 里（如 Popover），需 document.querySelector
    const target = document.querySelector<HTMLElement>(selector);
    if (!target) {
      setOverlay(null);
      return;
    }
    const stageRect = stageRef.current.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    setOverlay({
      x: rect.left - stageRect.left,
      y: rect.top - stageRect.top,
      w: rect.width,
      h: rect.height,
    });
  }, [hoveredKey]);

  const isCN = state.locales === 'cn';

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginTop: 0 }}>
        {name} Semantic DOM
      </h2>
      <p style={{ color: '#666', marginBottom: 24 }}>
        {isCN
          ? '鼠标悬停右侧 key 名查看对应节点；通过 classNames / styles props 可对每个节点独立定制样式。'
          : 'Hover keys on the right to highlight the corresponding DOM node; customise each node via classNames / styles props.'}
      </p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* 左：渲染舞台 */}
        <div
          ref={stageRef}
          style={{
            flex: 1,
            position: 'relative',
            minHeight: 280,
            padding: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #eee',
            borderRadius: 8,
            background: '#fafafa',
          }}
        >
          <Demo />
          {overlay && (
            <div
              style={{
                position: 'absolute',
                left: overlay.x,
                top: overlay.y,
                width: overlay.w,
                height: overlay.h,
                outline: '2px solid #1677ff',
                background: 'rgba(22, 119, 255, 0.12)',
                borderRadius: 4,
                pointerEvents: 'none',
                transition: 'all 0.15s ease',
                zIndex: 10000,
              }}
            />
          )}
        </div>

        {/* 右：key 列表 */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ marginBottom: 8, fontWeight: 600, color: '#444' }}>
            {isCN ? '语义节点' : 'Semantic nodes'}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {schema.keys.map((k) => {
              const isActive = hoveredKey === k.key;
              return (
                <li
                  key={k.key}
                  onMouseEnter={() => setHoveredKey(k.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid',
                    borderColor: isActive ? '#1677ff' : '#eee',
                    background: isActive ? 'rgba(22, 119, 255, 0.06)' : '#fff',
                    borderRadius: 6,
                    marginBottom: 8,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <code
                    style={{
                      color: '#1677ff',
                      fontWeight: 600,
                      fontSize: 14,
                      marginRight: 12,
                    }}
                  >
                    {k.key}
                  </code>
                  <span style={{ color: '#666', fontSize: 13 }}>
                    {isCN ? k.cn : k.en}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Semantic;
