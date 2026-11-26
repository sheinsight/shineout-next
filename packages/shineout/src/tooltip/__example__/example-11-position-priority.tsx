/**
 * cn - 方向优先级
 *    -- `position` 为 `auto`（默认）时，通过 `positionPriority` 指定方向优先级。按顺序选择第一个空间足够的方向，都放不下则选择空间最大的方向。也可以通过 `setConfig({ tooltip: { positionPriority } })` 全局配置
 *    -- Tooltip 按浏览器窗口计算可用空间。示例中的按钮固定在窗口内，切换「按钮位置」可以把它放到窗口的各个边缘，再 hover 观察落点
 * en - Position priority
 *    -- When `position` is `auto` (default), use `positionPriority` to set the direction priority. The first direction with enough space is used; if none fits, the one with the most space is used. It can also be set globally via `setConfig({ tooltip: { positionPriority } })`
 *    -- The available space is calculated against the browser window. The button in this example is fixed inside the window; change "Button position" to move it to any edge of the window, then hover it
 */
import React from 'react';
import { createPortal } from 'react-dom';
import { Button, Select, Tooltip, config, setConfig } from 'shineout';

type Direction = 'top' | 'right' | 'bottom' | 'left';

const presets: Record<string, Direction[]> = {
  'top → right → bottom → left': ['top', 'right', 'bottom', 'left'],
  'right → bottom → left → top': ['right', 'bottom', 'left', 'top'],
  'left → top → right → bottom': ['left', 'top', 'right', 'bottom'],
  'bottom → left → top → right': ['bottom', 'left', 'top', 'right'],
};

// 按钮在浏览器窗口内的位置
const spots: Record<string, React.CSSProperties> = {
  center: { top: '50%', left: '50%' },
  'top-left': { top: 8, left: 8 },
  top: { top: 8, left: '50%' },
  'top-right': { top: 8, right: 8 },
  left: { top: '50%', left: 8 },
  right: { top: '50%', right: 8 },
  'bottom-left': { bottom: 8, left: 8 },
  bottom: { bottom: 8, left: '50%' },
  'bottom-right': { bottom: 8, right: 8 },
};

// 固定在窗口内的测试按钮容器
const wrapperStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: 10,
  padding: '8px 12px',
  background: '#fff',
  border: '1px dashed #91caff',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
};

const App: React.FC = () => {
  const [priority, setPriority] = React.useState(Object.keys(presets)[0]);
  const [spot, setSpot] = React.useState('center');
  // 手动开启后，按钮才会渲染到 body 下（避免文档站页面布局影响 fixed 定位）
  const [mounted, setMounted] = React.useState(false);

  // 开启时才把弹层容器指向 body（文档站默认是 #layout），使弹层与 fixed 的按钮处在同一坐标体系；
  // 关闭或离开页面时还原
  React.useEffect(() => {
    if (!mounted) return;
    const prev = config.popupContainer;
    setConfig({ popupContainer: () => document.body });
    return () => {
      setConfig({ popupContainer: prev });
    };
  }, [mounted]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ lineHeight: '32px' }}>
          优先级：
          <Select
            style={{ width: 260 }}
            data={Object.keys(presets)}
            value={priority}
            onChange={setPriority}
            keygen
            clearable={false}
          />
        </div>
        <div style={{ lineHeight: '32px' }}>
          按钮位置：
          <Select
            style={{ width: 160 }}
            data={Object.keys(spots)}
            value={spot}
            onChange={setSpot}
            keygen
            clearable={false}
          />
        </div>
        <Button type='primary' onClick={() => setMounted((v) => !v)}>
          {mounted ? '关闭测试按钮' : '开启测试按钮'}
        </Button>
      </div>
      <div style={{ marginTop: 12, color: '#999' }}>
        点击「开启测试按钮」后，按钮会固定在浏览器窗口内，hover
        它观察弹出方向。开启期间弹层容器会指向 body。
      </div>
      {mounted &&
        createPortal(
          <div style={{ ...wrapperStyle, ...spots[spot] }}>
            <Tooltip
              tip={presets[priority].join(' → ')}
              positionPriority={presets[priority]}
              zIndex={99999}
              persistent
            >
              <Button mode='outline'>Hover me</Button>
            </Tooltip>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default App;
