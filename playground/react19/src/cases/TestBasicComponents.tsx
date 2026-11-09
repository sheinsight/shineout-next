/**
 * 🟢 基础组件渲染测试
 *
 * 这些组件不依赖 ReactRender，仅测试常规 React 19 渲染兼容性。
 * 包含 Select/Cascader/TreeSelect 等内部使用 createPortal 的下拉弹出层组件。
 */
import { useState } from 'react';

export default function TestBasicComponents() {
  const [log, setLog] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [components, setComponents] = useState<any>(null);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const loadComponents = async () => {
    try {
      const mod = await import('shineout');
      setComponents(mod);
      setLoaded(true);
      addLog('组件加载成功');
    } catch (err: any) {
      addLog(`❌ 组件加载失败: ${err.message}`);
      console.error(err);
    }
  };

  if (!loaded) {
    return <button onClick={loadComponents}>加载基础组件</button>;
  }

  const {
    Button,
    Input,
    Select,
    Dropdown,
    Popover,
    Tooltip,
    Cascader,
    TreeSelect,
    DatePicker,
  } = components;

  const treeData = [
    {
      id: '1',
      title: '节点 1',
      children: [
        { id: '1-1', title: '节点 1-1' },
        { id: '1-2', title: '节点 1-2' },
      ],
    },
    {
      id: '2',
      title: '节点 2',
      children: [{ id: '2-1', title: '节点 2-1' }],
    },
  ];

  const cascaderData = [
    {
      value: 'zj',
      label: '浙江',
      children: [
        {
          value: 'hz',
          label: '杭州',
          children: [
            { value: 'xh', label: '西湖' },
            { value: 'bl', label: '滨江' },
          ],
        },
      ],
    },
    {
      value: 'js',
      label: '江苏',
      children: [
        {
          value: 'nj',
          label: '南京',
          children: [{ value: 'jy', label: '江宁' }],
        },
      ],
    },
  ];

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>基础组件 & createPortal 弹出层测试</h3>

      <div style={{ display: 'grid', gap: 16 }}>
        {/* Button */}
        <section>
          <h4>Button</h4>
          {Button && (
            <div style={{ display: 'flex', gap: 8 }}>
              <Button type="primary" onClick={() => addLog('Button primary clicked')}>
                Primary
              </Button>
              <Button type="danger" onClick={() => addLog('Button danger clicked')}>
                Danger
              </Button>
              <Button onClick={() => addLog('Button default clicked')}>Default</Button>
            </div>
          )}
        </section>

        {/* Input */}
        <section>
          <h4>Input</h4>
          {Input && (
            <Input
              placeholder="输入文字测试"
              onChange={(v: string) => addLog(`Input onChange: ${v}`)}
              style={{ width: 300 }}
            />
          )}
        </section>

        {/* Select (createPortal 下拉) */}
        <section>
          <h4>Select (createPortal 弹出层)</h4>
          {Select && (
            <Select
              data={['选项 A', '选项 B', '选项 C', '选项 D']}
              placeholder="请选择"
              onChange={(v: any) => addLog(`Select onChange: ${v}`)}
              style={{ width: 300 }}
            />
          )}
        </section>

        {/* Cascader (createPortal) */}
        <section>
          <h4>Cascader (createPortal 弹出层)</h4>
          {Cascader && (
            <Cascader
              data={cascaderData}
              keygen="value"
              renderItem={(n: any) => n?.label}
              placeholder="请选择地区"
              onChange={(v: any) => addLog(`Cascader onChange: ${JSON.stringify(v)}`)}
              style={{ width: 300 }}
            />
          )}
        </section>

        {/* TreeSelect (createPortal) */}
        <section>
          <h4>TreeSelect (createPortal 弹出层)</h4>
          {TreeSelect && (
            <TreeSelect
              data={treeData}
              keygen="id"
              renderItem={(n: any) => n?.title}
              placeholder="请选择节点"
              onChange={(v: any) => addLog(`TreeSelect onChange: ${v}`)}
              style={{ width: 300 }}
            />
          )}
        </section>

        {/* DatePicker (createPortal) */}
        <section>
          <h4>DatePicker (createPortal 弹出层)</h4>
          {DatePicker && (
            <DatePicker
              placeholder="选择日期"
              onChange={(v: any) => addLog(`DatePicker onChange: ${v}`)}
              style={{ width: 300 }}
            />
          )}
        </section>

        {/* Dropdown (createPortal) */}
        <section>
          <h4>Dropdown (createPortal 弹出层)</h4>
          {Dropdown && (
            <Dropdown
              data={[
                { content: '菜单项 1' },
                { content: '菜单项 2' },
                { content: '菜单项 3' },
              ]}
              onClick={(d: any) => addLog(`Dropdown click: ${d?.content}`)}
            >
              <Button>下拉菜单</Button>
            </Dropdown>
          )}
        </section>

        {/* Popover (createPortal) */}
        <section>
          <h4>Popover (createPortal 弹出层)</h4>
          {Popover && Button && (
            <Popover content="这是 Popover 内容，通过 createPortal 渲染">
              <Button>Hover 查看 Popover</Button>
            </Popover>
          )}
        </section>

        {/* Tooltip (createPortal) */}
        <section>
          <h4>Tooltip (createPortal 弹出层)</h4>
          {Tooltip && Button && (
            <Tooltip tip="这是 Tooltip 提示">
              <Button>Hover 查看 Tooltip</Button>
            </Tooltip>
          )}
        </section>
      </div>

      <details open style={{ marginTop: 16 }}>
        <summary>日志 ({log.length})</summary>
        <pre
          style={{
            background: '#1a1a2e',
            color: '#0f0',
            padding: 12,
            borderRadius: 6,
            fontSize: 12,
            maxHeight: 200,
            overflow: 'auto',
          }}
        >
          {log.length === 0 ? '等待操作...' : log.join('\n')}
        </pre>
      </details>
    </div>
  );
}
