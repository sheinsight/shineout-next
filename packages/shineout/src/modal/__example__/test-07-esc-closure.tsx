/**
 * cn - ESC 关闭闭包验证
 *    -- 复现 docs/review/components/modal.md 中的 MODAL-1
 * en - ESC close closure
 *    -- Reproduce MODAL-1 in docs/review/components/modal.md
 */
import React, { useState } from 'react';
import { Modal, Button, Switch } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [esc, setEsc] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  const log = (text: string) => setLogs((prev) => [...prev, text]);

  // 每次 render 都是新的 onClose，闭包里的 count 是当次 render 的值
  const handleClose = () => {
    log(`onClose 执行，闭包 count = ${count}`);
    setVisible(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <Button
          mode='outline'
          onClick={() => {
            setLogs([]);
            setVisible(true);
          }}
        >
          打开 Modal
        </Button>
        <span>esc 属性：</span>
        <Switch value={esc} onChange={setEsc} />
        <pre>{String(esc)}</pre>
      </div>

      <Modal visible={visible} esc={esc} title='MODAL-1 复现' onClose={handleClose} width={480}>
        <p>当前 count = {count}，esc = {String(esc)}</p>
        <Button onClick={() => setCount(count + 1)}>count + 1</Button>
        <Button onClick={() => setEsc(!esc)}>切换 esc</Button>
        <ol style={{ marginTop: 12, lineHeight: 1.8 }}>
          <li>场景 A：点几次 count + 1，再按 ESC。日志里的 count 等于当前 count 说明拿到的是最新 onClose；等于 0 说明是陈旧闭包。</li>
          <li>场景 B：关掉 Modal，把 esc 切到 false 再打开，按 ESC，预期不关闭。</li>
          <li>场景 C：esc 为 true 时打开，在弹窗里点“切换 esc”改成 false，再按 ESC，预期不关闭。</li>
        </ol>
      </Modal>

      <div style={{ marginTop: 12 }}>
        <div>日志：</div>
        {logs.length ? logs.map((item, i) => <div key={i}>{item}</div>) : <div>（空）</div>}
      </div>
    </div>
  );
};

export default App;
