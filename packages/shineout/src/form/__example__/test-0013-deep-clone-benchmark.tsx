/**
 * cn - Form deepClone 性能对比
 *    -- 大数据量表单下对比 deepClone 开启/关闭时的输入耗时。可手动在任意输入框打字（观察"手动输入"耗时），或点击"自动执行"间隔 20ms 跑 N 次 set（默认 10 次）并记录平均值/中位数到结果表
 * en - Form deepClone benchmark
 *    -- Compare input latency with deepClone on/off under large form data
 */
import React, { Profiler, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Form, Input, Select, Radio, Button, TYPE } from 'shineout';

type FormRef = TYPE.Form.Ref<any>;
type Mode = 'spread' | 'same' | 'uncontrolled';

const modeLabels: Record<Mode, string> = {
  spread: '受控 setValue({...v})',
  same: '受控 setValue(v)',
  uncontrolled: '非受控',
};
const selectData = ['red', 'green', 'blue'];
const RUN_INTERVAL = 20;
const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const makeValue = (fields: number, skus: number) => {
  const v: Record<string, any> = {};
  for (let i = 0; i < fields; i++) v[`f${i}`] = i % 4 === 0 ? 'red' : `x${i}`;
  // 模拟商品发布页：不渲染成字段、但很大的嵌套数据
  v.skus = Array.from({ length: skus }, (_, i) => ({
    id: i,
    name: `sku-${i}`,
    price: i * 1.1,
    attrs: { color: 'red', size: 'M', tags: ['a', 'b'] },
  }));
  return v;
};

// 不做 memo：和常见业务写法一致，受控模式下父组件 setState 会让所有字段重渲染
// Input 全局默认 delay=400，onChange 会延迟 400ms 才同步到 Form，手动输入时只能测到 Input 自身的渲染；
// 这里设为 0，让每次输入同步走完 Form 更新（deepClone + 全量重渲染），与自动执行 set 的路径一致
const Fields = ({ count }: { count: number }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4 }}>
    {Array.from({ length: count }, (_, i) =>
      i % 4 === 0 ? (
        <Select key={i} size='small' name={`f${i}`} data={selectData} keygen />
      ) : (
        <Input key={i} size='small' name={`f${i}`} delay={0} />
      ),
    )}
  </div>
);

interface BenchFormProps {
  deepClone: boolean;
  mode: Mode;
  initValue: Record<string, any>;
  fields: number;
  formRef: React.MutableRefObject<FormRef | undefined>;
}

const BenchForm = ({ deepClone, mode, initValue, fields, formRef }: BenchFormProps) => {
  const [value, setValue] = useState(initValue);
  const formProps =
    mode === 'uncontrolled'
      ? { defaultValue: initValue }
      : { value, onChange: (v: any) => setValue(mode === 'spread' ? { ...v } : v) };
  return (
    <Form deepClone={deepClone} {...formProps} formRef={(f) => (formRef.current = f)}>
      <Fields count={fields} />
    </Form>
  );
};

interface ResultRow {
  id: number;
  deepClone: boolean;
  mode: Mode;
  fields: number;
  sizeKB: number;
  times: number;
  avg: number;
  median: number;
  max: number;
}

const App: React.FC = () => {
  const [deepClone, setDeepClone] = useState(true);
  const [mode, setMode] = useState<Mode>('spread');
  const [fields, setFields] = useState(240);
  const [skus, setSkus] = useState(14000);
  const [times, setTimes] = useState(10);
  const [results, setResults] = useState<ResultRow[]>([]);
  const [running, setRunning] = useState(false);

  const formRef = useRef<FormRef>();
  const manualRef = useRef<HTMLSpanElement>(null);
  const { current: ctx } = useRef({ t0: 0, tEnd: 0, list: [] as number[], seq: 0 });

  const initValue = useMemo(() => makeValue(fields, skus), [fields, skus]);
  const sizeKB = useMemo(() => Math.round(JSON.stringify(initValue).length / 1024), [initValue]);

  // 手动输入：从 input 事件开始，到最后一次 commit 结束；直接写 DOM，避免统计本身触发重渲染
  const handleInputCapture = () => {
    ctx.t0 = performance.now();
    ctx.tEnd = 0;
    setTimeout(() => {
      if (!ctx.tEnd) return;
      ctx.list.push(ctx.tEnd - ctx.t0);
      const last = ctx.list[ctx.list.length - 1];
      const avg = ctx.list.reduce((a, b) => a + b, 0) / ctx.list.length;
      if (manualRef.current) {
        manualRef.current.textContent = `最近 ${last.toFixed(2)}ms，平均 ${avg.toFixed(2)}ms（${ctx.list.length} 次）`;
      }
    });
  };
  const handleRender = () => {
    if (ctx.t0) ctx.tEnd = performance.now();
  };

  const resetManual = () => {
    ctx.list = [];
    if (manualRef.current) manualRef.current.textContent = '在任意输入框中打字';
  };

  const runAuto = async () => {
    if (!formRef.current) return;
    setRunning(true);
    const costs: number[] = [];
    ctx.seq += 1;
    // 每次之间间隔 RUN_INTERVAL，模拟真实输入节奏，也让 GC 有机会在空闲时执行，避免垃圾堆积到某次采样里
    for (let i = 0; i < times; i++) {
      await sleep(RUN_INTERVAL);
      if (!formRef.current) break;
      const t = performance.now();
      // flushSync 保证本次 set 引起的渲染同步完成，计入耗时
      flushSync(() => formRef.current!.set({ f1: `auto-${ctx.seq}-${i}` }));
      costs.push(performance.now() - t);
    }
    if (costs.length) {
      const sorted = [...costs].sort((a, b) => a - b);
      const mid = sorted.length >> 1;
      setResults((prev) => [
        {
          id: Date.now(),
          deepClone,
          mode,
          fields,
          sizeKB,
          times: costs.length,
          avg: costs.reduce((a, b) => a + b, 0) / costs.length,
          median: sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2,
          max: sorted[sorted.length - 1],
        },
        ...prev,
      ]);
    }
    setRunning(false);
  };

  const formKey = `${deepClone}-${mode}-${fields}-${skus}`;

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 12 }}>
        <span>
          deepClone：
          <Radio.Group
            keygen={(d) => String(d)}
            data={[true, false]}
            renderItem={(d) => String(d)}
            value={deepClone}
            onChange={(v) => {
              setDeepClone(v);
              resetManual();
            }}
          />
        </span>
        <span>
          模式：
          <Radio.Group
            keygen
            data={Object.keys(modeLabels) as Mode[]}
            renderItem={(d) => modeLabels[d]}
            value={mode}
            onChange={(v) => {
              setMode(v);
              resetManual();
            }}
          />
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 12 }}>
        <span>
          字段数：
          <Select width={100} size='small' keygen data={[40, 240, 480]} value={fields} onChange={(v) => { setFields(v); resetManual(); }} />
        </span>
        <span>
          SKU 条数：
          <Select width={100} size='small' keygen data={[0, 2000, 14000, 30000]} value={skus} onChange={(v) => { setSkus(v); resetManual(); }} />
        </span>
        <span>表单数据约 {sizeKB} KB</span>
        <span>
          执行次数：
          <Select width={80} size='small' keygen data={[10, 20, 50]} value={times} onChange={setTimes} />
        </span>
        <Button type='primary' size='small' loading={running} onClick={runAuto}>
          自动执行 set
        </Button>
        <Button size='small' onClick={() => setResults([])}>
          清空结果
        </Button>
      </div>

      <div style={{ marginBottom: 12 }}>
        手动输入耗时：<span ref={manualRef}>在任意输入框中打字</span>
        <Button size='small' mode='text' onClick={resetManual}>
          重置
        </Button>
      </div>

      {results.length > 0 && (
        <table style={{ width: '100%', marginBottom: 12, borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              {['deepClone', '模式', '字段数', '数据量', '次数', '平均(ms)', '中位数(ms)', '最大(ms)'].map((h) => (
                <th key={h} style={{ borderBottom: '1px solid #ddd', padding: 4 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td style={{ padding: 4 }}>{String(r.deepClone)}</td>
                <td style={{ padding: 4 }}>{modeLabels[r.mode]}</td>
                <td style={{ padding: 4 }}>{r.fields}</td>
                <td style={{ padding: 4 }}>{r.sizeKB} KB</td>
                <td style={{ padding: 4 }}>{r.times}</td>
                <td style={{ padding: 4 }}>{r.avg.toFixed(2)}</td>
                <td style={{ padding: 4 }}>{r.median.toFixed(2)}</td>
                <td style={{ padding: 4 }}>{r.max.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div onInputCapture={handleInputCapture}>
        <Profiler id='bench-form' onRender={handleRender}>
          <BenchForm
            key={formKey}
            deepClone={deepClone}
            mode={mode}
            initValue={initValue}
            fields={fields}
            formRef={formRef}
          />
        </Profiler>
      </div>
    </div>
  );
};

export default App;
