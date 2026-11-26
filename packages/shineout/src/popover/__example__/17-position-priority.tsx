/**
 * cn - 方向优先级
 *    -- `position` 为 `auto` 时，通过 `positionPriority` 指定方向优先级。按顺序选择第一个空间足够的方向，都放不下则选择空间最大的方向。也可以通过 `setConfig({ popover: { positionPriority } })` 全局配置
 * en - Position priority
 *    -- When `position` is `auto`, use `positionPriority` to set the direction priority. The first direction with enough space is used; if none fits, the one with the most space is used. It can also be set globally via `setConfig({ popover: { positionPriority } })`
 */
import React from 'react';
import { Button, Popover, Select } from 'shineout';

type Direction = 'top' | 'right' | 'bottom' | 'left';

const presets: Record<string, Direction[]> = {
  'top → right → bottom → left': ['top', 'right', 'bottom', 'left'],
  'right → bottom → left → top': ['right', 'bottom', 'left', 'top'],
  'left → top → right → bottom': ['left', 'top', 'right', 'bottom'],
  'bottom → left → top → right': ['bottom', 'left', 'top', 'right'],
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: 500,
  height: 300,
  overflow: 'auto',
  resize: 'both',
  border: '1px dashed #bbb',
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  width: 1200,
  height: 800,
};

// 触发按钮在滚动内容中的位置
const buttonLeft = 560;
const buttonTop = 380;

const App: React.FC = () => {
  const [key, setKey] = React.useState(Object.keys(presets)[0]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // 初始滚动到按钮居中的位置，之后可以滚动或拖拽右下角缩放容器来测试各方向
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollLeft = buttonLeft - el.clientWidth / 2 + 40;
    el.scrollTop = buttonTop - el.clientHeight / 2 + 15;
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 12, lineHeight: '32px' }}>
        优先级：
        <Select
          style={{ width: 260 }}
          data={Object.keys(presets)}
          value={key}
          onChange={setKey}
          keygen
          clearable={false}
        />
      </div>
      <div ref={containerRef} style={containerStyle}>
        <div style={contentStyle}>
          <Button mode='outline' style={{ position: 'absolute', left: buttonLeft, top: buttonTop }}>
            Hover me
            <Popover
              trigger='hover'
              position='auto'
              positionPriority={presets[key]}
              getPopupContainer={() => containerRef.current}
              useTextStyle
            >
              {presets[key].join(' → ')}
            </Popover>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
