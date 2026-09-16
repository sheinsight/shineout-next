/**
 * 🔴 Message 命令式调用测试
 *
 * Message.show() / Message.info() 等方法内部使用 ReactRender
 * 将 Message 组件渲染到动态创建的 DOM 容器中。
 * 如果 ReactRender 在 React 19 下失效，Message 不会显示。
 */
import { useState } from 'react';

export default function TestMessage() {
  const [log, setLog] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [Message, setMessage] = useState<any>(null);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const loadMessage = async () => {
    try {
      // 动态导入避免 shineout 样式问题影响整个 playground
      const mod = await import('shineout');
      setMessage(() => mod.Message);
      setLoaded(true);
      addLog('Message 模块加载成功');
    } catch (err: any) {
      addLog(`❌ Message 模块加载失败: ${err.message}`);
    }
  };

  const testShow = () => {
    try {
      Message?.show('这是一条普通消息', 3, { position: 'top' });
      addLog('Message.show() 调用成功 — 请检查页面顶部是否出现消息');
    } catch (err: any) {
      addLog(`❌ Message.show() 报错: ${err.message}`);
      console.error(err);
    }
  };

  const testInfo = () => {
    try {
      Message?.info('这是一条 info 消息', 3, { position: 'top' });
      addLog('Message.info() 调用成功');
    } catch (err: any) {
      addLog(`❌ Message.info() 报错: ${err.message}`);
      console.error(err);
    }
  };

  const testSuccess = () => {
    try {
      Message?.success('操作成功！', 3, { position: 'top' });
      addLog('Message.success() 调用成功');
    } catch (err: any) {
      addLog(`❌ Message.success() 报错: ${err.message}`);
      console.error(err);
    }
  };

  const testError = () => {
    try {
      Message?.error('操作失败！', 3, { position: 'top' });
      addLog('Message.error() 调用成功');
    } catch (err: any) {
      addLog(`❌ Message.error() 报错: ${err.message}`);
      console.error(err);
    }
  };

  const testClose = () => {
    try {
      Message?.close('top');
      addLog('Message.close() 调用成功');
    } catch (err: any) {
      addLog(`❌ Message.close() 报错: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Message 命令式调用测试</h3>
      <p style={{ color: '#999', fontSize: 13 }}>
        Message 内部通过 ReactRender 将组件渲染到 document.body 下的动态容器。
      </p>

      {!loaded ? (
        <button onClick={loadMessage}>加载 Message 模块</button>
      ) : (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={testShow}>Message.show()</button>
          <button onClick={testInfo}>Message.info()</button>
          <button onClick={testSuccess}>Message.success()</button>
          <button onClick={testError}>Message.error()</button>
          <button onClick={testClose} style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px' }}>
            Message.close()
          </button>
        </div>
      )}

      <details open style={{ marginTop: 16 }}>
        <summary>日志 ({log.length})</summary>
        <pre style={{ background: '#1a1a2e', color: '#0f0', padding: 12, borderRadius: 6, fontSize: 12, maxHeight: 200, overflow: 'auto' }}>
          {log.length === 0 ? '等待操作...' : log.join('\n')}
        </pre>
      </details>
    </div>
  );
}
