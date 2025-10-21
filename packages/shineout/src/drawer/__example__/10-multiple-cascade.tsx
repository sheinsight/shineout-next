/**
 * cn - 多层抽屉
 *    -- 设置 `cascade` 属性，父级 Drawer 会自动偏移保证不被子级 Drawer 遮挡
 * en - Multiple Drawers
 *    -- Set the `cascade` property, the parent Drawer will automatically offset to ensure that it is not blocked by the child Drawer
 */
import React, { useState } from 'react';
import { Drawer, Button, Radio, TYPE } from 'shineout';

type DrawerProps = TYPE.Drawer.Props;
type DrawerPosition = DrawerProps['position'];

const positionList: DrawerPosition[] = ['right', 'left'];

const App: React.FC = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>('right');

  return (
    <div>
      <Radio.Group
        keygen
        value={position}
        data={positionList}
        onChange={(p) => setPosition(p)}
        style={{ marginBottom: 24 }}
      />

      <Button onClick={() => setVisible1(true)} mode="outline">Open Drawer 1</Button>

      <Drawer
        cascade
        width={400}
        title='Drawer 1'
        visible={visible1}
        position={position}
        onClose={() => setVisible1(false)}
      >
        <div>
          <p>Content of Drawer 1……</p>

          <Button type="primary" onClick={() => setVisible2(true)} mode="outline">Open Drawer 2</Button>
        </div>
      </Drawer>

      <Drawer
        cascade
        forceMask
        width={400}
        title='Drawer 2'
        visible={visible2}
        position={position}
        onClose={() => setVisible2(false)}
      >
        <div>
          <p>Content of Drawer 2……</p>
        </div>
      </Drawer>
    </div>
  );
};

export default App;
