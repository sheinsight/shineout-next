/**
 * cn - 点击空白关闭
 *    -- 默认点击对话框外部空白页面会关闭对话框
 *    -- 设置 `maskCloseAble` 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏
 *    -- 设置 `maskCloseAble` 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留
 * en - Close
 *    -- By default, clicking on the blank page outside the Modal box will closes the Modal box
 *    -- Set `maskCloseAble` to false to disable the function that click mask to close and the close icon in the upper right corner will be hidden at the same time
 *    -- Set `maskCloseAbel` to null to disable the function that click mask to close and the close icon in the upper right corner will be preserved
 */
import React, { useState } from 'react';
import { Drawer, Button, Radio } from 'shineout';

const list: { title: string; value: boolean | null }[] = [
  {
    title: 'false',
    value: false,
  },
  {
    title: 'true',
    value: true,
  },
  {
    title: 'null',
    value: null,
  },
];

const App: React.FC = () => {
  const [selected, setSelected] = useState(list[0]);
  const [visible, setVisible] = useState(false);

  const footer = () => (
    <Button mode='outline' onClick={() => setVisible(false)}>
      Close
    </Button>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <Radio.Group
          data={list}
          keygen='title'
          value={selected}
          renderItem='title'
          onChange={(c) => setSelected(c)}
          prediction={(v, d) => v.title === d.title}
          style={{ marginInlineEnd: 20 }}
        />
      </div>

      <Button onClick={() => setVisible(true)} mode="outline">Open</Button>

      <Drawer
        width={400}
        visible={visible}
        footer={footer()}
        title='Modal Title'
        maskCloseAble={selected.value}
        onClose={() => setVisible(false)}
      >
        The prop maskCloseAble is &nbsp;
        {selected.title}
        .
        <br />
        You must click the button to close the Modal.
      </Drawer>
    </div>
  );
};

export default App;
