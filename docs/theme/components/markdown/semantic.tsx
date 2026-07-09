import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import store from '../../store';
import { SemanticSchema } from 'docs/types';
import { setConfig, config as shineoutConfig, Popover } from 'shineout';

interface SemanticTabProps {
  schema: SemanticSchema;
  name: string;
}

const MARK_PREFIX = 'sd-mark-';

// ────────────── 内联 SVG 图标 ──────────────

const PinIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill={active ? '#1677ff' : '#999'}>
    <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#999">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

// ────────────── 代码高亮组件 ──────────────

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <pre
      style={{
        margin: 0,
        fontSize: 13,
        lineHeight: 1.6,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        overflow: 'auto',
        background: 'none',
      }}
    >
      <code ref={codeRef as any} className="language-jsx">
        {code}
      </code>
    </pre>
  );
};

// ────────────── 主组件 ──────────────
/**
 * 文档站 Semantic tab：参考业界主流组件库的 "Semantic DOM" 区块。
 * 左 = 渲染舞台；右 = key 列表，hover 联动高亮。
 * 每个 key 项右上角有 📌 pin（锁定高亮）和 ⓘ info（弹出示例代码）。
 */
const Semantic: React.FC<SemanticTabProps> = ({ schema, name }) => {
  const state = useSnapshot(store);
  const isCN = state.locales === 'cn';
  const Demo = schema.demo;

  const stageRef = useRef<HTMLDivElement>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [pinnedKey, setPinnedKey] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<{ x: number; y: number; w: number; h: number } | null>(
    null,
  );

  // 当前激活的 key：pinned 优先，否则 hovered
  const activeKey = pinnedKey || hoveredKey;

  // key → mark className 表
  const markClassNames = useMemo(() => {
    const map: Record<string, string> = {};
    schema.keys.forEach((k) => {
      map[k.key] = `${MARK_PREFIX}${k.key}`;
    });
    return map;
  }, [schema.keys]);

  // 组件名 → setConfig 字段
  const configKey = name.toLowerCase();

  // 注入 mark class（离开恢复）
  useEffect(() => {
    const prev = (shineoutConfig as any)[configKey];
    setConfig({
      [configKey]: { ...prev, classNames: markClassNames },
    } as any);
    return () => {
      setConfig({ [configKey]: prev } as any);
    };
  }, [configKey, markClassNames]);

  // active key 变化 → 重新定位 overlay
  useEffect(() => {
    if (!activeKey || !stageRef.current) {
      setOverlay(null);
      return;
    }
    const target = document.querySelector<HTMLElement>(`.${MARK_PREFIX}${activeKey}`);
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
  }, [activeKey]);
  // ────────────── 样式 ──────────────

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    border: '1px solid #f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#fff',
    minHeight: 360,
  };

  const stageStyle: React.CSSProperties = {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    borderRight: '1px solid #f0f0f0',
    background: '#fafafa',
  };

  const listStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: 520,
    overflowY: 'auto',
  };

  const itemBaseStyle: React.CSSProperties = {
    padding: '16px 20px',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
    position: 'relative',
  };

  const iconBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 4,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
    transition: 'background 0.15s',
  };
  return (
    <div style={{ padding: 40, marginTop: 208 }}>
      <div style={containerStyle}>
        {/* 左：渲染舞台 */}
        <div ref={stageRef} style={stageStyle}>
          <Demo />
          {overlay && (
            <div
              style={{
                position: 'absolute',
                left: overlay.x,
                top: overlay.y,
                width: overlay.w,
                height: overlay.h,
                outline: '2px solid orange',
                background: 'rgba(22, 119, 255, 0.12)',
                borderRadius: 0,
                pointerEvents: 'none',
                transition: 'all 0.15s ease',
                zIndex: 10000,
              }}
            />
          )}
        </div>

        {/* 右：key 列表 */}
        <div style={listStyle}>
          {schema.keys.map((k) => {
            const isActive = activeKey === k.key;
            const isPinned = pinnedKey === k.key;
            const desc = isCN ? k.cn : k.en;
            return (
              <div
                key={k.key}
                onMouseEnter={() => setHoveredKey(k.key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  ...itemBaseStyle,
                  background: isActive ? 'rgba(22, 119, 255, 0.06)' : '#fff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <code style={{ fontSize: 15, fontWeight: 600, color: '#222' }}>{k.key}</code>
                  {k.version && (
                    <span
                      style={{
                        fontSize: 12,
                        color: '#1677ff',
                        background: 'rgba(22, 119, 255, 0.08)',
                        padding: '1px 8px',
                        borderRadius: 4,
                        fontFamily:
                          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                      }}
                    >
                      {k.version}
                    </span>
                  )}
                  {/* 右上角操作图标 */}
                  <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                    <button
                      type="button"
                      title={isPinned ? 'Unpin' : 'Pin highlight'}
                      style={{
                        ...iconBtnStyle,
                        transition: '.2s ease-in-out',
                        transform: isPinned ? 'rotate(30deg)' : 'none',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPinnedKey(isPinned ? null : k.key);
                      }}
                    >
                      <PinIcon active={isPinned} />
                    </button>
                    {k.example && (
                      <button
                        type="button"
                        title="Show usage example"
                        style={iconBtnStyle}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <InfoIcon />
                        <Popover trigger="click" position="left-top">
                          <CodeBlock code={k.example} />
                        </Popover>
                      </button>
                    )}
                  </span>
                </div>
                <div style={{ color: '#666', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Semantic;
