import { useState } from 'react';
import { Button, Modal } from 'shineout-v2';
import { useOpenBench } from '../_shared/bench';

const LEVELS = [1, 2, 3];
// 原示例有 10 层、宽度用 Math.random；这里固定 3 层、固定宽度，每次渲染一致
const WIDTH = [0, 460, 420, 380];

export default function Demo() {
  const [current, setCurrent] = useState(0);
  useOpenBench(current > 0, (v) => setCurrent(v ? 1 : 0));
  return (
    <div>
      <span data-bench='open'>
        <Button outline onClick={() => setCurrent(1)}>click me</Button>
      </span>
      {LEVELS.map((i) => (
        <Modal
          key={i}
          width={WIDTH[i]}
          visible={current >= i}
          title={`Modal Title ${i}`}
          onClose={() => setCurrent(i - 1)}
          footer={
            <>
              <Button outline onClick={() => setCurrent(0)}>Close All</Button>
              {i < 3 && <Button type='primary' onClick={() => setCurrent(i + 1)}>Next Level</Button>}
            </>
          }
        >
          <p>{`Level ${i}`}. This is show information.</p>
        </Modal>
      ))}
    </div>
  );
}
