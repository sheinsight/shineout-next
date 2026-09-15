/**
 * cn - value 类型保护验证
 *    -- 验证 useListSelectMultiple 的 concat 修复：5种 value 类型场景 + multiple 动态切换场景。
 *    -- 场景1: 正常数组 → 选中项正常展示，可增删。
 *    -- 场景2: 字符串 + separator → split 为数组，选中项正常展示。
 *    -- 场景3: 数字（非法类型）→ 不崩溃，无选中项，可正常选择。
 *    -- 场景4: 对象（非法类型）→ React 渲染层报错（与 hook 修复无关）。
 *    -- 场景5: 字符串无 separator（非法类型）→ 不崩溃，无选中项，可正常选择。
 *    -- 场景6: single→multiple 动态切换（value 未同步改为数组）→ 不崩溃，add 后返回数组。
 * en - Value Type Guard Verification
 *    -- Verify the concat fix in useListSelectMultiple: 5 value type scenarios + dynamic multiple toggle.
 */
import React, { useState } from 'react';
import { Form, Select } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];

type LogEntry = { scene: string; action: string; value: any };

const labelStyle: React.CSSProperties = {
  margin: '0 0 4px',
  fontWeight: 600,
  fontSize: 13,
};

const cardStyle: React.CSSProperties = {
  padding: 12,
  border: '1px solid #e8e8e8',
  borderRadius: 6,
  marginBottom: 16,
  background: '#fafafa',
};

// PLACEHOLDER_SCENES

export default () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (entry: LogEntry) => {
    setLogs((prev) => [entry, ...prev].slice(0, 30));
  };

  // 场景1: 正常数组
  const [v1, setV1] = useState<string[]>(['red', 'blue']);
  // 场景2: 字符串 + separator
  const [v2, setV2] = useState<any>('red,blue');
  // 场景3: 数字
  const [v3, setV3] = useState<any>(123);
  // 场景4: 对象
  const [v4, setV4] = useState<any>({ id: 1 });
  // 场景5: 字符串无 separator
  const [v5, setV5] = useState<any>('abc');
  // 场景6: single→multiple 动态切换
  const [v6, setV6] = useState<any>('red');
  const [mul6, setMul6] = useState(false);

  return (
    <div>
      <Form onChange={formv => {
        console.log('======================')
        console.log('Form onChange formv: >>', formv)
        console.log('======================')
      }}>
      {/* 场景1 */}
      <div style={cardStyle}>
        <p style={{ ...labelStyle, color: '#52c41a' }}>
          ✅ 场景1: value 是正常数组 ['red', 'blue']
        </p>
        <p style={{ fontSize: 12, color: '#666', margin: '0 0 8px' }}>
          预期：显示 red、blue 两个 tag，可正常增删选项
        </p>
        <Select
          width={400}
          multiple
          data={data}
          keygen
          value={v1}
          onChange={(v: string[]) => {
            setV1(v);
            addLog({ scene: '场景1(数组)', action: 'onChange', value: v });
          }}
          placeholder='Select Color'
          clearable
        />
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
          当前 value: {JSON.stringify(v1)}
        </div>
      </div>

      {/* 场景2 */}
      <div style={cardStyle}>
        <p style={{ ...labelStyle, color: '#52c41a' }}>
          ✅ 场景2: value 是字符串 "red,blue" + separator=","
        </p>
        <p style={{ fontSize: 12, color: '#666', margin: '0 0 8px' }}>
          预期：显示 red、blue 两个 tag，onChange 返回逗号分隔的字符串
        </p>
        <Select
          width={400}
          multiple
          data={data}
          keygen
          separator=','
          value={v2}
          onChange={(v: any) => {
            setV2(v);
            addLog({ scene: '场景2(separator)', action: 'onChange', value: v });
          }}
          placeholder='Select Color'
          clearable
        />
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
          当前 value: {JSON.stringify(v2)} (type: {typeof v2})
        </div>
      </div>

      {/* 场景3 */}
      <div style={cardStyle}>
        <p style={{ ...labelStyle, color: '#fa8c16' }}>
          ⚠️ 场景3: value 是数字 123（非法类型）
        </p>
        <p style={{ fontSize: 12, color: '#666', margin: '0 0 8px' }}>
          预期：不崩溃，无选中项，点击选项后 onChange 正常触发
        </p>
        <Select
          width={400}
          multiple
          data={data}
          keygen
          value={v3}
          onChange={(v: any) => {
            setV3(v);
            addLog({ scene: '场景3(数字)', action: 'onChange', value: v });
          }}
          placeholder='Select Color'
          clearable
        />
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
          当前 value: {JSON.stringify(v3)} (type: {typeof v3})
        </div>
      </div>

      {/* 场景4 */}
      <div style={cardStyle}>
        <p style={{ ...labelStyle, color: '#fa8c16' }}>
          ⚠️ 场景4: value 是对象 {'{id: 1}'}（非法类型）
        </p>
        <p style={{ fontSize: 12, color: '#666', margin: '0 0 8px' }}>
          预期：对象无法作为 React child 渲染，Select 会报错（React 限制，与 hook 修复无关）。
          点击「重置为数组」后恢复正常。
        </p>
        {Array.isArray(v4) ? (
          <Select
            width={400}
            multiple
            data={data}
            keygen
            value={v4}
            onChange={(v: any) => {
              setV4(v);
              addLog({ scene: '场景4(对象→已恢复)', action: 'onChange', value: v });
            }}
            placeholder='Select Color'
            clearable
            name="filed-select-single"
          />
        ) : (
          <div style={{ color: '#ff4d4f', fontSize: 12, marginBottom: 8 }}>
            ⛔ value={'{id: 1}'} 是对象，React 无法渲染为 tag 内容（Objects are not valid as a React child）
          </div>
        )}
        <button
          style={{ fontSize: 12, marginTop: 4, cursor: 'pointer' }}
          onClick={() => {
            setV4([]);
            addLog({ scene: '场景4(对象)', action: '重置为[]', value: [] });
          }}
        >
          重置为数组 []
        </button>
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
          当前 value: {JSON.stringify(v4)} (type: {typeof v4})
        </div>
      </div>

      {/* 场景5 */}
      <div style={cardStyle}>
        <p style={{ ...labelStyle, color: '#fa8c16' }}>
          ⚠️ 场景5: value 是字符串 "abc" 但没有 separator（非法类型）
        </p>
        <p style={{ fontSize: 12, color: '#666', margin: '0 0 8px' }}>
          预期：不崩溃，无选中项，点击选项后 onChange 正常触发
        </p>
        <Select
          width={400}
          multiple
          data={data}
          keygen
          value={v5}
          onChange={(v: any) => {
            setV5(v);
            addLog({ scene: '场景5(字符串无sep)', action: 'onChange', value: v });
          }}
          placeholder='Select Color'
          clearable
        />
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
          当前 value: {JSON.stringify(v5)} (type: {typeof v5})
        </div>
      </div>

      {/* 场景6: single→multiple 动态切换 */}
      <div style={cardStyle}>
        <p style={{ ...labelStyle, color: '#1677ff' }}>
          🔄 场景6: single→multiple 动态切换（value 未同步改为数组）
        </p>
        <p style={{ fontSize: 12, color: '#666', margin: '0 0 8px' }}>
          预期：切换后不崩溃，UI 显示 red tag。点击新选项后 onChange 返回数组（旧值 red 会丢失，因为
          hook 内部无法把字符串当数组处理）。
          <br />
          修复前：add 时 "red".concat(["orange"]) → 返回字符串 "redorange"（类型错误，引发连锁崩溃）
          <br />
          修复后：valueArr=[]，add 返回 ["orange"]（类型正确，red 丢失但不崩溃）
        </p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <button
            style={{
              fontSize: 12,
              cursor: 'pointer',
              padding: '4px 12px',
              background: mul6 ? '#1677ff' : '#f0f0f0',
              color: mul6 ? '#fff' : '#333',
              border: '1px solid #d9d9d9',
              borderRadius: 4,
            }}
            onClick={() => {
              setMul6((m) => !m);
              addLog({
                scene: '场景6(动态切换)',
                action: `切换为 ${!mul6 ? 'multiple' : 'single'}`,
                value: v6,
              });
            }}
          >
            当前: {mul6 ? 'multiple' : 'single'}（点击切换）
          </button>
          <button
            style={{ fontSize: 12, cursor: 'pointer', padding: '4px 12px' }}
            onClick={() => {
              setV6('red');
              setMul6(false);
              addLog({ scene: '场景6(动态切换)', action: '重置', value: 'red' });
            }}
          >
            重置为 single + "red"
          </button>
        </div>
        <Select
          width={400}
          multiple={mul6}
          data={data}
          keygen
          value={v6}
          onChange={(v: any) => {
            setV6(v);
            addLog({ scene: '场景6(动态切换)', action: 'onChange', value: v });
          }}
          placeholder='Select Color'
          clearable
        />
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
          当前 value: {JSON.stringify(v6)} | multiple: {String(mul6)} | type: {typeof v6}{' '}
          {Array.isArray(v6) ? '(array)' : ''}
        </div>
      </div>

      {/* onChange 日志 */}
      <div
        style={{
          padding: 12,
          background: '#fff',
          border: '1px solid #d9d9d9',
          borderRadius: 6,
        }}
      >
        <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 13 }}>
          onChange 日志（最新在上）
        </p>
        <div style={{ minHeight: 60, fontFamily: 'monospace', fontSize: 12 }}>
          {logs.length === 0 ? (
            <span style={{ color: '#bbb' }}>操作各场景的 Select 后，日志会显示在这里…</span>
          ) : (
            logs.map((l, i) => (
              <div key={i} style={{ lineHeight: '22px', color: '#333' }}>
                [{l.scene}] {l.action}: {JSON.stringify(l.value)}
              </div>
            ))
          )}
        </div>
      </div>
      </Form>
    </div>
  );
};
