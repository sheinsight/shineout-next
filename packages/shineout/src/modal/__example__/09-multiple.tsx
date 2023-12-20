/**
 * cn - 多层 Modal
 *    -- 支持多层叠加 Modal
 * en - Multistage
 *    -- Multi-layer Modal
 */
import React, { useState, Fragment } from 'react';
import { Modal, Button } from 'shineout';

const pickNumber = (ma = 65555, mi = 0, fixed = 2) => {
  let max = ma;
  let min = mi;
  if (typeof max === 'string') max = parseInt(max, 10);
  if (typeof min === 'string') min = parseInt(min, 10);

  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(fixed));
};

const range = (end: number, start = 0) => {
  const delta = end - start;
  if (typeof delta !== 'number' || Number.isNaN(delta)) {
    console.error(new Error('end can not computed with start'));
  }
  return Array.from({ length: end - start }, (_v, k) => k + start);
};

const size = range(11, 0).map(() => [pickNumber(450, 380), pickNumber(400, 300)]);

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const show = (v: number) => setCurrent(v);

  const footer = (i: number) => (
    <Button mode='outline' onClick={() => show(i)}>
      Close
    </Button>
  );

  return (
    <div>
      <Button mode='outline' onClick={() => show(1)}>
        click me
      </Button>

      {range(11, 1).map((i) => (
        <Modal
          key={i}
          width={size[i][0]}
          height={size[i][1]}
          footer={footer(i - 1)}
          visible={current >= i}
          title={`Modal Title ${i}`}
          onClose={() => {
            console.log('close', i);
            show(i - 1);
          }}
        >
          {`Level ${i}`}
          .
          <br />
          {i < 10 && (
            <Fragment>
              <Button mode='text' type='primary' onClick={() => show(i + 1)}>
                Next level
              </Button>
              <br />
              <br />
              <Button mode='text' type='primary' onClick={() => show(0)}>
                Close all
              </Button>
            </Fragment>
          )}
        </Modal>
      ))}
    </div>
  );
};

export default App;
