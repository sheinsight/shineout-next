/**
 * 🔴 Modal 命令式调用测试
 *
 * Modal.info() / Modal.confirm() 等方法内部使用 ReactRender
 * 将 Modal 渲染到动态 DOM 容器。同时也使用了 createPortal。
 *
 * 测试点：
 * 1. Modal.info() — 纯展示型弹窗
 * 2. Modal.confirm() — 确认型弹窗（含 onOk/onCancel 回调）
 * 3. Modal.success/warning/error — 各类型弹窗
 * 4. Modal 组件模式 — 使用了 createPortal 的声明式用法
 * 5. closeAll — 全部关闭
 */
import { useState } from 'react';

export default function TestModal() {
  const [log, setLog] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [Modal, setModal] = useState<any>(null);
  const [showDeclarative, setShowDeclarative] = useState(false);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const loadModal = async () => {
    try {
      const mod = await import('shineout');
      setModal(() => mod.Modal);
      setLoaded(true);
      addLog('Modal 模块加载成功');
    } catch (err: any) {
      addLog(`❌ Modal 模块加载失败: ${err.message}`);
    }
  };

  const testInfo = () => {
    try {
      Modal?.info?.({
        title: 'Info 弹窗',
        content: '这是通过 Modal.info() 命令式调用的弹窗。如果你能看到这段文字，说明 ReactRender 在 React 19 下工作正常。',
      });
      addLog('Modal.info() 调用成功 — 请检查是否弹出');
    } catch (err: any) {
      addLog(`❌ Modal.info() 报错: ${err.message}`);
      console.error(err);
    }
  };

  const testConfirm = () => {
    try {
      Modal?.confirm?.({
        title: '确认操作',
        content: '测试 Modal.confirm() — 请点击确认或取消。',
        onOk: () => addLog('✅ confirm onOk 触发'),
        onCancel: () => addLog('confirm onCancel 触发'),
      });
      addLog('Modal.confirm() 调用成功');
    } catch (err: any) {
      addLog(`❌ Modal.confirm() 报错: ${err.message}`);
      console.error(err);
    }
  };

  const testSuccess = () => {
    try {
      Modal?.success?.({
        title: '操作成功',
        content: '测试 Modal.success()',
      });
      addLog('Modal.success() 调用成功');
    } catch (err: any) {
      addLog(`❌ Modal.success() 报错: ${err.message}`);
      console.error(err);
    }
  };

  const testError = () => {
    try {
      Modal?.error?.({
        title: '操作失败',
        content: '测试 Modal.error()',
      });
      addLog('Modal.error() 调用成功');
    } catch (err: any) {
      addLog(`❌ Modal.error() 报错: ${err.message}`);
      console.error(err);
    }
  };

  const testCloseAll = () => {
    try {
      Modal?.closeAll?.();
      addLog('Modal.closeAll() 调用成功');
    } catch (err: any) {
      addLog(`❌ Modal.closeAll() 报错: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Modal 命令式调用 & createPortal 测试</h3>
      <p style={{ color: '#999', fontSize: 13 }}>
        Modal 命令式方法使用 ReactRender；声明式 Modal 使用 createPortal 渲染到 body。
      </p>

      {!loaded ? (
        <button onClick={loadModal}>加载 Modal 模块</button>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <button onClick={testInfo}>Modal.info()</button>
            <button onClick={testConfirm}>Modal.confirm()</button>
            <button onClick={testSuccess}>Modal.success()</button>
            <button onClick={testError}>Modal.error()</button>
            <button
              onClick={testCloseAll}
              style={{ background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px' }}
            >
              Modal.closeAll()
            </button>
          </div>

          <div style={{ marginBottom: 12, borderTop: '1px dashed #d9d9d9', paddingTop: 12 }}>
            <h4 style={{ margin: '0 0 8px' }}>声明式 Modal（createPortal）</h4>
            <button onClick={() => setShowDeclarative(true)}>打开声明式 Modal</button>
            {Modal && (
              <Modal
                visible={showDeclarative}
                title="声明式 Modal (createPortal)"
                onClose={() => {
                  setShowDeclarative(false);
                  addLog('声明式 Modal 关闭');
                }}
              >
                <p>这个 Modal 通过组件声明式渲染，内部使用 createPortal。</p>
                <p>如果你能看到此弹窗，说明 createPortal 在 React 19 下正常工作。</p>
              </Modal>
            )}
          </div>
        </>
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
