/**
 * cn - 多 Modal 遮罩与滚动锁定
 *    -- 复现 docs/review/components/modal.md 中的 MODAL-2
 * en - Multiple modal mask and scroll lock
 *    -- Reproduce MODAL-2 in docs/review/components/modal.md
 */
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'shineout';

const useDocStyle = () => {
  const [docStyle, setDocStyle] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      const doc = document.documentElement;
      setDocStyle(
        `overflow="${doc.style.overflow}" paddingRight="${doc.style.paddingRight}"`,
      );
    }, 200);
    return () => clearInterval(timer);
  }, []);
  return docStyle;
};

const App: React.FC = () => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const docStyle = useDocStyle();

  // 场景 1：A 先开，B 叠在上面；1.5s 后在 B 还开着时关掉 A
  const openNested = () => {
    setA(true);
    setTimeout(() => setB(true), 300);
    setTimeout(() => setA(false), 1500);
  };

  // 场景 2：快速连续开关多次
  const toggleFast = () => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => setA(i % 2 === 0), i * 80);
    }
  };

  // 场景 3：A、B 同一时刻打开，再同一时刻关闭
  const openBoth = () => {
    setA(true);
    setB(true);
    setTimeout(() => {
      setA(false);
      setB(false);
    }, 1500);
  };

  // 场景 4（与 MODAL-4 相关）：页面自己改了 html 的 overflow 之后再开关 Modal
  const changeDocThenOpen = () => {
    document.documentElement.style.overflow = 'scroll';
    setA(true);
    setTimeout(() => setA(false), 1000);
  };

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1, padding: '8px 0' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button onClick={openNested}>场景 1：嵌套后先关底层</Button>
          <Button onClick={toggleFast}>场景 2：快速开关</Button>
          <Button onClick={openBoth}>场景 3：同时开关</Button>
          <Button onClick={changeDocThenOpen}>场景 4：先改 html overflow 再开关</Button>
          <Button
            mode='outline'
            onClick={() => {
              document.documentElement.style.overflow = '';
              document.documentElement.style.paddingRight = '';
            }}
          >
            重置 html 样式
          </Button>
        </div>
        <p style={{ margin: '8px 0 0' }}>
          a={String(a)} b={String(b)} | html: {docStyle}
        </p>
        <ul style={{ margin: '4px 0 0', lineHeight: 1.8 }}>
          <li>场景 1：A 关闭后 B 仍打开，页面应仍不能滚动，B 的遮罩应正常；B 关闭后 html 样式应恢复为空。</li>
          <li>场景 2、3：全部关闭后 html 样式应恢复为空，页面能正常滚动，没有残留遮罩。</li>
          <li>场景 4：关闭后 html overflow 预期恢复为 scroll；如果变成了空或其他值，说明还原用的是旧快照。</li>
        </ul>
      </div>

      <Modal visible={a} title='Modal A' onClose={() => setA(false)} width={500}>
        Modal A
      </Modal>
      <Modal visible={b} title='Modal B' onClose={() => setB(false)} width={360} top='20vh'>
        Modal B
      </Modal>

      <div style={{ height: 2000, background: 'linear-gradient(#fff, #ddd)' }}>
        用来制造页面滚动条的占位内容
      </div>
    </div>
  );
};

export default App;
