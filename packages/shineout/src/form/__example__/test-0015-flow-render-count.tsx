/**
 * cn - Form.Flow 渲染次数
 *    -- 在输入框 a 中输入，观察两个 Flow 的渲染次数。deepClone=true 时，每次输入全局 Flow 渲染 2 次，且监听 b 的 Flow 也会随 a 变化而渲染；deepClone=false 时全局 Flow 只渲染 1 次，监听 b 的 Flow 在 b 未变化时不渲染
 * en - Form.Flow render count
 *    -- Type in input a and watch the render counts of the two Flows. With deepClone=false the global Flow renders once per change and the Flow watching b does not render unless b changes
 */
import React, { memo, useRef, useState } from 'react';
import { Form, Input, Radio, Button } from 'shineout';

type Mode = 'same' | 'spread' | 'uncontrolled';

const modeLabels: Record<Mode, string> = {
  same: '受控 setValue(v)',
  spread: '受控 setValue({...v})',
  uncontrolled: '非受控',
};

// memo 隔离父组件的重渲染：Flow 的渲染只可能来自 Form 的通知，计数才能反映广播次数
const FlowPanel = memo(() => {
  const counts = useRef({ all: 0, b: 0 });
  return (
    <div style={{ marginTop: 12 }}>
      <Form.Flow>
        {(datum) => {
          counts.current.all += 1;
          return (
            <div>
              全局 Flow（不带 names）渲染次数：<b>{counts.current.all}</b>，当前 a = {datum.get('a')}
            </div>
          );
        }}
      </Form.Flow>
      <Form.Flow names={['b']}>
        {(datum) => {
          counts.current.b += 1;
          return (
            <div>
              names=[&apos;b&apos;] 的 Flow 渲染次数：<b>{counts.current.b}</b>，当前 b = {datum.get('b')}
            </div>
          );
        }}
      </Form.Flow>
    </div>
  );
});

const Demo = ({ deepClone, mode }: { deepClone: boolean; mode: Mode }) => {
  const [value, setValue] = useState<Record<string, string>>({ a: '', b: 'b', c: '' });
  const formProps =
    mode === 'uncontrolled'
      ? { defaultValue: value }
      : { value, onChange: (v: any) => setValue(mode === 'spread' ? { ...v } : v) };
  return (
    <Form deepClone={deepClone} {...formProps}>
      <Form.Item label='a'>
        <Input name='a' delay={0} />
      </Form.Item>
      <Form.Item label='b'>
        <Input name='b' delay={0} />
      </Form.Item>
      <Form.Item label='c'>
        <Input name='c' delay={0} />
      </Form.Item>
      <FlowPanel />
    </Form>
  );
};

const App: React.FC = () => {
  const [deepClone, setDeepClone] = useState(false);
  const [mode, setMode] = useState<Mode>('same');
  const [resetKey, setResetKey] = useState(0);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 12 }}>
        <span>
          deepClone：
          <Radio.Group
            keygen={(d) => String(d)}
            data={[false, true]}
            renderItem={(d) => String(d)}
            value={deepClone}
            onChange={setDeepClone}
          />
        </span>
        <span>
          模式：
          <Radio.Group
            keygen
            data={Object.keys(modeLabels) as Mode[]}
            renderItem={(d) => modeLabels[d]}
            value={mode}
            onChange={setMode}
          />
        </span>
        <Button size='small' onClick={() => setResetKey((k) => k + 1)}>
          重置计数
        </Button>
      </div>
      <Demo key={`${deepClone}-${mode}-${resetKey}`} deepClone={deepClone} mode={mode} />
    </div>
  );
};

export default App;
