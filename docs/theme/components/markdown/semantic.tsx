import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import store from '../../store';
import { SemanticSchema } from 'docs/types';
import { setConfig, config as shineoutConfig } from 'shineout';

interface SemanticTabProps {
  schema: SemanticSchema;
  name: string;
}

const MARK_PREFIX = 'sd-mark-';

/**
 * 文档站 Semantic tab：参考业界主流组件库的 "Semantic DOM" 区块。
 * 左 = 渲染舞台；右 = key 列表，hover 联动高亮。
 *
 * 实现策略（PoC）：切到本 tab 时通过 setConfig 给目标组件全局注入 mark class，
 * 离开时恢复原 config。
 */
const Semantic: React.FC<SemanticTabProps> = ({ schema, name }) => {
  const state = useSnapshot(store);
  const isCN = state.locales === 'cn';
  const Demo = schema.demo;

  const stageRef = useRef<HTMLDivElement>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<{ x: number; y: number; w: number; h: number } | null>(
    null,
  );

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

  // hover key 变化 → 重新定位 overlay
  useEffect(() => {
    if (!hoveredKey || !stageRef.current) {
      setOverlay(null);
      return;
    }
    const target = document.querySelector<HTMLElement>(`.${MARK_PREFIX}${hoveredKey}`);
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
            const isActive = hoveredKey === k.key;
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
